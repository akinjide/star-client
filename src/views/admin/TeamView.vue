<template>
  <v-container fluid>
    <v-row class="mt-4">
      <v-col cols="8">
        <h4 >Manage Teams</h4>
      </v-col>

      <v-col cols="4">
        <div class="d-flex justify-end">
          <h4 class="mx-4">{{ teams.length }} Team(s)</h4>
          <v-btn color="blue" size="small" variant="tonal" @click="dialog = true">Add Team
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card
          v-for="(team, index) in teams"
          :key="index"
          :title="team.name"
          :subtitle="team.supervisor_name"
          elevation="4"
          class="pa-4 mb-6">
          <v-table
            min-height="500px"
            fixed-header
          >
            <thead>
              <tr>
                <th class="text-left text-uppercase"></th>
                <th class="text-left text-uppercase">
                  Full Name
                </th>
                <th class="text-left text-uppercase">
                  Role
                </th>
                <th class="text-left text-uppercase">
                  Student Number
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(member, index) in team.members"
                :key="index"
              >
                <td><v-avatar :image="member.image"></v-avatar></td>
                <td>{{ member.full_name }}</td>
                <td>{{ member.role_id }}</td>
                <td>{{ member.student_number }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'Team Management',
  data () {
    return {
      teams: [
        {
          name: 'Group 1',
          supervisor_name: 'Prof. Dr. Gurcu Oz',
          members: [
            { full_name: 'John Doe', role_id: 1, image: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', student_number: '121242' }
          ]
        },
        {
          name: 'Group 2',
          supervisor_name: 'Prof. Dr. Mohammed Salamah',
          members: [
            { full_name: 'John Doe', role_id: 1, image: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', student_number: '121242' },
            { full_name: 'John Pop', role_id: 1, image: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', student_number: '8239723' }
          ]
        }
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
