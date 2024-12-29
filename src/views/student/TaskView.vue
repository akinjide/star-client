<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-table
          height="100vh"
          fixed-header
        >
          <thead>
            <tr>
              <th class="text-left text-uppercase">Task Name</th>
              <th class="text-left text-uppercase">Task Description</th>
              <th class="text-left text-uppercase">Grade</th>
              <th class="text-left text-uppercase">Assigned</th>
              <th class="text-left text-uppercase">Ends</th>
              <th class="text-left text-uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(task, index) in userTasks"
              :key="index"
            >
              <td>{{ task.task_name }}</td>
              <td>{{ task.task_description }}</td>
              <td>{{ task.task_grade }}</td>
              <td>{{ parseDateTime(task.task_assigned_at) }}</td>
              <td>{{ parseDateTime(task.task_ends_at) }}</td>
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
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import { useDateFormat } from '@vueuse/core'
import { useUserStore, useMainStore } from '@/stores'

export default {
  name: 'Task',
  data () {
    return {
      tasks: []
    }
  },
  components: {},
  methods: {
    ...mapActions(useUserStore, ['getUser']),
    ...mapActions(useMainStore, ['getUserTasks']),
    parseDateTime (t) {
      if (!t) {
        return ''
      }

      return useDateFormat(t, 'ddd, YYYY-MM-DD')
    },
    completeTask (task) {
      console.log(task)
    }
  },
  async created () {
    await this.getUser()
    await this.getUserTasks(this.user.id)
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useMainStore, ['userTasks'])
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
