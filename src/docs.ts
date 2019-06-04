import Vue from 'vue'
import Vuetify from 'vuetify'
import DaySpanVuetify from './plugin'
import App from './app'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './styles/app.scss'

import fr from './locales/fr';
import en from './locales/en';
import de from './locales/de';
import nl from './locales/nl';

import { 
  en as ds_en, 
  fr as ds_fr, 
  nl as ds_nl 
} from 'dayspan';

Vue.config.productionTip = false

Vue.use(Vuetify);

Vue.use(DaySpanVuetify,
{
  data:
  {
    locales: { en, fr, de, nl }
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
