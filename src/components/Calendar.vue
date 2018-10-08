<template>
  <div class="ds-calendar">

    <div v-if="isYear" class="ds-month-view ds-year-view">

      <ds-weeks-view class="ds-expand"
        v-bind="{$scopedSlots}"
        v-on="$listeners"
        :calendar="calendar"
        :placeholder="placeholder"
        :placeholder-for-create="placeholderForCreate"
        @mouse-move-day="mouseMoveDay"
        @mouse-down-day="mouseDownDay"
        @mouse-up-day="mouseUp"
        @mouse-up-event="mouseUp"
        @mouse-down-event="mouseDownEvent"
        @clear-placeholder="clearPlaceholder"
      ></ds-weeks-view>

    </div>

    <div v-if="isMonth" class="ds-month-view">

      <ds-weeks-view class="ds-expand"
        v-bind="{$scopedSlots}"
        v-on="$listeners"
        :calendar="calendar"
        :placeholder="placeholder"
        :placeholder-for-create="placeholderForCreate"
        @mouse-move-day="mouseMoveDay"
        @mouse-down-day="mouseDownDay"
        @mouse-up-day="mouseUp"
        @mouse-up-event="mouseUp"
        @mouse-down-event="mouseDownEvent"
        @clear-placeholder="clearPlaceholder"
      ></ds-weeks-view>

    </div>

    <div v-if="isWeek || isDay" class="ds-week-view">

      <ds-days-view
        v-bind="{$scopedSlots}"
        v-on="$listeners"
        :calendar="calendar"
        :placeholder="placeholder"
        :placeholder-for-create="placeholderForCreate"
        @mouse-move="mouseMove"
        @mouse-down="mouseDown"
        @mouse-up="mouseUp"
        @mouse-down-event="mouseDownEvent"
        @mouse-move-day="mouseMoveDay"
        @mouse-down-day="mouseDownDay"
        @mouse-up-day="mouseUp"
        @mouse-up-event="mouseUp"
        @clear-placeholder="clearPlaceholder"
      ></ds-days-view>

    </div>

  </div>
</template>

<script>
import { Calendar, Schedule, CalendarEvent, Units, DaySpan, Day, Op, Functions as fn } from 'dayspan';


