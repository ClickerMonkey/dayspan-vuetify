<template>

  <div class="ds-week">

    <template v-for="(day, i) in days">

      <ds-day
        v-bind="{$scopedSlots}"
        :key="i"
        :day="day"
        :calendar="calendar"
        @edit="edit"
        @add="add"></ds-day>
    </template>

  </div>

</template>

<script>
import { Calendar } from 'dayspan';


export default {

  name: 'dsDayRow',

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
    }
  },

  methods:
  {
    edit: function(eventDay)
    {
      this.$emit('edit', eventDay);
    },

    add: function(day)
    {
      this.$emit('add', day);
    }
  }
}
</script>

<style scoped lang="scss">

.ds-week {
  display: flex;
  flex: 1;
}

</style>
