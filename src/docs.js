import Vue from 'vue'
import Vuetify from 'vuetify'
import DaySpanVuetify from './plugin'
import App from './app'

import './styles/app.scss'

Vue.config.productionTip = false

Vue.use(Vuetify);

Vue.use(DaySpanVuetify,
{
  methods:
  {
    getEventDetails(data, event, calendarEvent)
    {
      let {title, color, description, location, calendar, busy} = (data || {});

      return {
        title: title || '',
        description: description || '',
        color: color || '#757575',
        forecolor: '#ffffff',
        location: location || '',
        calendar: calendar || 'My Calendar',
        busy: busy !== false
      };
    },

    setEventDetails(details, data, event, calendarEvent)
    {
      Vue.util.extend(data, details);
    },

    createEventData(details, schedule)
    {
      return details;
    },

    getDefaultEventColor()
    {
      return '#1976d2';
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
