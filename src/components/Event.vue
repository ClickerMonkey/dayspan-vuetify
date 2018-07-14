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
      <v-flex xs6 v-if="showTitle">

        <!-- Title -->
        <slot name="scheduleTitle" v-bind="{copy, schedule, calendarEvent, details}">

          <!-- class="ds-textfield ds-calendar-event-title" -->
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
            v-bind="{$scopedSlots}"
            v-on="$listeners"
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

    <!-- Schedule -->
    <v-layout row>
      <v-flex xs1 v-if="hasCancel"></v-flex>
      <v-flex xs11>
        <ds-schedule
          :schedule="copy"
          :day="day"
        ></ds-schedule>
      </v-flex>
    </v-layout>

    <!-- Tabs -->
    <v-layout row v-if="hasTabs">
      <v-flex xs12 class="mt-2">
        <v-tabs class="text--primary" v-model="tab">

          <v-tab href="#details" v-if="hasDetails">
            {{ labels.tabs.details }}
          </v-tab>

          <v-tab href="#forecast" v-if="showForecast">
            {{ labels.tabs.forecast }}
          </v-tab>

          <v-tab href="#exclusions" v-if="showExclusions">
            {{ labels.tabs.removed }}
          </v-tab>

          <v-tab href="#inclusions" v-if="showInclusions">
            {{ labels.tabs.added }}
          </v-tab>

          <v-tab href="#cancelled" v-if="showCancels">
            {{ labels.tabs.cancelled }}
          </v-tab>

          <!-- Details -->
          <v-tab-item id="details" v-if="hasDetails">
            <v-card flat>
              <v-card-text>

                <!-- Location -->
                <v-text-field v-if="$dayspan.supports.location"
                  single-line hide-details solo flat
                  prepend-icon="location_on"
                  :label="labels.location"
                  v-model="details.location"
                ></v-text-field>

                <!-- Description -->
                <v-textarea v-if="$dayspan.supports.description"
                  hide-details single-line solo flat
                  prepend-icon="subject"
                  :label="labels.description"
                  v-model="details.description"
                ></v-textarea>

                <!-- Color -->
                <v-select v-if="$dayspan.supports.color"
                  single-line hide-details solo flat
                  prepend-icon="invert_colors"
                  :items="$dayspan.colors"
                  :color="details.color"
                  v-model="details.color">
                  <template slot="item" slot-scope="{ item }">
                    <v-list-tile-content>
                      <div class="ds-color-option" :style="{backgroundColor: item.value}" v-text="item.text"></div>
                    </v-list-tile-content>
                  </template>
                </v-select>

                <!-- Calendar -->
                <v-text-field v-if="$dayspan.supports.calendar"
                  single-line hide-details solo flat readonly
                  prepend-icon="event"
                  :label="labels.calendar"
                  v-model="details.calendar"
                ></v-text-field>

              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- Forecast -->
          <v-tab-item id="forecast" lazy v-if="showForecast">
            <v-card flat>
              <v-card-text>
                <ds-schedule-forecast
                  :schedule="copy"
                  :day="day"
                ></ds-schedule-forecast>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- Exclusions -->
          <v-tab-item id="exclusions" lazy v-if="showExclusions">
            <v-card flat>
              <v-card-text>
                <ds-schedule-modifier
                  :description="labels.exclusions"
                  :modifier="copy.exclude"
                ></ds-schedule-modifier>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- Inclusions -->
          <v-tab-item id="inclusions" lazy v-if="showInclusions">
            <v-card flat>
              <v-card-text>
                <ds-schedule-modifier
                  :description="labels.inclusions"
                  :modifier="copy.include"
                ></ds-schedule-modifier>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- Cancelled -->
          <v-tab-item id="cancelled" lazy v-if="showCancels">
            <v-card flat>
              <v-card-text>
                <ds-schedule-modifier
                  :description="labels.cancelled"
                  :modifier="copy.cancel"
                ></ds-schedule-modifier>
              </v-card-text>
            </v-card>
          </v-tab-item>

        </v-tabs>
      </v-flex>
    </v-layout>
  </span>

</template>

<script>
import { Day, Calendar, CalendarEvent, Schedule, Functions as fn } from 'dayspan';


