<template>
  <div class="ds-event"
    :style="style"
    @click.stop="edit">

    <span v-if="showName">
      <slot name="titleFull" :calendarEvent="calendarEvent" :hasPrefix="hasPrefix" :getPrefix="getPrefix">
        <span v-if="hasPrefix">
          {{ getPrefix }}
        </span>
        <strong>{{ eventTitle }}</strong>
      </slot>
    </span>

    <span v-else>
      <slot name="emptyFull" :calendarEvent="calendarEvent">&nbsp;</slot>
    </span>

  </div>
</template>

<script>
export default {
  name: 'dsEvent',
  props: ['calendarEvent', 'index', 'calendar'],
  computed: {
    eventTitle: function() {
      return this.$dayspan.getEventTitle( this.calendarEvent.event, this.calendarEvent );
    },
    style: function() {
      return this.$dayspan.getStyleFull( this.calendarEvent, this.index );
    },
    sameDayEvents: function() {
      return this.calendarEvent.event.schedule.iterateSpans(this.calendarEvent.day, true).list();
    },
    hasPrefix: function() {
      return !this.calendarEvent.fullDay && this.sameDayEvents.length > 0;
    },
    getPrefix: function() {
      return this.$dayspan.getPrefix( this.calendarEvent, this.sameDayEvents );
    },
    showName: function() {
      return this.calendarEvent.starting || (
        this.calendar &&
        !this.calendar.filled.contains( this.calendarEvent.time.start ) &&
        this.calendar.filled.start.sameDay( this.calendarEvent.day )
      );
    }
  },
  methods: {
    edit: function() {
      this.$emit('edit', this.calendarEvent);
    }
  }
}
</script>

<style scoped lang="scss">
.ds-event {
  margin: 1px;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 0.5em;
  font-size: 12px;
  cursor: pointer;
  position: relative;
  user-select: none;
}
</style>
