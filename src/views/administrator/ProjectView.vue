<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <h4>Manage Projects and Topics</h4>
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
          <h4 class="mx-4">{{ projectCount }} Project(s)</h4>

          <IconButton
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
                    @action="select(project, 'assign_project')"
                    v-if="projectStatus(project) === 'available'"
                  ></IconButton>

                  <IconButton
                    tooltipText="Edit Project"
                    color="green"
                    icon="mdi-file-document-edit-outline"
                    v-if="projectStatus(project) === 'unavailable'"
                    @action="select(project, 'edit_project')"
                  ></IconButton>

                  <IconButton
                    tooltipText="Edit Topic"
                    color="green"
                    icon="mdi-file-edit-outline"
                    @action="select(project, 'edit_topic')"
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
      v-model="dialog.topic.value"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-file-edit"
        :title="dialog.topic.title"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                label="Name*"
                v-model="topic.name"
                :rules="ruleMinMax('Name', 10, 100)"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-text-field
                label="Description*"
                v-model="topic.description"
                :rules="ruleMinMax('Description', 10, 400)"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-select
                :items="getSupervisors"
                item-title="full_name"
                item-value="id"
                label="Supervisor*"
                v-model="topic.supervisor_id"
                :rules="ruleRequired('Supervisor')"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-file-input
                accept=".doc, .docx, .ppt, .pptx, .txt, .pdf"
                label="File*"
                placeholder="Pick a file (.doc, .docx, .ppt, .pptx,.txt or .pdf)"
                v-model="topic.file"
                :loading="progress"
                :rules="ruleRequired('File')"
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
            @click="dialog.topic.value = false"
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

  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog.assign_project"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-account-multiple-plus"
        title="Assign Project"
      >
        <v-card-text>
          <v-form v-model="assignForm">
            <v-row dense>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  label="Course Code*"
                  v-model="selectedProject.course_code"
                  :rules="ruleMinMax('Course code', 6, 8)"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6" sm="6">
                <v-select
                  :items="unassignedTeams"
                  item-title="name"
                  item-value="id"
                  label="Team*"
                  v-model="selectedProject.team_id"
                  :rules="ruleRequired('Team')"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="6" sm="6">
                <v-select
                  label="Semester*"
                  :items="['Spring', 'Fall']"
                  v-model="selectedProject.semester"
                  :rules="ruleRequired('Semester')"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="6" sm="6">
                <v-select
                  label="Year*"
                  :items="years"
                  v-model="selectedProject.year"
                  :rules="ruleRequired('Year')"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="12" sm="12">
                <p class="text-subtitle-1 text-grey">Presentation Date*</p>
                <DatePicker
                  v-model="selectedProject.presentation_at"
                  mode="dateTime"
                  is24hr
                  hide-time-header
                  is-required
                  expanded
                />
              </v-col>
            </v-row>
          </v-form>

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="dialog.assign_project = false"
          ></v-btn>

          <v-btn
            :disabled="!assignForm"
            color="primary"
            text="Save"
            variant="tonal"
            @click="upsert(selectedProject)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog.edit_project"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-file-document-edit"
        title="Edit Project"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Course Code*"
                v-model="selectedProject.course_code"
                :rules="ruleMinMax('Course code', 6, 8)"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-select
                :items="unassignedTeams"
                item-title="name"
                item-value="id"
                label="Team*"
                v-model="selectedProject.team_id"
                :rules="ruleRequired('Team')"
                required
              ></v-select>
            </v-col>

              <v-col cols="12" md="6" sm="6">
                <v-select
                  label="Semester*"
                  :items="['Spring', 'Fall']"
                  v-model="selectedProject.semester"
                  :rules="ruleRequired('Semester')"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="6" sm="6">
                <v-select
                  label="Year*"
                  :items="years"
                  v-model="selectedProject.year"
                  required
                  :rules="ruleRequired('Year')"
                ></v-select>
              </v-col>

              <v-col cols="12" md="12" sm="12">
                <p class="text-subtitle-1 text-grey">Presentation Date*</p>
                <DatePicker v-model="selectedProject.presentation_at" mode="dateTime" is24hr  hide-time-header is-required expanded />
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
            @click="dialog.edit_project = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="upsert(selectedProject)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <PreviewDialog
    :view="dialog.view_topic"
    :header="{
      icon: 'mdi-information',
      title: project.topic_name
    }"
    :body="{
      name: project.topic_description,
      text: project.topic_raw_text ? project.topic_raw_text : 'No additional note :)',
      url: getDocument(project.topic_url)
    }"
    @close="dialog.view_topic = false"
  />
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { DatePicker } from 'v-calendar'

