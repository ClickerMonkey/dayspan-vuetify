<template>

  <v-menu bottom left>

    <template slot="activator">
      <slot></slot>
    </template>

    <v-list>

      <v-list-tile @click="remove" v-if="canRemove">
        <v-list-tile-title v-html="labels.remove"></v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="exclude" v-if="canExclude">
        <v-list-tile-title v-html="labels.exclude"></v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="cancel" v-if="canCancel">
        <v-list-tile-title v-html="labels.cancel"></v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="uncancel" v-if="canUncancel">
        <v-list-tile-title v-html="labels.uncancel"></v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="setStart" v-if="canSetStart">
        <v-list-tile-title v-html="labels.setStart"></v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="setEnd" v-if="canSetEnd">
        <v-list-tile-title v-html="labels.setEnd"></v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="moveStart" v-if="canMove">
        <v-menu
          lazy offset-y full-width
          transition="scale-transition"
          min-width="290px"
          color="primary"
          v-model="moving"
          :close-on-content-click="false"
          :nudge-right="40">

          <v-list-tile-title slot="activator">
            <span v-html="labels.move"></span>
          </v-list-tile-title>

          <v-date-picker no-title scrollable
            v-if="movingDate"
            v-model="targetDate">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="movingDate = false">{{ labels.pickerCancel }}</v-btn>
            <v-btn flat color="primary" @click="moveEnd">{{ labels.pickerOk }}</v-btn>
          </v-date-picker>

          <v-time-picker no-title scrollable
            v-if="movingTime"
            v-model="targetTime">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="movingTime = false">{{ labels.pickerCancel }}</v-btn>
            <v-btn color="primary" @click="moveEnd">{{ labels.pickerOk }}</v-btn>
          </v-time-picker>

        </v-menu>
      </v-list-tile>

      <v-list-tile @click="includeStart" v-if="canInclude">
        <v-menu
          lazy offset-y full-width
          transition="scale-transition"
          min-width="290px"
          color="primary"
          v-model="including"
          :close-on-content-click="false"
          :nudge-right="40">

          <v-list-tile-title slot="activator">
            <span v-html="labels.include"></span>
          </v-list-tile-title>

          <v-date-picker no-title scrollable
            v-if="includingDate"
            v-model="targetDate">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="includingDate = false">{{ labels.pickerCancel }}</v-btn>
            <v-btn color="primary" @click="includeEnd">{{ labels.pickerOk }}</v-btn>
          </v-date-picker>

          <v-time-picker no-title scrollable
            v-if="includingTime"
            v-model="targetTime">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="includingTime = false">{{ labels.pickerCancel }}</v-btn>
            <v-btn color="primary" @click="includeEnd">{{ labels.pickerOk }}</v-btn>
          </v-time-picker>

        </v-menu>
      </v-list-tile>

      <slot name="scheduleActionsAdditional" v-bind="{schedule, calendarEvent, calendar}"></slot>

    </v-list>

  </v-menu>

</template>

<script>
import { Day, Time, Schedule, Calendar, CalendarEvent, Functions as fn } from 'dayspan';




