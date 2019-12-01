<template>

  <span>

    <v-menu offset-y
            :close-on-content-click="false"
            :nudge-width="60"
            :disabled="isReadOnly"
            v-model="startMenu">
      <template v-slot:activator="{ on }">
        <v-btn depressed
               class="ds-button-tall ma-0 mb-2"
               v-on="on">
          {{ startText }}
        </v-btn>
      </template>

      <div class="ds-span-menu">

        <ds-day-picker
                :highlight-span="hasStart"
                :span="startSpan"
                @picked="setStart"></ds-day-picker>

        <v-btn block text
               class="mb-0"
               v-if="hasStart"
               @click="setStart( null )">
          <span v-html="labels.startless"></span>
        </v-btn>

      </div>

    </v-menu>

    &nbsp;&nbsp;to&nbsp;&nbsp;

    <v-menu offset-y
            :close-on-content-click="false"
            :nudge-width="60"
            :disabled="isReadOnly"
            v-model="endMenu">

      <template v-slot:activator="{ on }">
        <v-btn depressed
               class="ds-button-tall ma-0 mb-2"
               v-on="on">
          {{ endText }}
        </v-btn>
      </template>

      <div class="ds-span-menu">

        <ds-day-picker
                :highlight-span="hasEnd"
                :span="endSpan"
                @picked="setEnd"></ds-day-picker>

        <v-btn block text
               class="mb-0"
               v-if="hasEnd"
               @click="setEnd( null )">
          <span v-html="labels.endless"></span>
        </v-btn>

      </div>

    </v-menu>

  </span>

</template>

<script>
import { Day, DaySpan, Schedule, Functions as fn } from 'dayspan'

export default {

    name: 'dsScheduleSpan',

    props:
        {
            schedule:
                {
                    required: true,
                    type: Schedule
                },

            day:
                {
                    type: Day
                },

            readOnly:
                {
                    type: Boolean,
                    default: false
                },

            labels:
                {
                    validate (x) {
                        return this.$dsValidate(x, 'labels')
                    },
                    default () {
                        return this.$dsDefaults().labels
                    }
                },

            formats:
                {
                    validate (x) {
                        return this.$dsValidate(x, 'formats')
                    },
                    default () {
                        return this.$dsDefaults().formats
                    }
                }
        },

    data: vm => ({
        startMenu: false,
        endMenu: false
    }),

    computed:
        {
            hasStart () {
                return !!this.schedule.start
            },

            hasEnd () {
                return !!this.schedule.end
            },

            startSpan: function () {
                var point = this.schedule.start || this.day

                return point ? DaySpan.point(point) : null
            },

            startText () {
                return this.schedule.start ? this.schedule.start.format(this.formats.start) : this.labels.startless
            },

            endSpan () {
                var point = this.schedule.end || this.day

                return point ? DaySpan.point(point) : null
            },

            endText () {
                return this.schedule.end ? this.schedule.end.format(this.formats.end) : this.labels.endless
            },

            isReadOnly () {
                return this.readOnly || this.$dayspan.readOnly
            }
        },

    methods:
        {
            setStart (start) {
                var ev = this.getEvent('start', {start})

                this.$emit('start', ev)

                if (!ev.handled && ev.schedule) {
                    ev.schedule.start = ev.start
                    ev.handled = true
                }

                this.startMenu = false

                this.$emit('change', ev)
            },

            setEnd (end) {
                var ev = this.getEvent('end', {end})

                this.$emit('end', ev)

                if (!ev.handled && ev.schedule) {
                    ev.schedule.end = ev.end
                    ev.handled = true
                }

                this.endMenu = false

                this.$emit('change', ev)
            },

            getEvent (type, extra = {}) {
                return fn.extend({

                    type: type,
                    schedule: this.schedule,
                    day: this.day,
                    handled: false,
                    $vm: this,
                    $element: this.$el

                }, extra)
            }
        }
}
</script>

<style scoped lang="scss">

    .ds-span-menu {
        width: 260px;
        padding: 10px;
        background-color: white;
    }

</style>
