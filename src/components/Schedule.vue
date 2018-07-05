<template>

  <span>

    <v-layout row>
      <v-flex xs1 v-if="hasCancel">

        <!-- Cancel -->
        <slot name="scheduleCancel" v-bind="{cancel, labels}">

          <v-tooltip bottom>
            <v-btn slot="activator" icon class="ds-button" @click="cancel">
              <v-icon dark>clear</v-icon>
            </v-btn>
            <span v-html="labels.cancel"></span>
          </v-tooltip>

        </slot>

      </v-flex>
      <v-flex xs6 v-if="hasTitle">

        <!-- Title -->
        <slot name="scheduleTitle" v-bind="{schedule, calendarEvent, details}">

          <!-- class="ds-textfield ds-event-title" -->
          <v-text-field single-line hide-details solo flat
            :label="labels.title"
            v-model="details.title"
          ></v-text-field>

        </slot>

      </v-flex>
      <v-flex xs5 v-if="hasSave">

        <v-spacer></v-spacer>

        <!-- Save -->
        <slot name="scheduleSave" v-bind="{hasSave, save, labels}">

          <v-btn
            class="ds-button-tall ml-3" depressed
            color="primary"
            :disabled="!canSave"
            @click.stop="save">

            <span v-html="labels.save"></span>

          </v-btn>

        </slot>

        <!-- More Actions -->
        <slot name="scheduleActions" v-bind="{calendarEvent, schedule, calendar, actioned}">

          <ds-schedule-actions
            v-if="calendarEvent"
            :schedule="schedule"
            :calendar-event="calendarEvent"
            :calendar="calendar"
            @finish="actioned">
            <v-btn flat class="ds-button-tall ml-0">
              More actions...
            </v-btn>
          </ds-schedule-actions>

        </slot>

      </v-flex>
    </v-layout>
    <v-layout row class="mt-2" v-if="allowsRange">
      <v-flex xs1 v-if="hasCancel"></v-flex>
      <v-flex xs11>

        <!-- Span -->
        <slot name="scheduleSpan" v-bind="{day, schedule}">

          <ds-schedule-span
            :schedule="schedule"
            :day="day"
          ></ds-schedule-span>

        </slot>

      </v-flex>
    </v-layout>
    <v-layout row class="mt-3">
      <v-flex xs1 v-if="hasCancel"></v-flex>
      <v-flex xs7>

        <!-- Type -->
        <slot name="scheduleType" v-bind="{day, schedule, type}">

          <ds-schedule-type
            class="ds-dropdown"
            :day="day"
            :schedule="schedule"
            @change="type = $event"
          ></ds-schedule-type>

        </slot>

      </v-flex>
      <v-flex xs2 v-if="type === 'custom'">

        <!-- Custom -->
        <slot name="scheduleCustom" v-bind="{custom, schedule, calendar, calendarEvent, labels}">

          <v-btn depressed
            class="ds-button-tall"
            @click.stop="custom">
            <span v-html="labels.editCustom"></span>
          </v-btn>

        </slot>

      </v-flex>
    </v-layout>

    <v-layout row class="mt-2">
      <v-flex xs1 v-if="hasCancel"></v-flex>
      <v-flex xs15>

        <!-- Times -->
        <slot name="scheduleTimes" v-bind="{schedule}">

          <ds-schedule-times
            :schedule="schedule"
          ></ds-schedule-times>

        </slot>

      </v-flex>
    </v-layout>

    <slot name="scheduleFooter" v-bind="{schedule, calendarEvent, calendar, day}"></slot>

  </span>

</template>

<script>
import { Day, Calendar, CalendarEvent, Schedule, Functions as fn } from 'dayspan';


export default {

  name: 'dsSchedule',

  props:
  {
    schedule:
    {
      required: true,
      type: Schedule
    },

    calendarEvent:
    {
      type: CalendarEvent
    },

    calendar:
    {
      type: Calendar
    },

    day:
    {
      type: Day
    },

    labels:
    {
      type: Object,
      validate(x) {
        return this.$dsValidate(x, 'labels');
      },
      default() {
        return this.$dsDefaults().labels;
      }
    },

    allowsRange:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().allowsRange;
      }
    },

    hasTitle:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().hasTitle;
      }
    },

    hasCancel:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().hasCancel;
      }
    },

    hasSave:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().hasSave;
      }
    },

    canSave:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().canSave;
      }
    }
  },

  data: vm => ({
    details: null,
    type: ''
  }),

  watch:
  {
    calendarEvent:
    {
      handler: 'getEventDetails',
      immediate: true,
      deep: true
    },

    details:
    {
      handler: 'setEventDetails'
    }
  },

  computed:
  {
  },

  methods:
  {
    custom()
    {
      this.$emit('custom', this.getEvent('custom'));
    },

    save()
    {
      this.$emit('save', this.getEvent('save'));
    },

    actioned(ev)
    {
      this.$emit('actioned', ev);
    },

    cancel()
    {
      this.$emit('cancel', this.getEvent('cancel'));
    },

    getEventDetails(newEvent)
    {
      var calendarEvent = newEvent || this.calendarEvent;

      if (calendarEvent)
      {
        this.details = this.$dayspan.getEventDetails(
          calendarEvent.event.data,
          calendarEvent.event,
          calendarEvent
        );
      }
      else
      {
        this.details = this.$dayspan.getDefaultEventDetails();
      }
    },

    setEventDetails()
    {
      this.$emit('details', this.getEvent('details'));
    },

    getEvent(type, extra = {})
    {
      return fn.extend({

        type: type,
        day: this.day,
        schedule: this.schedule,
        calendar: this.calendar,
        calendarEvent: this.calendarEvent,
        details: this.details,
        handled: false,
        $vm: this,
        $element: this.$el

      }, extra);
    }

  }
}
</script>

<style lang="scss">

.ds-event-title {
  font-size: 18px;
  padding-right: 8px;
  padding-top: 4px;
}

</style>
