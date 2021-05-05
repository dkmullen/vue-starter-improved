<template>
  <v-stepper v-model="e1" alt-labels>
    <v-stepper-header>
      <template v-for="(step, index) in steps">
        <v-stepper-step
          :complete="e1 > index + 1"
          :step="index + 1"
          :key="index"
          :editable="stepsCompleted >= index + 1 && !disableNav"
        >
          {{ step.label }}
        </v-stepper-step>
        <v-divider
          v-if="index + 1 < steps.length"
          :key="index + 100"
        ></v-divider>
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content
        v-for="(step, index) in steps"
        :key="index"
        :step="index + 1"
      >
        <v-card class="mb-12" height="200px">
          <TestOne ref="testOne" v-if="index === 0" @formValid="setValid" />
          <TestTwo ref="testTwo" v-if="index === 1" @formValid="setValid" />
          <TestThree ref="testThree" v-if="index === 2" @formValid="setValid" />
        </v-card>

        <v-btn
          color="primary"
          @click="stepForward()"
          v-if="e1 < steps.length"
          :disabled="!step.valid"
        >
          Continue
        </v-btn>
        <v-btn text @click="e1 = e1 - 1" v-if="e1 > 1" :disabled="disableNav">
          Back
        </v-btn>
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
      stepsCompleted: 1,
      disableNav: false,
      steps: [
        { name: 'testOne', label: 'Whatevs', valid: false, completed: false },
        { name: 'testTwo', label: 'Two', valid: false, completed: false },
        { name: 'testThree', label: 'Tres', valid: false, completed: false },
      ],
    };
  },
  methods: {
    stepForward() {
      this.e1++;
      this.stepsCompleted++;
      if (this.stepsCompleted < this.e1) {
        this.stepsCompleted = this.e1;
      }
    },
    setValid(formInfo) {
      let obj = this.steps.find((o) => o.name === formInfo[0]);
      obj.valid = formInfo[1];
      setTimeout(() => {
        if (obj.valid) {
          obj.completed = true;
          this.$refs[obj.name][0].storeData();
        }
        this.disableNav = !obj.valid && obj.completed ? true : false;
      }, 100);
    },
  },
};
</script>
