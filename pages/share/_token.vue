<template>
  <b-container class="py-3">
    <b-card no-body>
      <div class="card-body">
        <h3 class="text-capitalize">{{ album.name }}</h3>
        <p class="m-0 lead">{{ album.description }}</p>
      </div>
      <b-table
        striped
        :fields="[
          { key: 'type', label: 'Jenis' },
          { key: 'size', label: 'Ukuran' },
          { key: 'originalName', label: 'Nama' },
          { key: 'action', label: 'Aksi', class: 'text-center width-80' },
        ]"
        :items="album.media"
      >
        <template #cell(size)="{ item }">
          {{ prettyBytes(item.size) }}
        </template>
        <template #cell(action)="{ item }">
          <modal-show-share-media
            class="d-inline-block"
            :media="item"
            :token="token"
          />
        </template>
      </b-table>
    </b-card>
  </b-container>
</template>

<script>
import prettyBytes from 'pretty-bytes'
export default {
  name: 'ShareAlbumPage',
  layout: 'share',
  head() {
    return {
      title: this.album.name,
    }
  },
  async asyncData({ $axios, params }) {
    const album = await $axios.$get('/share?token=' + params.token)
    return {
      album,
      token: params.token,
    }
  },
  methods: {
    prettyBytes(b) {
      return prettyBytes(b)
    },
  },
}
</script>
