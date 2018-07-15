<template>
  <div class="ds-calendar">

    <div v-if="isYear" class="ds-month-view ds-year-view">

      <ds-weeks-view class="ds-expand"
        v-bind="{$scopedSlots}"
        v-on="$listeners"
        :calendar="calendar"
        :placeholder="placeholder"
        :placeholder-for-create="placeholderForCreate"
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
        @clear-placeholder="clearPlaceholder"
      ></ds-weeks-view>

    </div>

    <div v-if="isWeek || isDaySpan" class="ds-week-view">

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
        @clear-placeholder="clearPlaceholder"
      ></ds-days-view>

    </div>

    <div v-if="isAgenda">

      Agenda

    </div>

  </div>
</template>

<script>
import { Calendar, Schedule, CalendarEvent, Units, DaySpan, Day, Functions as fn } from 'dayspan';


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
    }
  },

  data: vm => ({
    placeholder: null,
    placeholderForCreate: false
  }),

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

    isDaySpan()
    {
      return this.type === Units.DAY && this.size > 1;
    },

    isAgenda()
    {
      return this.type === Units.DAY && this.size === 1;
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
    mouseDown(mouseEvent)
    {
      if (this.handleAdd && mouseEvent.left)
      {
        var time = mouseEvent.time;

        var ev = this.getEvent('adding', {
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

    mouseDownEvent(mouseEvent)
    {
      if (this.handleMove && mouseEvent.left)
      {
        this.readyToMove = true;
        this.movingEvent = mouseEvent;
      }
    },

    mouseUp(mouseEvent)
    {
      if (this.addEnd)
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
      }

      if (this.moving)
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

        this.endMove();
      }

      this.readyToMove = false;
    },

    mouseMove(mouseEvent)
    {
      if (this.handleAdd && mouseEvent.left && this.addStart)
      {
        this.addEnd = mouseEvent.timeDrag;

        var min = this.addStart.min( this.addEnd );
        var max = this.addStart.max( this.addEnd );

        this.placeholder.time.start = min;
        this.placeholder.time.end = max;
        this.placeholder.day = min.start();
        this.placeholder.event.schedule.times = [ min.asTime() ];
      }

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

      if (this.moving)
      {
        var time = mouseEvent.time;
        time = time.relative(-this.movingEvent.offset);
        time = this.$dayspan.roundTime( time, this.$dayspan.rounding.drag );

        this.placeholder.day = time.start();
        this.placeholder.time.start = time;
        this.placeholder.time.end = time.relative( this.movingDuration );

        if (!mouseEvent.left)
        {
          this.endMove();
          this.clearPlaceholder();
        }
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

    addPlaceholder(day, fullDay, forUpdate)
    {
      let placeholder = this.$dayspan.getPlaceholderEventForAdd( day );
      let time = placeholder.time;

      if (fullDay)
      {
        time.end = time.end.end();

        placeholder.event.schedule = Schedule.forDay( time.start );
        placeholder.fullDay = true;

        let calendarDay = this.calendar.getDay( day );

        if (calendarDay)
        {
          placeholder.row = calendarDay.iterateEvents().reduce( 0, (e, x) => Math.max( x, e.row + 1 ) );
        }
      }
      else
      {
        time.end = time.end.nextHour();

        placeholder.event.schedule = Schedule.forSpan( time );
        placeholder.fullDay = false;
      }

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
