export default function ({ $axios, store }) {
  $axios.onRequest(({ headers }) => {
    if (store.state.token && store.state.user) {
      headers.common.Authorization = 'Bearer ' + store.state.token
    }
  })
}
