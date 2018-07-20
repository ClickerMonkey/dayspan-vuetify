<template>
  <v-app id="dayspan" v-cloak>

    <ds-calendar-app ref="app"
      :calendar="calendar"
      @change="saveState">

      <template slot="title">
        DaySpan
      </template>

      <template slot="menuRight">
        <v-btn icon large href="https://github.com/ClickerMonkey/dayspan-vuetify" target="_blank">
          <v-avatar size="32px" tile>
            <img src="https://simpleicons.org/icons/github.svg" alt="Github">
          </v-avatar>
        </v-btn>
      </template>

      <template slot="eventPopover" slot-scope="slotData">
         <ds-calendar-event-popover v-bind="slotData"></ds-calendar-event-popover>
      </template>

      <template slot="eventCreatePopover" slot-scope="{placeholder, calendar, close}">
        <ds-calendar-event-create-popover
          :calendar-event="placeholder"
          :calendar="calendar"
          :close="$refs.app.$refs.calendar.clearPlaceholder"
          @edit="$refs.app.editPlaceholder"
          @create-popover-closed="saveState"
        ></ds-calendar-event-create-popover>
      </template>

      <template slot="eventTimeTitle" slot-scope="{calendarEvent, details}">
        <div><strong class="ds-ev-title">{{ details.title }}</strong></div>
        <div class="ds-ev-description">{{ getCalendarTime( calendarEvent ) }}</div>
      </template>

    </ds-calendar-app>

  </v-app>
</template>

<script>
import { Calendar, Weekday, Month, Sorts } from 'dayspan';
import Vue from 'vue';


export default {

  name: 'dayspan',

  data: vm => ({
    storeKey: 'dayspanState',
    calendar: Calendar.months(),
    defaultEvents: [
      {
        data: {title: 'Weekly Meeting', color: '#3F51B5'},
        schedule: {
          dayOfWeek: [Weekday.MONDAY],
          times: [9],
          duration: 30,
          durationUnit: 'minutes'
        }
      },
      {
        data: {title: 'Mother\'s Day', color: '#2196F3'},
        schedule: {
          month: [Month.MAY],
          dayOfWeek: [Weekday.SUNDAY],
          weekspanOfMonth: [1]
        }
      },
      {
        data: {title: 'First Weekend', color: '#4CAF50'},
        schedule: {
          weekspanOfMonth: [0],
          dayOfWeek: [Weekday.FRIDAY],
          duration: 3,
          durationUnit: 'days'
        }
      }
    ]
  }),

  mounted()
  {
    window.app = this.$refs.app;

    this.$dayspan.startRefreshTimes();

    this.loadState();
  },

  methods:
  {
    getCalendarTime(calendarEvent)
    {
      var sa = calendarEvent.start.format('a');
      var ea = calendarEvent.end.format('a');
      var sh = calendarEvent.start.format('h');
      var eh = calendarEvent.end.format('h');

      if (calendarEvent.start.minute !== 0)
      {
        sh += calendarEvent.start.format(':mm');
      }

      if (calendarEvent.end.minute !== 0)
      {
        eh += calendarEvent.end.format(':mm');
      }

      return (sa === ea) ? (sh + ' - ' + eh + ea) : (sh + sa + ' - ' + eh + ea);
    },

    saveState()
    {
      var state = this.calendar.toInput(true);
      var json = JSON.stringify(state);

      localStorage.setItem(this.storeKey, json);
    },

    parseData(d)
    {
      return Vue.util.extend( this.$dayspan.getDefaultEventDetails(), d );
    },

    loadState()
    {
      var state = {};

      try
      {
        var savedState = JSON.parse(localStorage.getItem(this.storeKey));

        if (savedState)
        {
          state = savedState;
          state.eventSorter = state.listTimes ? Sorts.List([Sorts.FullDay, Sorts.Start]) : Sorts.Start;
          state.parseData = this.parseData;
        }
      }
      catch (e)
      {
        console.log( e );
      }

      if (!state.events || !state.events.length)
      {
        state.events = this.defaultEvents;
      }

      this.calendar.set( state );
    }
  }
}
</script>

<style>

body, html, #app {
  width: 100%;
  height: 100%;
}

</style>
