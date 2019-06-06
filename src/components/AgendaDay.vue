<template>

  <tbody class="ds-agenda-day"
    :class="classes"
    @click.stop="add">

    <template v-for="(event, i) in visibleEvents">

      <ds-agenda-event
        v-bind="{$scopedSlots}"
        v-on="$listeners"
        :read-only="readOnly"
        :key="event.id"
        :calendar-event="event"
        :calendar="calendar"
        :first="i === 0"
        :siblings="visibleEvents.length"
      ></ds-agenda-event>

    </template>

  </tbody>

</template>

<script lang="ts">
import Vue from 'vue';
import { VCalendar, VCalendarDay, VCalendarEvent } from '../types';



export default Vue.extend({

  name: 'dsAgendaDay',

  props:
  {
    day:
    {
      required: true,
      type: Object as () => VCalendarDay
    },

    calendar:
    {
      required: true,
      type: Object as () => VCalendar
    },

    readOnly:
    {
      type: Boolean,
      default: false
    },

    placeholder:
    {
      type: Object as () => VCalendarEvent
    },

    placeholderForCreate:
    {
      type: Boolean,
      default: false
    }
  },

  computed:
  {
    classes(): object
    {
      return {
        'ds-day-today': this.day.currentDay,
        'ds-day-past': this.day.currentOffset < 0,
        'ds-day-future': this.day.currentOffset > 0,
        'ds-first-day-day': this.day.dayOfMonth === 1,
        'ds-out-calendar': !this.day.inCalendar
      };
    },

    hasPlaceholder(): boolean
    {
      return this.placeholder &&
        this.placeholder.time.matchesDay( this.day );
    },

    visibleEvents(): VCalendarEvent[]
    {
      return this.day.events.filter( this.isVisible );
    }
  },

  methods:
  {
    isVisible(calendarEvent: VCalendarEvent)
    {
      if (this.$dayspan.features.hideOnMove &&
          this.placeholder &&
          this.placeholder.event === calendarEvent.event)
      {
        return false;
      }

      return true;
    },

    add()
    {
      this.$emit('add', this.day);
    }
  }
});
</script>

<style scoped lang="scss">

.ds-agenda-day {

  tr:first-child td {
    padding-top: 6px;
  }

  tr:last-child td {
    padding-bottom: 6px;
  }
}

.ds-day-today {

  .ds-agenda-lines {
    color: #4285f4;
    font-weight: bold;
  }
}

.ds-day-past {

  .ds-agenda-lines,
  .ds-agenda-when,
  .ds-agenda-details {
    color: #9e9e9e;
  }
}

</style>
