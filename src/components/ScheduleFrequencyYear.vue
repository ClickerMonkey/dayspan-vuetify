<template>

  <v-layout row wrap>

    <v-flex xs7>
      <v-select
        hide-details solo flat
        v-model="type"
        :label="labels.type"
        :items="options"
      ></v-select>
    </v-flex>

    <v-flex xs5 v-if="isAny"></v-flex>

    <v-flex xs5 v-if="isOneOf" class="pl-1">
      <v-select
        hide-details solo flat multiple
        v-model="frequency"
        :items="oneOfs"
      ></v-select>
    </v-flex>

    <v-flex xs2 v-if="isEvery" class="pl-1">
      <v-text-field
        type="number"
        hide-details solo flat
        v-model.number="frequency.every"
      ></v-text-field>
    </v-flex>

    <v-flex xs3 v-if="isEvery" class="pl-1">
      <v-select
        hide-details solo flat
        v-model.number="frequency.offset"
        :items="offsets"
      ></v-select>
    </v-flex>

  </v-layout>

</template>

<script>
import { Day } from 'dayspan';
import { default as ScheduleFrequency } from './ScheduleFrequency';

export default {

  name: 'dsScheduleFrequencyYear',

  mixins: [ ScheduleFrequency ],

  props:
  {
    day:
    {
      type: Day
    },

    lookback:
    {
      type: Number,
      default() {
        return this.$dsDefaults().lookback;
      }
    },

    lookahead:
    {
      type: Number,
      default() {
        return this.$dsDefaults().lookahead;
      }
    },

    options:
    {
      default() {
        return this.$dsDefaults().options;
      }
    },

    labels:
    {
      validate(x) {
        return this.$dsValidate(x, 'labels');
      },
      default() {
        return this.$dsDefaults().labels;
      }
    }
  },

  data: vm => ({
    property: 'year'
  }),

  computed:
  {
    currentYear()
    {
      return (this.schedule.start || this.day || this.$dayspan.today).year;
    },

    oneOfs()
    {
      var currentYear = this.currentYear;
      var min = currentYear - this.lookback;
      var max = currentYear + this.lookahead;
      var oneof = [];
      for (var i = min; i <= max; i++) {
        oneof.push({
          text: i,
          value: i
        });
      }
      return oneof;
    },

    offsets()
    {
      var max = this.frequency.every;
      var currentYear = this.currentYear;
      var offsets = [];

      for (var i = 0; i < max; i++)
      {
        offsets.push({
          text: currentYear + i,
          value: i
        });
      }
      return offsets;
    }
  }
}
</script>

<style scoped lang="scss">

</style>
