<template>
  <v-app id="dayspan" v-cloak>
    <ds-google ref="google"
      store-locally
      :default-events="defaultEvents"
      :parse-data="parseData">

      <template slot="title">
        DaySpan
      </template>

      <v-btn icon large slot="menuRight"
        href="https://github.com/ClickerMonkey/dayspan-vuetify" target="_blank">
        <v-avatar size="32px" tile>
          <img src="https://simpleicons.org/icons/github.svg" alt="Github">
        </v-avatar>
      </v-btn>

      <template slot="eventPopover" slot-scope="slotData">
         <ds-event-popover
          v-bind="slotData"
         ></ds-event-popover>
      </template>

    </ds-google>
  </v-app>
</template>

<script>
import { Weekday, Month } from 'dayspan';


export default {

  name: 'dayspan',

  data: vm => ({
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
  }),

  mounted()
  {
    window.google = this.$refs.google;
  },

  methods:
  {
    parseData(data) {
      return {
        name: data.name || 'Unnamed',
        color: data.color || 'black',
        description: data.description || ''
      };
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
