<template>
  <div class="p-3">
    <div class="card">
      <div class="card-header d-flex">
        <div class="my-auto">Peran</div>
        <modal-create-role
          v-if="$can('Create Role')"
          class="my-auto ml-auto"
          :permissions="permissions"
          @onCreated="onRoleCreated"
        />
      </div>
      <b-table
        striped
        :fields="[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Nama' },
          { key: 'permissions', label: 'Izin' },
          { key: 'action', label: 'Aksi', class: 'text-center width-140' },
        ]"
        :items="roles"
      >
        <template #cell(permissions)="{ item }">
          {{ item.permissions.join(', ') }}
        </template>
        <template #cell(action)="{ item }">
          <modal-edit-role
            v-if="$can('Update Role')"
            class="d-inline-block"
            :permissions="permissions"
            :role="item"
            @onUpdated="onRoleUpdated"
          />
          <b-button
            v-if="$can('Delete Role')"
            variant="danger"
            size="sm"
            @click.prevent="deleteRole(item.id)"
            >Hapus</b-button
          >
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RolesPage',
  middleware: ['auth'],
  meta: {
    can: 'Read Role',
  },
  head() {
    return {
      title: 'Roles',
    }
  },
  async asyncData({ $axios }) {
    const roles = await $axios.$get('/roles')
    const permissions = await $axios.$get('/permissions')
    return {
      roles,
      permissions,
    }
  },
  methods: {
    async deleteRole(id) {
      const res = await this.$deleteConfirm('Anda yakin ingin menghapus peran?')
      if (!res) return true
      try {
        await this.$axios.$delete('/roles/' + id)
        this.roles = [...this.roles].filter((el) => el.id !== id)
      } catch (e) {
        this.$sw('Gagal menghapus peran', this.$errorMessage(e))
      }
    },
    onRoleCreated(role) {
      this.roles = [...this.roles, role]
    },
    onRoleUpdated(role) {
      const roles = [...this.roles]
      this.roles = roles.map((el) => (el.id === role.id ? role : el))
    },
  },
}
</script>
