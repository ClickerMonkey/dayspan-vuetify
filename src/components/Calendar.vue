<template>
  <div class="ds-calendar">

    <div class="ds-month-view"
      v-if="isMonth || isYear"
      :class="{ 'ds-year-view': isYear }">

      <ds-weeks-view class="ds-expand"
        v-bind="{ scopedSlots: $scopedSlots }"
        :calendar="calendar"
        @add="add"
        @edit="edit"></ds-weeks-view>

    </div>

    <div v-if="isWeek || isDay" class="ds-week-view">

      <ds-days-view
        v-bind="{ scopedSlots: $scopedSlots }"
        :calendar="calendar"
        :highlight="highlight"
        @add="add"
        @add-at="addAt"
        @edit="edit"
        @mouse-enter-day="mouseEnterDay"
        @mouse-leave-day="mouseLeaveDay"
        @mouse-move="mouseMove"
        @mouse-down="mouseDown"
        @mouse-up="mouseUp"
        @mouse-enter-event="mouseEnterEvent"
        @mouse-leave-event="mouseLeaveEvent"
        @mouse-down-event="mouseDownEvent"
        @mouse-up-event="mouseUpEvent"></ds-days-view>

    </div>

  </div>
</template>

<script>
import { Calendar, Units, DaySpan, Day } from 'dayspan';

import dsWeeksView from './WeeksView';
import dsDaysView from './DaysView';

export default {
  name: 'dsDay',
  props: {
    calendar: {
      validator: function(x) {
        return x instanceof Calendar;
      }
    },
    highlight: {
      validator: function(x) {
        return !x || x instanceof DaySpan;
      },
      default: null
    },
    autoHighlight: Boolean,
    autoDragging: Boolean
  },
  components: {
    dsWeeksView,
    dsDaysView
  },
  computed: {
    isDay: function() {
      return this.calendar && this.calendar.type === Units.DAY;
    },
    isWeek: function() {
      return this.calendar && this.calendar.type === Units.WEEK;
    },
    isMonth: function() {
      return this.calendar && this.calendar.type === Units.MONTH;
    },
    isYear: function() {
      return this.calendar && this.calendar.type === Units.YEAR;
    }
  },
  methods: {
    add: function(day) {
      this.$emit('add', day);
    },
    addAt: function(dayHour) {
      this.$emit('add-at', dayHour);
    },
    edit: function(eventDay) {
      this.$emit('edit', eventDay);
    },
    mouseEnterDay: function(day) {
      this.$emit('mouse-enter-day', day);
    },
    mouseLeaveDay: function(day) {
      this.$emit('mouse-leave-day', day);
    },
    mouseMove: function(mouseEvent) {
      this.$emit('mouse-move', mouseEvent);
      if (this.autoHighlight && mouseEvent.left && this.highlightStart) {
        this.highlightEnd = mouseEvent.timeDrag;
        this.highlight.start = this.highlightStart.min( this.highlightEnd );
        this.highlight.end = this.highlightStart.max( this.highlightEnd );
      }
      if (this.dragging) {
        var start = mouseEvent.time;
        start = start.relative(-this.draggingEvent.offset);
        start = this.$dayspan.roundTime( start, this.$dayspan.mouseDragRound );

        this.highlight.start = start;
        this.highlight.end = start.relative(this.draggingEvent.calendarEvent.time.millis());

        if (!mouseEvent.left) {
          this.endDrag();
        }
      }
    },
    mouseDown: function(mouseEvent) {
      this.$emit('mouse-down', mouseEvent);
      if (this.autoHighlight && mouseEvent.left) {
        this.highlightStart = mouseEvent.time;
        this.highlight.start = this.highlightStart;
        this.highlight.end = this.highlightStart;
      }
    },
    mouseUp: function(mouseEvent) {
      this.$emit('mouse-up', mouseEvent);
      if (this.highlightEnd) {
        this.$emit('highlighted', this.highlight);
        this.highlight.start = this.highlight.end = Day.unix(0);
        this.highlightStart = null;
        this.highlightEnd = null;
      }
      if (this.dragging) {
        this.$emit('moved', {
          calendarEvent: this.draggingEvent.calendarEvent,
          target: this.highlight
        });
        this.endDrag();
      }
    },
    endDrag: function() {
      this.dragging = false;
      this.draggingEvent = null;
      this.highlight.start = this.highlight.end = Day.unix(0);
    },
    mouseEnterEvent: function(mouseEvent) {
      this.$emit('mouse-enter-event', mouseEvent);
    },
    mouseLeaveEvent: function(mouseEvent) {
      this.$emit('mouse-leave-event', mouseEvent);
    },
    mouseDownEvent: function(mouseEvent) {
      this.$emit('mouse-down-event', mouseEvent);
      if (this.autoDragging && mouseEvent.left) {
        this.dragging = true;
        this.draggingEvent = mouseEvent;
      }
    },
    mouseUpEvent: function(mouseEvent) {
      this.$emit('mouse-up-event', mouseEvent);
    }
  }
}
</script>

<style scoped lang="scss">
.ds-calendar {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0px !important;
}
.ds-month-view {
  width: 100%;
  height: 100%;
}
.ds-week-view {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  outline: none;
  background-color: white;
}
.ds-month-view .ds-today {
  background-color: rgba(0,0,0,0.04);
}
.ds-year-view .ds-first-day {
  font-weight: bold;
}
.ds-year-view .ds-first-day-day {
  background-color: rgba(0,0,0,0.08);
}
</style>
