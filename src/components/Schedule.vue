<template>
  <v-layout row wrap>
    <v-flex xs12 v-if="showRange">

      <!-- Span -->
      <slot name="scheduleSpan" v-bind="{schedule, day}">

        <ds-schedule-span
          :schedule="schedule"
          :day="day"
        ></ds-schedule-span>

      </slot>

    </v-flex>
    <v-flex xs7>

      <!-- Type -->
      <slot name="scheduleType" v-bind="{schedule, day, type}">

        <ds-schedule-type
          :day="day"
          :schedule="schedule"
          @change="setType"
        ></ds-schedule-type>

      </slot>

    </v-flex>
    <v-flex xs5 v-if="isCustom">

      <!-- Custom -->
      <slot name="scheduleCustom" v-bind="{schedule, day, custom, labels}">

        <v-btn depressed
          class="ds-button-tall"
          @click.stop="custom">
          <span v-html="labels.editCustom"></span>
        </v-btn>

      </slot>

    </v-flex>
    <v-flex xs12>

      <!-- Times -->
      <slot name="scheduleTimes" v-bind="{schedule, day}">

        <ds-schedule-times
          :schedule="schedule"
        ></ds-schedule-times>

      </slot>

    </v-flex>
    <v-flex xs12>

      <slot name="scheduleFooter" v-bind="{schedule, day}"></slot>

      <!-- Custom -->
      <ds-schedule-type-custom-dialog
        v-bind="{$scopedSlots}"
        ref="customScheduler"
      ></ds-schedule-type-custom-dialog>

    </v-flex>
  </v-layout>
</template>

<script>
import { Day, Schedule, Functions as fn } from 'dayspan';


export default {

  name: 'dsSchedule',

  props:
  {
    schedule:
    {
      required: true,
      type: Schedule
    },

    day:
    {
      type: Day
    },

    labels:
    {
      validate(x) {
        return this.$dsValidate(x, 'labels');
      },
      default() {
        return this.$dsDefaults().labels;
      }
    },

    allowsRange:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().allowsRange;
      }
    }
  },

  data: vm => ({
    type: ''
  }),

  computed:
  {
    isCustom()
    {
      return this.type === 'custom';
    },

    showRange()
    {
      return this.allowsRange && !this.schedule.isSingleEvent();
    }
  },

  methods:
  {
    custom()
    {
      this.$refs.customScheduler.edit(this.schedule, this.day);
    },

    setType(type)
    {
      this.type = type;

      this.$emit('type', type);
    }
  }
}
</script>

<style lang="scss">

</style>
