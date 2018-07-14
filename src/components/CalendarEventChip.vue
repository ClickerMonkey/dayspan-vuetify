<template>

  <v-chip label
    :close="canExclude"
    :color="background"
    :text-color="foreground"
    @input="exclude">
    <strong>{{ text }}</strong>
  </v-chip>

</template>

<script>
import { Day, Schedule, Functions as fn } from 'dayspan';


export default {

  name: 'dsCalendarEventChip',

  props:
  {
    time:
    {
      required: true,
      type: Day
    },

    day:
    {
      type: Day
    },

    canExclude:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().canExclude;
      }
    },

    colors:
    {
      validate(x) {
        return this.$dsValidate(x, 'colors');
      },
      default() {
        return this.$dsDefaults().colors;
      }
    },

    formats:
    {
      validate(x) {
        return this.$dsValidate(x, 'formats');
      },
      default() {
        return this.$dsDefaults().formats;
      }
    }
  },

  computed:
  {
    aroundDay()
    {
      return this.day || this.$dayspan.today;
    },

    same()
    {
      return this.aroundDay.sameDay( this.time );
    },

    background()
    {
      return this.same ? this.colors.sameBackground : '';
    },

    foreground()
    {
      return this.same ? this.colors.sameForeground : '';
    },

    text()
    {
      return this.time.format( this.formats.fullDay );
    }
  },

  methods:
  {
    exclude()
    {
      this.$emit('exclude', this.time);
    }
  }
}
</script>

<style lang="scss">

</style>
