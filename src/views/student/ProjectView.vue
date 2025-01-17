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

      <v-col cols="4"></v-col>
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
  <PreviewDialog
    :view="dialog.view_topic"
    :header="{
      icon: 'mdi-information',
      title: 'Topic Information'
    }"
    :body="{
      name: project.topic_name,
      text: project.topic_description,
      url: getDocument(project.topic_url)
    }"
    @close="dialog.view_topic = false"
  />
</template>

<script>
import { mapState, mapActions } from 'pinia'

import IconButton from '@/components/IconButton'
import PreviewDialog from '@/components/PreviewDialog'
import { useUserStore, useMainStore } from '@/stores'

export default {
  name: 'Projects',
  data () {
    return {
      dialog: {
        view_topic: false
      },
      project: {},
      searchQuery: null
    }
  },
  components: {
    IconButton,
    PreviewDialog
  },
  methods: {
    ...mapActions(useMainStore, ['getTopics']),
    ...mapActions(useMainStore, ['getProjects']),
    async select (project, action) {
      if (action === 'view_topic') {
        this.project = project
        this.dialog.view_topic = true
      }
    },
    projectStatus (project) {
      if (project.team_id) {
        return 'unavailable'
      }

      return 'available'
    }
  },
  async created () {
    await this.getTopics()
    await this.getProjects()
  },
  computed: {
    ...mapState(useUserStore, ['user']),
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
