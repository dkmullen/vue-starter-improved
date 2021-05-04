<template>
  <v-container>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          :label="label"
          :rules="requiredRule"
          class="required"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        @input="menu = false"
        @change="onDateChange"
      ></v-date-picker>
    </v-menu>
  </v-container>
</template>

<script>
// import { mapActions } from 'vuex';

export default {
  name: 'DatePicker',
  props: ['label'],
  data: () => ({
    valid: false,
    menu: false,
    date: '',
    requiredRule: [(v) => !!v || 'This field is required.'],
  }),
  methods: {
    onDateChange() {
      this.$emit('dateSelected', this.date);
    },
  },
};
</script>
