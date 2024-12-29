<template>
 <v-container>
    <v-row class="mt-2">
      <v-col cols>
        <v-card class="welcome-card pa-5" >
          <v-card-text>
            <h2>Welcome Back, {{ user.full_name }}!</h2>
            <p>Let’s keep working on your graduation project!</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="isStudent">
      <v-col class="ma-2 v-col-auto" v-if="team">
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

      <v-col class="ma-2 v-col-auto">
        <v-card class="progress-card mt-5">
          <v-card-text class="text-center">
            <v-progress-circular :model-value="65" size="120" width="15" color="pink">
              65%
            </v-progress-circular>
            <p class="pt-4">Report Progress</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="ma-2 v-col-auto">
        <v-card class="progress-card mt-5">
          <v-card-text class="text-center">
            <v-progress-circular :model-value="progress" size="120" width="15" color="teal">
              {{ progress }} %
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

import { useAuthStore } from '@/stores'

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
    },
    getRoleName: {
      type: Function,
      required: true
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isStudent']),
    progress () {
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
    width: 750px;
    width: 750px;
    height: 120px;
    color:#f2f2f7;
   background: rgba(0, 26, 255, 0.37);
   border-radius: 20px;
   padding: 10px;
  }

  .progress-card {
    background-color: #f2f2f7;
    padding: 16px;
    width: 200px;
  }
  </style>
