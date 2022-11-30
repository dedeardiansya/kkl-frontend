<template>
  <div>
    <b-button v-b-modal.modal-create-user variant="primary" size="sm"
      >Buat User</b-button
    >
    <b-modal
      id="modal-create-user"
      title="Buat User"
      size="lg"
      no-close-on-backdrop
    >
      <div>
        <b-alert variant="danger" :show="!!danger">{{ danger }}</b-alert>
        <b-form-group
          label="Nama:"
          label-for="name"
          :invalid-feedback="errors?.name"
        >
          <b-form-input
            id="name"
            v-model="form.name"
            placeholder="Nama"
            :state="errors?.name ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="Alamat Email:"
          label-for="email"
          :invalid-feedback="errors?.email"
        >
          <b-form-input
            id="email"
            v-model="form.email"
            placeholder="Email"
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
            placeholder="Password"
            :state="errors?.password ? false : null"
          />
        </b-form-group>
        <b-form-group
          label="Peran:"
          label-for="role"
          :invalid-feedback="errors?.roleId"
        >
          <b-form-select
            id="role"
            v-model="form.roleId"
            :options="[...roles.map((el) => ({ value: el.id, text: el.name }))]"
            :state="errors?.roleId ? false : null"
          />
        </b-form-group>
      </div>
      <template #modal-footer="{ cancel }">
        <b-button variant="primary" :disabled="loading" @click="submit()"
          ><b-spinner small v-if="loading" /> Buat</b-button
        >
        <b-button variant="danger" @click="cancel()">Batal</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ModalCreateRole',
  props: {
    roles: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      errors: null,
      danger: '',
      form: {
        name: '',
        email: '',
        password: '',
        roleId: '',
      },
    }
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      try {
        const role = await this.$axios.$post('/users', this.form)
        this.$emit('onCreated', role)
        this.$bvModal.hide('modal-create-user')
        this.form = {
          name: '',
          permissions: [],
        }
        this.$bvToast.toast(`Berhasil membuat user baru.`, {
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
