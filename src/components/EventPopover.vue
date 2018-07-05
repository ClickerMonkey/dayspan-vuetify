<template>

  <v-card class="ds-event-popover-card">
   <v-toolbar extended flat
    :style="styleHeader">

     <v-toolbar-title slot="extension">{{ details.title }}</v-toolbar-title>

     <v-btn
       v-if="!details.readonly"
       color="secondary"
       small absolute bottom left fab icon
       @click="edit">
       <v-icon>edit</v-icon>
     </v-btn>

     <slot name="eventPopoverToolbarLeft" v-bind="slotData"></slot>

     <v-spacer></v-spacer>

     <slot name="eventPopoverToolbarRight" v-bind="slotData"></slot>

     <slot name="eventPopoverToolbarActions" v-bind="slotData"></slot>

       <v-tooltip bottom>
         <ds-schedule-actions
          slot="activator"
          :schedule="calendarEvent.schedule"
          :calendar-event="calendarEvent"
          :calendar="calendar">
          <v-btn icon :style="styleButton">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </ds-schedule-actions>
        <span>Options</span>
       </v-tooltip>

     </slot>

     <slot name="eventPopoverToolbarClose" v-bind="slotData"></slot>

       <v-tooltip bottom>
         <v-btn icon slot="activator" @click="close" :style="styleButton">
           <v-icon>close</v-icon>
         </v-btn>
         <span>Close</span>
       </v-tooltip>

     </slot>

   </v-toolbar>
   <v-card-text>
     <v-list dense>

       <v-list-tile>
         <v-list-tile-avatar>
           <v-icon>access_time</v-icon>
         </v-list-tile-avatar>
         <v-list-tile-content>
           <slot name="eventPopoverOccurs" v-bind="slotData">
             <v-list-tile-title>{{ startDate }}</v-list-tile-title>
             <v-list-tile-sub-title>{{ occurs }}</v-list-tile-sub-title>
           </slot>
         </v-list-tile-content>
       </v-list-tile>

       <v-list-tile v-if="details.location">
         <v-list-tile-avatar>
           <v-icon>location_on</v-icon>
         </v-list-tile-avatar>
         <v-list-tile-content>
           <slot name="eventPopoverLocation" v-bind="slotData">
             <v-list-tile-title>
               <span v-html="details.location"></span>
             </v-list-tile-title>
           </slot>
         </v-list-tile-content>
       </v-list-tile>

       <v-list-tile v-if="details.description">
         <v-list-tile-avatar>
           <v-icon>subject</v-icon>
         </v-list-tile-avatar>
         <v-list-tile-content>
           <slot name="eventPopoverDescription" v-bind="slotData">
             <v-list-tile-title>
               <span v-html="details.description"></span>
             </v-list-tile-title>
           </slot>
         </v-list-tile-content>
       </v-list-tile>

       <v-list-tile v-if="details.notify">
         <v-list-tile-avatar>
           <v-icon>notifications</v-icon>
         </v-list-tile-avatar>
         <v-list-tile-content>
           <slot name="eventPopoverNotifications" v-bind="slotData">
             <v-list-tile-title>
               <span v-html="details.notify"></span>
             </v-list-tile-title>
           </slot>
         </v-list-tile-content>
       </v-list-tile>

       <v-list-tile v-if="details.calendar">
         <v-list-tile-avatar>
           <v-icon>event</v-icon>
         </v-list-tile-avatar>
         <v-list-tile-content>
           <slot name="eventPopoverCalendar" v-bind="slotData">
             <v-list-tile-title>
               <span v-html="details.calendar"></span>
             </v-list-tile-title>
           </slot>
         </v-list-tile-content>
       </v-list-tile>

       <v-list-tile v-if="details.busy">
         <v-list-tile-avatar>
           <v-icon>work</v-icon>
         </v-list-tile-avatar>
         <v-list-tile-content>
           <slot name="eventPopoverBusy" v-bind="slotData">
             <v-list-tile-title>{{ busyness }}</v-list-tile-title>
           </slot>
         </v-list-tile-content>
       </v-list-tile>

     </v-list>
   </v-card-text>
  </v-card>

</template>

<script>
import { CalendarEvent, Calendar, Pattern } from 'dayspan';


export default {

  name: 'dsEventPopover',

  props:
  {
    calendarEvent:
    {
      required: true,
      type: CalendarEvent
    },

    calendar:
    {
      required: true,
      type: Calendar
    },

    edit:
    {
      type: Function
    },

    close:
    {
      type: Function
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
    }
  },

  computed:
  {
    slotData()
    {
      return {
        calendarEvent: this.calendarEvent,
        calendar: this.calendar,
        edit: this.edit,
        close: this.close,
        details: this.details
      };
    },

    sameDayEvents()
    {
      return this.calendarEvent.event.schedule.iterateSpans(this.calendarEvent.day, true).list();
    },

    styleHeader()
    {
      return {
        backgroundColor: this.details.color,
        color: this.details.forecolor
      };
    },

    styleButton()
    {
      return {
        color: this.details.forecolor
      };
    },

    startDate()
    {
      return this.calendarEvent.start.format(this.formats.start);
    },

    busyness()
    {
      return this.details.busy ? this.labels.busy : this.labels.free;
    },

    duration()
    {
      let schedule = this.calendarEvent.schedule;
      let units = this.labels[ schedule.durationUnit ];
      let length = schedule.duration;
      let chosenUnit = length === 1 ? units[ 0 ] : units[ 1 ];
      let duration = length + ' ' + chosenUnit;

      return duration;
    },

    occurs()
    {
      let calendarEvent = this.calendarEvent;
      let schedule = calendarEvent.schedule;

      if (schedule.isSingleEvent())
      {
        if (schedule.isFullDay())
        {
          return this.duration;
        }
        else
        {
          return calendarEvent.start.asTime().format( this.formats.time );
        }
      }

      let pattern = Pattern.findMatch( schedule );

      if (pattern && pattern.name !== 'custom')
      {
        let description = pattern.describe( calendarEvent.start );

        if (!schedule.isFullDay())
        {
          description += ' at ' + schedule.describeArray( schedule.times, x => x.format( this.formats.time ) );
        }

        description += ' (' + this.duration + ')';

        return description;
      }

      let described = schedule.describe('event', false);

      return described.substring( 20 ) + ' (' + this.duration + ')';
    }
  },

  data: vm => ({
    details: vm.$dayspan.getEventDetails(
      vm.calendarEvent.event.data,
      vm.calendarEvent.event,
      vm.calendarEvent
    )
  }),

  methods:
  {

  }
}
</script>

<style scoped lang="scss">

.v-btn--floating.v-btn--left {
  margin-left: 0px;

  .v-icon {
    height: auto;
  }
}

.v-toolbar__extension {

  .v-toolbar__title {
    margin-left: 48px;
  }
}

.v-card__text {
  padding: 16px 0;

  .v-list {

    .v-list__tile {
      padding: 0px !important;
      height: auto;

      .v-list__tile__sub-title {

      }
    }
  }
}

</style>
