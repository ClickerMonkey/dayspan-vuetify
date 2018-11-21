<template>

  <v-menu
    class="ds-calendar-event"
    :content-class="contentClass"
    :disabled="!hasPopover"
    :style="style"
    v-model="menu"
    v-bind="popoverProps">

    <div
      class="ds-calendar-event-span"
      slot="activator"
      @click="editCheck"
      @mouseenter="mouseEnterEvent"
      @mouseleave="mouseLeaveEvent"
      @mousedown="mouseDownEvent"
      @mouseup="mouseUpEvent">

      <span v-if="showName">
        <slot name="eventTimeTitle" v-bind="{calendarEvent, details}">

          <v-icon class="ds-ev-icon"
            v-if="hasIcon"
            size="14"
            :style="{color: details.forecolor}">
            {{ details.icon }}
          </v-icon>
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
import { Day, Constants, CalendarEvent, Calendar, Functions as fn } from 'dayspan';

export default {

  name: 'dsCalendarEventTime',

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
    },

    isPlaceholderWithDay:
    {
      type: Day
    }
  },

  computed:
  {
    style()
    {
      return this.isPlaceholderWithDay ?
        this.$dayspan.getStylePlaceholderTimed( this.details, this.calendarEvent, this.isPlaceholderWithDay ) :
        this.$dayspan.getStyleTimed( this.details, this.calendarEvent );
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
    },

    hasIcon()
    {
      return !!(this.$dayspan.supports.icon && this.details.icon);
    },

    contentClass()
    {
      return this.$dayspan.fullscreenPopovers ? 'ds-fullscreen' : '';
    },

    details()
    {
      return this.calendarEvent.event.data;
    }
  },

  data: vm => ({
    menu: false
  }),

  methods:
  {
    close()
    {
      this.menu = false;
    },

    edit()
    {
      if (this.handlesEvents())
      {
        this.$emit('edit', this.calendarEvent);
      }
    },

    editCheck($event)
    {
      if (this.handlesEvents($event))
      {
        if (!this.hasPopover)
        {
          this.edit()
        }
        else
        {
          this.menu = !this.menu;
        }
      }
    },

    mouseEnterEvent($event)
    {
      if (this.handlesEvents($event))
      {
        this.$emit('mouse-enter-event', this.getEvent('mouse-enter-event', $event));
      }
    },

    mouseLeaveEvent($event)
    {
      if (this.handlesEvents($event))
      {
        this.$emit('mouse-leave-event', this.getEvent('mouse-leave-event', $event));
      }
    },

    mouseDownEvent($event)
    {
      if (this.handlesEvents($event))
      {
        this.$emit('mouse-down-event', this.getEvent('mouse-down-event', $event));
      }
    },

    mouseUpEvent($event)
    {
      if (this.handlesEvents($event))
      {
        this.$emit('mouse-up-event', this.getEvent('mouse-up-event', $event));
      }
    },

    handlesEvents($event)
    {
      var handles = !this.isPlaceholderWithDay;

      if (handles && $event)
      {
        $event.stopPropagation();
      }

      return handles;
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

.ds-calendar-event-menu {
  width: 100%;
}

.ds-calendar-event {
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
  border-radius: 2px;
  pointer-events: none;

  .v-menu__activator {
    align-items: end;
  }

  .ds-calendar-event-span {
    width: 100%;
    height: 100%;
    pointer-events: all;
  }
}

</style>
