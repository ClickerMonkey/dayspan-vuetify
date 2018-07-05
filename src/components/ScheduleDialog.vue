<template>

  <v-dialog
    v-bind="dialogProps"
    v-model="open">

    <v-card v-if="schedule">
      <v-card-text>

        <ds-schedule-type-custom-dialog
          v-bind="{$scopedSlots}"
          ref="customScheduler"
        ></ds-schedule-type-custom-dialog>

        <ds-schedule
          v-bind="{$scopedSlots}"
          :schedule="schedule"
          :calendar="calendar"
          :calendar-event="calendarEvent"
          :day="day"
          :can-save="canSave"
          @custom="custom"
          @save="save"
          @cancel="discard"
          @details="details = $event.details"
          @actioned="finish"
        ></ds-schedule>

        <v-layout row>
          <v-flex xs12 class="mt-2">
            <v-tabs
              class="text--primary"
              v-model="currentTab" v-if="hasTabs">

              <v-tab href="#details" v-if="hasDetails">
                {{ labels.tabs.details }}
              </v-tab>
              <v-tab href="#forecast" v-if="repeats && hasForecast">
                {{ labels.tabs.forecast }}
              </v-tab>
              <v-tab href="#exclusions" v-if="repeats && hasExclusions">
                {{ labels.tabs.removed }}
              </v-tab>
              <v-tab href="#inclusions" v-if="repeats && hasInclusions">
                {{ labels.tabs.added }}
              </v-tab>
              <v-tab href="#cancelled" v-if="showCancels">
                {{ labels.tabs.cancelled }}
              </v-tab>

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

                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item id="forecast" lazy>
                <v-card flat>
                  <v-card-text>

                    <!-- Forecast -->
                    <ds-schedule-forecast
                      :schedule="schedule"
                      :day="day"
                    ></ds-schedule-forecast>

                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item id="exclusions" lazy>
                <v-card flat>
                  <v-card-text>

                    <!-- Exclusions -->
                    <ds-schedule-modifier
                      :description="labels.exclusions"
                      :modifier="schedule.exclude"
                    ></ds-schedule-modifier>

                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item id="inclusions" lazy>
                <v-card flat>
                  <v-card-text>

                    <!-- Inclusions -->
                    <ds-schedule-modifier
                      :description="labels.inclusions"
                      :modifier="schedule.include"
                    ></ds-schedule-modifier>

                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item id="cancelled" lazy>
                <v-card flat>
                  <v-card-text>

                    <!-- Cancelled -->
                    <ds-schedule-modifier
                      :description="labels.cancelled"
                      :modifier="schedule.cancel"
                    ></ds-schedule-modifier>

                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-flex>
        </v-layout>

      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { Calendar, Schedule, Identifier } from 'dayspan';


export default {

  name: 'dsScheduleDialog',

  props:
  {
    calendar:
    {
      type: Calendar
    },

    dialogProps:
    {
      validate(x) {
        return this.$dsValidate(x, 'dialogProps');
      },
      default() {
        return this.$dsDefaults().dialogProps;
      }
    },

    maxWidth:
    {
      type: String,
      default() {
        return this.$dsDefaults().maxWidth;
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
    },

    labels:
    {
      validate(x) {
        return this.$dsValidate(x, 'labels');
      },
      default() {
        return this.$dsDefaults().labels;
      }
    }
  },

  data: vm => ({
    open: false,
    calendarEvent: null,
    details: null,
    schedule: null,
    day: null,
    currentTab: 'details'
  }),

  computed:
  {
    canSave()
    {
      return this.details && this.$dayspan.isValidEvent( this.details, this.schedule, this.calenderEvent );
    },

    header()
    {
      return this.calendarEvent ? this.labels.edit : this.labels.add;
    },

    repeats()
    {
      return !this.schedule.isSingleEvent();
    },

    hasTabs()
    {
      return true;
      //return this.hasAppearance || (this.repeats && (this.hasExclusions || this.hasForecast));
    },

    showCancels()
    {
      return this.hasCancelled && !this.schedule.cancel.isEmpty();
    }
  },

  mounted: function()
  {
    window.Scheduler = this;
  },

  methods:
  {
    add(day)
    {
      this.day = day;
      this.calendarEvent = null;
      this.details = this.$dayspan.getDefaultEventDetails();
      this.schedule = new Schedule({
        year: [day.year],
        month: [day.month],
        dayOfMonth: [day.dayOfMonth]
      });
      this.finishOpen();
    },

    addAt(day, hour)
    {
      this.day = day;
      this.calendarEvent = null;
      this.details = this.$dayspan.getDefaultEventDetails();
      this.schedule = new Schedule({
        year: [day.year],
        month: [day.month],
        dayOfMonth: [day.dayOfMonth],
        times: [hour],
        duration: 1,
        durationUnit: 'hours'
      });
      this.finishOpen();
    },

    addInput(day, input)
    {
      this.day = day;
      this.calendarEvent = null;
      this.details = this.$dayspan.getDefaultEventDetails();
      this.schedule = new Schedule(input);
      this.finishOpen();
    },

    edit(onDay, calendarEvent)
    {
      this.day = onDay;
      this.calendarEvent = calendarEvent;
      this.details = this.$dayspan.getDefaultEventDetails();
      this.schedule = new Schedule( calendarEvent.event.schedule.toInput() );
      this.finishOpen();
    },

    finishOpen()
    {
      this.currentTab = 'details';
      this.open = true;

      if (this.$refs.customScheduler)
      {
        this.$refs.customScheduler.hide();
      }
    },

    custom()
    {
      this.$refs.customScheduler.edit(this.schedule, this.day);
    },

    finish(ev)
    {
      this.open = false;
      this.$emit('finish', ev);
    },

    discard()
    {
      this.open = false;
      this.$emit('discard');
    },

    writeInput()
    {
      return this.schedule.toInput();
    },

    save(ev) {
      this.open = false;

      ev.schedule = this.writeInput();

      this.$emit('save', ev);
    }
  }
}
</script>

<style lang="scss">

.ds-color-option {
  width: 100%;
  color: white;
  padding: 4px;
}

</style>
