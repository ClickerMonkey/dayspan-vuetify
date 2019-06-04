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

<script lang="ts">
import Vue from 'vue';
import { VCalendar, VCalendarDay, VCalendarEvent } from '../types';


export default Vue.extend({

  name: 'dsAgenda',

  props:
  {
    calendar:
    {
      required: true,
      type: Object as () => VCalendar
    },

    readOnly:
    {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    placeholder: null as VCalendarEvent,
    placeholderForCreate: false as boolean
  }),

  computed:
  {
    eventDays(): VCalendarDay[]
    {
      return this.calendar.days.filter( this.hasEvents );
    }
  },

  methods:
  {
    hasEvents(day: VCalendarDay)
    {
      return day.events.length > 0;
    }
  }
});
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
