import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)

export default function (app, inject) {
  inject('deleteConfirm', (msg) => {
    return new Promise((resolve) => {
      Vue.swal({
        title: msg,
        icon: 'error',
        cancelButtonColor: '#007bff',
        confirmButtonColor: '#dc3545',
        cancelButtonText: 'Batal',
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus',
      }).then(({ isConfirmed }) => {
        resolve(isConfirmed)
      })
    })
  })
  inject('sw', (title, text, icon = 'error') => {
    Vue.swal({
      title,
      text,
      icon,
    })
  })
}
