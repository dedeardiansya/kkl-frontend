export default function ({ store }, inject) {
  inject('can', (cans) => {
    const { role, permissions } = store.getters
    if (role?.name === 'Super Admin') return true

    cans = cans.split('|')
    const exists = []
    for (let can of cans) {
      exists.push(permissions.includes(can))
    }
    return exists.includes(true)
  })
}
