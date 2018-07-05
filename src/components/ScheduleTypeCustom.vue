<template>
  <div>

    <div class="pa-3">
      {{ customDescription }}
    </div>

    <ds-schedule-frequency-year
      :day="day"
      :schedule="schedule"
    ></ds-schedule-frequency-year>

    <ds-schedule-frequency-month
      :schedule="schedule"
    ></ds-schedule-frequency-month>

    <ds-schedule-frequency-week
      :schedule="schedule"
    ></ds-schedule-frequency-week>

    <ds-schedule-frequency-day-of-week
      :schedule="schedule"
    ></ds-schedule-frequency-day-of-week>

    <ds-schedule-frequency-day
      :schedule="schedule"
    ></ds-schedule-frequency-day>

  </div>
</template>

<script>
import { Day, Schedule } from 'dayspan';


export default {

  name: 'dsScheduleTypeCustom',

  props:
  {
    day:
    {
      required: true,
      type: Day
    },

    schedule:
    {
      required: true,
      type: Schedule
    }
  },

  data: vm => ({

  }),

  computed:
  {
    customDescription()
    {
      return this.$dayspan.getScheduleDescription( this.schedule );
    }
  },

  methods:
  {
  }
}
</script>

<style lang="scss">

</style>
