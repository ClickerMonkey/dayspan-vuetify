<template>
<div class="ds-expand ds-calendar-app">

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

      <ds-calendar ref="calendar"
        v-bind="{$scopedSlots}"
        v-on="$listeners"
        :calendar="calendar"
        @add="add"
        @add-at="addAt"
        @edit="edit"
        @view-day="viewDay"
        @added="handleAdd"
        @moved="handleMove"
      ></ds-calendar>

      <ds-event-dialog ref="eventDialog"
        v-bind="{$scopedSlots}"
        v-on="$listeners"
        :calendar="calendar"
        @saved="eventFinish"
        @actioned="eventFinish"
      ></ds-event-dialog>

      <v-dialog v-model="viewingOptions" max-width="300px">
        <v-list>
          <template v-for="option in options">
            <v-list-tile :key="option.text" @click="chooseOption( option )">
              {{ option.text }}
            </v-list-tile>
          </template>
        </v-list>
      </v-dialog>

      <v-fab-transition>
        <v-btn
          class="ds-add-event-today"
          color="primary"
          fixed bottom right fab
          v-model="allowsAddToday"
          @click="addToday">
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>

      <slot name="containerInside" v-bind="{events, calendar}"></slot>

    </v-container>
  </v-content>
</div>
</template>

<script>
import { Constants, Sorts, Calendar, Day, Units, Weekday, Month, DaySpan, PatternMap, Time } from 'dayspan';

