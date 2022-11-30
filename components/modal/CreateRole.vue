<template>
  <div>
    <b-button v-b-modal.modal-create-role variant="primary" size="sm"
      >Buat Peran</b-button
    >
    <b-modal
      id="modal-create-role"
      title="Buat Peran"
      size="lg"
      no-close-on-backdrop
    >
      <div>
        <b-alert variant="danger" :show="!!danger">{{ danger }}</b-alert>
        <b-form-group
          label="Nama peran:"
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
          label="Izin:"
          label-for="permissions"
          :invalid-feedback="errors?.permissions"
        >
          <b-form-select
            id="permissions"
            v-model="form.permissions"
            multiple
            :options="permissions"
            :state="errors?.permissions ? false : null"
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
    permissions: {
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
        permissions: [],
      },
    }
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      try {
        const role = await this.$axios.$post('/roles', this.form)
        this.$emit('onCreated', role)
        this.$bvModal.hide('modal-create-role')
        this.form = {
          name: '',
          permissions: [],
        }
        this.$bvToast.toast(`Berhasil membuat peran baru.`, {
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
