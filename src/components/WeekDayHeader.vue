<template>

  <div class="ds-day"
    :class="classesDay"
    @mouseenter="mouseEnterDay"
    @mouseleave="mouseLeaveDay"
    @mousemove.stop="mouseMoveDay"
    @mousedown="mouseDownDay"
    @mouseup="mouseUpDay"
    @click.stop="add"
    @dragstart.prevent>

    <div class="ds-week-weekday">
      {{ weekday }}
    </div>

    <a class="ds-week-date"
      @click.stop.prevent="viewDay"
      @mousedown.stop>
      {{ dayOfMonth }}
    </a>

    <div class="ds-all-events">

      <template v-for="(event, i) in visibleEvents">

        <ds-calendar-event
          v-bind="{$scopedSlots}"
          v-on="$listeners"
          :calendar-event="event"
          :key="event.id"
          :index="i"
          :calendar="calendar"
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
          :index="visibleEvents.length"
        ></ds-calendar-event-placeholder>

      </div>

    </div>

  </div>

</template>

<script>
import { CalendarDay, Calendar, CalendarEvent, Functions as fn } from 'dayspan';


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
    },

    visibleEvents()
    {
      return this.day.events.filter( this.isVisible );
    }
  },

  methods:
  {
    isVisible(calendarEvent)
    {
      if (!calendarEvent.fullDay)
      {
        return false;
      }

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
    },

    viewDay(event)
    {
      this.$emit('view-day', this.day);
    },

    mouseEnterDay($event)
    {
      this.$emit('mouse-enter-day', this.day);
    },

    mouseLeaveDay($event)
    {
      this.$emit('mouse-leave-day', this.day);
    },

    mouseMoveDay($event)
    {
      this.$emit('mouse-move-day', this.getEvent('mouse-move-day', $event));
    },

    mouseDownDay($event)
    {
      this.$emit('mouse-down-day', this.getEvent('mouse-down-day', $event));
    },

    mouseUpDay($event)
    {
      this.$emit('mouse-up-day', this.getEvent('mouse-up-day', $event));
    },

    getEvent(type, $event, extra = {})
    {
      return fn.extend({

        type: type,
        day: this.day,
        calendar: this.calendar,
        left: $event.button === 0 && $event.buttons > 0,
        right: $event.button === 1 && $event.buttons > 0,
        handled: false,
        $event: $event,
        $vm: this,
        $element: this.$el

      }, extra);
    }
  }
}
</script>

<style scoped lang="scss">

.ds-day {
  flex: 1 1 auto;
  width: 0;
  border-right: #e0e0e0 1px solid;
  border-bottom: #e0e0e0 1px solid;
  padding: 4px;

  .ds-week-date {
    font-size: 40px;
    line-height: 36px;
    color: black;
    padding-left: 8px;
    user-select: none;

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
    user-select: none;
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
