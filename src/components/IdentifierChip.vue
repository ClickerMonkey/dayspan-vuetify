<template>
  <v-chip label
    :close="canRemove"
    @input="remove">
    <strong v-html="text"></strong>
    <span v-html="description"></span>
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue';
import { Identifier } from 'dayspan';


export default Vue.extend({

  name: 'dsIdentifierChip',

  props:
  {
    identifier:
    {
      required: true,
      validator: (x) => typeof x === 'string' || typeof x === 'number'
    },

    description:
    {
      type: String,
      default() {
        return this.$dsDefaults().description;
      }
    },

    short:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().short;
      }
    },

    canRemove:
    {
      type: Boolean,
      default() {
        return this.$dsDefaults().canRemove;
      }
    }
  },

  computed:
  {
    text()
    {
      return Identifier.find( this.identifier ).describe( this.identifier, this.short );
    }
  },

  methods:
  {
    remove()
    {
      this.$emit('remove', this.identifier);
    }
  }
});
</script>

<style lang="scss">

</style>
