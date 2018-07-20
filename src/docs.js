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
