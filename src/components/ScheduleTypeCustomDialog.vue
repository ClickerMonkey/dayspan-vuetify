<template>

  <v-dialog
    v-bind="dialogProps"
    v-model="visible"
    :fullscreen="$dayspan.fullscreenDialogs">

    <v-card v-if="hasData">

      <slot name="scheduleTypeCustomHeader" v-bind="{original, copy, aroundDay, day}"></slot>

      <v-card-text>

        <slot name="scheduleTypeCustomBody" v-bind="{original, copy, aroundDay, day}">

          <ds-schedule-type-custom
            :schedule="copy"
            :day="aroundDay"
          ></ds-schedule-type-custom>

        </slot>

      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>

        <slot name="scheduleTypeCustomActions" v-bind="{original, copy, aroundDay, day, cancel, save, labels}">

          <v-spacer></v-spacer>

          <v-btn
            color="secondary"
            @click.stop="cancel">
            <span v-html="labels.cancel"></span>
          </v-btn>

          <v-btn
            color="primary"
            @click.stop="save">
            <span v-html="labels.save"></span>
          </v-btn>

        </slot>

      </v-card-actions>

    </v-card>

  </v-dialog>

</template>

<script>
import { Schedule, Functions as fn } from 'dayspan';


export default {

  name: 'dsScheduleTypeCustomDialog',

  props:
  {
    dialogProps:
    {
      validate(x) {
        return this.$dsValidate(x, 'dialogProps');
      },
      default() {
        return this.$dsDefaults().dialogProps;
      }
    },

    labels:
    {
      validate(x) {
        return this.$dsValidate(x, 'labels');
      },
      default() {
        return this.$dsDefaults().labels;
      }
    }
  },

  data: vm => ({
    visible: false,
    original: null,
    copy: null,
    day: null
  }),

  computed:
  {
    hasData()
    {
      return !!this.copy;
    },

    aroundDay()
    {
      return this.day || this.$dayspan.today;
    }
  },

  methods:
  {
    edit(schedule, day)
    {
      this.original = schedule;
      this.copy = schedule.clone();
      this.day = day;
      this.visible = true;

      this.$emit('show', this.getEvent('show'));
    },

    create()
    {
      this.original = null;
      this.copy = new Schedule();
      this.day = null;
      this.visible = true;

      this.$emit('show', this.getEvent('show'));
    },

    save()
    {
      let ev = this.getEvent('save');

      this.$emit('save', ev);

      if (!ev.handled && ev.target && ev.schedule)
      {
        ev.target.set( ev.schedule );
        ev.handled = true;
      }

      this.finish(ev);
    },

    hide()
    {
      this.finish(this.getEvent('hide'));
    },

    cancel()
    {
      let ev = this.getEvent('cancel');

      this.$emit('cancel', ev);
      this.finish(ev);
    },

    finish(ev)
    {
      if (ev.hide && this.visible)
      {
        this.visible = false;
        this.$emit('hide', ev);
      }
    },

    getEvent(type, extra = {})
    {
      return fn.extend({

        type: type,
        target: this.original,
        schedule: this.copy,
        day: this.day,
        hide: true,
        handled: false,
        $vm: this,
        $element: this.$el

      }, extra);
    }
  }
}
</script>

<style lang="scss">

</style>
