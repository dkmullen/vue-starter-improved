<template>
  <v-text-field
    :rules="required ? requiredRule.concat(typeRule) : typeRule"
    :label="label"
    :tooltip="tooltip"
    :type="type"
    @input="updateValue"
    :class="required ? 'required' : ''"
    clearable
    :disabled="disabled"
    v-bind="$attrs"
    v-on="listeners"
    :value="value"
  >
    <template v-slot:append-outer v-if="tooltip">
      <BaseTooltip :content="tooltip" />
    </template>
  </v-text-field>
</template>

<script>
import { formFieldMixin } from '../../mixins/formFieldMixin';

export default {
  name: 'BaseInput',
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
    type: { type: String, default: '' },
    tooltip: { type: String, default: '' },
  },
  data() {
    return {
      phoneHint: '(xxx) xxx-xxxx',
      phoneRule: [
        // Ten digits plus characters inserted by the mask
        (v) =>
          !v ||
          v.length === 17 ||
          `Enter a ten-digit phone number - ${this.phoneHint}`,
      ],
      emailRules: [
        (v) =>
          !v ||
          // eslint-disable-next-line
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            v
          ) ||
          'Email must be valid',
      ],
      zipRules: [
        (v) => /^\d+$/.test(v) || 'Please enter your five-digit zip code.',
        (v) =>
          (v && v.length === 5) || 'Please enter your five-digit zip code.',
      ],
      numbersOnlyRule: [
        (v) => /^\d+$/.test(v) || 'This field accepts numbers only.',
      ],
      typeRule: [],
    };
  },
  created() {
    switch (this.type) {
      case 'phone':
        return (this.typeRule = this.phoneRule);
      case 'email':
        return (this.typeRule = this.emailRules);
      case 'zip':
        return (this.typeRule = this.zipRules);
      case 'numbers':
        return (this.typeRule = this.numbersOnlyRule);
    }
  },
};
</script>

<style></style>
