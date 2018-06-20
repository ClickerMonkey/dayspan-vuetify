<template>
<div class="ds-expand">
  <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
    <div class="pa-3" v-if="calendar">
      <ds-day-picker :span="calendar.span" @picked="rebuild"></ds-day-picker>
    </div>
  </v-navigation-drawer>
  <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="white" app flat fixed>

    <v-toolbar-title class="ml-0 pl-3" :style="toolbarStyle">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">DaySpan</span>
    </v-toolbar-title>

    <v-tooltip bottom>
      <v-btn depressed @click="setToday" slot="activator">TODAY</v-btn>
      <span>{{ todayDate }}</span>
    </v-tooltip>

    <v-tooltip bottom>
      <v-btn slot="activator" icon depressed @click="prev" class="grey--text text--darken-1">
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <span>{{ prevLabel }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <v-btn slot="activator" icon depressed @click="next" class="grey--text text--darken-1">
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
      <span>{{ nextLabel }}</span>
    </v-tooltip>

    <h1 class="title grey--text text--darken-1">
      {{ summary }}
    </h1>

    <v-spacer></v-spacer>
    <v-menu>
      <v-btn flat slot="activator">
        {{ currentType.label }}
        <v-icon>arrow_drop_down</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="type in types"
          :key="type.id"
          @click="currentType = type">
          <v-list-tile-content>
            <v-list-tile-title>{{ type.label }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>{{ type.shortcut }}</v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn icon large href="https://github.com/ClickerMonkey/dayspan" target="_blank">
      <v-avatar size="32px" tile>
        <img src="https://simpleicons.org/icons/github.svg" alt="Github">
      </v-avatar>
    </v-btn>
  </v-toolbar>
  <v-content class="ds-expand">
    <v-container fluid fill-height class="ds-calendar-container">

      <ds-calendar
        auto-highlight
        auto-dragging
        :calendar="calendar"
        :highlight="highlight"
        @add="add"
        @add-at="addAt"
        @edit="edit"
        @highlighted="addHighlighted"
        @moved="handleMove"
      ></ds-calendar>

      <ds-scheduler ref="scheduler"
        has-appearance
        @save="eventSave"
        @remove="eventRemove"
        @exclude="eventRemoveOccurrence"
        @cancel="eventCancel"
        @move="eventMove"></ds-scheduler>

      <v-dialog v-model="viewingOptions" max-width="500px">
        <v-card>
          <v-card-text>
            <v-select
              v-model="selectedOption"
              :items="options"
              label="Select an option"
              return-object
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" flat @click.stop="viewingOptions=false">Close</v-btn>
            <v-btn color="primary" flat @click.stop="chooseOption">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>
  </v-content>
</div>
</template>

<script>
import { Constants, Sorts, Calendar, Day, Units, Weekday, Month, DaySpan, PatternMap } from 'dayspan';

import dsDayPicker from './DayPicker';
import dsScheduler from './Scheduler';
import dsCalendar from './Calendar';

export default {
  name: 'dsGoogle',
  components: {
    dsDayPicker,
    dsScheduler,
    dsCalendar
  },
  data: function() {
    return {
      drawer: null,
      calendar: null,
      currentType: null,
      loading: false,
      highlight: DaySpan.point(Day.unix(0)),
      viewingOptions: false,
      options: [],
      selectedOption: null,
      types: [
        {id: 'D', label: 'Day', shortcut: 'D', type: Units.DAY, size: 1},
        {id: 'W', label: 'Week', shortcut: 'W', type: Units.WEEK, size: 1},
        {id: 'M', label: 'Month', shortcut: 'M', type: Units.MONTH, size: 1},
        {id: 'Y', label: 'Year', shortcut: 'Y', type: Units.YEAR, size: 1},
        {id: 'X', label: '4 days', shortcut: 'X', type: Units.DAY, size: 4}
      ],
      defaultEvents: [
        {
          data: {name: 'Weekly Meeting', color: '#3F51B5'},
          schedule: {
            dayOfWeek: [Weekday.MONDAY],
            times: [9],
            duration: 30,
            durationUnit: 'minutes'
          }
        },
        {
          data: {name: 'Mother\'s Day', color: '#2196F3'},
          schedule: {
            month: [Month.MAY],
            dayOfWeek: [Weekday.SUNDAY],
            weekspanOfMonth: [1]
          }
        },
        {
          data: {name: 'First Weekend', color: '#4CAF50'},
          schedule: {
            weekspanOfMonth: [0],
            dayOfWeek: [Weekday.FRIDAY],
            duration: 3,
            durationUnit: 'days'
          }
        }
      ]
    };
  },
  watch: {
    currentType: function() {
      if (!this.loading) {
        this.rebuild();
      }
    }
  },
  computed: {
    summary: function() {
      var large = this.$vuetify.breakpoint.lgAndUp;

      return this.calendar ? this.calendar.summary(false, !large, false, !large) : '';
    },
    todayDate: function() {
      return this.$dayspan.today.format('dddd, MMMM D');
    },
    nextLabel: function() {
      return this.currentType ? 'Next ' + this.currentType.label.toLowerCase() : 'Next';
    },
    prevLabel: function() {
      return this.currentType ? 'Previous ' + this.currentType.label.toLowerCase() : 'Previous';
    },
    toolbarStyle: function() {
      return {
        width: this.$vuetify.breakpoint.lgAndUp ? '300px' : 'auto'
      };
    }
  },
  created: function() {
    // Initialize types
    if (!this.currentType) {
      this.currentType = this.types[2];
    }
  },
  mounted: function() {
    this.loadState();
  },
  methods: {
    saveState: function() {
      localStorage.setItem('dayspanState', JSON.stringify(
        this.calendar.toInput(true)
      ));
    },
    loadState: function() {
      var state = JSON.parse(localStorage.getItem('dayspanState'));
      this.loading = true;
      if (state) {
        this.currentType = this.types.find(function(type) {
          return type.type === state.type && type.size === state.size;
        });
        state.eventSorter = state.listTimes ? Sorts.List([Sorts.FullDay, Sorts.Start]) : Sorts.Start;
        this.calendar = Calendar.fromInput(state);
      } else {
        this.rebuild(Day.today(), this.defaultEvents);
      }
      this.loading = false;
    },
    rebuild: function(aroundDay, events) {
      var cal = this.calendar;
      var type = this.currentType || this.types[ 2 ];

      if (cal &&
          cal.type === type.type &&
          cal.size === type.size &&
          (!aroundDay || cal.span.matchesDay(aroundDay))) {
        return;
      }

      var listTimes = type.type === Units.DAY || type.type === Units.WEEK;
      var input = {
        type: type.type,
        size: type.size,
        around: aroundDay,
        eventsOutside: true,
        listTimes: listTimes,
        updateRows: true,
        updateColumns: listTimes,
        fill: !listTimes,
        eventSorter: listTimes ? Sorts.List([Sorts.FullDay, Sorts.Start]) : Sorts.Start,
        events: events
      };

      if (cal) {
        cal.set(input);
      } else {
        this.calendar = Calendar.fromInput(input);
      }

      this.saveState();
    },
    next: function() {
      this.calendar.unselect().next();
      this.saveState();
    },
    prev: function() {
      this.calendar.unselect().prev();
      this.saveState();
    },
    setToday: function() {
      this.rebuild(this.$dayspan.today);
    },
    edit: function(eventDay) {
      this.$refs.scheduler.edit(eventDay.day, eventDay.event);
    },
    add: function(day) {
      this.$refs.scheduler.add(day);
    },
    addAt: function(dayHour) {
      this.$refs.scheduler.addAt(dayHour.day, dayHour.hour);
    },
    addHighlighted: function(span) {
      var minutes = span.minutes();
      var isDay = minutes % 1440 === 0;
      var isHour = minutes % 60 === 0;

      this.$refs.scheduler.addInput(span.start, {
        times: [span.start.asTime().format('HH:mm')],
        duration: isDay ? minutes / 1440 : (isHour ? minutes / 60 : minutes),
        durationUnit: isDay ? 'days' : (isHour ? 'hours' : 'minutes')
      });
    },
    handleMove: function(moveEvent) {
      var google = this;
      var calendarEvent = moveEvent.calendarEvent;
      var target = moveEvent.target;
      var targetStart = target.start;
      var sourceStart = calendarEvent.time.start;
      var schedule = calendarEvent.schedule;
      var options = [];
      var repeats = !PatternMap.none.isMatch(calendarEvent.schedule.toInput());

      options.push({
        id: 'no',
        text: 'No Action',
        callback: function() {}
      });

      if (schedule.isSingleEvent())
      {
        options.push({
          id: 'move',
          text: 'Move event',
          callback: function() {
            calendarEvent.move( targetStart );
            google.eventsRefresh();
          }
        });
      }
      else
      {
        options.push({
          id: 'instance',
          text: 'Move just this event occurrence',
          callback: function() {
            calendarEvent.move( targetStart );
            google.eventsRefresh();
          }
        });

        if (targetStart.sameDay(sourceStart)) {
          options.push({
            id: 'adjust',
            text: 'Move all event occurrences',
            callback: function() {
              var moveTime = sourceStart.asTime();
              var times = schedule.times;
              times.forEach(function(time, i) {
                if (time.toIdentifier() === moveTime.toIdentifier()) {
                  times[ i ] = targetStart.asTime();
                }
              });
              google.eventsRefresh();
            }
          });
        }
      }

      this.options = options;
      this.selectedOption = options[0];
      this.viewingOptions = true;
    },
    chooseOption: function() {
      if (this.selectedOption) {
        this.selectedOption.callback();
        this.selectedOption = null;
      }
      this.viewingOptions = false;
    },
    eventSave: function(data) {
      var calendarEvent = data.event;
      if (calendarEvent) {
        var event = calendarEvent.event;
        event.data.name = data.name;
        event.data.color = data.color;
        event.schedule.set( data.schedule );

        this.calendar.refreshEvents();
      } else {
        this.calendar.addEvent({
          data: { name: data.name, color: data.color },
          schedule: data.schedule
        });
      }

      this.saveState();
      this.$forceUpdate();
    },
    eventRemove: function(calendarEvent) {
      this.calendar.removeEvent( calendarEvent.event );
      this.saveState();
      this.$forceUpdate();
    },
    eventRemoveOccurrence: function(data) {
      data.event.exclude();
      this.eventsRefresh();
    },
    eventCancel: function(data) {
      data.event.cancel(data.cancel);
      this.eventsRefresh();
    },
    eventMove: function(data) {
      data.event.move(data.moveTo);
      this.eventsRefresh();
    },
    eventsRefresh: function() {
      this.calendar.refreshEvents();
      this.saveState();
      this.$forceUpdate();
    }
  }
}
</script>

<style lang="scss">
  nav.toolbar .toolbar__content {
    border-bottom: 1px solid rgb(224, 224, 224);
  }
  .ds-expand {
    width: 100%;
    height: 100%;
  }
  .ds-calendar-container {
    padding: 0px !important;
    position: relative;
  }
</style>
