<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <h4>Manage Users</h4>
      </v-col>

      <v-col cols="4">
        <v-text-field
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Search"
          variant="underlined"
          hide-details
          single-line
          v-model="searchQuery"
        ></v-text-field>
      </v-col>

      <v-col cols="4">
        <div class="d-flex justify-end align-center">
          <h4 class="mx-4">{{ usersCount }} User(s)</h4>

          <IconButton
            tooltipText="Add User"
            color="blue"
            size="small"
            icon="mdi-account-edit-outline"
            @action="select({}, 'create_user')"
          ></IconButton>
        </div>
      </v-col>
    </v-row>

    <v-row class="my-4">
      <v-col cols="12">
        <v-table
          fixed-header
        >
          <thead>
            <tr>
              <th class="text-left text-uppercase"></th>
              <th class="text-left text-uppercase">Full Name</th>
              <th class="text-left text-uppercase">Title</th>
              <th class="text-left text-uppercase">Email</th>
              <th class="text-left text-uppercase">Role</th>
              <th class="text-left text-uppercase">Department</th>
              <th class="text-left text-uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in resultQuery"
              :key="index"
            >
              <td><v-avatar :image="getImage(user.image)"></v-avatar></td>
              <td>{{ user.full_name }}</td>
              <td>{{ user.title }}</td>
              <td>{{ user.email }}</td>
              <td>{{ getRoleName(user.role_id) }}</td>
              <td>{{ user.department }}</td>
              <td>
                <div class="d-flex">
                  <IconButton
                    tooltipText="Edit User"
                    color="green"
                    icon="mdi-account-edit-outline"
                    @action="select(user, 'edit_user')"
                  ></IconButton>

                  <IconButton
                    tooltipText="Remove User"
                    color="red"
                    icon="mdi-account-minus-outline"
                    @action="select(user, 'delete_user')"
                  ></IconButton>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>

  <!-- DIALOG -->
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog.value"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-account"
        :title="dialog.title"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                label="Full name*"
                v-model="selectedUser.full_name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                label="Avatar"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                v-model="selectedUser.file"
                :loading="progress"
              ></v-file-input>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Title"
                v-model="selectedUser.title"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Email*"
                v-model="selectedUser.email"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Department"
                v-model="selectedUser.department"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Student Number"
                v-model="selectedUser.student_number"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-select
                :items="getRoles"
                label="Role*"
                v-model="selectedUser.role_id"
                item-title="name"
                item-value="id"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                :label="dialog.password.label"
                :append-inner-icon="dialog.password.icon"
                :type="dialog.password.type"
                @click:appendInner="togglePassword('password')"
                v-model="selectedUser.password"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                hint="Password should match"
                :label="dialog.nPassword.label"
                :append-inner-icon="dialog.nPassword.icon"
                :type="dialog.nPassword.type"
                @click:appendInner="togglePassword('nPassword')"
                v-model="selectedUser.confirm_password"
                required
                persistent-hint
              ></v-text-field>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="dialog.value = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="upsert(selectedUser)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <DeleteDialog
    :view="dialog.remove_user"
    :body="{
      name: selectedUser.full_name,
      text: 'Are you sure you want to proceed?'
    }"
    @close="dialog.remove_user = false"
    @confirm="remove"
  />
</template>

<script>
import { mapState, mapActions } from 'pinia'

import DeleteDialog from '@/components/DeleteDialog'
import IconButton from '@/components/IconButton'
import { useUserStore, useMainStore } from '@/stores'
import api from '@/api'

export default {
  name: 'User Management',
  data () {
    return {
      dialog: {
        remove_user: false,
        value: false,
        title: 'Add User',
        password: {
          label: 'Password',
          icon: 'mdi-eye-outline',
          type: 'password'
        },
        nPassword: {
          label: 'Confirm password',
          icon: 'mdi-eye-outline',
          type: 'password'
        }
      },
      searchQuery: null,
      selectedUser: {},
      progress: false
    }
  },
  components: {
    IconButton,
    DeleteDialog
  },
  methods: {
    ...mapActions(useMainStore, ['getUsers']),
    ...mapActions(useMainStore, ['createUser']),
    ...mapActions(useMainStore, ['updateUser']),
    ...mapActions(useMainStore, ['deleteUser']),
    select (user, action) {
      if (action === 'create_user') {
        this.dialog.title = 'Add User'
        this.dialog.password.label = 'Password'
        this.dialog.nPassword.label = 'Confirm password'
        this.dialog.value = true
      }

      if (action === 'edit_user') {
        this.dialog.title = 'Edit User'
        this.dialog.password.label = 'Change password'
        this.dialog.nPassword.label = 'Confirm new password'
        this.dialog.value = true
      }

      if (action === 'delete_user') {
        this.dialog.remove_user = true
      }

      this.selectedUser = {
        ...user,
        action: action
      }
    },
    async upsert (user) {
      if (user.file) {
        const response = await api.upload.create(user.file, 'images', event => {
          this.progress = true
        })

        this.progress = false
        const { data: { path } } = response.data

        user.image = path
      }

      if (user.action === 'create_user') {
        const response = await this.createUser(user)

        if (response) {
          this.dialog = false
          this.$router.go(this.$router.currentRoute)
        }
      }

      if (user.action === 'edit_user') {
        const response = await this.updateUser(user.id, user)

        if (response) {
          this.dialog = false
          this.$router.go(this.$router.currentRoute)
        }
      }
    },
    async remove (confirm) {
      if (confirm) {
        const response = await this.deleteUser(this.selectedUser.id)
        console.log(response)
        this.$router.go(this.$router.currentRoute)
      }
    },
    togglePassword (action) {
      if (action === 'password') {
        if (this.dialog.password.type === 'text') {
          this.dialog.password.type = 'password'
          this.dialog.password.icon = 'mdi-eye-outline'
          return
        }

        this.dialog.password.type = 'text'
        this.dialog.password.icon = 'mdi-eye-off-outline'
      }

      if (action === 'nPassword') {
        if (this.dialog.nPassword.type === 'text') {
          this.dialog.nPassword.type = 'password'
          this.dialog.nPassword.icon = 'mdi-eye-outline'
          return
        }

        this.dialog.nPassword.type = 'text'
        this.dialog.nPassword.icon = 'mdi-eye-off-outline'
      }
    }
  },
  async created () {
    await this.getUsers()
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useMainStore, ['users']),
    ...mapState(useMainStore, ['getRoleName']),
    ...mapState(useMainStore, ['getRoles']),
    ...mapState(useMainStore, ['getImage']),
    usersCount () {
      if (this.users) {
        return this.users.length
      }

      return 0
    },
    resultQuery () {
      if (this.searchQuery) {
        return this.users.filter((item) => {
          return this.searchQuery.toLowerCase().split(' ').every((v) => {
            if (item.full_name.toLowerCase().includes(v)) {
              return true
            }

            if (item.department.toLowerCase().includes(v)) {
              return true
            }

            if (item.title.toLowerCase().includes(v)) {
              return true
            }

            return false
          })
        })
      } else {
        return this.users
      }
    }
  }
}
</script>

<style scoped>
.v-main {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.v-container {
  max-width: 100%;
  padding: 0;
}
</style>
