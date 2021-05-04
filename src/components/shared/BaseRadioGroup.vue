<template>
  <v-radio-group
    :row="row ? row : null"
    v-bind="$attrs"
    :value="value"
    :rules="required ? requiredRule : ''"
    @change="updateValue"
  >
    <v-radio
      v-for="(button, index) in buttons"
      :key="index"
      :label="button.label"
      :value="button.value"
    ></v-radio>
  </v-radio-group>
</template>

<script>
import { formFieldMixin } from '../../mixins/formFieldMixin';

export default {
  name: 'BaseRadioGroup',
  mixins: [formFieldMixin],
  props: {
    buttons: {
      label: { type: String },
      value: { type: String },
    },
    row: { type: String, default: '' },
  },
};
</script>

<style></style>
