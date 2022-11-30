<template>
  <div class="p-3">
    <div class="card">
      <div class="card-header d-flex">
        <div class="my-auto">Users</div>
        <modal-create-user
          v-if="$can('Create User')"
          class="my-auto ml-auto"
          :roles="roles.filter((el) => el.name !== 'Super Admin')"
          @onCreated="onUserCreated"
        />
      </div>
      <b-table
        striped
        :fields="[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Nama' },
          { key: 'email', label: 'Email' },
          { key: 'role.name', label: 'Peran' },
          { key: 'action', label: 'Aksi', class: 'text-center width-140' },
        ]"
        :items="users"
      >
        <template #cell(permissions)="{ item }">
          {{ item.permissions.join(', ') }}
        </template>
        <template #cell(action)="{ item }">
          <modal-edit-user
            v-if="$can('Update User')"
            class="d-inline-block"
            :roles="roles.filter((el) => el.name !== 'Super Admin')"
            :user="item"
            @onUpdated="onUserUpdated"
          />
          <b-button
            v-if="$can('Delete User')"
            variant="danger"
            size="sm"
            @click.prevent="deleteUser(item.id)"
            >Hapus</b-button
          >
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: ['auth'],
  meta: {
    can: 'Read User',
  },
  head() {
    return {
      title: 'Users',
    }
  },
  async asyncData({ $axios }) {
    const users = await $axios.$get('/users')
    const roles = await $axios.$get('/roles')
    return {
      roles,
      users,
    }
  },
  methods: {
    async deleteUser(id) {
      const res = await this.$deleteConfirm('Anda yakin ingin menghapus user?')
      if (!res) return true
      try {
        await this.$axios.$delete('/users/' + id)
        this.users = [...this.users].filter((el) => el.id !== id)
      } catch (e) {
        this.$sw('Gagal menghapus user', this.$errorMessage(e))
      }
    },
    onUserCreated(user) {
      this.users = [...this.users, user]
    },
    onUserUpdated(user) {
      const users = [...this.users]
      this.users = users.map((el) => (el.id === user.id ? user : el))
    },
  },
}
</script>
