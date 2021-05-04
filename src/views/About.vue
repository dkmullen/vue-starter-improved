<template>
  <v-container class="about">
    <h1>This is an about page</h1>

    <v-form v-model="valid" ref="form">
      <v-row>
        <v-col cols="12" md="6">
          <BaseInput
            :required="true"
            :label="'Hello there'"
            v-model="meInput"
          />
        </v-col>
        <v-col cols="12" md="6">
          <BaseRadioGroup
            v-model="radio"
            :required="true"
            :buttons="buttons"
            :row="'row'"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-btn class="mr-4" @click="submit" :disabled="!valid"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </v-row>
    </v-form>
    <div class="spacer"></div>
    <shared-stepper></shared-stepper>
  </v-container>
</template>

<script>
import SharedStepper from '../components/shared/SharedStepper';
export default {
  name: 'AboutForm',
  components: { SharedStepper },
  data() {
    return {
      valid: false,
      meInput: '',
      radio: '',
      buttons: [
        { label: 'Uno', value: 'uno' },
        { label: 'Dos', value: 'dos' },
        { label: 'Tres', value: 'tres' },
        { label: 'Quattro', value: 'four' },
      ],
    };
  },
  methods: {
    submit() {
      console.log('submit');
    },
    clear() {
      this.meInput = '';
      this.radio = '';
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style lang="scss" scoped>
.spacer {
  height: 3rem;
}
</style>
