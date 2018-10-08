<template>

  <v-layout row wrap>

    <v-flex xs7>
      <v-select
        hide-details solo flat
        :label="labels.type"
        v-model="type"
        :items="options"
      ></v-select>
    </v-flex>

    <v-flex xs5 v-if="isSimple"></v-flex>

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
import { Weekday, Functions as fn } from 'dayspan';
import { default as ScheduleFrequency } from './ScheduleFrequency';


export default {

  name: 'dsScheduleFrequencyDayOfWeek',

  mixins: [ ScheduleFrequency ],

  props:
  {
    options:
    {
      default() {
        return this.$dsDefaults().options;
      }
    },

    labels:
    {
      validate(x) {
        return this.$dsValidate( x, 'labels' );
      },
      default() {
        return this.$dsDefaults().labels;
      }
    },

    weekdays:
    {
      type: Array,
      default() {
        return this.$dsDefaults().weekdays;
      }
    }
  },

  data: vm => ({
    property: 'dayOfWeek'
  }),

  computed:
  {
    isSimple()
    {
      return this.type === 'any' || this.type === 'weekday' || this.type === 'weekend';
    },

    oneOfs()
    {
      return this.weekdays.map(function(name, i) {
        return {
          text: name,
          value: i
        };
      });
    },

    offsets()
    {
      return this.getOffsets( this.frequency.every, this.weekdays );
    }
  },

  methods:
  {
    getCustomFrequencyType(x)
    {
      if (x && fn.isArrayEquals(x, Weekday.WEEK)) return 'weekday';
      if (x && fn.isArrayEquals(x, Weekday.ENDS)) return 'weekend';
    },

    setCustomFrequencyType(type)
    {
      switch (type) {
        case 'weekday':
          this.frequency = Weekday.WEEK;
          break;
        case 'weekend':
          this.frequency = Weekday.ENDS;
          break;
      }
    },
  }
}
</script>

<style scoped lang="scss">

</style>
