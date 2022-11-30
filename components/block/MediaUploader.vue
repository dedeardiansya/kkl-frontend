<template>
  <div :class="{ 'border-danger': error }">
    <div class="position-relative border bg-light py-5 px-4">
      <div class="text-center">
        {{
          loading
            ? uploadMessage
            : error || 'Klik atau seret media anda disini untuk mengupload.'
        }}
      </div>
      <input
        ref="input"
        type="file"
        :disabled="loading"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script>
import FormData from 'form-data'
export default {
  props: {
    target: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      name: '',
      percent: 0,
      loading: false,
      error: '',
    }
  },
  computed: {
    uploadMessage() {
      if (this.percent < 100) {
        return `${this.percent}%`
      }
      return 'Media anda sedang diproses...'
    },
  },
  methods: {
    onUploadProgress(ev) {
      this.percent = Math.round((ev.loaded * 100) / ev.total)
    },
    async handleChange(ev) {
      this.loading = true
      const config = {
        onUploadProgress: this.onUploadProgress,
      }
      try {
        const files = ev.target.files
        if (files.length === 0) throw new Error('File not found')
        const file = files[0]
        const data = new FormData()
        data.append('file', file)
        const media = await this.$axios.$post(
          `/media/${this.target}`,
          data,
          config
        )
        this.$emit('mediaUpdated', media)
      } catch (e) {
        const { errors } = this.$errorResponse(e)
        if (errors?.file) {
          this.error = errors.file
        } else {
          this.$bvToast.toast(this.$errorMessage(e), {
            variant: 'danger',
            title: 'Upload Gagal',
          })
        }
      }
      this.loading = false
    },
  },
}
</script>

<style scoped>
input {
  position: absolute;
  z-index: 10;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
