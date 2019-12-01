import Vue from 'vue'
import DaySpanVuetify from './plugin'
import App from './app'
import vuetify from './plugins/vuetify'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './styles/app.scss'

import fr from './locales/fr'
import en from './locales/en'
import de from './locales/de'
import ca from './locales/ca'
import nl from './locales/nl'

import 'moment/locale/fr'
import 'moment/locale/ca'
import 'moment/locale/nl'
import * as moment from 'moment'

moment.locale('en')

Vue.config.productionTip = false

Vue.use(DaySpanVuetify,
    {
        data:
            {
                locales: {en, fr, de, nl, ca}
            },
        methods:
            {
                getDefaultEventColor () {
                    return '#1976d2'
                }
            }
    })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    vuetify,
    render: h => h(App)
})
