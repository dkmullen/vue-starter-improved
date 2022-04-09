<template>
  <v-container class="about">
    <v-form v-model="valid" @submit.prevent="submit">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <BaseInput
              id="username"
              label="Username"
              v-model="username"
              required
            />
            <BaseInput
              id="password"
              label="Password"
              v-model="password"
              type="password"
              required
            />
            <BaseInput id="email" label="Email" v-model="email" type="email" />
            <BaseInput id="phone" label="Phone" v-model="phone" />
          </v-col>
          <v-col cols="12" md="6"> </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
          <v-btn depressed color="primary" type="submit"> Submit </v-btn>
        </v-row>
      </v-container>
    </v-form>
    <v-form v-model="valid2" @submit.prevent="authMe">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <BaseInput
              id="username2"
              label="Uname"
              v-model="username2"
              required
            />
            <BaseInput
              id="password2"
              label="Code"
              v-model="password2"
              required
            />
          </v-col>
          <v-col cols="12" md="6"> </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
          <v-btn depressed color="primary" type="submit"> Auth Me </v-btn>
        </v-row>
      </v-container>
    </v-form>
    <v-form v-model="valid3" @submit.prevent="signIn">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <BaseInput
              id="username3"
              label="Uname"
              v-model="username3"
              required
            />
            <BaseInput id="password3" label="Pw" v-model="password3" required />
          </v-col>
          <v-col cols="12" md="6"> </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
          <v-btn depressed color="primary" type="submit"> Sign In </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import * as auth from '../services/authService';

export default {
  name: 'AboutForm',
  methods: {
    submit() {
      if (this.valid) {
        auth.signUp(this.username, this.password, this.email, this.phone);
      }
    },
    authMe() {
      if (this.valid2) {
        auth.authenticateNewUser(this.username2, this.password2);
      }
    },
    signIn() {
      if (this.valid3) {
        auth.signIn(this.username3, this.password3);
      }
    },
  },
  data: () => ({
    valid: false,
    valid2: false,
    valid3: false,
    username: '',
    password: '',
    username2: '',
    password2: '',
    username3: '',
    password3: '',
    email: '',
    phone: '',
  }),
};
</script>

<style lang="scss" scoped>
.spacer {
  height: 3rem;
}
</style>
