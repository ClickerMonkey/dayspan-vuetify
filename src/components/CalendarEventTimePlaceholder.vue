<template>

  <v-menu
    class="ds-calendar-event-placeholder"
    :content-class="contentClass"
    :disabled="!hasPopover"
    v-model="menu"
    v-bind="popoverProps">

    <ds-calendar-event-time
      slot="activator"
      v-bind="{$scopedSlots}"
      :is-placeholder-with-day="day"
      :calendar-event="placeholder"
      :calendar="calendar"
    ></ds-calendar-event-time>

    <slot name="eventCreatePopover" v-bind="{placeholder, calendar, day, close}"></slot>

  </v-menu>

</template>

<script>
import { CalendarEvent, Calendar, Day } from 'dayspan';


export default {

  name: 'dsCalendarEventTimePlaceholder',

  props:
  {
    placeholder:
    {
      required: true,
      type: CalendarEvent
    },

    placeholderForCreate:
    {
      type: Boolean,
      default: false
    },

    calendar:
    {
      required: true,
      type: Calendar
    },

    day:
    {
      type: Day
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
    hasPopover()
    {
      return !!this.$scopedSlots.eventCreatePopover;
    },

    contentClass()
    {
      return this.$dayspan.fullscreenPopovers ? 'ds-fullscreen' : '';
    },

    isStart()
    {
      return this.placeholder.day.sameDay( this.day );
    },

    autoOpen()
    {
      return this.hasPopover && this.placeholderForCreate && this.isStart;
    }
  },

  data: vm => ({
    menu: false
  }),

  watch:
  {
    menu: 'triggerClearPlaceholder',
    placeholderForCreate: 'openPopover'
  },

  mounted()
  {
    if (this.autoOpen)
    {
      this.menu = true;
    }
  },

  methods:
  {
    close()
    {
      this.menu = false;
    },

    openPopover(open)
    {
      if (this.isStart)
      {
        this.menu = open;
      }
    },

    triggerClearPlaceholder(open)
    {
      if (!open)
      {
        this.$emit('clear-placeholder');
      }
    }
  }
}
</script>

<style scoped lang="scss">

.ds-calendar-event-placeholder {
  position: absolute;
  right: 0px;
  left: 0px;
  top: 0px;
  padding: 0;
  margin: 0;
}

</style>
