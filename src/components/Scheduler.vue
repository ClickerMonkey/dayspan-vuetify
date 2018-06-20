<template>
  <v-dialog v-model="open" max-width="700px" persistent lazy>
    <v-card>
      <v-card-text>
        <v-layout row>
          <v-flex xs1>
            <v-tooltip bottom>
              <v-btn slot="activator" icon color="grey lighten-4" @click="discard">
                <v-icon dark>clear</v-icon>
              </v-btn>
              <span>Cancel event changes</span>
            </v-tooltip>
          </v-flex>
          <v-flex xs6>
            <v-text-field single-line flat hide-details
              class="ds-gray-textfield ds-font-18 pr-2 pt-1"
              label="Title"
              v-model="title"
            ></v-text-field>
          </v-flex>
          <v-flex xs5>

            <v-btn :disabled="!canSave" color="primary" dark @click.stop="save">Save</v-btn>

            <v-menu bottom left v-if="canRemove || canExclude || canCancel || canUncancel">
              <v-btn slot="activator" color="grey lighten-4">
                More actions...
              </v-btn>
              <v-list>
                <v-list-tile @click="remove" v-if="canRemove">
                  <v-list-tile-title>Remove this event</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="exclude" v-if="canExclude">
                  <v-list-tile-title>Remove this occurrence</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="cancel" v-if="canCancel">
                  <v-list-tile-title>Cancel this occurrence</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="uncancel" v-if="canUncancel">
                  <v-list-tile-title>Undo cancellation</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout row class="mt-3" v-if="allowsRange">
          <v-flex xs11 offset-xs1>
            <v-menu offset-y
              :close-on-content-click="false"
              :nudge-width="60"
              v-model="startMenu">
              <v-btn class="ma-0 ds-gray-button" slot="activator">{{ startText }}</v-btn>
              <div class="ds-gray-day-dropdown">
                <ds-day-picker :highlight-span="!!input.start" :span="startSpan" @picked="setStart"></ds-day-picker>
                <v-btn block class="mb-0 ds-gray-button" v-if="input.start" @click="setStart()">
                  Beginning of Time
                </v-btn>
              </div>
            </v-menu>
            &nbsp;&nbsp;to&nbsp;&nbsp;
            <v-menu offset-y
              :close-on-content-click="false"
              :nudge-width="60"
              v-model="endMenu">
              <v-btn class="ma-0 ds-gray-button" slot="activator">{{ endText }}</v-btn>
              <div class="ds-gray-day-dropdown">
                <ds-day-picker :highlight-span="!!input.end" :span="endSpan" @picked="setEnd"></ds-day-picker>
                <v-btn block class="mb-0 ds-gray-button" v-if="input.end" @click="setEnd()">
                  End of Time
                </v-btn>
              </div>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs7 offset-xs1>
            <v-select single-line flat persistent-hint
              class="ds-gray-select"
              :items="types"
              :hint="typeHint"
              :hide-details="type !== 'custom'"
              v-model="type"
              item-text="label"
              item-value="value"
            ></v-select>
          </v-flex>
          <v-flex xs2 v-if="type === 'custom'">
            <v-btn style="margin-top: 18px; height: 40px"
              color="grey lighten-4"
              @click.stop="openCustom">Edit</v-btn>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs2 offset-xs1>
            <v-checkbox hide-details class="mr-2 mt-4"
              label="All day"
              v-model="allDay"
            ></v-checkbox>
          </v-flex>
          <v-flex xs2>
            <v-text-field
              single-line flat hide-details
              class="ds-gray-textfield"
              type="number"
              v-model.number="input.duration"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-select
              single-line flat hide-details
              class="ds-gray-select pl-1 mt-0"
              :items="durationOptions"
              v-model="input.durationUnit"
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-if="!allDay">
          <template v-for="(time, index) in input.times">
            <v-flex xs3 offset-xs3 class="mt-3">
              <v-text-field
                single-line flat hide-details
                class="ds-gray-textfield pt-0"
                type="time"
                v-model="input.times[ index ]"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 class="mt-3">
              <v-tooltip bottom>
                <v-btn slot="activator" icon
                  class="ma-0 mt-0 ml-2"
                  style="top:4px; left:4px;"
                  v-if="input.times.length > 1"
                  color="secondary"
                  @click="input.times.splice( index, 1 )"><v-icon>remove</v-icon></v-btn>
                <span>Remove time</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn slot="activator" icon
                  class="ma-0 mt-0 ml-2"
                  style="top:4px; left:4px;"
                  v-if="index === input.times.length - 1"
                  color="secondary"
                  @click="input.times.push('00:00')"><v-icon>add</v-icon></v-btn>
                <span>Add time</span>
              </v-tooltip>
            </v-flex>
          </template>
        </v-layout>
        <v-layout row>
          <v-flex xs12 class="mt-2">
            <v-tabs v-model="currentTab" v-if="hasTabs">
              <v-tab href="#appearance" v-if="hasAppearance">
                Appearance
              </v-tab>
              <v-tab href="#forecast" v-if="repeats && hasForecast">
                Forecast
              </v-tab>
              <v-tab href="#exclusions" v-if="repeats && hasExclusions">
                Removed Occurrences
              </v-tab>
              <v-tab-item id="appearance" v-if="hasAppearance">
                <v-card flat>
                  <v-card-text>
                    <v-select single-line flat hide-details
                      class="ds-gray-select pt-0"
                      :items="colors"
                      :color="color"
                      v-model="color">
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
                    <div class="pb-3">
                      The forecast shows previous & next
                      <v-text-field single-line hide-details
                        v-model.number="forecastSize"
                        type="number"
                        class="ds-gray-textfield ds-inline-textfield small"
                      ></v-text-field>
                      event occurrences within a years time.
                    </div>
                    <v-chip label close
                      v-for="d in forecast"
                      :key="d.time"
                      :color="d.sameDay( day ) ? 'primary' : ''"
                      :text-color="d.sameDay( day ) ? 'white' : ''"
                      @input="addExclusion( d )">
                      {{ d.format('ddd MMM Do YYYY') }}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item id="exclusions" lazy>
                <v-card flat>
                  <v-card-text>
                    <div class="pb-3">
                      This is a list of event occurrences that were removed from the calendar.
                    </div>
                    <v-chip label close
                      v-for="d in input.exclude"
                      :key="d"
                      @input="removeExclusion( d )">
                      {{ describeExclusion( d ) }}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-flex>
        </v-layout>

        <v-dialog v-model="editCustom" max-width="900px" persistent lazy>
          <v-card>
            <v-card-text>
              <div class="pa-3">
                {{ typeHint }}
              </div>
              <v-layout row wrap>
                <!-- Year -->
                <v-flex xs5>
                  <v-select v-model="customYear" :items="yearOptions" label="Years" class="ds-gray-select" hide-details></v-select>
                </v-flex>
                <v-flex xs7 v-if="customYear === 'any'"></v-flex>
                <v-flex xs7 v-if="customYear === 'oneof'" class="pl-1">
                  <v-select v-model="input.year" :items="yearOneOfs" class="ds-gray-select" hide-details multiple></v-select>
                </v-flex>
                <v-flex xs2 v-if="customYear === 'every'" class="pl-1">
                  <v-text-field v-model.number="input.year.every" type="number" class="ds-gray-textfield" hide-details></v-text-field>
                </v-flex>
                <v-flex xs5 v-if="customYear === 'every'" class="pl-1">
                  <v-select v-model.number="input.year.offset" :items="yearOffsets" class="ds-gray-select" hide-details></v-select>
                </v-flex>
                <!-- Month -->
                <v-flex xs5>
                  <v-select v-model="customMonth" :items="monthOptions" label="Months" class="ds-gray-select" hide-details></v-select>
                </v-flex>
                <v-flex xs7 v-if="customMonth === 'any'"></v-flex>
                <v-flex xs7 v-if="customMonth === 'oneof'" class="pl-1">
                  <v-select v-model="input.month" :items="monthOneOfs" class="ds-gray-select" hide-details multiple></v-select>
                </v-flex>
                <v-flex xs2 v-if="customMonth === 'every'" class="pl-1">
                  <v-text-field v-model.number="input.month.every" type="number" class="ds-gray-textfield" hide-details></v-text-field>
                </v-flex>
                <v-flex xs5 v-if="customMonth === 'every'" class="pl-1">
                  <v-select v-model.number="input.month.offset" :items="monthOffsets" class="ds-gray-select" hide-details></v-select>
                </v-flex>
                <!-- Week -->
                <v-flex xs5>
                  <v-select v-model="customWeek" :items="weekOptions" label="Weeks" class="ds-gray-select" hide-details></v-select>
                </v-flex>
                <v-flex xs7 v-if="customWeek === 'any'"></v-flex>
                <v-flex xs7 v-if="customWeek !== 'any'" class="pl-1">
                  <v-select v-model="customWeekType" :items="weekTypes" class="ds-gray-select" return-object hide-details></v-select>
                </v-flex>
                <v-flex xs7 offset-xs5 v-if="customWeek === 'oneof'" class="pl-1">
                  <v-select v-model="input[ customWeekType.property ]" :items="weekOneOfs" class="ds-gray-select" hide-details multiple></v-select>
                </v-flex>
                <v-flex xs2 offset-xs5 v-if="customWeek === 'every'" class="pl-1">
                  <v-text-field v-model.number="input[ customWeekType.property ].every" type="number" class="ds-gray-textfield" hide-details></v-text-field>
                </v-flex>
                <v-flex xs5 v-if="customWeek === 'every'" class="pl-1">
                  <v-select v-model.number="input[ customWeekType.property ].offset" :items="weekOffsets" class="ds-gray-select" hide-details></v-select>
                </v-flex>
                <!-- Day of Week -->
                <v-flex xs5>
                  <v-select v-model="customWeekday" :items="weekdayOptions" label="Days of week" class="ds-gray-select" hide-details></v-select>
                </v-flex>
                <v-flex xs7 v-if="customWeekday === 'any' || customWeekday === 'weekday' || customWeekday === 'weekend'"></v-flex>
                <v-flex xs7 v-if="customWeekday === 'oneof'" class="pl-1">
                  <v-select v-model="input.dayOfWeek" :items="weekdayOneOfs" class="ds-gray-select" hide-details multiple></v-select>
                </v-flex>
                <v-flex xs2 v-if="customWeekday === 'every'" class="pl-1">
                  <v-text-field v-model.number="input.dayOfWeek.every" type="number" class="ds-gray-textfield" hide-details></v-text-field>
                </v-flex>
                <v-flex xs5 v-if="customWeekday === 'every'" class="pl-1">
                  <v-select v-model.number="input.dayOfWeek.offset" :items="weekdayOffsets" class="ds-gray-select" hide-details></v-select>
                </v-flex>
                <!-- Day -->
                <v-flex xs5>
                  <v-select v-model="customDay" :items="dayOptions" label="Days" class="ds-gray-select" hide-details></v-select>
                </v-flex>
                <v-flex xs7 v-if="customDay === 'any'"></v-flex>
                <v-flex xs7 v-if="customDay !== 'any'" class="pl-1">
                  <v-select v-model="customDayType" :items="dayTypes" class="ds-gray-select" return-object hide-details></v-select>
                </v-flex>
                <v-flex xs7 offset-xs5 v-if="customDay === 'oneof'" class="pl-1">
                  <v-select v-model="input[ customDayType.property ]" :items="dayOneOfs" class="ds-gray-select" hide-details multiple></v-select>
                </v-flex>
                <v-flex xs2 offset-xs5 v-if="customDay === 'every'" class="pl-1">
                  <v-text-field v-model.number="input[ customDayType.property ].every" type="number" class="ds-gray-textfield" hide-details></v-text-field>
                </v-flex>
                <v-flex xs5 v-if="customDay === 'every'" class="pl-1">
                  <v-select v-model.number="input[ customDayType.property ].offset" :items="dayOffsets" class="ds-gray-select" hide-details></v-select>
                </v-flex>

              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn class="mx-auto" color="primary" @click.stop="editCustom = false">Done</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { Suffix, Weekday, Schedule, Patterns, Pattern, DaySpan, Time, Identifier, Functions as fn } from 'dayspan';
