<template>
  <div class="ds-day"
    :class="classesDay"
    @click.stop="add">

    <div class="ds-week-weekday">
      {{ day.format('ddd') }}
    </div>

    <div class="ds-week-date">
      {{ day.dayOfMonth }}
    </div>

    <div class="ds-all-events">

      <template v-for="(event, i) in day.events">
        <ds-event
          v-if="event.fullDay"
          v-bind="{ scopedSlots: $scopedSlots }"
          :calendar-event="event"
          :key="event.id"
          :index="i"
          :calendar="calendar"
          @edit="edit"
        ></ds-event>
      </template>

    </div>

  </div>
</template>

<script>
import dsEvent from './Event';

export default {
  name: 'dsWeekDayHeader',
  props: ['day', 'calendar'],
  components: { dsEvent },
  computed: {
    classesDay: function() {
      return {
        'ds-today': this.day.currentDay
      };
    }
  },
  methods: {
    add: function() {
      this.$emit('add', this.day);
    },
    edit: function(event) {
      this.$emit('edit', {
        day: this.day,
        event: event
      });
    }
  }
}
</script>

<style scoped lang="scss">
.ds-day {
  flex: 1;
  width: 0;
  border-right: #e0e0e0 1px solid;
  border-bottom: #e0e0e0 1px solid;
  padding: 4px;

  .ds-week-date {
    font-size: 40px;
    line-height: 44px;
    color: black;
    padding-left: 8px;
  }
  .ds-week-weekday {
    color: black;
    padding-left: 8px;
  }

  &.ds-today {

    .ds-week-weekday,
    .ds-week-date {
      color: #4285f4;
    }
  }
}
</style>
