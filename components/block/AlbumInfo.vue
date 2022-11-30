<template>
  <div>
    <b-alert variant="danger" :show="!!danger">{{ danger }}</b-alert>
    <b-form-group
      label="Nama Album:"
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
      label="Deskripsi:"
      label-for="description"
      :invalid-feedback="errors?.description"
    >
      <b-form-textarea
        id="description"
        v-model="form.description"
        placeholder="Deskripsi"
        :state="errors?.description ? false : null"
      />
    </b-form-group>
    <b-button
      v-if="album.name !== form.name || album.description !== form.description"
      variant="primary"
      :disabled="loading"
      @click="submit()"
      ><b-spinner small v-if="loading" /> Simpan</b-button
    >
  </div>
</template>

<script>
export default {
  name: 'ModalCreateAlbum',
  props: {
    album: {
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
        description: '',
      },
    }
  },
  mounted() {
    this.form.name = this.album?.name || ''
    this.form.description = this.album?.description || ''
  },
  methods: {
    async submit() {
      this.loading = true
      this.errors = null
      try {
        const album = await this.$axios.$put(
          '/albums/' + this.album.id,
          this.form
        )
        this.$emit('albumUpdated', album)
        this.form = {
          name: album.name,
          description: album.description,
        }
        this.$bvToast.toast(`Album berhasil diperbarui.`, {
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
