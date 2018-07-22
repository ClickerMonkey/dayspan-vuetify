<template>

  <v-select single-line solo flat persistent-hint
    :items="types"
    :hint="typeHint"
    :hide-details="isNotCustom"
    :append-outer-icon="customIcon"
    v-model="type"
    item-text="label"
    item-value="value"
    @click:append-outer="custom"
  ></v-select>

</template>

<script>
import { Day, Schedule, Pattern, Patterns } from 'dayspan';

export default {

  name: 'dsScheduleType',

  props:
  {
    day:
    {
      required: true,
      type: Day
    },

    schedule:
    {
      required: true,
      type: Schedule
    },


  },

  data: () => ({
    type: ''
  }),

  watch:
  {
    schedule:
    {
      handler: 'updateType',
      immediate: true
    },

    type: 'applyType'
  },

  computed:
  {
    isNotCustom()
    {
      return this.type !== 'custom';
    },

    typeHint()
    {
      return this.isNotCustom ? '' : this.$dayspan.getScheduleDescription( this.schedule );
    },

    types()
    {
      if (!this.day)
      {
        return [];
      }

      return Patterns.map((pattern) => ({
        label: pattern.describe( this.day ),
        value: pattern.name
      }));
    },

    customIcon()
    {
      return this.type === 'custom' ? 'edit' : '';
    }
  },

  methods:
  {
    applyType(newType, oldType)
    {
      if (this.applying)
      {
        if (oldType === 'custom')
        {
          this.schedule.end = null;
        }

        if (newType)
        {
          var pattern = Pattern.withName(newType);

          if (pattern)
          {
            pattern.apply( this.schedule, this.day );
          }
        }

        if (newType === 'none')
        {
          this.schedule.adjustDefinedSpan();
        }
      }

      this.$emit('change', newType);
    },

    custom()
    {
      this.$emit('custom', this);
    },

    updateType()
    {
      this.applying = false;
      this.type = this.determineType();
      this.applying = true;
    },

    determineType()
    {
      var pattern = Pattern.findMatch(this.schedule);

      return pattern ? pattern.name : 'custom';
    }
  }
}
</script>

<style scoped lang="scss">

.v-input__icon--append-outer {
  color: black;
}

</style>
