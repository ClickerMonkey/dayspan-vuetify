<template>

  <div class="ds-month">

    <div class="ds-week-header">

      <div class="ds-week-header-day"
        v-for="(weekday, i) in weekdays"
        :key="weekday"
        :class="weekdayClasses(i)">

        {{ weekday }}

      </div>

    </div>

    <ds-day-row
      v-for="i in rows"
      v-bind="{$scopedSlots}"
      v-on="$listeners"
      :key="i"
      :days="daysAtRow( i, 7 )"
      :calendar="calendar"
      :placeholder="placeholder"
      :placeholder-for-create="placeholderForCreate"
    ></ds-day-row>

  </div>

</template>

<script>
import { Calendar, CalendarEvent } from 'dayspan';


export default {

  name: 'dsWeeksView',

  props:
  {
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
    daysAtRow(row, rowSize)
    {
      var start = (row - 1) * rowSize;

      return this.calendar.days.slice( start, start + rowSize );
    },

    weekdayClasses(weekday)
    {
      return {
        'ds-week-header-today': this.$dayspan.today.dayOfWeek === weekday
      };
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
    user-select: none;
  }

  .ds-week-header-day {
    flex: 1 0 20px;
    border-right: #e0e0e0 1px solid;
    color: #757575;
    padding: 4px;
    padding-bottom: 0px;

    &.ds-week-header-today {
      color: #4285f4;
      font-weight: 500;
    }
  }
}

</style>
