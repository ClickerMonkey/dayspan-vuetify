<template>

  <div class="ds-day"
    :class="classesDay"
    @click.stop="add">

    <div :class="classesHeader">

      <span class="ds-first-day" v-if="showMonth">
        {{ month }}
      </span>

      <a class="ds-dom" href
        :class="classesDayOfMonth"
        @click.prevent.stop="viewDay">
        {{ dayOfMonth }}
      </a>

    </div>

    <template v-for="(event, i) in day.events">

      <ds-calendar-event
        v-bind="{$scopedSlots}"
        v-on="$listeners"
        :key="event.id"
        :calendar-event="event"
        :calendar="calendar"
        :index="i"
      ></ds-calendar-event>

    </template>

    <div v-if="hasPlaceholder">

      <ds-calendar-event-placeholder
        v-bind="{$scopedSlots}"
        v-on="$listeners"
        :day="day"
        :placeholder="placeholder"
        :calendar="calendar"
        :index="day.events.length"
      ></ds-calendar-event-placeholder>

    </div>

  </div>

</template>

<script>
import { Day, Calendar, CalendarEvent } from 'dayspan';


export default {

  name: 'dsDay',

  props:
  {
    day:
    {
      required: true,
      type: Day
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

    formats:
    {
      validate(x) {
        return this.$dsValidate( x, 'formats' );
      },
      default() {
        return this.$dsDefaults().formats;
      }
    }
  },

  computed:
  {
    classesDay()
    {
      return {
        'ds-today': this.day.currentDay,
        'ds-first-day-day': this.day.dayOfMonth === 1,
        'ds-out-calendar': !this.day.inCalendar
      };
    },

    classesHeader()
    {
      return {
        'ds-out-calendar': !this.day.inCalendar
      };
    },

    classesDayOfMonth()
    {
      return {
        'ds-today-dom': this.day.currentDay
      };
    },

    showMonth()
    {
      return this.day.dayOfMonth === 1;
    },

    dayOfMonth()
    {
      return this.day.dayOfMonth;
    },

    month()
    {
      return this.day.format( this.formats.month );
    },

    hasPlaceholder()
    {
      return this.placeholder &&
        this.placeholder.time.matchesDay( this.day );
    }
  },

  methods:
  {
    add()
    {
      this.$emit('add', this.day);
    },

    viewDay(event)
    {
      this.$emit('view-day', this.day);
    }
  }
}
</script>

<style scoped lang="scss">

.ds-day {
  flex: 1;
  width: 0;
  border-right: #e0e0e0 1px solid;
  border-bottom: #e0e0e0 1px solid;
  padding: 4px;

  .ds-dom {
    text-decoration: none;
    color: #212121;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;

    &:hover {
      text-decoration: underline;
    }

    &.ds-today-dom {
      border-radius: 12px;
      background-color: #4285f4;
      color: white;
      display: block;
      position: relative;
      z-index: 1;
    }
  }
}

.ds-out-calendar {
  color: #757575;
}

</style>
