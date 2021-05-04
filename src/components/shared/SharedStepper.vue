<template>
  <v-stepper v-model="e1" alt-labels non-linear>
    <v-stepper-header>
      <template v-for="(step, index) in steps">
        <v-stepper-step
          :complete="e1 > index + 1"
          :step="index + 1"
          :key="index"
        >
          {{ step.name }}
        </v-stepper-step>
        <v-divider v-if="index + 1 < steps.length" :key="index"></v-divider>
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content
        v-for="(step, index) in steps"
        :key="index"
        :step="index + 1"
      >
        <v-card class="mb-12" color="grey lighten-1" height="200px">
          <TestOne v-if="index === 0" />
          <TestTwo v-if="index === 1" />
          <TestThree v-if="index === 2" />
        </v-card>

        <v-btn color="primary" @click="e1 = e1 + 1" v-if="e1 < steps.length">
          Continue
        </v-btn>
        <v-btn text @click="e1 = e1 - 1" v-if="e1 > 1"> Back </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import TestOne from '../TestOne';
import TestTwo from '../TestTwo';
import TestThree from '../TestThree';
export default {
  components: { TestOne, TestTwo, TestThree },
  data() {
    return {
      e1: 1,
      steps: [{ name: 'Whatevs' }, { name: 'Two' }, { name: 'Tres' }],
    };
  },
};
</script>
