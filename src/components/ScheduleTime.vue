<template>
  <div>

    <v-text-field
      single-line hide-details solo flat
      class="time"
      type="time"
      v-model="time"
    ></v-text-field>

    <v-tooltip bottom v-if="showRemove">

      <v-btn slot="activator" icon
        class="action-remove"
        :color="colors.remove"
        @click="removeTime"><v-icon>{{ icons.remove }}</v-icon></v-btn>

      <span v-html="labels.remove"></span>

    </v-tooltip>
    <v-tooltip bottom v-if="showAdd">

      <v-btn slot="activator" icon
        class="action-add"
        :color="colors.add"
        @click="addTime"><v-icon>{{ icons.add }}</v-icon></v-btn>

      <span v-html="labels.add"></span>

    </v-tooltip>

  </div>

</template>

<script>
import { Time, Functions as fn } from 'dayspan';


export default {

  name: 'dsScheduleTime',

  props:
  {
    value:
    {
      required: true,
      type: Time
    },

    index:
    {
      type: Number,
      default() {
        return this.$dsDefaults().index;
      }
    },

    mutate:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().mutate;
      }
    },

    showAdd:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().showAdd;
      }
    },

    showRemove:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().showRemove;
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
    },

    colors:
    {
      validate(x) {
        return this.$dsValidate(x, 'colors');
      },
      default() {
        return this.$dsDefaults().colors;
      }
    },

    icons:
    {
      validate(x) {
        return this.$dsValidate(x, 'icons');
      },
      default() {
        return this.$dsDefaults().icons;
      }
    }
  },

  data: vm => ({

  }),

  computed:
  {
    time:
    {
      get()
      {
        return this.value.format('HH:mm');
      },
      set(time)
      {
        this.setTime( time );
      }
    }
  },

  methods:
  {
    addTime()
    {
      this.$emit('add', this.getEvent('add'));
    },

    removeTime()
    {
      this.$emit('remove', this.getEvent('remove'));
    },

    setTime(time)
    {
      var parsed = Time.parse(time);

      if (parsed)
      {
        var ev = this.getEvent('change', { next: parsed });

        this.$emit('change', ev);

        if (!ev.handled)
        {
          if (ev.mutate)
          {
            ev.time.set( ev.next );

            parsed = ev.next;
          }

          this.$emit('input', parsed);
        }
      }
    },

    getEvent(type, extra = {})
    {
      return fn.extend({

        type: type,
        time: this.value,
        index: this.index,
        mutate: this.mutate,
        handled: false,
        $vm: this,
        $element: this.$el

      }, extra);
    }
  }
}
</script>

<style scoped lang="scss">

.time {
  width: 160px;
  display: inline-block;
}

</style>
