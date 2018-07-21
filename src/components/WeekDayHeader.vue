<template>

  <div class="ds-day"
    :class="classesDay"
    @click.stop="add">

    <div class="ds-week-weekday">
      {{ weekday }}
    </div>

    <a class="ds-week-date"
      @click="viewDay">
      {{ dayOfMonth }}
    </a>

    <div class="ds-all-events">

      <template v-for="(event, i) in day.events">

        <ds-calendar-event
          v-if="event.fullDay"
          v-bind="{$scopedSlots}"
          :calendar-event="event"
          :key="event.id"
          :index="i"
          :calendar="calendar"
          @edit="edit"
        ></ds-calendar-event>

      </template>

      <div v-if="hasPlaceholder">

        <ds-calendar-event-placeholder
          v-bind="{$scopedSlots}"
          v-on="$listeners"
          :day="day"
          :placeholder="placeholder"
          :placeholder-for-create="placeholderForCreate"
          :calendar="calendar"
          :index="day.events.length"
        ></ds-calendar-event-placeholder>

      </div>

    </div>

  </div>

</template>

<script>
import { CalendarDay, Calendar, CalendarEvent } from 'dayspan';


export default {

  name: 'dsWeekDayHeader',

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

    formats:
    {
      validate(x) {
        return this.$dsValidate(x, 'formats');
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
        'ds-day-today': this.day.currentDay,
        'ds-day-past': this.day.currentOffset < 0,
        'ds-day-future': this.day.currentOffset > 0
      };
    },

    dayOfMonth()
    {
      return this.day.dayOfMonth;
    },

    weekday()
    {
      return this.day.format( this.formats.weekday );
    },

    hasPlaceholder()
    {
      return this.placeholder &&
        this.placeholder.time.matchesDay( this.day ) &&
        this.placeholder.fullDay;
    }
  },

  methods:
  {
    add()
    {
      this.$emit('add', this.day);
    },

    edit(event)
    {
      this.$emit('edit', event);
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

  .ds-week-date {
    font-size: 40px;
    line-height: 36px;
    color: black;
    padding-left: 8px;

    &:hover {
      text-decoration: underline;
    }
  }

  .ds-all-events {
    margin-top: 8px;
  }

  .ds-week-weekday {
    color: black;
    padding-left: 8px;
  }

  &.ds-day-today {
    background-color: rgba(0,0,0,0.04);

    .ds-week-weekday,
    .ds-week-date {
      color: #4285f4;
    }
  }

  &.ds-day-past {

    .ds-week-weekday,
    .ds-week-date {
      color: #9e9e9e;
    }
  }

  &.ds-day-future {

  }
}

</style>
