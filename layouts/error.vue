<template>
  <main class="bg-dark d-flex text-white w-100" style="height: 100vh">
    <div class="my-auto container text-center">
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>{{ error.message || 'An error occurred' }}</h1>
      <NuxtLink to="/">Home</NuxtLink>
    </div>
  </main>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blank',
  head() {
    return {
      title:
        this.error?.message || this.error?.statusCode || 'An error occurred',
    }
  },
}
</script>