import * as moment from 'moment';

import dsDayPicker from './DayPicker';

export default {
  name: 'dsScheduler',
  props: {
    hasAppearance: {
      type: Boolean,
      default: false
    },
    hasForecast: {
      type: Boolean,
      default: true
    },
    hasExclusions: {
      type: Boolean,
      default: true
    },
    allowsRange: {
      type: Boolean,
      default: true
    }
  },
  components: {
    dsDayPicker
  },
  data: function() {
    return {
      open: false,
      event: null,
      color: null,
      title: '',
      input: {},
      day: null,
      type: '',
      startMenu: false,
      endMenu: false,
      editCustom: false,
      currentTab: 'appearance',
      forecastSize: 10,
      customWeekTypeCache: null,
      customDayTypeCache: null,
      colors: [
        { text: 'Red', value: '#F44336' },
        { text: 'Pink', value: '#E91E63' },
        { text: 'Purple', value: '#9C27B0' },
        { text: 'Deep Purple', value: '#673AB7' },
        { text: 'Indigo', value: '#3F51B5' },
        { text: 'Blue', value: '#2196F3' },
        { text: 'Light Blue', value: '#03A9F4' },
        { text: 'Cyan', value: '#00BCD4' },
        { text: 'Teal', value: '#009688' },
        { text: 'Green', value: '#4CAF50' },
        { text: 'Light Green', value: '#8BC34A' },
        { text: 'Lime', value: '#CDDC39' },
        { text: 'Yellow', value: '#FFEB3B' },
        { text: 'Amber', value: '#FFC107' },
        { text: 'Orange', value: '#FF9800' },
        { text: 'Deep Orange', value: '#FF5722' },
        { text: 'Brown', value: '#795548' },
        { text: 'Blue Gray', value: '#607D8B' },
        { text: 'Gray', value: '#9E9E9E' },
        { text: 'Black', value: '#000000' }
      ],

      yearOptions: [
        { text: 'Any year', value: 'any'},
        { text: 'On the following years...', value: 'oneof'},
        { text: 'Every _ years starting on _', value: 'every'}
      ],
      monthOptions: [
        { text: 'Any month', value: 'any'},
        { text: 'On the following months...', value: 'oneof'},
        { text: 'Every _ months starting on _', value: 'every'}
      ],
      weekTypes: [
        { text: 'Week of the month (first week has a Thursday)', property: 'weekOfMonth', max: 6 },
        { text: 'Weekspan of the month (starts on first day of month)', property: 'weekspanOfMonth', max: 7, min: 1, offset: -1 },
        { text: 'Full week of the month (0th = the week before if any)', property: 'fullWeekOfMonth', max: 6 },
        { text: 'Last weekspan of the month (starts on last day of month)', property: 'lastWeekspanOfMonth', max: 7, min: 1, offset: -1 },
        { text: 'Last full week of the month (0th = the week after if any)', property: 'lastFullWeekOfMonth', max: 6 },
        { text: 'Week of the year (first week has a Thursday)', property: 'weekOfYear', max: 54 },
        { text: 'Weekspan of the year (starts on first day of year)', property: 'weekspanOfYear', max: 53, min: 1, offset: -1 },
        { text: 'Full week of the year (0th = the week before if any)', property: 'fullWeekOfYear', max: 54 },
        { text: 'Last weekspan of the year (starts on last day of year)', property: 'lastWeekspanOfYear', max: 53, min: 1, offset: -1 },
        { text: 'Last full week of the year (0th = the week after if any)', property: 'lastFullWeekOfYear', max: 54 }
      ],
      weekOptions: [
        { text: 'Any week', value: 'any'},
        { text: 'On the following weeks...', value: 'oneof'},
        { text: 'Every _ weeks starting on _', value: 'every'}
      ],
      weekdayOptions: [
        { text: 'Any day of the week', value: 'any'},
        { text: 'On the following days of the week...', value: 'oneof'},
        { text: 'Every _ weekday starting on _', value: 'every'},
        { text: 'Weekends', value: 'weekend'},
        { text: 'Weekdays', value: 'weekday'}
      ],
      dayTypes: [
        { text: 'Day of the month', property: 'dayOfMonth', max: 32, min: 1 },
        { text: 'Last day of the month', property: 'lastDayOfMonth', max: 32, min: 1 },
        { text: 'Day of the year', property: 'dayOfYear', max: 367, min: 1, offset: -1 }
      ],
      dayOptions: [
        { text: 'Any day', value: 'any'},
        { text: 'On the following days...', value: 'oneof'},
        { text: 'Every _ days starting on _', value: 'every'}
      ]
    };
  },
  computed: {
    // Custom Dropdown Options
    yearOneOfs: function() {
      var currentYear = this.input.start || this.day;
      var min = currentYear.year - 5;
      var max = currentYear.year + 20;
      var oneof = [];
      for (var i = min; i <= max; i++) {
        oneof.push({
          text: i,
          value: i
        });
      }
      return oneof;
    },
    yearOffsets: function() {
      var max = this.input.year.every;
      var currentYear = this.input.start || this.day;
      var offsets = [];
      for (var i = 0; i < max; i++) {
        offsets.push({
          text: currentYear.year + i,
          value: i
        });
      }
      return offsets;
    },
    monthOneOfs: function() {
      return moment.months().map(function(name, i) {
        return {
          text: name,
          value: i
        };
      });
    },
    monthOffsets: function() {
      return this.customOffsets( this.input.month.every, moment.months() );
    },
    weekdayOneOfs: function() {
      return moment.weekdays().map(function(name, i) {
        return {
          text: name,
          value: i
        };
      });
    },
    weekdayOffsets: function() {
      return this.customOffsets( this.input.dayOfWeek.every, moment.weekdays() );
    },
    dayOneOfs: function() {
      var opt = this.customDayType;
      return this.customOffsets( opt.max, Suffix.CACHE, opt.min, opt.offset );
    },
    dayOffsets: function() {
      var opt = this.customDayType;
      return this.customOffsets( this.input[ opt.property ].every + 1, Suffix.CACHE, opt.min, opt.offset );
    },
    weekOneOfs: function() {
      var opt = this.customWeekType;
      return this.customOffsets( opt.max, Suffix.CACHE, opt.min, opt.offset  );
    },
    weekOffsets: function() {
      var opt = this.customWeekType;
      return this.customOffsets( this.input[ opt.property ].every + 1, Suffix.CACHE );
    },

    // Custom Options
    customYear: {
      get: function() {
        return this.customGet(this.input.year);
      },
      set: function(value) {
        this.customSet('year', value);
      }
    },
    customMonth: {
      get: function() {
        return this.customGet(this.input.month);
      },
      set: function(value) {
        this.customSet('month', value);
      }
    },
    customWeekType: {
      get: function() {
        if (!this.customWeekTypeCache) {
          this.customWeekTypeCache = this.customFindType(this.weekTypes);
        }
        return this.customWeekTypeCache;
      },
      set: function(newType) {
        this.customWeekTypeCache = this.customApplyType(newType, [], this.customWeekTypeCache);
      }
    },
    customWeek: {
      get: function() {
        return this.customGet(this.input[ this.customWeekType.property ]);
      },
      set: function(value) {
        this.customSet(this.customWeekType.property, value);
      }
    },
    customWeekday: {
      get: function() {
        var x = this.input.dayOfWeek;
        if (x && fn.isArrayEquals(x, Weekday.WEEK)) return 'weekday';
        if (x && fn.isArrayEquals(x, Weekday.ENDS)) return 'weekend';
        return this.customGet(x);
      },
      set: function(value) {
        switch (value) {
          case 'weekday':
            this.input.dayOfWeek = Weekday.WEEK;
            break;
          case 'weekend':
            this.input.dayOfWeek = Weekday.ENDS;
            break;
          default:
            this.customSet('dayOfWeek', value, true);
            break;
        }
        this.updateInput();
      }
    },
    customDayType: {
      get: function() {
        if (!this.customDayTypeCache) {
          this.customDayTypeCache = this.customFindType(this.dayTypes);
        }
        return this.customDayTypeCache;
      },
      set: function(newType) {
        this.customDayTypeCache = this.customApplyType(newType, [], this.customDayTypeCache);
      }
    },
    customDay: {
      get: function() {
        return this.customGet(this.input[ this.customDayType.property ]);
      },
      set: function(value) {
        this.customSet(this.customDayType.property, value);
      }
    },

    durationOptions: function() {
      var suffix = this.input.duration === 1 ? '' : 's';
      var duringDay = [
        { text: 'minute' + suffix, value: 'minutes' },
        { text: 'hour' + suffix, value: 'hours' }
      ];
      var allDay = [
        { text: 'day' + suffix, value: 'days' },
        { text: 'week' + suffix, value: 'weeks' },
        { text: 'month' + suffix, value: 'months' }
      ];
      return this.allDay ? allDay : duringDay.concat( allDay );
    },

    forecast: function()
    {
      var days = [];

      if (this.day)
      {
        var schedule = new Schedule(this.input);
        var size = parseInt(this.forecastSize) || 1;

        days = schedule.forecast( this.day, false, size )
          .map(function(spanDayId) {
            return spanDayId[1];
          })
          .list()
        ;
      }

      return days;
    },

    typeHint: function() {
      return this.type === 'custom' ? new Schedule(this.input).describe('event', false, false, false, false) : '';
    },
    canSave: function() {
      return !!this.title;
    },
    header: function() {
      return this.event ? 'Edit Event' : 'Add Event';
    },
    canRemove: function() {
      return !!this.event;
    },
    canExclude: function() {
      return !!this.event && this.repeats;
    },
    canCancel: function() {
      return this.event && !this.event.cancelled;
    },
    canUncancel: function() {
      return this.event && this.event.cancelled;
    },
    types: function() {
      if (!this.day) {
        return [];
      }
      var day = this.day;
      return Patterns.map(function(pattern) {
        return {
          label: pattern.describe( day ),
          value: pattern.name
        }
      });
    },
    startSpan: function() {
      return DaySpan.point((this.input ? this.input.start : null) || this.day);
    },
    startText: function() {
      return this.input && this.input.start ? this.input.start.format('MMMM Do, YYYY') : 'Beginning of Time';
    },
    endSpan: function() {
      return DaySpan.point((this.input ? this.input.end : null) || this.day);
    },
    endText: function() {
      return this.input && this.input.end ? this.input.end.format('MMMM Do, YYYY') : 'End of Time';
    },

    repeats: function() {
      return this.type !== 'none';
    },
    hasTabs: function() {
      return this.hasAppearance || (this.repeats && (this.hasExclusions || this.hasForecast));
    },
    allDay: {
      set: function(allDay) {
        if (allDay) {
          delete this.input.times;
          this.input.duration = 1;
          this.input.durationUnit = 'days';
        } else {
          this.input.times = ['08:00'];
          this.input.duration = 1;
          this.input.durationUnit = 'hours';
        }
        this.updateInput();
      },
      get: function() {
        return this.input && (!this.input.times || this.input.times.length === 0);
      }
    }
  },
  mounted: function() {
    window.Scheduler = this;
  },
  watch: {
    type: 'updateType'
  },
  methods: {
    add: function(day) {
      this.day = day;
      this.event = null;
      this.title = '';
      this.color = this.colors[Math.floor(this.colors.length * Math.random())].value;
      this.input = {};
      this.finishOpen('none');
    },
    addAt: function(day, hour) {
      this.day = day;
      this.event = null;
      this.title = '';
      this.color = this.colors[Math.floor(this.colors.length * Math.random())].value;
      this.input = {
        times: [Time.parse(hour).format('HH:mm')],
        duration: 1,
        durationUnit: 'hours'
      };
      this.finishOpen('none');
    },
    addInput: function(day, input) {
      this.day = day;
      this.event = null;
      this.title = '';
      this.color = this.colors[Math.floor(this.colors.length * Math.random())].value;
      this.input = input;
      this.finishOpen('none');
    },
    edit: function(onDay, calendarEvent) {
      this.day = onDay;
      this.event = calendarEvent;
      this.title = this.$dayspan.getEventTitle(calendarEvent.event, calendarEvent);
      this.color = this.$dayspan.getEventColor(calendarEvent.event, calendarEvent);
      this.input = this.readInput( calendarEvent.event.schedule );
      this.finishOpen(this.determineType());
    },
    readInput: function(schedule) {
      return schedule.toInput(true, false, 'HH:mm', true);
    },
    finishOpen: function(type) {
      this.forceType(type);
      this.forecastSize = 5;
      this.currentTab = 'appearance';
      this.startMenu = false;
      this.endMenu = false;
      this.editCustom = false;
      this.open = true;
    },
    openCustom: function() {
      this.customWeekTypeCache = null;
      this.customDayTypeCache = null;
      this.editCustom = true;
    },
    remove: function() {
      this.open = false;
      this.$emit('remove', this.event);
    },
    exclude: function() {
      this.open = false;
      this.$emit('exclude', {
        event: this.event,
        day: this.day
      });
    },
    discard: function() {
      this.open = false;
      this.$emit('discard');
    },
    cancel: function() {
      this.open = false;
      this.$emit('cancel', {
        event: this.event,
        cancel: true,
        day: this.day
      });
    },
    uncancel: function() {
      this.open = false;
      this.$emit('cancel', {
        event: this.event,
        cancel: false,
        day: this.day
      });
    },
    writeInput: function() {
      return this.copyShallow(this.input);
    },
    save: function() {
      this.open = false;
      this.$emit('save', {
        name: this.title,
        color: this.color,
        schedule: this.writeInput(),
        event: this.event
      });
    },
    addExclusion: function(day) {
      if (day) {
        if (!this.input.exclude) {
          this.input.exclude = [];
          this.updateInput();
        }
        if (this.allDay) {
          this.input.exclude.push( Identifier.Day.get( day ) );
        } else {
          this.input.exclude.push( Identifier.Time.get( day ) );
        }
      }
    },
    describeExclusion: function(identifier) {
      var type = Identifier.find(identifier);
      return type ? type.describe(identifier) : identifier;
    },
    removeExclusion: function(identifier) {
      if (identifier) {
        var exclude = this.input.exclude;
        var i = exclude.indexOf(identifier);
        if (i !== -1) {
          exclude.splice(i, 1);
        }
      }
    },
    customGet: function(value) {
      if (!value) return 'any';
      if (fn.isArray(value)) return 'oneof';
      if (fn.isFrequencyValueEvery(value)) return 'every';
      return 'unknown';
    },
    customSet: function(prop, newValue, delayUpdate) {
      switch (newValue) {
        case 'any':
          delete this.input[ prop ];
          break;
        case 'oneof':
          if (!fn.isArray(this.input[ prop ])) {
            this.input[ prop ] = [];
          }
          break;
        case 'every':
          if (!fn.isFrequencyValueEvery(this.input[ prop ])) {
            this.input[ prop ] = { every: 2 };
          }
          break;
      }
      if (!delayUpdate) {
        this.updateInput();
      }
    },
    customOffsets: function(max, array, start, valueOffset) {
      var offsets = [];
      var min = start || 0;
      var offset = valueOffset || 0;
      for (var i = min; i < max; i++) {
        offsets.push({
          text: array[ i ],
          value: i + offset
        });
      }
      return offsets;
    },
    customFindType: function(types) {
      for (var i = 0; i < types.length; i++) {
        var type = types[ i ];
        if (this.input[ type.property ]) {
          return type;
        }
      }
      return types[0];
    },
    customApplyType: function(newType, newValue, oldType) {
      if (oldType) {
        var oldValue = this.input[ oldType.property ];
        if (oldValue) {
          newValue = oldValue;
        }
        delete this.input[ oldType.property ];
      }
      this.input[ newType.property ] = newValue;
      this.updateInput();
      return newType;
    },
    setStart: function(start) {
      this.input.start = start;
      this.updateInput();
      this.startMenu = false;
    },
    setEnd: function(end) {
      this.input.end = end;
      this.updateInput();
      this.endMenu = false;
    },
    forceType: function(type) {
      if (this.type === type) {
        this.updateType('', type);
        this.updateType(type, '');
      } else {
        this.type = type;
      }
    },
    updateType: function(newType, oldType) {
      var inputChanged = false;
      var input = this.input;
      if (oldType === 'none') {
        delete input.end;
        inputChanged = true;
      }
      if (newType) {
        var pattern = Pattern.withName(newType);
        if (pattern) {
          pattern.apply(input, this.day);
          inputChanged = true;
        }
      }
      if (newType === 'none') {
        input.start = this.day.start();
        input.end = this.day.end();
        if (!input.times) {
          if (!input.duration) {
            input.duration = 1;
          }
          if (!input.durationUnit) {
            input.durationUnit = 'days';
          }
        }
        if (input.times && input.duration && input.durationUnit) {
          var lastTime = null;
          input.times.forEach(function(rawTime) {
            var time = Time.parse(rawTime);
            if (time && (!lastTime || time.toMilliseconds() > lastTime.toMilliseconds())) {
              lastTime = time;
            }
          });
          if (lastTime) {
            input.end = this.day.withTime(lastTime).add(input.duration, input.durationUnit);
          }
        }
        inputChanged = true;
      }
      if (inputChanged) {
        this.updateInput();
      }
    },
    determineType: function() {
      var pattern = Pattern.findMatch(this.input);
      return pattern ? pattern.name : 'custom';
    },
    copyShallow: function(x) {
      var out = {};
      for (var prop in x) {
        out[ prop ] = x[ prop ];
      }
      return out;
    },
    updateInput: function() {
      this.input = this.copyShallow(this.input);
    }
  }
}
</script>

<style lang="scss">
.ds-gray-textfield .input-group__input input,
.ds-gray-select .input-group__input {
  background-color: #f5f5f5;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  height: 40px;
  padding: 10px;
}
.ds-gray-textfield > label {
  margin-top: -8px;
  margin-left: 8px;
}
.ds-gray-textfield .input-group__details::before,
.ds-gray-select .input-group__details::before {
  background-color: #f5f5f5 !important;
}
.ds-font-18,
.ds-font-18 input {
  font-size: 18px;
}
.ds-gray-button {
  background-color: #f5f5f5 !important;
  height: 40px;
}
.ds-gray-day-dropdown {
  width: 260px;
  background-color: white;
  padding: 10px;
}
.ds-inline-textfield {
  width: auto;
  display: inline-block !important;
  margin-left: 6px;
  margin-right: 6px;
  top: 14px;
  padding-top: 0px;
  margin-top: -14px;
}
.ds-inline-textfield.small {
  width: 60px;
}
.ds-color-option {
  width: 100%;
  color: white;
  padding: 4px;
}
</style>
