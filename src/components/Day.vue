<template>

  <div class="ds-day"
    :class="classesDay"
    @click.stop="add">

    <div :class="classesHeader">

      <span class="ds-first-day" v-if="showMonth">
        {{ month }}
      </span>

      <span class="ds-dom" :class="classesDayOfMonth">
        {{ dayOfMonth }}
      </span>

    </div>

    <template v-for="(event, i) in day.events">

      <ds-event
        v-bind="{$scopedSlots}"
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
import { Day, Calendar } from 'dayspan';


export default {

  name: 'dsDay',

  props:
  {
    day:
    {
      required: true,
      type: Day
    },

    calendar:
    {
      required: true,
      type: Calendar
    },

    formats:
    {
      validate(x) {
        return this.$dsValidate( x, 'formats' );
      },
      default() {
        return this.$dsDefaults().formats;
      }
    }
  },

  computed:
  {
    classesDay()
    {
      return {
        'ds-today': this.day.currentDay,
        'ds-first-day-day': this.day.dayOfMonth === 1,
        'ds-out-calendar': !this.day.inCalendar
      };
    },

    classesHeader()
    {
      return {
        'ds-out-calendar': !this.day.inCalendar
      };
    },

    classesDayOfMonth()
    {
      return {
        'ds-today-dom': this.day.currentDay
      };
    },

    showMonth()
    {
      return this.day.dayOfMonth === 1;
    },

    dayOfMonth()
    {
      return this.day.dayOfMonth;
    },

    month()
    {
      return this.day.format( this.formats.month );
    }
  },

  methods:
  {
    add()
    {
      this.$emit('add', this.day);
    },

    edit(event)
    {
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
