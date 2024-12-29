<template>
  <v-container fluid>
    <v-row class="mt-4">
      <v-col cols="4">
        <h4>Manage Teams</h4>
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
          <h4 class="mx-4">{{ teamsCount }} Team(s)</h4>
          <v-btn color="blue" size="small" variant="tonal" @click="select({}, 'add_team')">Add Team
          </v-btn>
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
            <v-btn class="mr-2" size="x-small" color="blue" variant="tonal" @click="select(team, 'edit_team')">
              Edit
            </v-btn>
            <v-btn size="x-small" color="red" variant="tonal" @click="remove(team)">
              Delete
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
                <th class="text-left text-uppercase">Actions</th>
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
                <td>
                  <v-btn class="ml-1" size="x-small" color="red" variant="tonal" @click="removeMember(team, member)">
                    Remove
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- DIALOG -->
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-account"
        title="Add Team"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                label="Name*"
                v-model="selectedTeam.name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-textarea
                label="Description"
                v-model="selectedTeam.description"
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                label="Image"
                placeholder="Pick an image"
                prepend-icon="mdi-camera"
                v-model="selectedTeam.file"
                :loading="progress"
              ></v-file-input>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-select
                :items="getStudents"
                item-title="full_name"
                item-value="id"
                label="Team Lead*"
                v-model="selectedTeam.lead"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-select
                :items="getStudents"
                item-title="full_name"
                item-value="id"
                label="Students*"
                v-model="selectedTeam.members"
                clearable
                multiple
                chips
                required
              ></v-select>
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
            @click="upsert(selectedTeam)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore, useMainStore } from '@/stores'
import api from '@/api'

export default {
  name: 'Team Management',
  data () {
    return {
      dialog: false,
      searchQuery: null,
      selectedTeam: null,
      cleanSelectedTeam: null,
      progress: false
    }
  },
  components: {},
  methods: {
    ...mapActions(useMainStore, ['getUsers']),
    ...mapActions(useMainStore, ['getTeams']),
    select (team, action) {
      let lead = null
      const members = []

      if (team && team.members) {
        for (const member of team.members) {
          if (member.is_lead) {
            lead = member.member_id
            continue
          }

          members.push(member.member_id)
        }
      }

      this.dialog = true
      this.cleanSelectedTeam = {
        ...team,
        lead: lead,
        members: members
      }

      this.selectedTeam = {
        ...team,
        lead: lead,
        members: members,
        action: action
      }
    },
    async upsert (team) {
      try {
        if (team.file) {
          const response = await api.upload.create(team.file, 'images', event => {
            this.progress = true
            console.log(Math.round((100 * event.loaded) / event.total))
          })

          this.progress = false
          const { data: { path } } = response.data

          team.image = path
        }

        if (team.action === 'add_team') {
          const response = await api.teams.create(team)

          if (response && response.data) {
            const {
              data: {
                id: teamId
              }
            } = response.data

            const responses = []

            for (const member of team.members) {
              responses.push(api.teams.addMember(teamId, { member_id: member, is_lead: false }))
            }

            if (team.lead) {
              responses.push(api.teams.addMember(teamId, { member_id: team.lead, is_lead: true }))
            }

            const result = await Promise.allSettled(responses)

            if (result) {
              this.dialog = false
              this.$router.go(this.$router.currentRoute)
            }
          }
        }

        if (team.action === 'edit_team') {
          const response = await api.teams.update(team.id, team)
          console.log(response)

          if (response && response.data) {
            const responses = []
            const removeMembers = []
            const addMembers = []
            let newLeadId = null

            for (const memberId of team.members) {
              if (!this.cleanSelectedTeam.members.includes(memberId)) {
                addMembers.push(memberId)
              }
            }

            for (const memberId of this.cleanSelectedTeam.members) {
              if (!team.members.includes(memberId)) {
                removeMembers.push(memberId)
              }
            }

            if (this.cleanSelectedTeam.lead !== team.lead) {
              newLeadId = team.lead
            }

            if (newLeadId) {
              responses.push(api.teams.removeMember(team.id, this.cleanSelectedTeam.lead))
              responses.push(api.teams.addMember(team.id, { member_id: newLeadId, is_lead: true }))
            }

            for (const memberId of addMembers) {
              responses.push(api.teams.addMember(team.id, { member_id: memberId, is_lead: false }))
            }

            for (const memberId of removeMembers) {
              responses.push(api.teams.removeMember(team.id, memberId))
            }

            const result = await Promise.allSettled(responses)

            if (result) {
              this.dialog = false
              this.$router.go(this.$router.currentRoute)
            }
          }
        }
      } catch (err) {

      }
    },
    async remove (team) {
      const response = await api.teams.remove(team.id)
      console.log(response)
      this.$router.go(this.$router.currentRoute)
    },
    async removeMember (team, member) {
      console.log(team, member)
    },
    hasMembers (team) {
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
