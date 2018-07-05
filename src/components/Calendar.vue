<template>
  <div class="ds-calendar">

    <div v-if="isYear" class="ds-month-view ds-year-view">

      <ds-weeks-view class="ds-expand"
        v-bind="{$scopedSlots}"
        :calendar="calendar"
        @add="add"
        @edit="edit"></ds-weeks-view>

    </div>

    <div v-if="isMonth" class="ds-month-view">

      <ds-weeks-view class="ds-expand"
        v-bind="{$scopedSlots}"
        :calendar="calendar"
        @add="add"
        @edit="edit"></ds-weeks-view>

    </div>

    <div v-if="isWeek || isDay" class="ds-week-view">

      <ds-days-view
        v-bind="{$scopedSlots}"
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

export default {

  name: 'dsCalendar',

  props:
  {
    calendar:
    {
      //required: true,
      type: Calendar
    },

    highlight:
    {
      type: DaySpan,
      default() {
        return this.$dsDefaults().highlight;
      }
    },

    autoHighlight:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().autoHighlight;
      }
    },

    autoDragging:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().autoDragging;
      }
    }
  },

  computed:
  {
    type()
    {
      return this.calendar ? this.calendar.type : null;
    },

    isDay()
    {
      return this.type === Units.DAY;
    },

    isWeek()
    {
      return this.type === Units.WEEK;
    },

    isMonth()
    {
      return this.type === Units.MONTH;
    },

    isYear()
    {
      return this.type === Units.YEAR;
    }
  },

  methods:
  {
    add(day)
    {
      this.$emit('add', day);
    },

    addAt(dayHour)
    {
      this.$emit('add-at', dayHour);
    },

    edit(eventDay)
    {
      this.$emit('edit', eventDay);
    },

    mouseEnterDay(day)
    {
      this.$emit('mouse-enter-day', day);
    },

    mouseLeaveDay(day)
    {
      this.$emit('mouse-leave-day', day);
    },

    mouseMove(mouseEvent)
    {
      this.$emit('mouse-move', mouseEvent);

      if (this.autoHighlight && mouseEvent.left && this.highlightStart)
      {
        this.highlightEnd = mouseEvent.timeDrag;
        this.highlight.start = this.highlightStart.min( this.highlightEnd );
        this.highlight.end = this.highlightStart.max( this.highlightEnd );
      }

      if (this.dragging)
      {
        var start = mouseEvent.time;
        start = start.relative(-this.draggingEvent.offset);
        start = this.$dayspan.roundTime( start, this.$dayspan.rounding.drag );

        this.highlight.start = start;
        this.highlight.end = start.relative(this.draggingEvent.calendarEvent.time.millis());

        if (!mouseEvent.left)
        {
          this.endDrag();
        }
      }
    },

    mouseDown(mouseEvent)
    {
      this.$emit('mouse-down', mouseEvent);

      if (this.autoHighlight && mouseEvent.left)
      {
        this.highlightStart = mouseEvent.time;
        this.highlight.start = this.highlightStart;
        this.highlight.end = this.highlightStart;
      }
    },

    mouseUp(mouseEvent)
    {
      this.$emit('mouse-up', mouseEvent);

      if (this.highlightEnd)
      {
        this.$emit('highlighted', this.highlight);

        this.highlight.start = this.highlight.end = Day.unix(0);
        this.highlightStart = null;
        this.highlightEnd = null;
      }

      if (this.dragging)
      {
        this.$emit('moved', {
          calendarEvent: this.draggingEvent.calendarEvent,
          target: this.highlight
        });

        this.endDrag();
      }
    },

    endDrag()
    {
      this.dragging = false;
      this.draggingEvent = null;
      this.highlight.start = this.highlight.end = Day.unix(0);
    },

    mouseEnterEvent(mouseEvent)
    {
      this.$emit('mouse-enter-event', mouseEvent);
    },

    mouseLeaveEvent(mouseEvent)
    {
      this.$emit('mouse-leave-event', mouseEvent);
    },

    mouseDownEvent(mouseEvent)
    {
      this.$emit('mouse-down-event', mouseEvent);

      if (this.autoDragging && mouseEvent.left)
      {
        this.dragging = true;
        this.draggingEvent = mouseEvent;
      }
    },

    mouseUpEvent(mouseEvent)
    {
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
