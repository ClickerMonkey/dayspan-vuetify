<template>

  <div class="ds-week-header">

    <div class="ds-hour-list"></div>

    <template v-for="day in days">

      <ds-week-day-header
        v-bind="{$scopedSlots}"
        :day="day"
        :calendar="calendar"
        @edit="edit"
        @add="add"
      ></ds-week-day-header>
    </template>

  </div>

</template>

<script>
import { CalendarDay, Calendar } from 'dayspan';

export default {

  name: 'dsWeekHeader',

  props:
  {
    day:
    {
      required: true,
      type: CalendarDay
    },
    
    calendar:
    {
      required: true,
      type: Calendar
    }
  },

  methods:
  {
    edit(eventDay)
    {
      this.$emit('edit', eventDay);
    },

    add(day)
    {
      this.$emit('add', day);
    }
  }
}
</script>

<style scoped lang="scss">

.ds-week-header {
  flex: none;
  display: flex;
  flex: 1;

  .ds-hour-list {
    flex: none;
    width: 44px;
    border-right: #e0e0e0 1px solid;
  }
}

</style>
