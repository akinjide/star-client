<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-select
          prepend-inner-icon="mdi-filter-outline"
          density="compact"
          v-model="filterQuery"
          :items="filters"
          label="Filter By"
          max-width="200"
        ></v-select>
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
          :subtitle="team.description"
          elevation="4"
          class="pa-4 mb-6">
          <div class="pl-4 d-flex align-center justify-space-between">
            <div>
              <p class="text-body-2">Supervised by <strong>{{ getTeamSupervisor(team) }}</strong>
              </p>
            </div>

            <div>
              <IconButton
                tooltipText="Add Evaluation"
                color="green"
                icon="mdi-pencil-plus-outline"
                @action="goToPage(team, 'add_team_evaluation')"
                v-if="!hasEvaluation(team) && !ownTeam(team)"
              ></IconButton>

              <IconButton
                tooltipText="View Evaluation"
                color="blue-grey"
                icon="mdi-eye-outline"
                @action="goToPage(team, 'team_evaluation')"
              ></IconButton>

              <IconButton
                tooltipText="View Topic"
                color="blue-grey"
                icon="mdi-file-eye-outline"
                @action="select(team, 'view_topic')"
              ></IconButton>
            </div>
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

  <!-- DIALOG -->
  <PreviewDialog
    :view="viewTopic"
    :header="{
      icon: 'mdi-information',
      title: 'Topic Information'
    }"
    :body="{
      name: project.topic_name,
      text: project.topic_description,
      url: getDocument(project.topic_url)
    }"
    @close="viewTopic = false"
  />
</template>

<script>
import { mapState, mapActions } from 'pinia'

import IconButton from '@/components/IconButton'
import PreviewDialog from '@/components/PreviewDialog'
import { useUserStore, useMainStore } from '@/stores'

export default {
  name: 'Evaluations',
  data () {
    return {
      searchQuery: null,
      viewTopic: false,
      filterQuery: 'All',
      filters: [
        'All',
        'Evaluated',
        'Unevaluated'
      ]
    }
  },
  components: {
    IconButton,
    PreviewDialog
  },
  methods: {
    ...mapActions(useMainStore, ['getUsers']),
    ...mapActions(useMainStore, ['getTeams']),
    ...mapActions(useMainStore, ['getEvaluations']),
    ...mapActions(useMainStore, ['getProjects']),
    ...mapActions(useMainStore, ['getProjectByTeam']),
    async select (team, action) {
      if (action === 'view_topic') {
        await this.getProjectByTeam(team.id)
        this.viewTopic = true
      }
    },
    goToPage (team, name) {
      this.$router.push({
        name: name,
        params: { team_id: team.id }
      })
    },
    hasMembers (team) {
      return team.members && team.members.length > 0 && team.members[0]
    },
    getTeamSupervisor (team) {
      if (team.supervisor_full_name) {
        return team.supervisor_title + ' ' + team.supervisor_full_name
      }

      return 'No supervisor assigned yet'
    },
    ownTeam (team) {
      return team.supervisor_id === this.user.id
    },
    hasEvaluation (team) {
      if (this.evaluations && this.evaluations.length) {
        for (const evaluation of this.evaluations) {
          if (team.id === evaluation.team_id && evaluation.evaluations) {
            return true
          }
        }
      }

      return false
    }
  },
  async created () {
    await this.getUsers()
    await this.getTeams()
    await this.getProjects()
    await this.getEvaluations()
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useMainStore, ['teams']),
    ...mapState(useMainStore, ['project']),
    ...mapState(useMainStore, ['getStudents']),
    ...mapState(useMainStore, ['getSupervisors']),
    ...mapState(useMainStore, ['getImage']),
    ...mapState(useMainStore, ['getDocument']),
    ...mapState(useMainStore, ['evaluations']),
    teamsCount () {
      if (this.teams) {
        return this.teams.length
      }

      return 0
    },
    resultQuery () {
      if (this.searchQuery) {
        return this.teams.filter((team) => {
          return this.searchQuery.toLowerCase().split(' ').every((v) => {
            if (team.name.toLowerCase().includes(v)) {
              return true
            }

            if (team.supervisor_full_name.toLowerCase().includes(v)) {
              return true
            }

            return false
          })
        })
      } else if (this.filterQuery) {
        if (this.filterQuery === this.filters[0]) {
          return this.teams
        }

        return this.teams.filter((team) => {
          if (this.filterQuery === this.filters[1] && this.hasEvaluation(team)) {
            return true
          }

          if (this.filterQuery === this.filters[2] && !this.hasEvaluation(team)) {
            return true
          }

          return false
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
