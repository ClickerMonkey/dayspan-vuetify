<template>

  <v-menu
    class="ds-event"
    :close-on-content-click="false"
    :nudge-width="200"
    :disabled="!hasPopover"
    :style="style"
    offset-overflow
    offset-x
    max-width="500"
    v-model="menu"
    v-bind="popoverProps">

    <div
      slot="activator"

      @click.stop="editCheck"
      @mouseenter.stop="mouseEnterEvent"
      @mouseleave.stop="mouseLeaveEvent"
      @mousedown.stop="mouseDownEvent"
      @mouseup.stop="mouseUpEvent">

      <span v-if="showName">
        <slot name="eventTimeTitle" v-bind="{calendarEvent, details}">

          <strong class="ds-ev-title">{{ details.title }}</strong>
          <span class="ds-ev-description">{{ details.description }}</span>

        </slot>
      </span>

      <span v-else>
        <slot name="eventTimeEmpty" v-bind="{calendarEvent, details}"></slot>
      </span>

    </div>

    <slot name="eventPopover" v-bind="{calendarEvent, calendar, edit, details, close}"></slot>

  </v-menu>

</template>

<script>
import { Constants, CalendarEvent, Calendar, Functions as fn } from 'dayspan';

export default {

  name: 'dsEventTime',

  props:
  {
    calendarEvent:
    {
      required: true,
      type: CalendarEvent
    },

    calendar:
    {
      required: true,
      type: Calendar
    },

    popoverProps:
    {
      validate(x) {
        return this.$dsValidate(x, 'popoverProps');
      },
      default() {
        return this.$dsDefaults().popoverProps;
      }
    }
  },

  computed:
  {
    style()
    {
      return this.$dayspan.getStyleTimed( this.details, this.calendarEvent );
    },

    showName()
    {
      return this.calendarEvent.starting || (
        this.calendar &&
        !this.calendar.span.contains( this.calendarEvent.time.start )
      );
    },

    hasPopover()
    {
      return !!this.$scopedSlots.eventPopover;
    }
  },

  data: vm => ({
    menu: false,
    details: vm.$dayspan.getEventDetails(
      vm.calendarEvent.event.data,
      vm.calendarEvent.event,
      vm.calendarEvent
    )
  }),

  methods:
  {
    edit()
    {
      this.$emit('edit', this.calendarEvent);
    },

    close()
    {
      this.menu = false;
    },

    editCheck()
    {
      if (!this.hasPopover)
      {
        this.edit()
      }
      else
      {
        this.menu = !this.menu;
      }
    },

    mouseEnterEvent($event)
    {
      this.$emit('mouse-enter-event', this.getEvent('mouse-enter-event', $event));
    },

    mouseLeaveEvent($event)
    {
      this.$emit('mouse-leave-event', this.getEvent('mouse-leave-event', $event));
    },

    mouseDownEvent($event)
    {
      this.$emit('mouse-down-event', this.getEvent('mouse-down-event', $event));
    },

    mouseUpEvent($event)
    {
      this.$emit('mouse-up-event', this.getEvent('mouse-up-event', $event));
    },

    getEvent(type, $event, extra = {})
    {
      return fn.extend({

        type: type,
        calendarEvent: this.calendarEvent,
        calendar: this.calendar,
        details: this.details,
        offset: this.getRelativeTimeAt( $event ),
        left: $event.button === 0,
        right: $event.button === 1,
        handled: false,
        $event: $event,
        $vm: this,
        $element: this.$el

      }, extra);
    },

    getRelativeTimeAt($event)
    {
      var bounds = this.$el.getBoundingClientRect();
      var y = ($event.clientY - bounds.y) / this.$dayspan.dayHeight;
      var millis = y * Constants.MILLIS_IN_DAY;

      return millis;
    }
  }
}
</script>

<style scoped lang="scss">

.ds-event-menu {
  width: 100%;
}

.ds-event {
  width: 100%;
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