import IconButton from '@/components/IconButton'
import PreviewDialog from '@/components/PreviewDialog'
import { useUserStore, useMainStore } from '@/stores'
import { YEARS } from '@/stores/constants'
import api from '@/api'

export default {
  name: 'Project Management',
  data () {
    return {
      dialog: {
        topic: {
          value: false,
          title: 'Add Topic'
        },
        assign_project: false,
        edit_project: false,
        view_topic: false
      },
      assignForm: false,
      topic: {},
      project: {},
      selectedProject: {},
      progress: false,
      searchQuery: null
    }
  },
  components: {
    DatePicker,
    IconButton,
    PreviewDialog
  },
  methods: {
    ...mapActions(useMainStore, ['getUsers']),
    ...mapActions(useMainStore, ['getTeams']),
    ...mapActions(useMainStore, ['getTopics']),
    ...mapActions(useMainStore, ['getProjects']),
    ...mapActions(useMainStore, ['ruleRequired']),
    ...mapActions(useMainStore, ['ruleMinMax']),
    projectStatus (project) {
      if (project.team_id) {
        return 'unavailable'
      }

      return 'available'
    },
    select (record, action) {
      if (action === 'view_topic') {
        this.project = record
        this.dialog.view_topic = true
      }

      if (action === 'add_topic') {
        this.dialog.topic.value = true
        this.dialog.topic.title = 'Add Topic'
        this.topic = {
          ...record,
          action: action
        }
      }

      if (action === 'edit_topic') {
        this.dialog.topic.value = true
        this.dialog.topic.title = 'Edit Topic'
        this.topic = {
          ...record,
          name: record.topic_name,
          description: record.topic_description,
          raw_text: record.topic_raw_text,
          action: action
        }
      }

      if (action === 'assign_project') {
        this.dialog.assign_project = true
        this.selectedProject = {
          ...record,
          name: '',
          course_code: '',
          presentation_at: new Date(),
          action: action
        }
      }

      if (action === 'edit_project') {
        this.dialog.edit_project = true
        this.selectedProject = {
          ...record,
          name: record.project_name,
          course_code: record.project_course_code,
          year: record.project_year,
          semester: record.project_semester,
          presentation_at: record.project_presentation_at ? new Date(record.project_presentation_at) : new Date(),
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
          this.dialog.topic.value = false
          this.$router.go(this.$router.currentRoute)
        }
      }

      if (record.action === 'edit_topic') {
        const response = await api.topics.update(record.topic_id, record)

        if (response && response.data) {
          console.log(response.data)
          this.dialog.topic.value = false
          this.$router.go(this.$router.currentRoute)
        }
      }

      if (record.action === 'assign_project') {
        const response = await api.projects.create(record)

        if (response && response.data) {
          console.log(response.data)
          this.dialog.assign_project = false
          this.$router.go(this.$router.currentRoute)
        }
      }

      if (record.action === 'edit_project') {
        const response = await api.projects.update(record.project_id, {
          course_code: record.course_code,
          semester: record.semester,
          year: record.year,
          presentation_at: record.presentation_at
        })

        if (response && response.data) {
          console.log(response.data)
          this.dialog.edit_project = false
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
    ...mapState(useMainStore, ['getSupervisors']),
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
        if (this.selectedProject && this.selectedProject.supervisor_id === team.supervisor_id) {
          return true
        }

        if (team.supervisor_id) {
          return false
        }

        return true
      })
    },
    years () {
      return YEARS
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
