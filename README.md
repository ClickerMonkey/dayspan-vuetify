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

Once done, you can access components like `ds-event`, `ds-calendar`, and `ds-calendar-app` from any component (they are registered globally).

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
