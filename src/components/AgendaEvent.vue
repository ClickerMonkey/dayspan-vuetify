<template>

  <tr class="ds-agenda-event"
    :class="classes">

    <td :rowspan="siblings" v-if="first" class="ds-agenda-lines">

      <slot name="agendaDayDate" v-bind="slotData">

        <div class="ds-agenda-line-first">
          {{ firstLine }}
        </div>

        <div class="ds-agenda-line-second"
          @click.stop="viewDay">
          {{ secondLine }}
        </div>

      </slot>

    </td>

    <td class="ds-agenda-when" @click.stop>

      <slot name="agendaEventWhen" v-bind="slotData">

        {{ when }}

      </slot>

    </td>

    <td class="ds-agenda-details" @click.stop="editCheck">

      <v-menu
        class="ds-calendar-event-menu"
        :content-class="contentClass"
        :disabled="!hasPopover"
        v-model="menu"
        v-bind="popoverProps">

        <div slot="activator" class="ds-agenda-activator">

          <slot name="agendaEventDetails" v-bind="slotData">

            <v-icon class="ds-details-icon"
              v-if="details.icon" size="16">
              {{ details.icon }}
            </v-icon>

            <strong v-html="details.title"></strong>

            <span class="ds-details-description" v-html="details.description"></span>

          </slot>

        </div>

        <slot name="eventPopover" v-bind="{readOnly, calendarEvent, calendar, edit, details, close}"></slot>

      </v-menu>

    </td>

  </tr>

</template>

<script>
import { CalendarEvent, Calendar, Day, Functions as fn } from 'dayspan';


export default {

  name: 'dsAgendaEvent',

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

    readOnly:
    {
      type: Boolean,
      default: false
    },

    first:
    {
      type: Boolean,
      default: false
    },

    siblings:
    {
      type: Number,
      default: 1
    },

    formats:
    {
      validate(x) {
        return this.$dsValidate( x, 'formats' );
      },
      default() {
        return this.$dsDefaults().formats;
      }
    },

    labels:
    {
      validate(x) {
        return this.$dsValidate( x, 'labels' );
      },
      default() {
        return this.$dsDefaults().labels;
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
    slotData()
    {
      return {
        readOnly: this.readOnly,
        calendarEvent: this.calendarEvent,
        calendar: this.calendar,
        details: this.details,
        first: this.first,
        siblings: this.siblings,
        firstLine: this.firstLine,
        secondLine: this.secondLine,
        when: this.when,
        viewDay: this.viewDay,
        edit: this.edit,
        editCheck: this.editCheck
      };
    },

    contentClass()
    {
      return this.$dayspan.fullscreenPopovers ? 'ds-fullscreen' : '';
    },

    hasPopover()
    {
      return !!this.$scopedSlots.eventPopover;
    },

    classes()
    {
      return {
        'ds-first-event': this.first
      };
    },

    details()
    {
      return this.calendarEvent.event.data;
    },

    firstLine()
    {
      return this.calendarEvent.day.format( this.formats.firstLine );
    },

    secondLine()
    {
      return this.calendarEvent.day.format( this.formats.secondLine );
    },

    when()
    {
      return this.$dayspan.getEventAgendaWhen( this.calendarEvent, this.labels, this.formats );
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
      this.$emit('edit', this.calendarEvent);
    },

    editCheck($event)
    {
      if (!this.hasPopover)
      {
        this.edit();
      }
      else
      {
        this.menu = !this.menu;
      }
    },

    viewDay()
    {
      this.$emit('view-day', this.calendarEvent.day);
    },

    getEvent(type, $event, extra = {})
    {
      return fn.extend({

        type: type,
        calendarEvent: this.calendarEvent,
        calendar: this.calendar,
        details: this.details,
        left: $event.button === 0,
        right: $event.button === 1,
        handled: false,
        $event: $event,
        $vm: this,
        $element: this.$el

      }, extra);
    }
  }
}
</script>

<style scoped lang="scss">

.ds-calendar-event-menu {
  width: 100%;
}

.ds-agenda-activator {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ds-first-event td {
  border-top: 1px solid #e0e0e0;
}

.ds-agenda-lines {
  vertical-align: top;
  padding: 4px 4px 4px 1em;

  .ds-agenda-line-first {
    font-size: 12px;
  }

  .ds-agenda-line-second {
    font-size: 14px;
    cursor: pointer;
    margin-top: -4px;

    &:hover {
      text-decoration: underline;
    }
  }
}

.ds-agenda-event {

  .ds-agenda-details strong {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.ds-agenda-details {
  padding: 4px;
  cursor: pointer;
}

</style>
