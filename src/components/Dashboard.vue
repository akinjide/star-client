<template>
 <v-container>
    <v-row>
      <v-col class="v-col-10">
        <v-card class="welcome-card pa-5" >
          <v-card-text>
            <h2>Welcome Back, {{ user.full_name }}!</h2>
            <p v-if="isStudent">Let’s keep working on your graduation project!</p>
            <p v-if="isSupervisor">Another beautiful day to see how the students are progressing with their graduation project!</p>
            <p v-if="isAdministrator">Another beautiful day to manage this great institution!</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="isStudent">
      <v-col class="v-col-4" v-if="team && team.name">
        <v-card class="progress-card mt-5">
          <v-card-item>
            <v-card-title>{{ team.name }}</v-card-title>

            <v-card-subtitle>
              <v-chip
                prepend-icon="mdi-star"
                color="orange"
                v-if="team.is_lead"
                size="small"
              >
                Lead
              </v-chip>
              <v-chip
                color="teal"
                v-if="!team.is_lead"
                size="small"
              >
                Member
              </v-chip>
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>{{ team.description }}</v-card-text>
        </v-card>
      </v-col>

      <v-col class="v-col-3">
        <v-card class="progress-card mt-5">
          <v-card-text class="text-center">
            <v-progress-circular :model-value="reportProgress" size="120" width="25" color="pink">
              {{ reportProgress }}%
            </v-progress-circular>
            <p class="pt-4">Report Progress</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="v-col-3">
        <v-card class="progress-card mt-5">
          <v-card-text class="text-center">
            <v-progress-circular :model-value="taskProgress" size="120" width="25" color="orange">
              {{ taskProgress }} %
            </v-progress-circular>
            <p class="pt-4">Task Progress</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
 </v-container>
</template>

<script>
import { mapState } from 'pinia'

import { useAuthStore, useMainStore } from '@/stores'
import { REPORT_TYPES } from '@/stores/constants'

export default {
  name: 'Dashboard',
  props: {
    tasks: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    team: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(useAuthStore, ['isStudent']),
    ...mapState(useAuthStore, ['isSupervisor']),
    ...mapState(useAuthStore, ['isAdministrator']),
    ...mapState(useMainStore, ['projectReports']),
    dedupeSubmissions () {
      const q = []
      const dedupeSubmissions = []
      const submissions = this.projectReports

      if (submissions && submissions.length) {
        for (const submission of submissions) {
          q.push(submission.report_name)
          dedupeSubmissions.push(submission)
        }

        for (const report of REPORT_TYPES) {
          if (!q.includes(report)) {
            dedupeSubmissions.push({
              report_name: report
            })
          }
        }
      }

      return dedupeSubmissions
    },
    reportProgress () {
      if (this.projectReports && this.projectReports.length) {
        const progressReports = this.dedupeSubmissions.filter((submission) => {
          if (submission.report_name === REPORT_TYPES[2]) {
            return true
          }

          return false
        })

        return Math.round((progressReports.length / 8) * 100)
      }

      return 0
    },
    taskProgress () {
      if (this.tasks && this.tasks.length) {
        const completedTasks = this.tasks.filter((task) => {
          if (task.task_submitted_at) {
            return true
          }

          return false
        })

        return Math.round((completedTasks.length / this.tasks.length) * 100)
      }

      return 0
    }
  }
}
</script>

<style scoped>
.welcome-card {
  position: relative;
  height: 120px;
  color:#f2f2f7;
  background: rgba(0, 26, 255, 0.37);
  padding: 10px;
}

.progress-card {
  background-color: #f2f2f7;
  padding: 16px;
}
</style>
