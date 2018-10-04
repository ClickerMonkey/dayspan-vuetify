<template>

  <table class="ds-agenda-table">

    <colgroup>
      <col class="column-day">
      <col class="column-when">
      <col class="column-event">
    </colgroup>

    <template v-for="day in eventDays">

      <ds-agenda-day
        v-bind="{$scopedSlots}"
        v-on="$listeners"
        :read-only="readOnly"
        :key="day.dayIdentifier"
        :day="day"
        :calendar="calendar"
        :placeholder="placeholder"
        :placeholder-for-create="placeholderForCreate"
      ></ds-agenda-day>

    </template>

  </table>

</template>

<script>
import { Calendar, CalendarEvent, Functions as fn } from 'dayspan';


export default {

  name: 'dsAgenda',

  props:
  {
    calendar:
    {
      required: true,
      type: Calendar
    },

    readOnly:
    {
      type: Boolean,
      default: false
    }
  },

  data: vm => ({
    placeholder: null,
    placeholderForCreate: false
  }),

  computed:
  {
    eventDays()
    {
      return this.calendar.days.filter( this.hasEvents );
    }
  },

  methods:
  {
    hasEvents(day)
    {
      return day.events.length > 0;
    }
  }
}
</script>

<style scoped lang="scss">

.ds-agenda-table {
  width: 100%;
  border-spacing: 0;
  table-layout: fixed;
}

.column-day {
  width: 100px;
}

.column-when {
  min-width: 200px;
  width: 30%;
}

.column-event {
  width: 70%;
}

</style>
