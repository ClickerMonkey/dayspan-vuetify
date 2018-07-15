<template>

  <div class="ds-week-header">

    <div class="ds-hour-list"></div>

    <template v-for="day in days">

      <ds-week-day-header
        v-bind="{$scopedSlots}"
        v-on="$listeners"
        :day="day"
        :calendar="calendar"
        :placeholder="placeholder"
        :placeholder-for-create="placeholderForCreate"
      ></ds-week-day-header>

    </template>

  </div>

</template>

<script>
import { CalendarDay, Calendar, CalendarEvent } from 'dayspan';

export default {

  name: 'dsWeekHeader',

  props:
  {
    days:
    {
      required: true,
      type: Array
    },

    calendar:
    {
      required: true,
      type: Calendar
    },

    placeholder:
    {
      type: CalendarEvent
    },

    placeholderForCreate:
    {
      type: Boolean,
      default: false
    }
  },

  methods:
  {
  }
}
</script>

<style scoped lang="scss">

.ds-week-header {
  flex: none;
  display: flex;

  .ds-hour-list {
    flex: none;
    width: 44px;
    border-right: #e0e0e0 1px solid;
    // background-color: #fafafa;
  }
}

</style>
