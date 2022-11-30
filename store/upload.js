import FormData from 'form-data'
export const state = () => ({
  files: [],
})

export const actions = {
  uploads({ commit }, { files, target }) {
    for (let file of files) commit('addFile', { file, target })
  },
  process({ commit, state }) {
    const file = state.files[0]

    const fd = new FormData()
    fd.append('file', file)
    if (file) {
      this.$axios.$post('/media/' + file.target)
    }
  },
}

export const mutations = {
  addFile(state, file) {
    state.files = [...state.files, file]
  },
}
