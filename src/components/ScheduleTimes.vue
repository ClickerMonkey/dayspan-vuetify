<template>
  <v-layout row wrap>
    <v-flex xs2>

      <v-checkbox
        ref="allDayCheckbox"
        hide-details
        class="ma-2"
        :label="labels.all"
        v-model="allDay"
      ></v-checkbox>

    </v-flex>
    <v-flex xs10>

      <v-text-field
        single-line hide-details solo flat
        class="time-control-width"
        type="number"
        v-model.number="schedule.duration"
        @input="triggerChange"
      ></v-text-field>

      <v-select
        single-line hide-details solo flat
        class="time-control-width pl-1 mt-0"
        :items="durationOptions"
        v-model="schedule.durationUnit"
        @input="triggerChange"
      ></v-select>

    </v-flex>

    <v-flex xs10 offset-xs2 v-if="!allDay">

      <template v-for="(time, index) in schedule.times">

        <ds-schedule-time
          :index="index"
          :show-add="isLastTime( index )"
          :show-remove="hasTimes"
          :value="schedule.times[ index ]"
          :key="index"
          @add="addTime"
          @remove="removeTime"
          @input="triggerChange"
        ></ds-schedule-time>

      </template>

    </v-flex>

  </v-layout>

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

    allDay:
    {
      get()
      {
        return this.schedule.isFullDay();
      },

      set(allDay)
      {
        if (this.schedule.isFullDay() !== allDay)
        {
          this.$dayspan.getPermission('toggleAllDay',
            (prompted) => {
              this.schedule.setFullDay( allDay );
              this.triggerChange();
            },
            () => {
              this.$refs.allDayCheckbox.reset();
            }
          );
        }
      }
    },

    hasTimes()
    {
      return this.schedule.times.length > 1;
    }
  },

  methods:
  {
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

        if (!ev.handled && ev.schedule)
        {
          ev.schedule.times.splice( ev.index, 1 );
          ev.handled = true;
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

.time-control-width {
  display: inline-block !important;
  width: 160px !important;
}

</style>
