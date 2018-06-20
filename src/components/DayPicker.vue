<template>
  <div class="ds-day-picker">
    <div class="ds-week-header mb-2">
      <div class="subtitle grey--text text--darken-1 py-1 pl-2">
        {{ summary }}
      </div>
      <v-tooltip bottom style="flex:1; text-align:center">
        <v-btn slot="activator" small icon depressed @click="prev" class="grey--text text--darken-1 ma-0">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <span>Previous month</span>
      </v-tooltip>
      <v-tooltip bottom style="flex:1; text-align:center">
        <v-btn slot="activator" small icon depressed @click="next" class="grey--text text--darken-1 ma-0">
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
        <span>Next month</span>
      </v-tooltip>
    </div>
    <div class="ds-week-subheader grey--text text--darken-1">
      <div class="ds-weekday" v-for="weekday in weekdays" :key="weekday">
        <v-tooltip bottom>
          <span slot="activator">{{ weekday.charAt(0) }}</span>
          <span>{{ weekday }}</span>
        </v-tooltip>
      </div>
    </div>
    <div class="ds-week">
      <div class="ds-day-pick" v-for="day in month.days" :key="day.dayIdentifier">
        <v-btn small icon depressed class="ma-0"
          @click="pick( day )"
          :class="{
            'btn--active': day.currentDay,
            'grey--text text--darken-1': !day.inCalendar,
            'primary': isHighlighted( day )
          }">
          {{ day.dayOfMonth }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { Calendar } from 'dayspan';
import * as moment from 'moment';

export default {
  name: 'dsDayPicker',
  props: ['span', 'highlightSpan'],
  data: function() {
    return {
      month: this.getMonth(),
      weekdays: moment.weekdays()
    };
  },
  computed: {
    summary: function() {
      return this.month ? this.month.summary(false, false, false, false) : '';
    }
  },
  watch: {
    span: {
      deep: true,
      handler: function(span) {
        if (!span.matchesMonth(this.month.start)) {
          this.month = this.getMonth();
        }
      }
    }
  },
  methods: {
    isHighlighted: function(day) {
      return this.highlightSpan && this.span.matchesDay(day);
    },
    getMonthStart: function() {
      return this.span && this.span.start ? this.span.start : this.$dayspan.today;
    },
    getMonth: function() {
      return Calendar.months(1, this.getMonthStart(), 0, {fill: true, minimumSize: 42});
    },
    pick: function(day) {
      this.$emit('picked', day);
    },
    prev: function() {
      this.month.prev();
      this.$emit('prev', this.month);
    },
    next: function() {
      this.month.next();
      this.$emit('next', this.month);
    }
  }
}
</script>

<style scoped lang="scss">
.ds-day-picker {

  .ds-week-header {
    display: flex;
  }
  .ds-week-header > div {
    flex: 1;
  }
  .ds-week-header .subtitle {
    flex: 5;
  }
  .ds-week-subheader {
    display: flex;
    text-align: center
  }
  .ds-week {
    display: flex;
    text-align: center;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .ds-weekday {
    flex: 1;
  }
  .ds-day-pick {
    flex: 1 0 14%;
  }
}
</style>
