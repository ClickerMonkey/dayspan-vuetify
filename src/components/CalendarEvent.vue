<template>

  <v-menu
    class="ds-calendar-event-menu"
    :content-class="contentClass"
    :disabled="!hasPopover"
    v-model="menu"
    v-bind="popoverProps">

    <div class="ds-calendar-event"
      slot="activator"
      :style="style"
      @click.stop="editCheck">

      <span v-if="showName">
        <slot name="eventTitle" v-bind="{calendarEvent, hasPrefix, getPrefix, details}">

          <span v-if="hasPrefix">
            {{ getPrefix }}
          </span>
          <strong class="ds-ev-title">{{ details.title }}</strong>
          <span class="ds-ev-description">{{ details.description }}</span>

        </slot>
      </span>

      <span v-else>
        <slot name="eventEmpty" v-bind="{calendarEvent, details}">&nbsp;</slot>
      </span>

    </div>

    <slot name="eventPopover" v-bind="{calendarEvent, calendar, edit, details, close}"></slot>

  </v-menu>

</template>

<script>
import { CalendarEvent, Calendar, Day } from 'dayspan';


export default {

  name: 'dsCalendarEvent',

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

    index:
    {
      type: Number,
      default() {
        return this.$dsDefaults().index;
      }
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
        this.$dayspan.getStylePlaceholderFull( this.details, this.calendarEvent, this.index, this.isPlaceholderWithDay ) :
        this.$dayspan.getStyleFull( this.details, this.calendarEvent, this.index );
    },

    contentClass()
    {
      return this.$dayspan.fullscreenPopovers ? 'ds-fullscreen' : '';
    },

    sameDayEvents()
    {
      return this.calendarEvent.event.schedule.iterateSpans(this.calendarEvent.day, true).list();
    },

    hasPrefix()
    {
      return !this.calendarEvent.fullDay && this.sameDayEvents.length > 0;
    },

    getPrefix()
    {
      return this.$dayspan.getPrefix( this.calendarEvent, this.sameDayEvents );
    },

    showName()
    {
      return this.calendarEvent.starting || (
        this.calendar &&
        !this.calendar.filled.contains( this.calendarEvent.time.start ) &&
        this.calendar.filled.start.sameDay( this.calendarEvent.day )
      );
    },

    hasPopover()
    {
      return !!this.$scopedSlots.eventPopover;
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

    handlesEvents($event)
    {
      var handles = !this.isPlaceholderWithDay;

      if (handles && $event)
      {
        $event.stopPropagation();
      }

      return handles;
    }
  }
}
</script>

<style scoped lang="scss">

.ds-calendar-event-menu {
  width: 100%;
  height: 18px;
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
  user-select: none;
  display: block;
  margin: 0;
  border-radius: 2px;
}

.ds-fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  max-height: auto !important;

  /deep/ > * {
    height: 100%;
  }
}

</style>
