<template>
  <v-container fluid>
    <v-row class="mt-4">
      <v-col cols="4"></v-col>

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
        <div class="d-flex justify-end">
          <h4 class="mx-4">{{ teamsCount }} Teams(s)</h4>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card
          v-for="(team, index) in resultQuery"
          :key="index"
          :title="team.name"
          :subtitle="getTeamSupervisor(team)"
          elevation="4"
          class="pa-4 mb-6">
          <div class="pl-4">
            <v-btn class="mr-2" size="x-small" color="blue" variant="tonal" @click="goToPage(team)">
              View Evaluation
            </v-btn>
          </div>

          <v-table
            min-height="500px"
            fixed-header
            v-if="hasMembers(team)"
          >
            <thead>
              <tr>
                <th class="text-left text-uppercase"></th>
                <th class="text-left text-uppercase">Full Name</th>
                <th class="text-left text-uppercase">Student Number</th>
                <th class="text-left text-uppercase">Department</th>
                <th class="text-left text-uppercase">Position</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(member, index) in team.members"
                :key="index"
              >
                <td><v-avatar :image="getImage(member.image)"></v-avatar></td>
                <td>{{ member.full_name }}</td>
                <td>{{ member.student_number }}</td>
                <td>{{ member.department }}</td>
                <td>
                  <v-chip
                    prepend-icon="mdi-star"
                    class="ma-2"
                    color="orange"
                    v-if="member.is_lead"
                    size="x-small"
                  >
                    Lead
                  </v-chip>
                  <v-chip
                    class="ma-2"
                    color="teal"
                    v-if="!member.is_lead"
                    size="x-small"
                  >
                    Member
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore, useMainStore } from '@/stores'

export default {
  name: 'Evaluations',
  data () {
    return {
      searchQuery: null
    }
  },
  components: {},
  methods: {
    ...mapActions(useMainStore, ['getUsers']),
    ...mapActions(useMainStore, ['getTeams']),
    goToPage (team) {
      this.$router.push({
        name: 'team_evaluation_management',
        params: { team_id: team.id }
      })
    },
    hasMembers (team) {
      console.log(team)
      return team.members && team.members.length > 0 && team.members[0]
    },
    getTeamSupervisor (team) {
      if (team.supervisor_full_name) {
        return team.supervisor_title + ' ' + team.supervisor_full_name
      }

      return 'No supervisor assigned yet'
    }
  },
  async created () {
    await this.getUsers()
    await this.getTeams()
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useMainStore, ['teams']),
    ...mapState(useMainStore, ['getStudents']),
    ...mapState(useMainStore, ['getSupervisors']),
    ...mapState(useMainStore, ['getImage']),
    teamsCount () {
      if (this.teams) {
        return this.teams.length
      }

      return 0
    },
    resultQuery () {
      if (this.searchQuery) {
        return this.teams.filter((item) => {
          return this.searchQuery.toLowerCase().split(' ').every((v) => {
            if (item.name.toLowerCase().includes(v)) {
              return true
            }

            if (item.supervisor_full_name.toLowerCase().includes(v)) {
              return true
            }

            return false
          })
        })
      } else {
        return this.teams
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
