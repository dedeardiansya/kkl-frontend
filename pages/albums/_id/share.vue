<template>
  <div>
    <block-create-share
      :target="album.id"
      class="mb-3"
      type="album"
      @shareCreated="onShareCreated"
    />
    <b-table
      striped
      hover
      :fields="[
        { key: 'title', label: 'Judul' },
        { key: 'expiredAt', label: 'Kadaluarsa pada' },
        { key: 'action', label: 'Aksi', class: 'text-center width-230' },
      ]"
      :items="album.share"
    >
      <template #cell(size)="{ item }">
        {{ prettyBytes(item.size) }}
      </template>
      <template #cell(expiredAt)="{ item }">
        <span
          :class="isExpired(item.expiredAt) ? 'text-danger' : 'text-primary'"
        >
          {{ item.expiredAt ? formatDate(item.expiredAt) : '-' }}
        </span>
      </template>
      <template #cell(action)="{ item }">
        <b-button variant="primary" size="sm" :to="`/share/${item.token}`"
          >Open</b-button
        >
        <b-button variant="primary" size="sm" @click.prevent="copy(item.token)"
          >Copy Link</b-button
        >
        <b-button
          v-if="$can('Delete Share')"
          variant="danger"
          size="sm"
          @click.prevent="deleteShare(item.id)"
          >Hapus</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
import moment from 'moment'
import prettyBytes from 'pretty-bytes'
import copy from 'copy-to-clipboard'
export default {
  props: {
    album: {
      type: Object,
      default: () => ({}),
    },
  },
  head() {
    return {
      title: 'Share - ' + this.album.name,
    }
  },
  methods: {
    prettyBytes(b) {
      return prettyBytes(b)
    },
    copy(token) {
      const url = `${this.$config.baseUrl}/share/${token}`
      this.$bvToast.toast(`Link: ${url}`, {
        variant: 'success',
        title: 'Link Berhasil dicopy',
      })

      return copy(url)
    },
    formatDate(time) {
      moment.locale('id')
      return moment(time).fromNow()
    },
    isExpired(time) {
      return time && moment().isAfter(moment(time))
    },
    onMediaUpdated(media) {
      this.$emit('mediaUpdated', media)
    },
    onShareCreated(share) {
      this.$emit('shareCreated', share)
    },
    async deleteShare(id) {
      const res = await this.$deleteConfirm(
        'Anda yakin ingin menghapus link ini?'
      )
      if (!res) return true
      try {
        const media = await this.$axios.$delete('/media/' + id)
        this.$emit('mediaUpdated', media)
      } catch (e) {
        this.$sw('Gagal menghapus link', this.$errorMessage(e))
      }
    },
  },
}
</script>