export default {

  name: 'dsEvent',

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
      validate(x) {
        return this.$dsValidate(x, 'labels');
      },
      default() {
        return this.$dsDefaults().labels;
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

    hasTabs:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().hasTabs;
      }
    },

    hasDetails:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().hasDetails;
      }
    },

    hasForecast:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().hasForecast;
      }
    },

    hasExclusions:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().hasExclusions;
      }
    },

    hasInclusions:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().hasInclusions;
      }
    },

    hasCancelled:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().hasCancelled;
      }
    }
  },

  data: vm => ({
    tab: 'details',
    details: {},
    copy: new Schedule(),
    type: ''
  }),

  watch:
  {
    calendarEvent:
    {
      handler: 'updateDetails',
      immediate: true
    },

    schedule:
    {
      handler: 'updateCopy',
      immediate: true
    }
  },

  computed:
  {
    canSave()
    {
      return this.details && this.$dayspan.isValidEvent( this.details, this.copy, this.calenderEvent );
    },

    repeats()
    {
      return !this.copy.isSingleEvent();
    },

    showTitle()
    {
      return this.$dayspan.supports.title &&
        this.hasTitle;
    },

    showCancels()
    {
      return this.$dayspan.features.cancel &&
        this.repeats &&
        this.hasCancelled &&
        !this.copy.cancel.isEmpty();
    },

    showForecast()
    {
      return this.$dayspan.features.forecast &&
        this.repeats &&
        this.hasForecast;
    },

    showExclusions()
    {
      return this.$dayspan.features.exclude &&
        this.repeats &&
        this.hasExclusions &&
        !this.copy.exclude.isEmpty();
    },

    showInclusions()
    {
      return this.$dayspan.features.include &&
        this.repeats &&
        this.hasInclusions &&
        !this.copy.include.isEmpty();
    }
  },

  methods:
  {
    save()
    {
      var ev = this.getEvent('save')

      this.$emit('save', ev);

      if (!ev.handled)
      {
        if (ev.target && ev.schedule)
        {
          ev.target.set( ev.schedule.toInput() );
        }

        if (ev.calendarEvent)
        {
          this.$dayspan.setEventDetails(
            ev.details,
            ev.calendarEvent.event.data,
            ev.calendarEvent.event,
            ev.calendarEvent
          );

          this.$emit('update', ev);
        }
        else if (ev.create)
        {
          ev.created = this.$dayspan.createEvent( ev.details, ev.schedule );

          if (ev.calendar)
          {
            ev.calendar.addEvent( ev.created );
            ev.added = true;
          }

          this.$emit('create', ev);
        }

        if (ev.calendar && ev.refresh)
        {
          ev.calendar.refreshEvents();
        }

        ev.handled = true;
      }

      this.$emit('saved', ev);
    },

    actioned(ev)
    {
      this.$emit('actioned', ev);
    },

    cancel()
    {
      this.$emit('cancel', this.getEvent('cancel'));
    },

    updateCopy(schedule)
    {
      this.copy = schedule.clone();
      this.updateDetails();
    },

    updateDetails(newEvent)
    {
      var calendarEvent = newEvent || this.calendarEvent;

      this.tab = 'details';

      if (calendarEvent)
      {
        this.details = this.$dayspan.getEventDetails(
          calendarEvent.event.data,
          calendarEvent.event,
          calendarEvent
        );

        this.$emit('details', this.getEvent('details'));
      }
      else
      {
        this.details = this.$dayspan.getDefaultEventDetails();
      }
    },

    getEvent(type, extra = {})
    {
      return fn.extend({

        type: type,
        day: this.day,
        schedule: this.copy,
        target: this.schedule,
        calendar: this.calendar,
        calendarEvent: this.calendarEvent,
        details: this.details,
        handled: false,
        refresh: true,
        create: true,
        added: false,
        $vm: this,
        $element: this.$el

      }, extra);
    }

  }
}
</script>

<style lang="scss">

.ds-calendar-event-title {
  font-size: 18px;
  padding-right: 8px;
  padding-top: 4px;
}

.ds-color-option {
  width: 100%;
  color: white;
  padding: 4px;
}

</style>
