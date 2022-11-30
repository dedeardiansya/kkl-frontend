<template>
  <div class="p-3">
    <div class="card">
      <b-nav tabs class="px-3 pt-3 bg-light">
        <b-nav-item exact-active-class="active" :to="`/albums/${album.id}`"
          >Media</b-nav-item
        >
        <b-nav-item active-class="active" :to="`/albums/${album.id}/share`"
          >Share</b-nav-item
        >
        <b-nav-item v-if="$can('Delete Album')" @click="destroy()"
          ><span class="text-danger">Hapus album</span></b-nav-item
        >
      </b-nav>
      <div class="card-body">
        <nuxt-child
          :album="album"
          @mediaUpdated="onMediaUpdated"
          @albumUpdated="onAlbumUpdated"
          @shareCreated="onShareCreated"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowAlbumLayout',
  middleware: ['auth'],

  async asyncData({ $axios, params }) {
    const { id } = params
    const album = await $axios.$get('/albums/' + id)
    return {
      album,
    }
  },
  methods: {
    onMediaUpdated(media) {
      this.album.media = media
    },
    onAlbumUpdated(album) {
      this.album = album
    },
    onShareCreated(share) {
      this.album.share = [...this.album.share, share]
    },
    async destroy() {
      const res = await this.$deleteConfirm('Anda yakin ingin menghapus album?')
      if (!res) return true
      try {
        await this.$axios.$delete('/albums/' + this.album.id)
        this.$router.push('/albums')
      } catch (e) {
        this.$sw('Gagal menghapus album', this.$errorMessage(e))
      }
    },
  },
}
</script>
