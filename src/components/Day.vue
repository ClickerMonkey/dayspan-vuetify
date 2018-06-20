<template>
  <div class="ds-day"
    :class="classesDay"
    @click.stop="add">
    <div :class="classesHeader">
      <span class="ds-first-day" v-if="showMonth">
        {{ day.format('MMM') }}
      </span>
      <span class="ds-dom" :class="classesDayOfMonth">
        {{ day.dayOfMonth }}
      </span>
    </div>
    <template v-for="(event, i) in day.events">
      <ds-event
        v-bind="{ scopedSlots: $scopedSlots }"
        :key="event.id"
        :calendar-event="event"
        :calendar="calendar"
        :index="i"
        @edit="edit"
      ></ds-event>
    </template>
  </div>
</template>

<script>
import dsEvent from './Event';

export default {
  name: 'dsDay',
  props: ['day', 'calendar'],
  components: { dsEvent },
  computed: {
    classesDay: function() {
      return {
        'ds-today': this.day.currentDay,
        'ds-first-day-day': this.day.dayOfMonth === 1,
        'ds-out-calendar': !this.day.inCalendar
      };
    },
    classesHeader: function() {
      return {
        'ds-out-calendar': !this.day.inCalendar
      };
    },
    classesDayOfMonth: function() {
      return {
        'ds-today-dom': this.day.currentDay
      };
    },
    showMonth: function() {
      return this.day.dayOfMonth === 1;
    }
  },
  methods: {
    add: function() {
      this.$emit('add', this.day);
    },
    edit: function(event) {
      this.$emit('edit', {
        event: event,
        day: this.day
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
}
.ds-day .ds-today-dom {
  margin: -7px;
  padding: 10px;
  border-radius: 20px;
  background-color: #4285f4;
  color: white;
  width: 36px;
  height: 36px;
  display: block;
  text-align: center;
  line-height: 16px;
  position: relative;
  z-index: 1;
  top: -4px;
}
.ds-out-calendar {
  color: #757575;
}
</style>
