<template>
  <div>
    <p>Test One</p>
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
  </div>
</template>

<script>
export default {
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
    storeData() {
      console.log('Storing TestOne');
    },
  },
  updated() {
    this.$emit('formValid', ['testOne', this.valid ? true : false]);
  },
};
</script>

<style></style>
