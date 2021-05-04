<template>
  <v-textarea
    :rules="required ? requiredRule : ''"
    :label="label"
    @input="updateValue"
    :class="required ? 'required' : ''"
    filled
    :rows="rows"
    v-on="listeners"
    :maxlength="maxlength"
    :counter="counter"
  ></v-textarea>
</template>

<script>
import { formFieldMixin } from '../../mixins/formFieldMixin';

export default {
  name: 'BaseTextArea',
  mixins: [formFieldMixin],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
  props: {
    rows: { type: Number, default: 4 },
    maxlength: { type: Number, default: null },
    counter: { type: Boolean, default: false },
  },
};
</script>

<style></style>
