<template>
  <b-card header="Verifikasi alamat email" class="shadow-sm">
    <b-form @submit.prevent="submit">
      <b-alert variant="info" :show="!danger"
        >Periksa alamat email anda dan masukan 6 digit kode verifikasi pada
        kolom dibawah.</b-alert
      >
      <b-alert variant="danger" :show="!!danger">{{ danger }}</b-alert>
      <b-form-group
        label="Kode verifikasi:"
        label-for="code"
        :invalid-feedback="errors?.code"
      >
        <b-form-input
          id="code"
          v-model="form.code"
          placeholder="Enter code"
          :state="errors?.code ? false : null"
        />
      </b-form-group>

      <b-button type="submit" variant="primary" block :disabled="loading">
        <b-spinner small v-if="loading" /> Submit
      </b-button>
      <hr />
      <div class="text-center">
        <b-button to="/login" variant="link">
          Kembali kehalaman login
        </b-button>
      </div>
    </b-form>
  </b-card>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'auth',
  middleware: ['guest'],
  head() {
    return {
      title: 'Verifikasi kode token',
    }
  },
  data() {
    return {
      danger: '',
      errors: null,
      loading: false,
    }
  },
  asyncData({ query, error }) {
    if (!query.email) return error('Email is required')
    return {
      form: {
        code: '',
        email: query.email,
      },
    }
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      this.danger = ''
      try {
        await this.$axios.$get('/auth/password', { params: this.form })
        this.$router.push({ path: '/password/reset', query: this.form })
      } catch (e) {
        const { errors } = this.$errorResponse(e)
        this.errors = errors
        if (!errors) this.danger = this.$errorMessage(e)
        this.loading = false
      }
    },
  },
}
</script>
