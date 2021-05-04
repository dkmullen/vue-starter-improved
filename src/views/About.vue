<template>
  <v-container class="about">
    <h1>This is an about page</h1>

    <form>
      <v-row>
        <v-col cols="12" md="4">
          <BaseInput
            :required="true"
            :label="'Hello there'"
            v-model="meInput"
          />
        </v-col>
        <v-col cols="12" md="8">
          <BaseRadioGroup v-model="radio" :required="true" :buttons="buttons" />
        </v-col>
      </v-row>
    </form>
  </v-container>
</template>

<script>
export default {
  name: 'AboutForm',
  data() {
    return {
      meInput: '',
      radio: '',
      buttons: [
        { label: 'Uno', value: 'uno' },
        { label: 'Dos', value: 'dos' },
      ],
    };
  },
};
</script>
