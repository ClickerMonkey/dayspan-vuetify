<template>

  <div class="ds-day"
    :class="classesDay"
    @click.stop="add">

    <div class="ds-week-weekday">
      {{ weekday }}
    </div>

    <div class="ds-week-date">
      {{ dayOfMonth }}
    </div>

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
        'ds-today': this.day.currentDay
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
      this.$emit('edit', {
        day: this.day,
        event: event
      });
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
    line-height: 44px;
    color: black;
    padding-left: 8px;
  }
  .ds-week-weekday {
    color: black;
    padding-left: 8px;
  }

  &.ds-today {

    .ds-week-weekday,
    .ds-week-date {
      color: #4285f4;
    }
  }
}

</style>
