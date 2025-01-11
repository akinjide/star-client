<template>
  <v-container fluid>
    <v-row>
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
        <div class="d-flex justify-end align-center">
          <h4 class="mx-4">{{ projectCount }} Project(s)</h4>

          <IconButton
            v-if="!hasProject()"
            tooltipText="Add Topic"
            color="blue"
            size="small"
            icon="mdi-file-plus-outline"
            @action="select({}, 'add_topic')"
          ></IconButton>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-table
          height="100vh"
          fixed-header
        >
          <thead>
            <tr>
              <th class="text-left text-uppercase">Title</th>
              <th class="text-left text-uppercase">Supervisor</th>
              <th class="text-left text-uppercase">Availability</th>
              <th class="text-left text-uppercase">Team</th>
              <th class="text-left text-uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(project, index) in resultQuery"
              :key="index"
            >
              <td>{{ project.topic_name }}</td>
              <td>{{ project.supervisor_title + ' ' + project.supervisor_full_name }}</td>
              <td>
                <v-chip class="ma-2 text-capitalize" size="x-small" :color="projectStatus(project) === 'available' ? 'green' : 'red'" prepend-icon="mdi-circle">
                  {{ projectStatus(project) }}
                </v-chip>
              </td>
              <td>{{ project.team_name }}</td>
              <td>
                <div class="d-flex">
                  <IconButton
                    tooltipText="Assign Topic"
                    color="orange"
                    icon="mdi-account-multiple-plus-outline"
                    @click="select(project, 'assign_project')"
                    v-if="projectStatus(project) === 'available' && ownProject(project)"
                  ></IconButton>

                  <IconButton
                    tooltipText="Edit Topic and Project"
                    color="green"
                    icon="mdi-file-document-edit-outline"
                    v-if="ownProject(project)"
                  ></IconButton>

                  <IconButton
                    tooltipText="View Topic"
                    color="blue-grey"
                    icon="mdi-file-eye-outline"
                    @action="select(project, 'view_topic')"
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
      v-model="topicDialog"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-account"
        title="Add Topic"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                label="Name*"
                v-model="topic.name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-text-field
                label="Description*"
                v-model="topic.description"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-file-input
                accept=".doc, .docx, .ppt, .pptx, .txt, .pdf"
                label="File*"
                placeholder="Pick a file (.doc, .docx, .ppt, .pptx,.txt or .pdf)"
                v-model="topic.file"
                :loading="progress"
                required
              ></v-file-input>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-textarea
                label="(Optional) Text"
                v-model="topic.raw_text"
              ></v-textarea>
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
            @click="topicDialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="upsert(topic)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <!-- DIALOG -->
  <div class="pa-4 text-center">
    <v-dialog
      v-model="projectDialog"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-account"
        title="Assign Project"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Course Code*"
                v-model="project.course_code"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-select
                :items="unassignedTeams"
                item-title="name"
                item-value="id"
                label="Team*"
                v-model="project.team_id"
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
            @click="projectDialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="upsert(project)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

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
import api from '@/api'

export default {
  name: 'Project Moderation',
  data () {
    return {
      topicDialog: false,
      projectDialog: false,
      viewTopic: false,
      topic: {},
      project: {},
      progress: false,
      searchQuery: null
    }
  },
  components: {
    IconButton,
    PreviewDialog
  },
  methods: {
    ...mapActions(useMainStore, ['getUsers']),
    ...mapActions(useMainStore, ['getTeams']),
    ...mapActions(useMainStore, ['getTopics']),
    ...mapActions(useMainStore, ['getProjects']),
    projectStatus (project) {
      if (project.team_id) {
        return 'unavailable'
      }

      return 'available'
    },
    ownProject (project) {
      return project.supervisor_id === this.user.id
    },
    hasProject () {
      if (this.projects && this.projects.length) {
        return this.projects.some((project) => {
          if (project.supervisor_id && project.supervisor_id === this.user.id) {
            return true
          }

          return false
        })
      }

      return false
    },
    select (record, action) {
      if (action === 'view_topic') {
        this.project = record
        this.viewTopic = true
      }

      if (action === 'add_topic') {
        this.topicDialog = true
        this.topic = {
          ...record,
          supervisor_id: this.user.id,
          action: action
        }
      }

      if (action === 'assign_project') {
        this.projectDialog = true
        this.project = {
          ...record,
          name: '',
          course_code: '',
          action: action
        }
      }
    },
    async upsert (record) {
      if (record.file) {
        const response = await api.upload.create(record.file, 'documents', event => {
          this.progress = true
          console.log(Math.round((100 * event.loaded) / event.total))
        })

        this.progress = false
        const { data: { path } } = response.data

        record.url = path
      }

      if (record.action === 'add_topic') {
        const response = await api.topics.create(record)

        if (response && response.data) {
          console.log(response.data)
          this.topicDialog = false
          this.$router.go(this.$router.currentRoute)
        }
      }

      if (record.action === 'assign_project') {
        const response = await api.projects.assign(record)

        if (response && response.data) {
          console.log(response.data)
          this.topicDialog = false
          this.$router.go(this.$router.currentRoute)
        }
      }
    }
  },
  async created () {
    await this.getUsers()
    await this.getTeams()
    await this.getTopics()
    await this.getProjects()
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useMainStore, ['teams']),
    ...mapState(useMainStore, ['projects']),
    ...mapState(useMainStore, ['getDocument']),
    projectCount () {
      if (this.projects) {
        return this.projects.length
      }

      return 0
    },
    resultQuery () {
      if (this.searchQuery) {
        return this.projects.filter((item) => {
          return this.searchQuery.toLowerCase().split(' ').every((v) => {
            if (
              item.topic_name.toLowerCase().includes(v) ||
              item.topic_description.toLowerCase().includes(v) ||
              item.supervisor_full_name.toLowerCase().includes(v)
            ) {
              return true
            }

            return false
          })
        })
      } else {
        return this.projects
      }
    },
    unassignedTeams () {
      return this.teams.filter((team) => {
        if (team.supervisor_id) {
          return false
        }

        return true
      })
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
