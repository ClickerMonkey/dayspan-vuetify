<template>
  <div>

    <div class="pb-3" v-if="hasDescription">

      <span v-html="labels.prefix"></span>

      <v-text-field
        type="number"
        class="ds-textfield inline small"
        single-line
        hide-details
        v-model.number="sizeInput"
      ></v-text-field>

      <span v-html="labels.suffix"></span>

    </div>

    <template v-for="time in forecast">

      <ds-calendar-event-chip
        :key="time.time"
        :day="aroundDay"
        :time="time"
        :can-exclude="canExclude && !isReadOnly"
        @exclude="exclude"
      ></ds-calendar-event-chip>

    </template>

  </div>
</template>

<script>
import { Day, Schedule, Functions as fn } from 'dayspan';


export default {

  name: 'dsScheduleForecast',

  props:
  {
    schedule:
    {
      required: true,
      type: Schedule
    },

    day:
    {
      type: Day
    },

    readOnly:
    {
      type: Boolean,
      default: false
    },

    canExclude:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().canExclude;
      }
    },

    hasDescription:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().hasDescription;
      }
    },

    defaultSize:
    {
      type: Number,
      default() {
        return this.$dsDefaults().defaultSize;
      }
    },

    sizeMax:
    {
      type: Number,
      default() {
        return this.$dsDefaults().sizeMax;
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
    size: vm.defaultSize
  }),

  computed:
  {
    sizeInput:
    {
      get()
      {
        return this.size;
      },

      set(value)
      {
        this.size = Math.max(1, Math.min(Math.floor(value), this.sizeMax));
      }
    },

    aroundDay()
    {
      return this.day || this.$dayspan.today;
    },

    forecast()
    {
      return this.schedule.forecast( this.aroundDay, false, this.size )
        .map(function(spanDayId) {
          return spanDayId[1];
        })
        .list()
      ;
    },

    isReadOnly()
    {
      return this.readOnly || this.$dayspan.readOnly;
    }
  },

  watch:
  {
    forecast:
    {
      handler: 'triggerChange',
      immediate: true
    }
  },

  methods:
  {
    triggerChange()
    {
      this.$emit('change', this.getEvent('change'));
    },

    exclude(time)
    {
      var ev = this.getEvent('exclude', { time });

      if (!ev.handled && ev.schedule)
      {
        ev.schedule.setExcluded( ev.time );
        ev.handled = true;
      }
    },

    getEvent(type, extra = {})
    {
      return fn.extend({

        type: type,
        schedule: this.schedule,
        size: this.size,
        forecast: this.forecast,
        day: this.day,
        aroundDay: this.aroundDay,
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
