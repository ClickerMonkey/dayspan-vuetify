import Vue from 'vue'
import Vuetify from 'vuetify'
import DaySpanVuetify from './plugin'
import App from './app'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './styles/app.scss'

import fr from './locales/fr'
import en from './locales/en'
import ca from './locales/ca'
import nl from './locales/nl'

import 'moment/lang/fr'
import 'moment/lang/ca'
import 'moment/lang/nl'
import * as moment from 'moment'
moment.lang('en')

Vue.config.productionTip = false

Vue.use(Vuetify);

Vue.use(DaySpanVuetify,
{
  data:
  {
    locales: { en, fr, nl, ca }
  },
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
