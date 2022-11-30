<template>
  <b-card header="Reset password" class="shadow-sm">
    <b-form @submit.prevent="submit">
      <b-alert variant="danger" :show="!!danger">{{ danger }}</b-alert>
      <b-form-group
        label="Password baru:"
        label-for="password"
        :invalid-feedback="errors?.password"
      >
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          :state="errors?.password ? false : null"
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
      title: 'Reset Password',
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
    if (!query.email || !query.code) return error('Code and Email is required')
    return {
      form: {
        code: query.code,
        email: query.email,
        password: '',
      },
    }
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      this.danger = ''
      try {
        await this.$axios.$put('/auth/password', this.form)
        this.$router.push('/login?reset=1')
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
