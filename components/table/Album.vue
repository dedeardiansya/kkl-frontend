<template>
  <b-table striped :fields="fields" :items="albums">
    <template #cell(imageCount)="{ item }">
      {{ item.media.filter((el) => el.type === 'image').length }}
    </template>
    <template #cell(videoCount)="{ item }">
      {{ item.media.filter((el) => el.type === 'video').length }}
    </template>
    <template #cell(createdAt)="{ item }">
      {{ formatDate(item.createdAt) }}
    </template>
    <template #cell(action)="{ item }">
      <b-button variant="primary" size="sm" :to="'/albums/' + item.id">
        Lihat
      </b-button>
    </template>
  </b-table>
</template>

<script>
import moment from 'moment'
import prettyBytes from 'pretty-bytes'
import copy from 'copy-to-clipboard'

export default {
  name: 'TabelAlbum',
  props: {
    albums: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nama' },
        { key: 'imageCount', label: 'Total Gambar' },
        { key: 'videoCount', label: 'Total Video' },
        { key: 'createdAt', label: 'Dibuat' },
        { key: 'action', label: 'Aksi', class: 'text-center width-80' },
      ],
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
  },
}
</script>
