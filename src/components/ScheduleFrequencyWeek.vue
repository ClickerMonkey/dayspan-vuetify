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

    <v-flex xs5 v-if="!isAny" class="pl-1">
      <v-select
        hide-details solo flat return-object
        v-model="chosenType"
        :items="types"
      ></v-select>
    </v-flex>

    <v-flex xs5 offset-xs7 v-if="isOneOf" class="pl-1">
      <v-select
        hide-details solo flat multiple
        v-model="frequency"
        :items="oneOfs"
      ></v-select>
    </v-flex>

    <v-flex xs2 offset-xs7 v-if="isEvery" class="pl-1">
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
import { Suffix } from 'dayspan';
import { default as ScheduleFrequency } from './ScheduleFrequency';


export default {

  name: 'dsScheduleFrequencyWeek',

  mixins: [ ScheduleFrequency ],

  props:
  {
    options:
    {
      default() {
        return this.$dsDefaults().options;
      }
    },
    
    types:
    {
      default() {
        return this.$dsDefaults().types;
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
    chosenType: null,
    property: 'weekspanOfMonth'
  }),

  watch:
  {
    schedule:
    {
      immediate: true,
      deep: true,
      handler: 'updateProperty'
    },

    chosenType: 'onTypeChange'
  },

  computed:
  {
    oneOfs()
    {
      return this.getOffsets( this.chosenType.max, Suffix.CACHE, this.chosenType.min, this.chosenType.offset );
    },

    offsets()
    {
      return this.getOffsets( this.frequency.every + 1, Suffix.CACHE );
    }
  },

  methods:
  {
    updateProperty()
    {
      this.chosenType = this.findType( this.types );
    },

    onTypeChange(newType, oldType)
    {
      this.property = newType.property;
    }
  }
}
</script>

<style scoped lang="scss">

</style>
