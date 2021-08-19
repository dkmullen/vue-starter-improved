<template>
  <v-form v-model="valid" class="form">
    <v-container>
      <v-row v-for="row in mainRows" :key="mainRows[row]">
        <v-col cols="12" md="6" v-for="n in 2" :key="n">
          <BaseInput
            v-if="row[n - 1]"
            v-model="formData[row[n - 1]].model"
            :required="formData[row[n - 1]].required"
            :label="formData[row[n - 1]].label"
            :type="formData[row[n - 1]].type ? formData[row[n - 1]].type : ''"
            :maxlen="formData[row[n - 1]].maxlength"
            :id="formData[row[n - 1]].id"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <BaseBirthdayPicker id="dob" />
        </v-col>
        <v-col cols="12" md="6">
          <BaseSelect
            id="favorite"
            :label="formData.favorite.label"
            :items="formData.favorite.items"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    valid: false,
    mainRows: [
      ['firstName', 'lastName'],
      ['email', 'phone'],
      ['city', 'state'],
      ['zip', 'password'],
    ],
    formData: {
      firstName: {
        label: 'First Name',
        model: '',
        maxlength: 50,
        required: true,
        id: 'firstName',
      },
      lastName: {
        label: 'Last Name',
        model: '',
        maxlength: 50,
        required: true,
        id: 'lastName',
      },
      email: {
        label: 'Email',
        model: '',
        maxlength: 50,
        required: true,
        id: 'email',
        type: 'email',
      },
      phone: {
        label: 'Phone',
        model: '',
        required: true,
        id: 'phone',
        type: 'tel',
      },
      city: {
        label: 'City',
        model: '',
        required: true,
        id: 'city',
        maxlength: 50,
      },
      state: {
        label: 'State',
        model: '',
        required: true,
        id: 'state',
        type: 'state',
        maxlength: 2,
      },
      zip: {
        label: 'Zip',
        model: '',
        required: true,
        id: 'zip',
        maxlength: 5,
        type: 'zip',
      },
      password: {
        label: 'Password',
        model: '',
        required: true,
        id: 'password',
        maxlength: 20,
        type: 'password',
      },
      dob: {
        model: '',
      },
      favorite: {
        label: 'Favorite',
        items: ['Larry', 'Curly', 'Moe'],
      },
    },
  }),
};
</script>

<style lang="scss" scoped></style>
