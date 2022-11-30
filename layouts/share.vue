<template>
  <main class="bg-light">
    <header class="bg-white shadow-sm">
      <div class="container py-3">
        <div class="text-center">
          <img
            src="/logo.png"
            width="50"
            class="d-block mx-auto mb-2"
            alt="Logo dinas kesehatan prov. sulsel"
          />
          <span class="font-weight-bold h5 d-block">ARSIP MEDIA</span>
        </div>
      </div>
    </header>
    <nuxt />
  </main>
</template>

<script>
export default {
  name: 'ShareLayout',
}
</script>

<style scoped>
main {
  min-height: 100vh;
}
</style>