export default {

  name: 'dsCalendar',

  props:
  {
    calendar:
    {
      type: Calendar
    },

    handleAdd:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().handleAdd;
      }
    },

    handleMove:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().handleMove;
      }
    },

    readOnly:
    {
      type: Boolean,
      default: false
    }
  },

  data: vm => ({
    placeholder: null,
    placeholderForCreate: false,
    addStart: null
  }),

  watch:
  {
    '$dayspan.today': 'refreshCurrent'
  },

  computed:
  {
    type()
    {
      return this.calendar ? this.calendar.type : null;
    },

    size()
    {
      return this.calendar ? this.calendar.size : null;
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
    },

    adding()
    {
      return !!(this.addStart && this.placeholder);
    },

    canAdd()
    {
      return this.$dayspan.features.drag && this.handleAdd && !this.readOnly && !this.$dayspan.readOnly;
    },

    canMove()
    {
      return this.$dayspan.features.move && this.handleMove && !this.readOnly && !this.$dayspan.readOnly;
    }
  },

  methods:
  {
    refreshCurrent()
    {
      this.calendar.refreshCurrent( this.$dayspan.today );
    },

    mouseDown(mouseEvent)
    {
      if (this.canAdd && mouseEvent.left)
      {
        let time = mouseEvent.time;
        let ev = this.getEvent('adding', {
          mouseEvent: mouseEvent,
          placeholder: this.$dayspan.getPlaceholderEventForAdd( time )
        });

        this.$emit('adding', ev);

        if (!ev.handled && ev.placeholder)
        {
          this.addStart = time;
          this.placeholderForCreate = false;
          this.placeholder = ev.placeholder;
          this.placeholder.event.schedule = Schedule.forTime( time, time.asTime() );
          this.placeholder.fullDay = false;
        }
      }
    },

    mouseDownDay(mouseEvent)
    {
      if (this.canAdd && mouseEvent.left)
      {
        let day = mouseEvent.day;
        let ev = this.getEvent('adding', {
          mouseEvent: mouseEvent,
          placeholder: this.$dayspan.getPlaceholderEventForAdd( day )
        });

        this.$emit('adding', ev);

        if (!ev.handled && ev.placeholder)
        {
          this.addStart = day;
          this.placeholderForCreate = false;
          this.placeholder = ev.placeholder;
          this.placeholder.event.schedule = Schedule.forDay( day );
          this.placeholder.fullDay = true;
        }
      }
    },

    mouseUp(mouseEvent)
    {
      if (this.addEnd)
      {
        this.finishAdd( mouseEvent );
      }

      if (this.moving)
      {
        this.finishMove( mouseEvent );
      }

      this.readyToMove = false;
    },

    finishAdd(mouseEvent)
    {
      var ev = this.getEvent('added', {
        mouseEvent: mouseEvent,
        placeholder: this.placeholder,
        span: this.placeholder.time
      });

      this.$emit('added', ev);

      if (!ev.handled)
      {
        ev.clearPlaceholder();
      }

      this.endAdd();
    },

    finishMove(mouseEvent)
    {
      let target = this.placeholder.time;
      let source = this.movingEvent.calendarEvent.time;
      let sameTime = target.start.sameMinute( source.start );
      let sameDay = target.start.sameDay( source.start );
      let isDay = mouseEvent.type === 'mouse-up-day'

      if ((isDay && !sameDay) || (!isDay && !sameTime))
      {
        var ev = this.getEvent('moved', {
          mouseEvent: mouseEvent,
          movingEvent: this.movingEvent,
          calendarEvent: this.movingEvent.calendarEvent,
          target: this.placeholder.time
        });

        this.$emit('moved', ev);

        if (!ev.handled)
        {
          ev.clearPlaceholder();
        }
      }
      else
      {
        this.clearPlaceholder();
      }

      this.endMove();
    },

    mouseMoveDay(mouseEvent)
    {
      if (this.adding && mouseEvent.left)
      {
        this.addEnd = mouseEvent.day;

        var min = this.addStart.min( this.addEnd );
        var max = this.addStart.max( this.addEnd );

        this.placeholder.day = min.start();
        this.placeholder.time.start = min;
        this.placeholder.time.end = max.end();
        this.placeholder.event.schedule = Schedule.forDay(
          this.placeholder.start,
          this.placeholder.time.days(Op.UP)
        );

        this.updatePlaceholderRow( this.placeholder );
      }

      this.mouseMoveCheckReady();

      if (this.moving)
      {
        var day = mouseEvent.day;

        this.placeholder.day = day;
        this.placeholder.time.start = day;
        this.placeholder.time.end = day.next( this.placeholder.schedule.durationInDays ).end();

        this.updatePlaceholderRow( this.placeholder );
      }

      this.mouseMoveCheckEnd( mouseEvent );
    },

    mouseMove(mouseEvent)
    {
      if (this.adding && mouseEvent.left)
      {
        this.addEnd = mouseEvent.timeDrag;

        var min = this.addStart.min( this.addEnd );
        var max = this.addStart.max( this.addEnd );

        this.placeholder.day = min.start();
        this.placeholder.time.start = min;
        this.placeholder.time.end = max;
        this.placeholder.event.schedule = Schedule.forSpan( this.placeholder.time );
      }

      this.mouseMoveCheckReady();

      if (this.moving)
      {
        var time = mouseEvent.time;
        time = time.relative(-this.movingEvent.offset);
        time = this.$dayspan.roundTime( time, this.$dayspan.rounding.drag );

        this.placeholder.day = time.start();
        this.placeholder.time.start = time;
        this.placeholder.time.end = time.relative( this.movingDuration );
      }

      this.mouseMoveCheckEnd( mouseEvent );
    },

    mouseMoveCheckEnd(mouseEvent)
    {
      if (this.moving && !mouseEvent.left && !this.placeholderForCreate)
      {
        this.endMove();
        this.clearPlaceholder();
      }

      if (this.adding && !mouseEvent.left && !this.placeholderForCreate)
      {
        this.endAdd();
        this.clearPlaceholder();
      }
    },

    mouseDownEvent(mouseEvent)
    {
      if (this.canMove && mouseEvent.left)
      {
        this.readyToMove = true;
        this.movingEvent = mouseEvent;
      }
    },

    mouseMoveCheckReady()
    {
      if (this.readyToMove)
      {
        var moveEvent = this.movingEvent;
        var calendarEvent = moveEvent.calendarEvent;

        var ev = this.getEvent('moving', {
          calendarEvent: calendarEvent,
          moveEvent: moveEvent,
          placeholder: this.$dayspan.getPlaceholderEventForMove( calendarEvent )
        });

        this.$emit('moving', ev);

        if (!ev.handled && ev.placeholder)
        {
          this.moving = true;
          this.movingDuration = calendarEvent.time.millis();
          this.placeholderForCreate = false;
          this.placeholder = ev.placeholder;
        }

        this.readyToMove = false;
      }
    },

    endMove()
    {
      this.moving = false;
      this.movingEvent = null;
    },

    endAdd()
    {
      this.addStart = null;
      this.addEnd = null;
    },

    updatePlaceholderRow( placeholder )
    {
      let row = 0;

      this.calendar.iterateDays().iterate((day) =>
      {
        if (placeholder.time.matchesDay( day ))
        {
          row = day.iterateEvents().reduce(
            row,
            (calendarEvent, maxRow) => Math.max( calendarEvent.row + 1, maxRow ),
            (calendarEvent) => calendarEvent.event !== placeholder.event
          );
        }
      });

      placeholder.row = row;
    },

    addPlaceholder(day, fullDay, forUpdate)
    {
      let placeholder = this.$dayspan.getPlaceholderEventForAdd( day );
      let time = placeholder.time;

      if (fullDay)
      {
        time.end = time.end.end();

        placeholder.event.schedule = Schedule.forDay( time.start );
        placeholder.fullDay = true;
      }
      else
      {
        time.end = time.end.nextHour();

        placeholder.event.schedule = Schedule.forSpan( time );
        placeholder.fullDay = false;
      }

      this.updatePlaceholderRow( placeholder );

      this.placeholder = placeholder;
      this.placeholderForCreate = !forUpdate;
    },

    clearPlaceholder()
    {
      this.placeholder = null;
      this.placeholderForCreate = false;
    },

    getEvent(type, extra = {})
    {
      return fn.extend({

        type: type,
        calendar: this.calendar,
        clearPlaceholder: this.clearPlaceholder,
        handled: false,
        $vm: this,
        $element: this.$el

      }, extra);
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

  .ds-today {
    background-color: rgba(0,0,0,0.04);
  }
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

.ds-year-view {

  .ds-first-day {
    font-weight: bold;
  }
  .ds-first-day-day {
    background-color: rgba(0,0,0,0.08);
  }
}

</style>
