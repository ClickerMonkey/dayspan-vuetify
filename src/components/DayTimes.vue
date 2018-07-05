<template>

  <div class="ds-day" :class="classesDay"
    @mouseenter.stop="mouseEnterDay"
    @mouseleave.stop="mouseLeaveDay"
    @mousemove.stop="mouseMove"
    @mousedown.stop="mouseDown"
    @mouseup.stop="mouseUp"
    @dragstart.prevent>

    <div class="ds-hour"
      v-for="h in 24"
      @click.stop="addAt( h )"></div>

    <template v-for="(event, i) in day.events">

      <ds-event-time
        v-if="!event.fullDay"
        v-bind="{$scopedSlots}"
        :calendar-event="event"
        :key="event.id"
        :calendar="calendar"
        @edit="edit"
        @mouse-enter-event="mouseEnterEvent"
        @mouse-leave-event="mouseLeaveEvent"
        @mouse-down-event="mouseDownEvent"
        @mouse-up-event="mouseUpEvent"
      ></ds-event-time>

    </template>

    <div v-if="day.currentDay"
      :style="nowLine"></div>

    <div v-if="highlighted"
      :style="highlightBounds"></div>

  </div>

</template>

<script>
import { Constants, CalendarDay, Calendar, DaySpan, Functions as fn } from 'dayspan';


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

    highlight:
    {
      type: DaySpan
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

    nowLine()
    {
      return this.$dayspan.getStyleNow();
    },

    highlighted()
    {
      return this.highlight && this.highlight.matchesDay( this.day );
    },

    highlightBounds()
    {
      return this.$dayspan.getStyleHighlight( this.highlight, this.day );
    }
  },

  methods:
  {
    edit(event)
    {
      this.$emit('edit', {
        day: this.day,
        event: event
      });
    },

    addAt(hour)
    {
      this.$emit('add-at', {
        day: this.day,
        hour: hour - 1
      });
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
    },

    mouseUpEvent(mouseEvent)
    {
      this.$emit('mouse-up-event', mouseEvent);
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
.ds-day {
  flex: 1;
  width: 0;
  border-right: #e0e0e0 1px solid;
  border-bottom: #e0e0e0 1px solid;
}
.ds-hour {
  height: 40px;
  border-bottom: #e0e0e0 1px solid;
}
</style>
