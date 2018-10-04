<template>

  <v-select single-line solo flat persistent-hint
    :items="types"
    :hint="typeHint"
    :hide-details="hideHint"
    :append-outer-icon="customIcon"
    :disabled="isReadOnly"
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

    readOnly:
    {
      type: Boolean,
      default: false
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
    hideHint()
    {
      return this.type !== 'none' && this.type !== 'custom';
    },

    typeHint()
    {
      if (this.type === 'none')
      {
        return this.day.format( this.formats.date );
      }

      if (this.type === 'custom')
      {
        return this.$dayspan.getScheduleDescription( this.schedule );
      }

      return '';
    },

    types()
    {
      if (!this.day)
      {
        return [];
      }

      return Patterns
        .filter((pattern) => pattern.listed)
        .map((pattern) => ({
          label: pattern.describe( this.day ),
          value: pattern.name
        }))
      ;
    },

    customIcon()
    {
      return this.type === 'custom' ? 'edit' : '';
    },

    isReadOnly()
    {
      return this.readOnly || this.$dayspan.readOnly;
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
