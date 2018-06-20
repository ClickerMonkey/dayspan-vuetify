import Vue from 'vue'
import Vuetify from 'vuetify'
import DaySpanVuetify from './plugin'
import App from './app'

import './styles/app.scss'

Vue.config.productionTip = false

Vue.use(Vuetify);

Vue.use(DaySpanVuetify, {
  getEventColor(event, calendarEvent) {
    return event.data.color;
  },
  setEventColor(event, color, calendarEvent) {
    event.data.color = color;
  },
  getEventTitle(event, calendarEvent) {
    return event.data.name;
  },
  setEventTitle(event, title, calendarEvent) {
    event.data.name = title;
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  mounted() {
    this.$dayspan.startRefreshTimes();
  }
})
