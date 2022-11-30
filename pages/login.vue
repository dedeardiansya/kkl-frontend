<template>
  <b-card header="Login" class="shadow-sm">
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
      <b-form-group
        label="Password:"
        label-for="password"
        :invalid-feedback="errors?.password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="form.password"
          placeholder="Enter password"
          :state="errors?.password ? false : null"
        />
      </b-form-group>

      <b-button type="submit" variant="primary" block :disabled="loading">
        <b-spinner small v-if="loading" /> Masuk
      </b-button>
      <hr />
      <div class="text-center">
        <b-button to="/password/forgot" variant="link">
          Lupa password?
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
      title: 'Login',
    }
  },
  data() {
    return {
      danger: '',
      errors: null,
      loading: false,
      form: {
        email: '',
        password: '',
      },
    }
  },
  mounted() {
    if (this.$route.query.reset)
      this.$sw('Sukses', `Password telah diupdate. Silahkan login.`, 'success')
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      this.danger = ''
      try {
        const token = await this.$axios.$post('/auth/login', this.form)
        this.$store.commit('setToken', token)
        window.location = '/'
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
