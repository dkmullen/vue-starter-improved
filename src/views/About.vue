<template>
  <v-container class="about">
    <h1>This is an about page</h1>

    <div class="spacer"></div>
    <shared-stepper></shared-stepper>
  </v-container>
</template>

<script>
import SharedStepper from '../components/shared/SharedStepper';
export default {
  name: 'AboutForm',
  components: { SharedStepper },
};
</script>

<style lang="scss" scoped>
.spacer {
  height: 3rem;
}
</style>
