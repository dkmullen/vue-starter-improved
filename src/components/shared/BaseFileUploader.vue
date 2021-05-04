<template>
  <div>
    <v-file-input
      chips
      :class="required ? 'required' : ''"
      :label="item.label"
      :loading="loading"
      :success="success"
      :prepend-icon="success ? 'mdi-check-bold' : 'mdi-paperclip'"
      small-chips
      truncate-length="15"
      accept=".pdf"
      :rules="required ? requiredRule : noRule"
      @change="store($event)"
    >
      <template v-slot:prepend>
        <v-icon v-if="success">mdi-email</v-icon>
      </template>
      <template v-slot:append-outer>
        <BaseTooltip :content="item.helptext" />
      </template>
    </v-file-input>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { formFieldMixin } from '../../mixins/formFieldMixin';

export default {
  name: 'FileUploader',
  mixins: [formFieldMixin],
  computed: mapGetters(['attachmentList', 'applicationNumber']),
  props: ['item'],
  data() {
    return {
      loading: false,
      success: false,
      file: null,
      noRule: [],
    };
  },
  methods: {
    ...mapActions(['submitFile']),
    store(e) {
      this.file = e;
    },
    keepIt() {
      console.log('pal');
    },
    async upLoad() {
      if (this.file) {
        let f = new File(
          [this.file],
          `${this.applicationNumber}_${this.file.name}`,
          {
            type: this.file.type,
            lastModified: this.file.lastModified,
          }
        );
        console.log(f);
        this.loading = true;
        await this.submitFile(f);
        this.loading = false;
        this.success = true;
        this.done = true;
      }
    },
  },
};
</script>
