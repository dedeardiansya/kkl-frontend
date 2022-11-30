export default function ({ store, redirect, route, error }) {
  if (!store.state.token || !store.state.user) return redirect('/login')

  const meta = route.meta[0]
  if (meta?.can) {
    const { role, permissions } = store.getters
    if (role?.name !== 'Super Admin') {
      if (!permissions.includes(meta.can)) return error('Not allowed!')
    }
  }
}
