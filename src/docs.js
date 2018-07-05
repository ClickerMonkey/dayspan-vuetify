import Vue from 'vue'
import Vuetify from 'vuetify'
import DaySpanVuetify from './plugin'
import App from './app'

import './styles/app.scss'

Vue.config.productionTip = false

Vue.use(Vuetify);

Vue.use(DaySpanVuetify, {
  methods: {
    getEventDetails(data, event, calendarEvent) {
      let {name, title, color, description, location, calendar} = (data || {});
      return {
        title: title || name || '',
        description: description || '',
        color: color || '#757575',
        forecolor: '#ffffff',
        location: location || '',
        calendar: calendar || 'My Calendar'
      };
    },
    setEventDetails(newData, data, event, calendarEvent) {
      return Vue.util.extend(data || {}, newData);
    }
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
