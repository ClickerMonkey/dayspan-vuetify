<template>
  <div class="ds-week">
    <template v-for="(day, i) in days">
      <ds-day
        v-bind="{ scopedSlots: $scopedSlots }"
        :key="i"
        :day="day"
        :calendar="calendar"
        @edit="edit"
        @add="add"></ds-day>
    </template>
  </div>
</template>

<script>
import dsDay from './Day';

export default {
  name: 'dsDayRow',
  props: ['days', 'calendar'],
  components: { dsDay },
  methods: {
    edit: function(eventDay) {
      this.$emit('edit', eventDay);
    },
    add: function(day) {
      this.$emit('add', day);
    }
  }
}
</script>

<style scoped lang="scss">
.ds-week {
  display: flex;
  flex: 1;
}
</style>
