const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  user: null,
  token: null,
})

export const getters = {
  role(state) {
    return state.user?.role
  },
  permissions(state) {
    return state.user?.role?.permissions || []
  },
}

export const actions = {
  async nuxtClientInit({ commit }, ctx) {
    const token = Cookie.get('api-token')
    try {
      const user = await ctx.$axios.$get('/account/profile', {
        headers: { Authorization: 'bearer ' + token },
      })
      commit('setUser', user)
      commit('setToken', { bearer: token })
    } catch (err) {
      // No valid cookie found
    }
  },
}

export const mutations = {
  setUser(state, user) {
    state.user = user || null
  },
  setToken(state, token) {
    if (token?.expiredAt && Cookie) {
      Cookie.set('api-token', token.bearer, { expires: 7 })
    }
    if (token?.bearer) state.token = token.bearer
  },
  removeToken(state) {
    if (Cookie) {
      Cookie.set('api-token', '', { expires: -1 })
    }
    state.token = null
  },
}
