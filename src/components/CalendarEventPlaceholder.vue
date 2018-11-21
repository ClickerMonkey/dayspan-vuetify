<template>

  <v-menu
    class="ds-calendar-event-menu"
    :content-class="contentClass"
    :disabled="!hasPopover"
    v-model="menu"
    v-bind="popoverProps">

    <ds-calendar-event
      slot="activator"
      v-bind="{$scopedSlots}"
      :is-placeholder-with-day="day"
      :calendar-event="placeholder"
      :calendar="calendar"
      :index="index"
    ></ds-calendar-event>

    <slot name="eventCreatePopover" v-bind="{placeholder, calendar, day, index, close}"></slot>

  </v-menu>

</template>

<script>
import { CalendarEvent, Calendar, Day } from 'dayspan';


export default {

  name: 'dsCalendarEventPlaceholder',

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

    index:
    {
      type: Number,
      default: 0
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

.ds-calendar-event-menu {
  width: 100%;
  height: 18px;

  .ds-calendar-event {
    height: 100%;
  }
}

</style>
