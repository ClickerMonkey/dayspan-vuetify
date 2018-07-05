<template>

  <div class="ds-month">

    <div class="ds-week-header">
      <div class="ds-week-header-day"
        v-for="weekday in weekdays" :key="weekday">
        {{ weekday }}
      </div>
    </div>

    <ds-day-row
      v-for="i in rows"
      v-bind="{$scopedSlots}"
      :key="i"
      :days="daysAtRow( i, 7 )"
      :calendar="calendar"
      @edit="edit"
      @add="add"
    ></ds-day-row>
  </div>

</template>

<script>
import { Calendar } from 'dayspan';
import * as moment from 'moment';


export default {

  name: 'dsWeeksView',

  props:
  {
    calendar:
    {
      required: true,
      type: Calendar
    },

    weekdays:
    {
      type: Array,
      default() {
        return this.$dsDefaults().weekdays;
      }
    }
  },

  computed:
  {
    rows()
    {
      return Math.floor( this.calendar.days.length / 7 );
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
    },

    daysAtRow(row, rowSize)
    {
      var start = (row - 1) * rowSize;

      return this.calendar.days.slice( start, start + rowSize );
    }
  }
}
</script>

<style scoped lang="scss">

.ds-month {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;

  .ds-week-header {
    display: flex;
  }
  .ds-week-header-day {
    flex: 1 0 20px;
    border-right: #e0e0e0 1px solid;
    color: #757575;
    padding: 4px;
  }
}

</style>
