<template>

  <div class="ds-day"
    :class="classesDay"
    @mouseenter="mouseEnterDay"
    @mouseleave="mouseLeaveDay"
    @mousemove.stop="mouseMove"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
    @dragstart.prevent>

    <div class="ds-hour"
      v-for="h in 24"
      @click.stop="addAt( h )"></div>

    <template v-for="(event, i) in day.events">

      <ds-calendar-event-time
        v-if="isVisible( event )"
        v-bind="{$scopedSlots}"
        v-on="$listeners"
        :calendar-event="event"
        :key="event.id"
        :calendar="calendar"
      ></ds-calendar-event-time>

    </template>

    <div v-if="day.currentDay"
      :style="nowLine"></div>

    <div v-if="hasPlaceholder">

      <ds-calendar-event-time-placeholder
        v-bind="{$scopedSlots}"
        v-on="$listeners"
        :day="day"
        :placeholder="placeholder"
        :placeholder-for-create="placeholderForCreate"
        :calendar="calendar"
      ></ds-calendar-event-time-placeholder>

    </div>

  </div>

</template>

<script>
import { Constants, CalendarDay, CalendarEvent, Calendar, DaySpan, Functions as fn } from 'dayspan';


export default {

  name: 'dsDayTimes',

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

    nowLine()
    {
      return this.$dayspan.getStyleNow();
    },

    hasPlaceholder()
    {
      return this.placeholder &&
        !this.placeholder.fullDay &&
        this.placeholder.time.matchesDay( this.day );
    }
  },

  methods:
  {
    isVisible(calendarEvent)
    {
      if (calendarEvent.fullDay)
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

    addAt(hour)
    {
      this.$emit('add-at', {
        day: this.day,
        hour: hour - 1
      });
    },

    mouseEnterDay($event)
    {
      this.$emit('mouse-enter-day', this.day);
    },

    mouseLeaveDay($event)
    {
      this.$emit('mouse-leave-day', this.day);
    },

    mouseMove($event)
    {
      var time = this.getTimeAt($event, this.$dayspan.rounding.move);
      var timeDrag = this.getTimeAt($event, this.$dayspan.rounding.add, true);
      var ev = this.getEvent('mouse-move', $event, { time, timeDrag });

      this.$emit('mouse-move', ev);
    },

    mouseDown($event)
    {
      var time = this.getTimeAt($event, this.$dayspan.rounding.add);
      var ev = this.getEvent('mouse-down', $event, { time });

      this.$emit('mouse-down', ev);
    },

    mouseUp($event)
    {
      var time = this.getTimeAt($event, this.$dayspan.rounding.add, true);
      var ev = this.getEvent('mouse-up', $event, { time });

      this.$emit('mouse-up', ev);
    },

    getEvent(type, $event, extra = {})
    {
      return fn.extend({

        type: type,
        day: this.day,
        left: $event.button === 0 && $event.buttons > 0,
        right: $event.button === 1 && $event.buttons > 0,
        handled: false,
        $event: $event,
        $vm: this,
        $element: this.$el

      }, extra);
    },

    getTimeAt($event, roundTo, roundUp)
    {
      var bounds = this.$el.getBoundingClientRect();
      var y = ($event.clientY - bounds.y) / bounds.height;
      var millis = Math.round(Constants.MILLIS_IN_DAY * y);
      var time = this.day.start().relative(millis);

      if (roundTo) {
        time = this.$dayspan.roundTime(time, roundTo, roundUp);
      }

      return time;
    }
  }
}
</script>

<style scoped lang="scss">

.v-menu__activator {
  align-items: end;
}

.ds-day {
  flex: 1;
  width: 0;
  border-right: #e0e0e0 1px solid;
  border-bottom: #e0e0e0 1px solid;

  &.ds-day-today {
    background-color: rgba(0,0,0,0.04);
  }

  &.ds-day-past {

  }

  &.ds-day-future {

  }
}

.ds-hour {
  height: 40px;
  border-bottom: #e0e0e0 1px solid;
}

</style>