export default {

  name: 'dsCalendarApp',

  props:
  {
    events:
    {
      type: Array
    },
    calendar:
    {
      type: Calendar,
      default() {
        return Calendar.months();
      }
    },
    types:
    {
      type: Array,
      default() {
        return this.$dsDefaults().types;
      }
    },
    allowsAddToday:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().allowsAddToday;
      }
    },
    formats:
    {
      validate(x) {
        return this.$dsValidate(x, 'formats');
      },
      default() {
        return this.$dsDefaults().formats;
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
    },
    styles:
    {
      validate(x) {
        return this.$dsValidate(x, 'styles');
      },
      default() {
        return this.$dsDefaults().styles;
      }
    }
  },

  data: vm => ({
    drawer: null,
    currentType: vm.types[0],
    loading: false,
    viewingOptions: false,
    options: []
  }),

  watch:
  {
    'currentType': 'tryRebuild',
    'events': 'applyEvents',
    'calendar': 'applyEvents',
    'calendar.size': 'updateType',
    'calendar.type': 'updateType'
  },

  computed:
  {
    summary()
    {
      var large = this.$vuetify.breakpoint.lgAndUp;

      return this.calendar.summary(false, !large, false, !large);
    },

    todayDate()
    {
      return this.$dayspan.today.format( this.formats.today );
    },

    nextLabel()
    {
      return this.labels.next( this.currentType );
    },

    prevLabel()
    {
      return this.labels.prev( this.currentType );
    },

    toolbarStyle()
    {
      var large = this.$vuetify.breakpoint.lgAndUp;

      return large ? this.styles.toolbar.large : this.styles.toolbar.small;
    },

    hasCreatePopover()
    {
      return !!this.$scopedSlots.eventCreatePopover;
    },

    quietType:
    {
      get()
      {
        return this.currentType;
      },

      set(type)
      {
        this.loading = true;
        this.currentType = type;
        this.loading = false;
      }
    }
  },

  methods:
  {
    tryRebuild()
    {
      if (!this.loading)
      {
        this.rebuild();
      }
    },

    updateType()
    {
      this.quietType = this.types.find((type) =>
        type.type === this.calendar.type &&
        type.size === this.calendar.size
      );
    },

    applyEvents()
    {
      if (this.events)
      {
        this.calendar.removeEvents();
        this.calendar.addEvents(this.events);
      }
    },

    isType(type, aroundDay)
    {
      let cal = this.calendar;

      return (cal.type === type.type && cal.size === type.size &&
          (!aroundDay || cal.span.matchesDay(aroundDay)));
    },

    rebuild(aroundDay)
    {
      var cal = this.calendar;
      var type = this.currentType || this.types[ 2 ];

      if (this.isType( type, aroundDay ))
      {
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
        eventSorter: listTimes ? Sorts.List([Sorts.FullDay, Sorts.Start]) : Sorts.Start
      };

      cal.set(input);

      this.triggerChange();
    },

    next()
    {
      this.calendar.unselect().next();

      this.triggerChange();
    },

    prev()
    {
      this.calendar.unselect().prev();

      this.triggerChange();
    },

    setToday()
    {
      this.rebuild( this.$dayspan.today );
    },

    viewDay(day)
    {
      this.quietType = this.types[0];

      this.rebuild( day );
    },

    edit(calendarEvent)
    {
      var eventDialog = this.$refs.eventDialog;

      eventDialog.edit(calendarEvent);
    },

    add(day)
    {
      var eventDialog = this.$refs.eventDialog;
      var calendar = this.$refs.calendar;
      var useDialog = !this.hasCreatePopover;

      calendar.addPlaceholder( day, true, useDialog );

      if (useDialog)
      {
        eventDialog.add(day);
        eventDialog.$once('close', calendar.clearPlaceholder);
      }
    },

    addAt(dayHour)
    {
      var eventDialog = this.$refs.eventDialog;
      var calendar = this.$refs.calendar;
      var useDialog = !this.hasCreatePopover;
      var at = dayHour.day.withHour( dayHour.hour );

      calendar.addPlaceholder( at, false, useDialog );

      if (useDialog)
      {
        eventDialog.addAt(dayHour.day, dayHour.hour);
        eventDialog.$once('close', calendar.clearPlaceholder);
      }
    },

    addToday()
    {
      var eventDialog = this.$refs.eventDialog;
      var calendar = this.$refs.calendar;
      var useDialog = !this.hasCreatePopover;

      calendar.addPlaceholder( this.$dayspan.today, true, useDialog );

      if (useDialog)
      {
        eventDialog.addToday();
        eventDialog.$once('close', calendar.clearPlaceholder);
      }
    },

    handleAdd(addEvent)
    {
      var eventDialog = this.$refs.eventDialog;
      var calendar = this.$refs.calendar;

      addEvent.handled = true;

      if (!this.hasCreatePopover)
      {
        eventDialog.addSpan(addEvent.span);
        eventDialog.$once('close', addEvent.clearPlaceholder);
      }
      else
      {
        calendar.placeholderForCreate = true;
      }
    },

    handleMove(moveEvent)
    {
      var calendarEvent = moveEvent.calendarEvent;
      var target = moveEvent.target;
      var targetStart = target.start;
      var sourceStart = calendarEvent.time.start;
      var schedule = calendarEvent.schedule;
      var options = [];

      moveEvent.handled = true;

      var callbacks = {
        cancel: () => {
          moveEvent.clearPlaceholder()
        },
        single: () => {
          calendarEvent.move( targetStart );
          this.eventsRefresh();
          moveEvent.clearPlaceholder();
        },
        instance: () => {
          calendarEvent.move( targetStart, sourceStart );
          this.eventsRefresh();
          moveEvent.clearPlaceholder();
        },
        all: () => {
          schedule.moveTime( sourceStart.asTime(), targetStart.asTime() );
          this.eventsRefresh();
          moveEvent.clearPlaceholder();
        }
      };

      options.push({
        text: this.labels.moveCancel,
        callback: callbacks.cancel
      });

      if (schedule.isSingleEvent())
      {
        options.push({
          text: this.labels.moveSingleEvent,
          callback: callbacks.single
        });
      }
      else
      {
        options.push({
          text: this.labels.moveOccurrence,
          callback: callbacks.instance
        });

        if (targetStart.sameDay(sourceStart))
        {
          options.push({
            text: this.labels.moveAll,
            callback: callbacks.all
          });
        }
      }

      this.options = options;
      this.viewingOptions = true;
    },

    chooseOption(option)
    {
      if (option)
      {
        option.callback();
      }

      this.viewingOptions = false;
    },

    eventFinish(ev)
    {
      this.triggerChange();

      // this.$forceUpdate();
    },

    eventsRefresh()
    {
      this.calendar.refreshEvents();

      this.triggerChange();

      // this.$forceUpdate();
    },

    triggerChange()
    {
      this.$emit('change', {
        calendar: this.calendar
      });
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

.v-btn--floating.ds-add-event-today {

  .v-icon {
    width: 24px;
    height: 24px;
  }
}

</style>
