<template>
  <div>
    <b-alert variant="danger" :show="!!danger">{{ danger }}</b-alert>
    <b-form-group
      label="Judul:"
      label-for="title"
      :invalid-feedback="errors?.title"
    >
      <b-form-input
        id="title"
        v-model="form.title"
        placeholder="Judul"
        :state="errors?.title ? false : null"
      />
    </b-form-group>
    <b-form-group
      label="Durasi [kosongkan jika tidak menggunakan durasi] [jam]:"
      label-for="durations"
      :invalid-feedback="errors?.durations"
    >
      <b-form-input
        id="durations"
        type="number"
        v-model="form.durations"
        placeholder="Durasi (jam)"
        :state="errors?.durations ? false : null"
      />
    </b-form-group>
    <b-button variant="primary" :disabled="loading" @click="submit()"
      ><b-spinner small v-if="loading" /> Buat Share</b-button
    >
  </div>
</template>

<script>
export default {
  name: 'BlockCreateShare',
  props: {
    target: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: false,
      errors: null,
      danger: '',
      form: {
        title: '',
        durations: '',
      },
    }
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      const url = `/share/${this.target}`
      try {
        const share = await this.$axios.$post(url, this.form)
        this.$emit('shareCreated', share)
        this.form = {
          title: '',
          durations: '',
        }
        this.$bvToast.toast(`Share berhasil dibuat.`, {
          variant: 'success',
          title: 'Sukses',
        })
      } catch (e) {
        const { errors } = this.$errorResponse(e)
        this.errors = errors
        if (!errors) this.danger = this.$errorMessage(e)
      }
      this.loading = false
    },
  },
}
</script>