export default {

  name: 'dsScheduleActions',

  props:
  {
    schedule:
    {
      required: true,
      type: Schedule
    },

    calendarEvent:
    {
      required: true,
      type: CalendarEvent
    },

    calendar:
    {
      type: Calendar
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

    allowRemove:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().allowRemove;
      }
    },

    allowExclude:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().allowExclude;
      }
    },

    allowCancel:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().allowCancel;
      }
    },

    allowUncancel:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().allowUncancel;
      }
    },

    allowMove:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().allowMove;
      }
    },

    allowInclude:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().allowInclude;
      }
    },

    allowSetStart:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().allowSetStart;
      }
    },

    allowSetEnd:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().allowSetEnd;
      }
    }
  },

  data: vm => ({
    movingDate: false,
    movingTime: false,
    includingDate: false,
    includingTime: false,
    targetDate: null,
    targetTime: null
  }),

  computed:
  {
    repeats()
    {
      return !this.schedule.isSingleEvent();
    },
    event()
    {
      return this.calendarEvent.event;
    },
    canRemove()
    {
      return this.allowRemove;
    },
    canExclude()
    {
      return this.allowExclude && this.repeats;
    },
    canCancel()
    {
      return this.allowCancel && !this.calendarEvent.cancelled;
    },
    canUncancel()
    {
      return this.allowUncancel && this.calendarEvent.cancelled;
    },
    canMove()
    {
      return this.allowMove;
    },
    canInclude()
    {
      return this.allowInclude;
    },
    canSetStart()
    {
      return this.allowSetStart;
    },
    canSetEnd()
    {
      return this.allowSetEnd;
    },
    moving()
    {
      return this.movingDate || this.movingTime;
    },
    including()
    {
      return this.includingDate || this.includingTime;
    }
  },

  methods:
  {
    remove()
    {
      this.$dayspan.getPermission('actionRemove', () =>
      {
        var ev = this.getEvent('remove');

        this.$emit('remove', ev);

        if (!ev.handled && ev.calendar)
        {
          ev.calendar.removeEvent( ev.event );
          ev.handled = true;
        }

        this.$emit('finish', ev);

        this.$emit('event-remove', ev.event);
      });
    },

    exclude()
    {
      this.$dayspan.getPermission('actionExclude', () =>
      {
        var ev = this.getEvent('exclude');

        this.$emit('exclude', ev);

        if (!ev.handled && ev.calendarEvent)
        {
          ev.calendarEvent.exclude();
          ev.refresh && ev.calendar && ev.calendar.refreshEvents();
          ev.handled = true;
        }

        this.$emit('finish', ev);

        this.$emit('event-update', ev.event);
      });
    },

    cancel()
    {
      this.$dayspan.getPermission('actionCancel', () =>
      {
        var ev = this.getEvent('cancel');

        this.$emit('cancel', ev);

        if (!ev.handled && ev.calendarEvent)
        {
          ev.calendarEvent.cancel( true );
          ev.refresh && ev.calendar && ev.calendar.refreshEvents();
          ev.handled = true;
        }

        this.$emit('finish', ev);

        this.$emit('event-update', ev.event);
      });
    },

    uncancel()
    {
      this.$dayspan.getPermission('actionUncancel', () =>
      {
        var ev = this.getEvent('uncancel');

        this.$emit('uncancel', ev);

        if (!ev.handled && ev.calendarEvent)
        {
          ev.calendarEvent.cancel( false );
          ev.refresh && ev.calendar && ev.calendar.refreshEvents();
          ev.handled = true;
        }

        this.$emit('finish', ev);

        this.$emit('event-update', ev.event);
      });
    },

    setStart()
    {
      this.$dayspan.getPermission('actionSetStart', () =>
      {
        var ev = this.getEvent('set-start');

        this.$emit('set-start', ev);

        if (!ev.handled && ev.calendarEvent)
        {
          ev.calendarEvent.schedule.start = ev.calendarEvent.day.start();
          ev.refresh && ev.calendar && ev.calendar.refreshEvents();
          ev.handled = true;
        }

        this.$emit('finish', ev);

        this.$emit('event-update', ev.event);
      });
    },

    setEnd()
    {
      this.$dayspan.getPermission('actionSetEnd', () =>
      {
        var ev = this.getEvent('set-end');

        this.$emit('set-end', ev);

        if (!ev.handled && ev.calendarEvent)
        {
          ev.calendarEvent.schedule.end = ev.calendarEvent.day.end();
          ev.refresh && ev.calendar && ev.calendar.refreshEvents();
          ev.handled = true;
        }

        this.$emit('finish', ev);

        this.$emit('event-update', ev.event);
      });
    },

    getTarget()
    {
      if (!this.targetDate)
      {
        return null;
      }

      var target = Day.parse( this.targetDate );

      if (target && this.targetTime)
      {
        var time = Time.parse( this.targetTime );

        if (time)
        {
          target = target.withTime( time );
        }
      }

      return target;
    },

    setTarget()
    {
      this.targetDate = this.calendarEvent.start.format('YYYY-MM-DD');
      this.targetTime = this.calendarEvent.start.format('HH:mm');
    },

    moveStart()
    {
      this.setTarget();
      this.movingDate = true;
    },

    moveEnd()
    {
      if (this.movingDate)
      {
        this.movingDate = false;

        if (!this.schedule.isFullDay())
        {
          this.movingTime = true;

          return;
        }
      }

      if (this.movingTime)
      {
        this.movingTime = false;
      }

      var target = this.getTarget();

      if (!target)
      {
        return;
      }

      this.$dayspan.getPermission('actionMove', () =>
      {
        var ev = this.getEvent('move', { target });

        this.$emit('move', ev);

        if (!ev.handled && ev.calendarEvent && ev.target)
        {
          ev.calendarEvent.move( ev.target );
          ev.calendar && ev.calendar.refreshEvents();
          ev.handled = true;
        }

        this.$emit('finish', ev);

        this.$emit('event-update', ev.event);
      });
    },

    includeStart()
    {
      this.setTarget();
      this.includingDate = true;
    },

    includeEnd()
    {
      if (this.includingDate)
      {
        this.includingDate = false;

        if (!this.schedule.isFullDay())
        {
          this.includingTime = true;

          return;
        }
      }

      if (this.includingTime)
      {
        this.includingTime = false;
      }

      var target = this.getTarget();

      if (!target)
      {
        return;
      }

      this.$dayspan.getPermission('actionInclude', () =>
      {
        var ev = this.getEvent('include', { target });

        this.$emit('include', ev);

        if (!ev.handled && ev.calendarEvent && ev.calendarEvent.schedule && ev.target)
        {
          ev.calendarEvent.schedule.setExcluded( ev.target, false );
          ev.calendar && ev.calendar.refreshEvents();
          ev.handled = true;
        }

        this.$emit('finish', ev);

        this.$emit('event-update', ev.event);
      });
    },

    getEvent(type, extra = {})
    {
      return fn.extend({

        type: type,
        schedule: this.schedule,
        calendar: this.calendar,
        calendarEvent: this.calendarEvent,
        event: this.event,
        handled: false,
        refresh: true,
        $vm: this,
        $element: this.$el

      }, extra);
    }
  }
}
</script>

<style scoped lang="scss">

</style>
