<template>
  <div class="ds-event"
    :style="style"
    @click.stop="edit"
    @mouseenter.stop="mouseEnterEvent"
    @mouseleave.stop="mouseLeaveEvent"
    @mousedown.stop="mouseDownEvent"
    @mouseup.stop="mouseUpEvent">

    <span v-if="showName">
      <slot name="titleTimed" :calendarEvent="calendarEvent">
        <strong>{{ eventTitle }}</strong>
      </slot>
    </span>

    <span v-else>
      <slot name="emptyTimed" :calendarEvent="calendarEvent"></slot>
    </span>

  </div>
</template>

<script>
import { Constants, CalendarEvent, Calendar } from 'dayspan';

export default {
  name: 'dsEventTime',
  props: {
    calendarEvent: {
      validator: function(x) {
        return x instanceof CalendarEvent;
      }
    },
    calendar: {
      validator: function(x) {
        return x instanceof Calendar;
      }
    }
  },
  computed: {
    eventTitle: function() {
      return this.$dayspan.getEventTitle( this.calendarEvent.event, this.calendarEvent );
    },
    style: function() {
      return this.$dayspan.getStyleTimed( this.calendarEvent );
    },
    showName: function() {
      return this.calendarEvent.starting || (
        this.calendar &&
        !this.calendar.span.contains( this.calendarEvent.time.start )
      );
    }
  },
  methods: {
    edit: function() {
      this.$emit('edit', this.calendarEvent);
    },
    mouseEnterEvent: function($event) {
      this.$emit('mouse-enter-event', this.getMouseEvent($event));
    },
    mouseLeaveEvent: function($event) {
      this.$emit('mouse-leave-event', this.getMouseEvent($event));
    },
    mouseDownEvent: function($event) {
      this.$emit('mouse-down-event', this.getMouseEvent($event));
    },
    mouseUpEvent: function($event) {
      this.$emit('mouse-up-event', this.getMouseEvent($event));
    },
    getMouseEvent: function($event, additional) {
      var out = additional || {};
      out.calendarEvent = this.calendarEvent;
      out.calendar = this.calendar;
      out.offset = this.getRelativeTimeAt($event);
      out.left = $event.button === 0;
      out.right = $event.button === 1;
      out.$event = $event;
      out.$element = this.$el;
      return out;
    },
    getRelativeTimeAt: function($event) {
      var bounds = this.$el.getBoundingClientRect();
      var y = ($event.clientY - bounds.y) / this.$dayspan.dayHeight;
      var millis = y * Constants.MILLIS_IN_DAY;

      return millis;
    }
  }
}
</script>

<style scoped lang="scss">
.ds-event {
  margin: 1px;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 0.5em;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  right: 0px;
  user-select: none;
}
</style>
