<template>

  <v-dialog
    v-bind="dialogProps"
    v-model="open">

    <v-card v-if="schedule">

      <v-card-text>

        <ds-event
          v-bind="{$scopedSlots}"
          :schedule="schedule"
          :calendar="calendar"
          :calendar-event="calendarEvent"
          :day="day"
          @save="save"
          @cancel="cancel"
          @actioned="actioned"
        ></ds-event>

      </v-card-text>

    </v-card>

  </v-dialog>

</template>

<script>
import { Calendar, Schedule, Identifier, Functions as fn } from 'dayspan';


export default {

  name: 'dsEventDialog',

  props:
  {
    calendar:
    {
      type: Calendar
    },

    dialogProps:
    {
      validate(x) {
        return this.$dsValidate(x, 'dialogProps');
      },
      default() {
        return this.$dsDefaults().dialogProps;
      }
    }
  },

  data: vm => ({
    open: false,
    calendarEvent: null,
    schedule: null,
    day: null
  }),

  computed:
  {
  },

  methods:
  {
    addToday()
    {
      this.add( this.$dayspan.today );
    },

    add(day)
    {
      this.addSchedule( day, Schedule.forDay( day ) );
    },

    addAt(day, hour)
    {
      this.addSchedule( day, Schedule.forTime( day, hour ) );
    },

    addSpan(span)
    {
      this.addSchedule( span.start, Schedule.forSpan( span ) );
    },

    addSchedule(day, schedule)
    {
      this.day = day;
      this.calendarEvent = null;
      this.schedule = schedule;

      this.finishOpen();
    },

    addInput(day, input)
    {
      this.day = day;
      this.calendarEvent = null;
      this.schedule = input.clone();

      this.finishOpen();
    },

    edit(calendarEvent)
    {
      this.day = calendarEvent.start;
      this.calendarEvent = calendarEvent;
      this.schedule = calendarEvent.schedule;

      this.finishOpen();
    },

    finishOpen()
    {
      var ev = this.getEvent('open');

      this.$emit('open', ev);

      if (ev.open)
      {
        this.open = true;
      }
    },

    actioned(ev)
    {
      // console.log('actioned in event dialog', ev);

      ev.hide = true;
      this.$emit('actioned', ev);
      this.finishClose( ev );
    },

    cancel(ev)
    {
      ev.hide = true;
      this.$emit('cancel', ev);
      this.finishClose( ev );
    },

    save(ev)
    {
      ev.hide = true;
      this.$emit('save', ev);
      this.finishClose( ev );
    },

    finishClose(ev)
    {
      if (ev.hide)
      {
        this.open = false;
        this.$emit('close', ev);
      }
    },

    getEvent(type, extra = {})
    {
      return fn.extend({

        type: type,
        day: this.day,
        schedule: this.schedule,
        calendar: this.calendar,
        calendarEvent: this.calendarEvent,
        handled: false,
        open: true,
        $vm: this,
        $element: this.$el

      }, extra);
    }
  }
}
</script>

<style lang="scss">

</style>
