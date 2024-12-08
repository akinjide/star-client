<template>
  <v-container fluid>
    <v-row class="my-4">
      <v-col cols="8">
        <h4 >Manage Users</h4>
      </v-col>

      <v-col cols="4">
        <div class="d-flex justify-end">
          <h4 class="mx-4">{{ users.length}} User(s)</h4>
          <v-btn color="blue" size="small" variant="tonal" @click="dialog = true">Add User
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row class="my-4">
      <v-col cols="12">
        <v-table
          height="100vh"
          fixed-header
        >
          <thead>
            <tr>
              <th class="text-left te˚∫xt-uppercase">

              </th>
              <th class="text-left text-uppercase">
                Full Name
              </th>
              <th class="text-left text-uppercase">
                Role
              </th>
              <th class="text-left text-uppercase">
                Student Number
              </th>
              <th class="text-left text-uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in users"
              :key="index"
            >
              <td><v-avatar :image="user.image"></v-avatar></td>
              <td>{{ user.full_name }}</td>
              <td>{{ user.role_id }}</td>
              <td>{{ user.student_number }}</td>
              <td>
                <v-btn class="mr-2" size="x-small" color="blue" variant="tonal" @click="dialog = true">
                  Edit
                </v-btn>
                <v-btn class="ml-2" size="x-small" color="red" variant="tonal">
                  Delete
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>

  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-account"
        title="User Profile"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="First name*"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                hint="example of persistent helper text"
                label="Last name*"
                persistent-hint
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Email*"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Confirm Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age*"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                auto-select-first
                multiple
              ></v-autocomplete>
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
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'User Management',
  data () {
    return {
      dialog: false,
      users: [
        { full_name: 'John Doe', role_id: 1, image: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', student_number: '121242' }
      ]
    }
  },
  components: {},
  methods: {
  },
  computed: {
    ...mapState(useUserStore, ['user'])
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
