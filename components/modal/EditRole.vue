<template>
  <div>
    <b-button
      @click="$bvModal.show('modal-edit-role-' + role.id)"
      variant="primary"
      size="sm"
      >Edit</b-button
    >
    <b-modal
      :id="'modal-edit-role-' + role.id"
      title="Edit Peran"
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
          ><b-spinner small v-if="loading" /> Simpan</b-button
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
    role: {
      type: Object,
      default: () => ({}),
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
  mounted() {
    this.form.name = this.role.name || ''
    this.form.permissions = this.role.permissions || []
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      try {
        const role = await this.$axios.$put('/roles/' + this.role.id, this.form)
        this.$emit('onUpdated', role)
        this.$bvModal.hide('modal-edit-role-' + role.id)
        this.form = {
          name: role.name,
          permissions: role.permissions,
        }
        this.$bvToast.toast(`Berhasil memperbarui peran.`, {
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
