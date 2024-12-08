<template>
  <v-container fluid>
    <v-row>
      <v-col cols="10">
        <v-table
          height="100vh"
          fixed-header
        >
          <thead>
            <tr>
              <th class="text-left text-uppercase">Task</th>
              <th class="text-left text-uppercase">Description</th>
              <th class="text-left text-uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(task, index) in tasks"
              :key="index"
            >
              <td>{{ task.task_id }}</td>
              <td>{{ task.task_name }}</td>
              <td>
                <v-btn v-if="!task.task_submitted_at" size="x-small" variant="tonal">
                  Mark as completed
                </v-btn>
                <v-icon v-if="task.task_submitted_at" color="success" size="large" icon="mdi-checkbox-marked-circle"></v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>

      <v-col cols="2">
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
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'Task',
  data () {
    return {}
  },
  components: {},
  methods: {
    ...mapActions(useUserStore, ['getUserTasks']),
    ...mapActions(useUserStore, ['getUser'])
  },
  computed: {
    ...mapState(useUserStore, ['tasks']),
    ...mapState(useUserStore, ['user']),
    progress () {
      if (this.tasks.length) {
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
.v-main {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.v-container {
  max-width: 100%;
  padding: 0;
}
</style>
