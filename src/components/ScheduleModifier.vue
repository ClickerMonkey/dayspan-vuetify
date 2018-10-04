<template>
  <div>

    <div class="pb-3"
      v-if="description"
      v-html="description"></div>

    <template v-for="id in identifiers">

      <ds-identifier-chip
        :key="id"
        :identifier="id"
        :can-remove="canRemove && !isReadOnly"
        @remove="remove"
      ></ds-identifier-chip>

    </template>

  </div>
</template>

<script>
import { ScheduleModifier, Functions as fn } from 'dayspan';


export default {

  name: 'dsScheduleModifier',

  props:
  {
    modifier:
    {
      required: true,
      type: ScheduleModifier
    },

    readOnly:
    {
      type: Boolean,
      default: false
    },

    canRemove:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().canRemove;
      }
    },

    description:
    {
      type: String,
      default() {
        return this.$dsDefaults().description;
      }
    }
  },

  data: vm => ({

  }),

  computed:
  {
    identifiers()
    {
      return this.modifier.identifiers(x => x).list();
    },

    isReadOnly()
    {
      return this.readOnly || this.$dayspan.readOnly;
    }
  },

  methods:
  {
    remove(identifier)
    {
      var ev = this.getEvent('remove', { identifier });

      if (!ev.handled && ev.modifier)
      {
        ev.modifier.map[ identifier ] = false;
        ev.handled = true;
      }

      this.$emit('change', ev);
    },

    getEvent(type, extra = {})
    {
      return fn.extend({

        type: type,
        modifier: this.modifier,
        handled: false,
        $vm: this,
        $element: this.$el

      }, extra);
    }
  }
}
</script>

<style lang="scss">

</style>
