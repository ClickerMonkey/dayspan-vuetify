<template>
  <div class="ds-day" :class="classesDay"
    @mouseenter.stop="mouseEnterDay"
    @mouseleave.stop="mouseLeaveDay"
    @mousemove.stop="mouseMove"
    @mousedown.stop="mouseDown"
    @mouseup.stop="mouseUp"
    @dragstart.prevent>

    <div class="ds-hour" v-for="h in 24" @click.stop="addAt( h )"></div>

    <template v-for="(event, i) in day.events">

      <ds-event-time
        v-if="!event.fullDay"
        v-bind="{ scopedSlots: $scopedSlots }"
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

    <div v-if="day.currentDay" :style="nowLine"></div>

    <div v-if="highlighted" :style="highlightBounds"></div>

  </div>
</template>

<script>
import { Constants, Day, Calendar, DaySpan } from 'dayspan';

import dsEventTime from './EventTime';

export default {
  name: 'dsDayTimes',
  props: {
    day: {
      validator: function(x) {
        return x instanceof Day;
      }
    },
    calendar: {
      validator: function(x) {
        return x instanceof Calendar;
      }
    },
    highlight: {
      validator: function(x) {
        return !x || x instanceof DaySpan;
      }
    }
  },
  components: {
    dsEventTime
  },
  computed: {
    classesDay: function() {
      return {
        'ds-today': this.day.currentDay
      };
    },
    nowLine: function() {
      return this.$dayspan.getStyleNow();
    },
    highlighted: function() {
      return this.highlight && this.highlight.matchesDay( this.day );
    },
    highlightBounds: function() {
      return this.$dayspan.getStyleHighlight( this.highlight, this.day );
    }
  },
  methods: {
    edit: function(event) {
      this.$emit('edit', {
        day: this.day,
        event: event
      });
    },
    addAt: function(hour) {
      this.$emit('add-at', {
        day: this.day,
        hour: hour - 1
      });
    },
    mouseEnterEvent: function(mouseEvent) {
      this.$emit('mouse-enter-event', mouseEvent);
    },
    mouseLeaveEvent: function(mouseEvent) {
      this.$emit('mouse-leave-event', mouseEvent);
    },
    mouseDownEvent: function(mouseEvent) {
      this.$emit('mouse-down-event', mouseEvent);
    },
    mouseUpEvent: function(mouseEvent) {
      this.$emit('mouse-up-event', mouseEvent);
    },
    mouseEnterDay: function($event) {
      this.$emit('mouse-enter-day', this.day);
    },
    mouseLeaveDay: function($event) {
      this.$emit('mouse-leave-day', this.day);
    },
    mouseMove: function($event) {
      this.$emit('mouse-move', this.getMouseEvent($event, {
        time: this.getTimeAt($event, this.$dayspan.mouseMoveRound),
        timeDrag: this.getTimeAt($event, this.$dayspan.mouseAddRound, true)
      }));
    },
    mouseDown: function($event) {
      this.$emit('mouse-down', this.getMouseEvent($event, {
        time: this.getTimeAt($event, this.$dayspan.mouseAddRound)
      }));
    },
    mouseUp: function($event) {
      this.$emit('mouse-up', this.getMouseEvent($event, {
        time: this.getTimeAt($event, this.$dayspan.mouseAddRound, true)
      }));
    },
    getMouseEvent: function($event, additional) {
      var out = additional || {};
      out.day = this.day;
      out.left = $event.button === 0 && $event.buttons > 0;
      out.right = $event.button === 1 && $event.buttons > 0;
      out.$event = $event;
      out.$element = this.$el;
      return out;
    },
    getTimeAt: function($event, roundTo, roundUp) {
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
