<template>

  <div class="ds-week">

    <template v-for="(day, i) in days">

      <ds-day
        v-bind="{$scopedSlots}"
        v-on="$listeners"
        :key="i"
        :day="day"
        :calendar="calendar"
        :placeholder="placeholder"
        :placeholder-for-create="placeholderForCreate"
      ></ds-day>

    </template>

  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import { Calendar, CalendarEvent } from 'dayspan';


export default Vue.extend({

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
});
</script>

<style scoped lang="scss">

.ds-week {
  display: flex;
  flex: 1;
}

</style>
