export default {
  ssr: false,
  target: 'static',

  publicRuntimeConfig: {
    baseApiUrl: process.env.BASE_API_URL || 'https://kkl.dedeard.my.id',
    baseUrl: process.env.BASE_URL || 'https://kkldinkes.netlify.app',
  },

  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['@/assets/css/main.css', 'sweetalert2/dist/sweetalert2.min.css'],

  plugins: [
    { src: '~/plugins/errorResponse.js', ssr: true },
    { src: '~/plugins/Axios.js', ssr: true },
    { src: '~/plugins/permissions.js', ssr: true },
    { src: '~/plugins/Sweetalert.js', ssr: false },
  ],

  components: true,

  buildModules: [],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    'nuxt-client-init-module',
    'nuxt-route-meta',
  ],

  axios: {
    baseURL: process.env.BASE_API_URL || 'https://kkl.dedeard.my.id',
  },

  build: {},
}
