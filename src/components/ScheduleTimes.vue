<template>
  <div class="ds-schedule-times">

    <div class="ds-time-row">

      <div class="ds-time-cell">

        <v-checkbox
          ref="allDayCheckbox"
          hide-details
          class="ma-2"
          :label="labels.all"
          :readonly="isReadOnly"
          v-model="allDay"
        ></v-checkbox>

      </div>

      <div class="ds-time-cell">

        <v-text-field
          single-line hide-details solo flat
          type="number"
          v-model.number="schedule.duration"
          :disabled="isReadOnly"
          @input="triggerChange"
        ></v-text-field>

      </div>

      <div class="ds-time-cell">

        <v-select
          single-line hide-details solo flat
          :items="durationOptions"
          v-model="schedule.durationUnit"
          :disabled="isReadOnly"
          @input="triggerChange"
        ></v-select>

      </div>

    </div>

    <div v-if="!allDay">

      <div class="ds-time-row" v-for="(time, index) in schedule.times">

        <div class="ds-time-cell"></div>

        <ds-schedule-time
          class="ds-time-cell double"
          :index="index"
          :show-add="isLastTime( index )"
          :show-remove="hasTimes"
          :value="schedule.times[ index ]"
          :key="index"
          :read-only="readOnly"
          @add="addTime"
          @remove="removeTime"
          @change="changeTime"
        ></ds-schedule-time>

      </div>

    </div>

  </div>

</template>

<script>
import { Time, Schedule, Functions as fn } from 'dayspan';


export default {

  name: 'dsScheduleTimes',

  props:
  {
    schedule:
    {
      required: true,
      type: Schedule
    },

    readOnly:
    {
      type: Boolean,
      default: false
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

    defaultTime:
    {
      type: String,
      default() {
        return this.$dsDefaults().defaultTime;
      }
    }
  },

  computed:
  {
    durationOptions()
    {
      var singular = this.schedule.duration === 1;

      var duringDay = [
        { text: singular ? this.labels.minute : this.labels.minutes, value: 'minutes' },
        { text: singular ? this.labels.hour : this.labels.hours, value: 'hours' }
      ];
      var allDay = [
        { text: singular ? this.labels.day : this.labels.days, value: 'days' },
        { text: singular ? this.labels.week : this.labels.weeks, value: 'weeks' },
        { text: singular ? this.labels.month : this.labels.months, value: 'months' }
      ];

      return this.allDay ? allDay : duringDay.concat( allDay );
    },

    hasTimes()
    {
      return this.schedule.times.length > 1;
    },

    isReadOnly()
    {
      return this.readOnly || this.$dayspan.readOnly;
    }
  },

  data: vm => ({
    allDay: false
  }),

  watch:
  {
    schedule: {
      handler: 'updateAllDay',
      immediate: true
    },
    allDay: 'updateScheduleAllDay'
  },

  methods:
  {
    updateAllDay()
    {
      this.allDay = this.schedule.isFullDay();
    },

    updateScheduleAllDay(allDay)
    {
      if (this.schedule.isFullDay() !== allDay)
      {
        this.$dayspan.getPermission('toggleAllDay',
          (prompted) => {
            this.schedule.setFullDay( allDay );
            this.triggerChange();
          },
          () => {
            this.allDay = !allDay;
          }
        );
      }
    },

    changeTime(ev)
    {
      ev.schedule = this.schedule;
      ev.updated = false;

      this.$emit('update', ev);

      if (!ev.handled && ev.schedule)
      {
        ev.updated = ev.schedule.moveTime( ev.time, ev.next );
        ev.handled = true;
      }

      this.$emit('change', ev);
    },

    addTime(ev)
    {
      ev.time = Time.parse( this.defaultTime );
      ev.schedule = this.schedule;

      if (ev.time)
      {
        this.$emit('add', ev);

        if (!ev.handled && ev.schedule)
        {
          ev.schedule.times.push( ev.time );
          ev.handled = true;
        }

        this.$emit('change', ev);
      }
    },

    removeTime(ev)
    {
      this.$dayspan.getPermission('removeExistingTime', () =>
      {
        ev.schedule = this.schedule;

        this.$emit('remove', ev);

        if (!ev.handled && ev.schedule && ev.time)
        {
          ev.handled = ev.schedule.removeTime( ev.time );
        }

        this.$emit('change', ev);
      });
    },

    isLastTime(index)
    {
      return index === this.schedule.times.length - 1;
    },

    triggerChange()
    {
      this.$emit('change', this.getEvent('change'));
    },

    getEvent(type, extra = {})
    {
      return fn.extend({

        type: type,
        schedule: this.schedule,
        handled: false,
        $vm: this,
        $element: this.$el

      }, extra);
    }
  }
}
</script>

<style scoped lang="scss">

.ds-schedule-times {
  max-width: 436px;

  .ds-time-row {
    display: flex;

    .ds-time-cell {
      padding-right: 8px;
      flex: 1 0 0px;

      &.double {
        padding-right: 16px;
        flex: 2 0 0px;
      }
    }
  }
}

</style>
