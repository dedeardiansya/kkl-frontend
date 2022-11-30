<template>
  <div class="p-3">
    <div class="card">
      <div class="card-header d-flex">
        <div class="my-auto">Daftar Album</div>
        <modal-create-album
          v-if="$can('Create Album')"
          class="my-auto ml-auto"
          @onCreated="onAlbumCreated"
        />
      </div>
      <block-album-table :albums="albums" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumsPage',
  middleware: ['auth'],
  head() {
    return {
      title: 'Album',
    }
  },
  async asyncData({ $axios }) {
    const albums = await $axios.$get('/albums')
    return {
      albums,
    }
  },
}
</script>
