<template>
  <b-card header="Lupa password" class="shadow-sm">
    <b-form @submit.prevent="submit">
      <b-alert variant="danger" :show="!!danger">{{ danger }}</b-alert>
      <b-form-group
        label="Email address:"
        label-for="email"
        :invalid-feedback="errors?.email"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          :state="errors?.email ? false : null"
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
      title: 'Lupa password',
    }
  },
  data() {
    return {
      danger: '',
      errors: null,
      loading: false,
      form: {
        email: '',
      },
    }
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      this.danger = ''
      try {
        await this.$axios.$post('/auth/password', this.form)
        this.$router.push('/password/verify?email=' + this.form.email)
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
