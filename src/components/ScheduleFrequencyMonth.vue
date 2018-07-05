<template>

  <v-layout row wrap>

    <v-flex xs7>
      <v-select
        hide-details solo flat
        label="Months"
        v-model="type"
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
import * as moment from 'moment';
import { default as ScheduleFrequency } from './ScheduleFrequency';


export default {

  name: 'dsScheduleFrequencyMonth',

  mixins: [ ScheduleFrequency ],

  props:
  {
    options:
    {
      default() {
        return this.$dsDefaults().options;
      }
    }
  },

  data: vm => ({
    property: 'month'
  }),

  computed:
  {
    months()
    {
      return moment.months();
    },

    oneOfs()
    {
      return this.months.map(function(name, i) {
        return {
          text: name,
          value: i
        };
      });
    },

    offsets()
    {
      return this.getOffsets( this.frequency.every, this.months );
    }
  }
}
</script>

<style scoped lang="scss">

</style>
