<template>
  <v-container fluid>
    <v-row>
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
        <div class="d-flex justify-end align-center">
          <h4 class="mx-4">{{ teamsCount }} Team(s)</h4>

          <IconButton
            tooltipText="Add Team"
            color="blue"
            size="small"
            icon="mdi-account-multiple-plus-outline"
            @action="select({}, 'add_team')"
          ></IconButton>
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
          <div class="pl-2">
            <IconButton
              tooltipText="Edit Team"
              color="green"
              icon="mdi-pencil-plus-outline"
              @action="select(team, 'edit_team')"
            ></IconButton>

            <IconButton
              tooltipText="Remove Team"
              color="red"
              icon="mdi-account-multiple-remove-outline"
              @action="remove(team)"
            ></IconButton>
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
                  <IconButton
                    tooltipText="Remove Member"
                    color="red"
                    icon="mdi-account-minus-outline"
                    @action="removeMember(team, member)"
                  ></IconButton>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
<!--
  <Dialog
    :view="dialog"
    :header="{
      icon: 'mdi-account',
      title: 'Add Team'
    }"
    :fields = "[
      {
        label: 'Name*',
        type: 'text-field',
        col: '12',
        model: selectedTeam.name,
        required: true
      },
      {
        label: 'Description',
        type: 'textarea',
        col: '12',
        model: selectedTeam.description,
        required: false
      },
      {
        label: 'Image',
        placeholder: 'Pick an image',
        type: 'file-input',
        col: '6',
        icon: 'mdi-camera',
        accept: 'image/png, image/jpeg, image/bmp',
        model: selectedTeam.file,
        loading: progress,
        required: false
      },
      {
        label: 'Team Lead*',
        type: 'select',
        col: '6',
        model: selectedTeam.lead,
        items: getStudents,
        item: {
          title: 'full_name',
          value: 'id'
        },
        required: true,
        clearable: false,
        multiple: false,
        chips: false
      },
      {
        label: 'Students*',
        type: 'select',
        col: '12',
        model: selectedTeam.memb
        ers,
        value: null,
        items: getStudents,
        item: {
          title: 'full_name',
          value: 'id'
        },
        required: true,
        clearable: true,
        multiple: true,
        chips: true
      }
    ]"
    @close="dialog = false"
    @save="upsert"
  ></Dialog>
 -->
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
                :items="studentsWithoutTeam"
                item-title="full_name"
                item-value="id"
                label="Team Lead*"
                v-model="selectedTeam.lead"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-select
                :items="studentsWithoutTeam"
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

import IconButton from '@/components/IconButton'
// import Dialog from '@/components/Dialog'
import { useUserStore, useMainStore } from '@/stores'
import api from '@/api'

export default {
  name: 'Team Management',
  data () {
    return {
      dialog: false,
      searchQuery: null,
      selectedTeam: {},
      cleanSelectedTeam: null,
      progress: false
    }
  },
  components: {
    IconButton
    // Dialog
  },
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
      const response = await api.teams.removeMember(team.id, member.member_id)
      console.log(response)
      this.$router.go(this.$router.currentRoute)
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
    },
    studentsWithoutTeam () {
      const studentsWithoutTeam = []
      const currentTeamMembers = []
      const studentsWithTeam = []

      if (this.teams && this.teams.length) {
        for (const team of this.teams) {
          if (team.members && team.members.length) {
            for (const member of team.members) {
              studentsWithTeam.push(member.member_id)
            }
          }
        }

        if (this.selectedTeam) {
          for (const student of this.getStudents) {
            if (this.selectedTeam.members.includes(student.id) || this.selectedTeam.lead === student.id) {
              currentTeamMembers.push(student)
            }
          }
        }

        for (const student of this.getStudents) {
          if (!studentsWithTeam.includes(student.id)) {
            studentsWithoutTeam.push(student)
          }
        }
      }

      return studentsWithoutTeam.concat(currentTeamMembers)
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
