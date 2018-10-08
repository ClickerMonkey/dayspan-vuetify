<template>

  <div class="ds-day-picker">

    <div class="ds-week-header mb-2">

      <div class="subtitle py-1 pl-2 ds-light-forecolor">
        {{ summary }}
      </div>

      <v-tooltip bottom>

        <v-btn slot="activator" small icon depressed
          @click="prev"
          class="ds-light-forecolor ma-0">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <span>{{ labels.prevMonth }}</span>

      </v-tooltip>

      <v-tooltip bottom>

        <v-btn slot="activator" small icon depressed
          class="ds-light-forecolor ma-0"
          @click="next">
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
        <span>{{ labels.nextMonth }}</span>

      </v-tooltip>

    </div>

    <div class="ds-week-subheader ds-light-forecolor">
      <div class="ds-weekday" v-for="weekday in weekdays" :key="weekday">

        <v-tooltip bottom>
          <span slot="activator">{{ weekday.charAt(0) }}</span>
          <span>{{ weekday }}</span>
        </v-tooltip>

      </div>
    </div>

    <div class="ds-week">
      <div class="ds-day-pick"
        v-for="day in month.days"
        :key="day.dayIdentifier">

        <v-btn small icon depressed class="ma-0"
          @click="pick( day )"
          :class="{
            'btn--active': day.currentDay,
            'ds-light-forecolor': !day.inCalendar,
            'primary': isHighlighted( day )
          }">
          {{ day.dayOfMonth }}
        </v-btn>

      </div>
    </div>

  </div>
</template>

<script>
import { DaySpan, Calendar, Functions as fn } from 'dayspan';


export default {

  name: 'dsDayPicker',

  props:
  {
    span:
    {
      required: true,
      type: DaySpan
    },

    highlightSpan:
    {
      type: Boolean,
      default: false
    },

    weekdays:
    {
      type: Array,
      default() {
        return this.$dsDefaults().weekdays;
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
    month: vm.getMonth()
  }),

  computed:
  {
    summary()
    {
      return this.month ? this.month.summary(false, false, false, false) : '';
    }
  },

  watch:
  {
    span:
    {
      deep: true,
      handler: 'resetMonth'
    }
  },

  methods:
  {
    isHighlighted(day)
    {
      return this.highlightSpan && this.span.matchesDay(day);
    },

    getMonthStart()
    {
      return this.span && this.span.start ? this.span.start : this.$dayspan.today;
    },

    resetMonth()
    {
      if (!this.span.matchesMonth(this.month.start))
      {
        this.month = this.getMonth();
      }
    },

    getMonth()
    {
      return Calendar.months(1, this.getMonthStart(), 0, {fill: true, minimumSize: 42});
    },

    pick(day)
    {
      this.$emit('picked', day);
    },

    prev()
    {
      var ev = this.getEvent('prev', { next: false, prev: true });

      this.$emit('prev', ev);

      if (!ev.handled)
      {
        ev.month.prev();
        ev.handled = true;
      }

      this.$emit('change', ev);
    },

    next()
    {
      var ev = this.getEvent('next', { next: true, prev: false });

      this.$emit('next', ev);

      if (!ev.handled)
      {
        ev.month.next();
        ev.handled = true;
      }

      this.$emit('change', ev);
    },

    getEvent(type, extra = {})
    {
      return fn.extend({

        type: type,
        span: this.span,
        month: this.month,
        handled: false,
        $vm: this,
        $element: this.$el

      }, extra);
    }
  }
}
</script>

<style scoped lang="scss">
.ds-day-picker {

  .ds-week-header {
    display: flex;

    > div {
      flex: 1;
    }

    .tooltip {
      flex: 1;
      text-align: center;
    }

    .subtitle {
      flex: 5;
    }
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
