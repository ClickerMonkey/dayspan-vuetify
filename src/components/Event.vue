<template>

  <v-menu
    class="ds-event-menu"
    :close-on-content-click="false"
    :nudge-width="200"
    :disabled="!hasPopover"
    offset-overflow
    offset-x
    max-width="500"
    v-model="menu"
    v-bind="popoverProps">

    <div class="ds-event"
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
import { CalendarEvent, Calendar } from 'dayspan';


export default {

  name: 'dsEvent',

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
    }
  },

  computed:
  {
    style()
    {
      return this.$dayspan.getStyleFull( this.details, this.calendarEvent, this.index );
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
  position: relative;
  user-select: none;
  display: block;
}

</style>
