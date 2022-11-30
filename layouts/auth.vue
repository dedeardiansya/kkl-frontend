<template>
  <div class="container py-5">
    <div class="py-3">
      <div class="text-center">
        <img
          src="/logo.png"
          width="80"
          class="d-block mx-auto mb-2"
          alt="Logo dinas kesehatan prov. sulsel"
        />
        <span class="font-weight-bold h4 d-block">ARSIP MEDIA</span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 col-lg-6 mx-auto py-3">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>
