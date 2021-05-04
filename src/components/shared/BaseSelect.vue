<template>
  <v-select
    :label="label"
    :rules="required ? requiredRule : ''"
    :items="items"
    @input="updateValue"
    :class="required ? 'required' : ''"
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    :tooltip="tooltip"
  >
    <template v-slot:append-outer v-if="tooltip">
      <BaseTooltip :content="tooltip" />
    </template>
  </v-select>
</template>

<script>
import { formFieldMixin } from '../../mixins/formFieldMixin';

export default {
  name: 'BaseSelect',
  mixins: [formFieldMixin],
  props: {
    items: {
      type: Array,
      required: true,
    },
    tooltip: { type: String, default: '' },
  },
};
</script>

<style></style>
