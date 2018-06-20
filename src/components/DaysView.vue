<template>
  <div class="ds-week-view-container">
    <ds-week-header
      v-bind="{ scopedSlots: $scopedSlots }"
      :calendar="calendar"
      :days="calendar.days"
      @add="add"
      @edit="edit"
    ></ds-week-header>
    <div class="ds-week-view-bottom">
      <div class="ds-week-view-scrollable">
        <div class="ds-week-view-pane" :style="dayHeight">
          <div class="ds-week">
            <div class="ds-hour-list">
              <div class="ds-hour" v-for="hour in hours">
                <div class="ds-hour-text">{{ hour }}</div>
              </div>
            </div>
            <template v-for="day in calendar.days">
              <ds-day-times
                v-bind="{ scopedSlots: $scopedSlots }"
                :key="day.dayIdentifier"
                :day="day"
                :highlight="highlight"
                :calendar="calendar"
                @edit="edit"
                @add-at="addAt"
                @mouse-enter-day="mouseEnterDay"
                @mouse-leave-day="mouseLeaveDay"
                @mouse-move="mouseMove"
                @mouse-down="mouseDown"
                @mouse-up="mouseUp"
                @mouse-enter-event="mouseEnterEvent"
                @mouse-leave-event="mouseLeaveEvent"
                @mouse-down-event="mouseDownEvent"
                @mouse-up-event="mouseUpEvent"
              ></ds-day-times>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Calendar, DaySpan } from 'dayspan';

import dsDayTimes from './DayTimes';
import dsWeekHeader from './WeekHeader';

export default {
  name: 'dsDaysView',
  components: {
    dsDayTimes,
    dsWeekHeader
  },
  props: {
    calendar: {
      validator: function(x) {
        return x instanceof Calendar;
      }
    },
    highlight: {
      validator: function(x) {
        return !x || x instanceof DaySpan;
      }
    }
  },
  computed: {
    dayHeight: function() {
      return {
        height: this.$dayspan.dayHeight + 'px'
      };
    }
  },
  data: function() {
    return {
      hours: [
        '    ', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
        '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'
      ]
    };
  },
  methods: {
    edit: function(eventDay) {
      this.$emit('edit', eventDay);
    },
    add: function(day) {
      this.$emit('add', day);
    },
    addAt: function(dayHour) {
      this.$emit('add-at', dayHour);
    },
    mouseEnterDay: function(day) {
      this.$emit('mouse-enter-day', day);
    },
    mouseLeaveDay: function(day) {
      this.$emit('mouse-leave-day', day);
    },
    mouseMove: function(mouseEvent) {
      this.$emit('mouse-move', mouseEvent);
    },
    mouseDown: function(mouseEvent) {
      this.$emit('mouse-down', mouseEvent);
    },
    mouseUp: function(mouseEvent) {
      this.$emit('mouse-up', mouseEvent);
    },
    mouseEnterEvent: function(mouseEvent) {
      this.$emit('mouse-enter-event', mouseEvent);
    },
    mouseLeaveEvent: function(mouseEvent) {
      this.$emit('mouse-leave-event', mouseEvent);
    },
    mouseDownEvent: function(mouseEvent) {
      this.$emit('mouse-down-event', mouseEvent);
    },
    mouseUpEvent: function(mouseEvent) {
      this.$emit('mouse-up-event', mouseEvent);
    }
  }
}
</script>

<style scoped lang="scss">
.ds-week-view-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;

  .ds-week-view-bottom {
    flex: 1 1 60%;
    overflow: hidden;
    display: flex;
    position: relative;
    flex-direction: column;
  }
  .ds-week-view-scrollable {
    overflow-y: scroll;
    flex: 1 1 auto;
    display: flex;
    align-items: flex-start;
  }
  .ds-week-view-pane {
    width: 100%;
    overflow-y: hidden;
    flex: none;
    display: flex;
    align-items: flex-start;

    .ds-day {
      position: relative;
    }
  }
  .ds-week {
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
  }

  .ds-hour-list {
    flex: none;
    width: 44px;
    border-right: #e0e0e0 1px solid;

    .ds-hour {
      text-align: center;
      border-bottom: none;
      height: 40px;

      .ds-hour-text {
        display: block;
        position: relative;
        top: -6px;
        font-size: 10px;
        color: #212121;
      }
    }
  }
}
</style>
