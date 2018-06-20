<template>
  <v-app id="dayspan" v-cloak>
    <ds-google ref="google"></ds-google>
  </v-app>
</template>

<script>
import dsGoogle from './components/Google'

export default {
  name: 'dayspan',
  components: {
    dsGoogle
  },
  mounted() {
    window.google = this.$refs.google;
  }
}
</script>

<style>
body, html, #app {
  width: 100%;
  height: 100%;
}
</style>
