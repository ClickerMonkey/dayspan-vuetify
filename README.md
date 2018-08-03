# dayspan-vuetify

> A collection of components for Schedules and Calendars in DaySpan using Vuetify

This library strives to offer all the functionality any modern calendar app could support, and more. Not only can this be used for calendar apps, but any application where the user wishes to control when events should occur within a system.

[Click here for a full app example](https://clickermonkey.github.io/dayspan-vuetify/example/)

Every feature of the library can be toggled with local and global settings, and all text can be localized.

## Status

This library is nearing functional completion (documentation on every component, prop, event, slot, method will have to wait) but is still subject to the occasional small change in API.

[Current documentation](docs/README.md)

## Usage

Install with `npm install --save dayspan-vuetify`

```babel
import DaySpanVuetify from 'dayspan-vuetify'

Vue.use( DaySpanVuetify, {
  // options is vue definition, the resulting reactive component is stored in components as this.$dayspan or Vue.$dayspan
  data: {
    // data or computed to override
  },
  computed: {
    // data or computed to override
  },
  methods: {
    // methods to override
  }
});
```

To see what options can be passed to the plugin, [checkout this file](src/component.js).

Once done, you can access components like `ds-event`, `ds-calendar`, and `ds-calendar-app` from any component (they are registered globally).

## Full Example

Install with `npm install --save dayspan-vuetify`

#### app.js
```babel
import Vue from 'vue'
import Vuetify from 'vuetify'
import DaySpanVuetify from 'dayspan-vuetify'
import App from './App.vue'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify);

Vue.use(DaySpanVuetify, {
  methods: {
    getDefaultEventColor: () => '#1976d2'
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
```

#### App.vue
```vue
<template>
  <v-app id="app" v-cloak>
    <ds-calendar-app :calendar="calendar"></ds-calendar-app>
  </v-app>
</template>

<script>
import { Calendar } from 'dayspan';

export default {
  name: 'app',
  data: () => ({
    calendar: Calendar.months()
  })
}
</script>

<style>
body, html, #app {
  font-family: Roboto, sans-serif;
  width: 100%;
  height: 100%;
}
</style>
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
