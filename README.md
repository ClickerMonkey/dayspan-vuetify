# dayspan-vuetify-2

Support for Vuetify2+
## Usage

Install with `npm install --save dayspan-vuetify-2`

```javascript
import DaySpanVuetify from 'dayspan-vuetify-2'

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

## Example Code

Install with `npm install --save dayspan-vuetify-2`

#### app.js
```javascript
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import DaySpan from 'dayspan-vuetify-2'

Vue.config.productionTip = false

Vue.use(DaySpan, {
    methods: {
        getDefaultEventColor: () => '#1976d2'
    }
});
new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')
```

#### App.vue
```vue
<template>
  <v-app id="dayspan">
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

#### German Locale

```javascript
import de from 'dayspan-vuetify/src/locales/de';
import Vue from 'vue';
// dayspan-vuetify should already be loaded at this point
Vue.$dayspan.addLocales(['de', 'de-DE', 'de-CH', 'de-AT', 'de-BE', 'de-IT', 'de-LI', 'de-LU'], de);
```

#### Catalan Locale

```javascript
import ca from 'dayspan-vuetify/src/locales/ca';
import Vue from 'vue';
// dayspan-vuetify should already be loaded at this point
Vue.$dayspan.addLocales(['ca', 'ca-ES'], ca);
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
