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

**This library works best with Vuetify >= 1.1.9**

```javascript
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

## Example / Template

Checkout [dayspan-vuetify-example](https://github.com/ClickerMonkey/dayspan-vuetify-example) for an example of a calendar app which saves events to localStorage.

## Example Code

Install with `npm install --save dayspan-vuetify`

#### app.js
```javascript
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
  <v-app id="dayspan" v-cloak>
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
body, html, #app, #dayspan {
  font-family: Roboto, sans-serif;
  width: 100%;
  height: 100%;
}
</style>
```

#### index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>You Calendar App Title</title>
    <style> [v-cloak] { display: none; } </style>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files should be auto injected -->
  </body>
</html>
```

### Locales

This library supports multiple locales but the build only comes with [en-us/en](https://github.com/ClickerMonkey/dayspan-vuetify/blob/master/src/locales/en.js). The following code shows you how to add locales, changing the current locale, and updating a given locale:

```javascript
// You can access $dayspan via Vue.$dayspan or this.$dayspan inside a component.

$dayspan.setLocale('en'); // if en does not exist, this will have no affect
$dayspan.setLocale('fr', true); // true was passed, so if the locale does not exist an error is thrown
$dayspan.locales; // map of locale names to locale values

// A locale is really just an object that overrides the values you specify found in $dayspan. A locale does not need to specify all possible values, just ones that should be overriden when setLocale is called.

$dayspan.addLocale('es', {
  promptLabels: {
    // Are you sure you want to remove this event?
    actionRemove: '¿Estás seguro de que quieres eliminar este evento?'
  }
});

// Update locale (merge changes into locale)
$dayspan.updateLocale('en', {
  patterns: {
    lastDay: (day) => 'Final day of the month'
  }
});
```

#### French Locale

```javascript
import fr from 'dayspan-vuetify/src/locales/fr';
import Vue from 'vue';
// dayspan-vuetify should already be loaded at this point
Vue.$dayspan.addLocales(['fr', 'fr-CA', 'fr-BE', 'fr-CH', 'fr-FR', 'fr-LU', 'fr-MC'], fr);
```

#### Dutch Locale

```javascript
import nl from 'dayspan-vuetify/src/locales/nl';
import Vue from 'vue';
// dayspan-vuetify should already be loaded at this point
Vue.$dayspan.addLocales(['nl', 'nl-NL', 'nl-BE'], nl);
```

#### Catalan Locale

```javascript
import ca from 'dayspan-vuetify/src/locales/ca';
import Vue from 'vue';
// dayspan-vuetify should already be loaded at this point
Vue.$dayspan.addLocales(['ca', 'ca-ES'], ca);
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
