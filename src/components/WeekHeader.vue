<template>
  <div class="ds-week-header">

    <div class="ds-hour-list"></div>

    <template v-for="day in days">
      <ds-week-day-header
        v-bind="{ scopedSlots: $scopedSlots }"
        :day="day"
        :calendar="calendar"
        @edit="edit"
        @add="add"
      ></ds-week-day-header>
    </template>

  </div>
</template>

<script>
import dsWeekDayHeader from './WeekDayHeader';

export default {
  name: 'dsWeekHeader',
  props: ['days', 'calendar'],
  components: { dsWeekDayHeader },
  methods: {
    edit: function(eventDay) {
      this.$emit('edit', eventDay);
    },
    add: function(day) {
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
