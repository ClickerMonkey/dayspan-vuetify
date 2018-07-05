<template>
<div class="ds-expand ds-google">

  <v-navigation-drawer fixed app
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp">

    <slot name="drawerTop"></slot>

    <slot name="drawerPicker" :calendar="calendar" :picked="rebuild">
      <div class="pa-3" v-if="calendar">
        <ds-day-picker :span="calendar.span" @picked="rebuild"></ds-day-picker>
      </div>
    </slot>

    <slot name="drawerBottom"></slot>

  </v-navigation-drawer>

  <v-toolbar app flat fixed
    class="ds-app-calendar-toolbar"
    color="white"
    :clipped-left="$vuetify.breakpoint.lgAndUp">

    <v-toolbar-title class="ml-0 pl-3" :style="toolbarStyle">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">

        <slot name="title" :calendar="calendar"></slot>

      </span>
    </v-toolbar-title>

    <slot name="today"
      :setToday="setToday"
      :todayDate="todayDate"
      :calendar="calendar">

      <v-tooltip bottom>
        <v-btn depressed @click="setToday" slot="activator">TODAY</v-btn>
        <span>{{ todayDate }}</span>
      </v-tooltip>

    </slot>

    <slot name="prev"
      :prev="prev"
      :prevLabel="prevLabel"
      :calendar="calendar">

      <v-tooltip bottom>
        <v-btn slot="activator"
          icon depressed class="ds-light-forecolor"
          @click="prev" >
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <span>{{ prevLabel }}</span>
      </v-tooltip>

    </slot>
    <slot name="next"
      :next="next"
      :nextLabel="nextLabel"
      :calendar="calendar">

      <v-tooltip bottom>
        <v-btn slot="activator"
          icon depressed
          class="ds-light-forecolor"
          @click="next">
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
        <span>{{ nextLabel }}</span>
      </v-tooltip>

    </slot>

    <slot name="summary"
      :summary="summary"
      :calendar="calendar">

      <h1 class="title ds-light-forecolor">
        {{ summary }}
      </h1>

    </slot>

    <v-spacer></v-spacer>

    <slot name="view"
      :currentType="currentType"
      :types="types">

      <v-menu>
        <v-btn flat slot="activator">
          {{ currentType.label }}
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="type in types"
            :key="type.id"
            @click="currentType = type">
            <v-list-tile-content>
              <v-list-tile-title>{{ type.label }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>{{ type.shortcut }}</v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-menu>

    </slot>

    <slot name="menuRight"></slot>

  </v-toolbar>
  <v-content class="ds-expand">
    <v-container fluid fill-height class="ds-calendar-container">

      <ds-calendar
        v-bind="{$scopedSlots}"
        :calendar="calendar"
        :highlight="highlight"
        @add="add"
        @add-at="addAt"
        @edit="edit"
        @highlighted="addHighlighted"
        @moved="handleMove"
      ></ds-calendar>

      <ds-schedule-dialog ref="scheduler"
        v-bind="{$scopedSlots}"
        :calendar="calendar"
        @save="eventSave"
        @finish="eventFinish"
      ></ds-schedule-dialog>

      <v-dialog v-model="viewingOptions" max-width="500px">
        <v-card>
          <v-card-text>
            <v-select
              v-model="selectedOption"
              :items="options"
              label="Select an option"
              return-object
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" flat @click.stop="viewingOptions=false">Close</v-btn>
            <v-btn color="primary" flat @click.stop="chooseOption">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>
  </v-content>
</div>
</template>

<script>
import { Constants, Sorts, Calendar, Day, Units, Weekday, Month, DaySpan, PatternMap } from 'dayspan';

export default {

  name: 'dsGoogle',

  props:
  {
    defaultEvents:
    {
      type: Array
    },
    types:
    {
      type: Array,
      default: () => ([
        {id: 'D', label: 'Day', shortcut: 'D', type: Units.DAY, size: 1},
        {id: 'W', label: 'Week', shortcut: 'W', type: Units.WEEK, size: 1},
        {id: 'M', label: 'Month', shortcut: 'M', type: Units.MONTH, size: 1},
        {id: 'Y', label: 'Year', shortcut: 'Y', type: Units.YEAR, size: 1},
        {id: 'X', label: '4 days', shortcut: 'X', type: Units.DAY, size: 4}
      ])
    },
    storeLocally:
    {
      type: Boolean,
      default: false
    },
    storeKey:
    {
      type: String,
      default: 'dayspanState'
    },
    parseMeta:
    {
      type: Function
    },
    parseData:
    {
      type: Function
    }
  },

  data: vm => ({
    drawer: null,
    calendar: null,
    currentType: vm.types[0],
    loading: false,
    highlight: DaySpan.point(Day.unix(0)),
    viewingOptions: false,
    options: [],
    selectedOption: null
  }),

  watch:
  {
    currentType()
    {
      if (!this.loading)
      {
        this.rebuild();
      }
    }
  },

  computed:
  {
    summary()
    {
      var large = this.$vuetify.breakpoint.lgAndUp;

      return this.calendar ? this.calendar.summary(false, !large, false, !large) : '';
    },

    todayDate()
    {
      return this.$dayspan.today.format('dddd, MMMM D');
    },

    nextLabel()
    {
      return this.currentType ? 'Next ' + this.currentType.label.toLowerCase() : 'Next';
    },

    prevLabel()
    {
      return this.currentType ? 'Previous ' + this.currentType.label.toLowerCase() : 'Previous';
    },

    toolbarStyle()
    {
      return {
        width: this.$vuetify.breakpoint.lgAndUp ? '300px' : 'auto'
      };
    }
  },

  mounted()
  {
    this.loadState();
  },

  methods:
  {
    saveState()
    {
      if (!this.storeLocally)
      {
        return;
      }

      localStorage.setItem(this.storeKey, JSON.stringify(
        this.calendar.toInput(true)
      ));
    },

    loadState()
    {
      if (!this.storeLocally)
      {
        return;
      }

      try
      {
        this.loading = true;

        var state = JSON.parse(localStorage.getItem(this.storeKey));

        if (state)
        {
          this.currentType = this.types.find((type) =>
            type.type === state.type && type.size === state.size
          );

          state.eventSorter = state.listTimes ? Sorts.List([Sorts.FullDay, Sorts.Start]) : Sorts.Start;
          state.parseMeta = this.parseMeta;
          state.parseData = this.parseData;

          this.calendar = Calendar.fromInput(state);
        }
        else
        {
          this.rebuild( Day.today(), this.defaultEvents );
        }
      }
      catch (e)
      {
        this.$emit('error', e);
      }
      finally
      {
        this.loading = false;
      }
    },

    rebuild(aroundDay, events)
    {
      var cal = this.calendar;
      var type = this.currentType || this.types[ 2 ];

      if (cal &&
          cal.type === type.type &&
          cal.size === type.size &&
          (!aroundDay || cal.span.matchesDay(aroundDay))) {
        return;
      }

      var listTimes = type.type === Units.DAY || type.type === Units.WEEK;
      var input = {
        type: type.type,
        size: type.size,
        around: aroundDay,
        eventsOutside: true,
        listTimes: listTimes,
        updateRows: true,
        updateColumns: listTimes,
        fill: !listTimes,
        eventSorter: listTimes ? Sorts.List([Sorts.FullDay, Sorts.Start]) : Sorts.Start,
        events: events
      };

      if (cal)
      {
        cal.set(input);
      }
      else
      {
        this.calendar = Calendar.fromInput(input);
      }

      this.saveState();
    },

    next()
    {
      this.calendar.unselect().next();
      this.saveState();
    },

    prev()
    {
      this.calendar.unselect().prev();
      this.saveState();
    },

    setToday()
    {
      this.rebuild(this.$dayspan.today);
    },

    edit(eventDay)
    {
      this.$refs.scheduler.edit(eventDay.day, eventDay.event);
    },

    add(day)
    {
      this.$refs.scheduler.add(day);
    },

    addAt(dayHour)
    {
      this.$refs.scheduler.addAt(dayHour.day, dayHour.hour);
    },

    addHighlighted(span)
    {
      var minutes = span.minutes();
      var isDay = minutes % 1440 === 0;
      var isHour = minutes % 60 === 0;

      this.$refs.scheduler.addInput(span.start, {
        times: [span.start.asTime().format('HH:mm')],
        duration: isDay ? minutes / 1440 : (isHour ? minutes / 60 : minutes),
        durationUnit: isDay ? 'days' : (isHour ? 'hours' : 'minutes')
      });
    },

    handleMove(moveEvent)
    {
      var google = this;
      var calendarEvent = moveEvent.calendarEvent;
      var target = moveEvent.target;
      var targetStart = target.start;
      var sourceStart = calendarEvent.time.start;
      var schedule = calendarEvent.schedule;
      var options = [];
      var repeats = !PatternMap.none.isMatch(calendarEvent.schedule.toInput());

      options.push({
        id: 'no',
        text: 'No Action',
        callback: function() {}
      });

      if (schedule.isSingleEvent())
      {
        options.push({
          id: 'move',
          text: 'Move event',
          callback: function() {
            calendarEvent.move( targetStart );
            google.eventsRefresh();
          }
        });
      }
      else
      {
        options.push({
          id: 'instance',
          text: 'Move just this event occurrence',
          callback: function() {
            calendarEvent.move( targetStart );
            google.eventsRefresh();
          }
        });

        if (targetStart.sameDay(sourceStart)) {
          options.push({
            id: 'adjust',
            text: 'Move all event occurrences',
            callback: function() {
              var moveTime = sourceStart.asTime();
              var times = schedule.times;
              times.forEach(function(time, i) {
                if (time.toIdentifier() === moveTime.toIdentifier()) {
                  times[ i ] = targetStart.asTime();
                }
              });
              google.eventsRefresh();
            }
          });
        }
      }

      this.options = options;
      this.selectedOption = options[0];
      this.viewingOptions = true;
    },

    chooseOption()
    {
      if (this.selectedOption)
      {
        this.selectedOption.callback();
        this.selectedOption = null;
      }

      this.viewingOptions = false;
    },

    eventSave(ev)
    {
      var calendarEvent = ev.event;
      var details = ev.details;

      if (calendarEvent)
      {
        var event = calendarEvent.event;
        var data = event.data;

        this.$dayspan.setEventDetails( details, data, event, calendarEvent );

        event.schedule.set( ev.schedule );

        this.calendar.refreshEvents();
      }
      else
      {
        this.calendar.addEvent({
          data: details,
          schedule: ev.schedule
        });
      }

      this.saveState();
      this.$forceUpdate();
    },

    eventFinish(ev)
    {
      if (ev.handled)
      {
        this.saveState();
        this.$forceUpdate();
      }
    },

    eventsRefresh()
    {
      this.calendar.refreshEvents();
      this.saveState();
      this.$forceUpdate();
    }
  }
}
</script>

<style lang="scss">

.ds-app-calendar-toolbar {

  .v-toolbar__content {
    border-bottom: 1px solid rgb(224, 224, 224);
  }
}

.ds-expand {
  width: 100%;
  height: 100%;
}

.ds-calendar-container {
  padding: 0px !important;
  position: relative;
}

</style>
