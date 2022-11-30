<template>
  <b-container fluid class="py-3">
    <b-row>
      <b-col md="4" class="mb-4">
        <b-card>
          <div class="text-center">
            <span class="display-4 d-block">{{ counter.image }}</span>
            <span class="d-block">TOTAL GAMBAR</span>
          </div>
        </b-card>
      </b-col>
      <b-col md="4" class="mb-4">
        <b-card>
          <div class="text-center">
            <span class="display-4 d-block">{{ counter.video }}</span>
            <span class="d-block">TOTAL VIDEO</span>
          </div>
        </b-card>
      </b-col>
      <b-col md="4" class="mb-4">
        <b-card>
          <div class="text-center">
            <span class="display-4 d-block">{{ counter.album }}</span>
            <span class="d-block">TOTAL ALBUM</span>
          </div>
        </b-card>
      </b-col>
      <b-col md="6" class="mb-4">
        <b-card>
          <div class="text-center">
            <span class="display-4 d-block">{{
              prettyBytes(counter.used)
            }}</span>
            <span class="d-block">PENYIMPANAN DIGUNAKAN</span>
          </div>
        </b-card>
      </b-col>
      <b-col md="6" class="mb-4">
        <b-card>
          <div class="text-center">
            <span class="display-4 d-block">{{
              prettyBytes(counter.free)
            }}</span>
            <span class="d-block">PENYIMPANAN TERSEDIA</span>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-card v-if="$can('Read Album')" header="Akses cepat album" no-body>
      <block-album-table :albums="albums" />
    </b-card>
  </b-container>
</template>

<script>
import prettyBytes from 'pretty-bytes'

export default {
  name: 'DashboardPage',
  middleware: ['auth'],
  head() {
    return {
      title: 'Dashboard',
    }
  },
  async asyncData({ $axios, $can }) {
    const counter = await $axios.$get('/info/counter')
    let albums = []
    if ($can('Read Album')) albums = await $axios.$get('/albums')
    return { counter, albums }
  },
  methods: {
    prettyBytes(b) {
      return prettyBytes(b)
    },
  },
}
</script>
