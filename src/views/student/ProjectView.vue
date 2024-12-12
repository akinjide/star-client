<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-table
          height="100vh"
          fixed-header
        >
          <thead>
            <tr>
              <th class="text-left text-uppercase">
                Project Title
              </th>
              <th class="text-left text-uppercase">
                Supervisor
              </th>
              <th class="text-left text-uppercase">
                Availability
              </th>
              <th class="text-left text-uppercase">
                Group
              </th>
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

export default {
  name: 'Project',
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
