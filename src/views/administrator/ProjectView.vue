<template>
  <v-container fluid>
    <v-row class="mt-4">
      <v-col cols="4" class="offset-8">
        <div class="d-flex justify-end">
          <v-btn class="ml-2" color="blue" size="small" variant="tonal">
            Add Project
          </v-btn>
          <v-btn class="ml-2" color="green" size="small" variant="tonal">
            Add Topic
          </v-btn>
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
              <th class="text-left text-uppercase">Project Title</th>
              <th class="text-left text-uppercase">Supervisor</th>
              <th class="text-left text-uppercase">Availability</th>
              <th class="text-left text-uppercase">Group</th>
              <th class="text-left text-uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in projects"
              :key="project.project_title"
            >
              <td>{{ project.project_title }}</td>
              <td>{{ project.supervisor_name }}</td>
              <td>
                <v-chip class="ma-2 text-capitalize" :color="project.status == 'available' ? 'green' : 'red'" prepend-icon="mdi-circle">
                  {{ project.status }}
                </v-chip>
              </td>
              <td>{{ project.group_name }}</td>
              <td>
                <v-btn class="mr-1" size="x-small" color="blue" variant="tonal">
                  Edit
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

// TOOD
// 1. change project group, supervisor and title
// 2. add project and assign to group, supervisor and title
// 3. upload project document
// 3a. Remove project from group

export default {
  name: 'Project Management',
  data () {
    return {
      projects: [
        {
          project_title: 'Online Management Solution for Graduation Projects',
          supervisor_name: 'Assoc. Prof. Dr. Cem Ergun',
          status: 'unavailable',
          group_name: 'Group 4'
        },
        {
          project_title: 'Video Streaming Platform',
          supervisor_name: 'Assoc. Prof. Dr. Guruc Oz',
          status: 'available',
          group_name: '-'
        },
        {
          project_title: 'Image Processing',
          supervisor_name: 'Prof. Dr. Mohammed Salamah',
          status: 'available',
          group_name: '-'
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
