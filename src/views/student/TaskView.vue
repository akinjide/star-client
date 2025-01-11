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
              <th class="text-left text-uppercase">Grade</th>
              <th class="text-left text-uppercase">Assigned</th>
              <th class="text-left text-uppercase">Ends</th>
              <th class="text-left text-uppercase">Status</th>
              <th class="text-left text-uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(task, index) in userTasks"
              :key="index"
            >
              <td>{{ task.task_name }}</td>
              <td>{{ task.task_grade }}</td>
              <td>{{ $parseDateTime(task.task_assigned_at) }}</td>
              <td>{{ $parseDateTime(task.task_ends_at) }}</td>
              <td>
                <v-icon v-if="!task.task_submitted_at" color="warning" icon="mdi-clock"></v-icon>
                <v-icon v-if="task.task_submitted_at" color="success" icon="mdi-checkbox-marked-circle"></v-icon>
              </td>
              <td>
                <div class="d-flex">
                  <IconButton
                    tooltipText="Mark as completed"
                    color="green"
                    icon="mdi-check"
                    @action="complete(task)"
                    v-if="!task.task_submitted_at"
                  ></IconButton>

                  <IconButton
                    tooltipText="View Comment"
                    color="blue-grey"
                    icon="mdi-comment-eye-outline"
                    @action="select(task, 'view_comment')"
                  ></IconButton>

                  <IconButton
                    tooltipText="View Task"
                    color="blue-grey"
                    icon="mdi-eye-outline"
                    @action="select(task, 'view_task')"
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
    :view="dialog.view_task"
    :header="{
      icon: 'mdi-information',
      title: task.task_name
    }"
    :body="{
      name: task.task_description,
      text: task.task_raw_text ? task.task_raw_text : 'No additional note :)'
    }"
    @close="dialog.view_task = false"
  />

  <PreviewDialog
    :view="dialog.view_comment"
    :header="{
      icon: 'mdi-comment-text',
      title: 'Comment'
    }"
    :body="{
      name: task.task_name,
      text: task.task_comment ? task.task_comment : 'No comment :)'
    }"
    @close="dialog.view_comment = false"
  />
</template>

<script>
import { mapState, mapActions } from 'pinia'

import IconButton from '@/components/IconButton'
import PreviewDialog from '@/components/PreviewDialog'
import { useUserStore, useMainStore } from '@/stores'

export default {
  name: 'Task',
  data () {
    return {
      dialog: {
        view_task: false,
        view_comment: false
      },
      task: {},
      tasks: []
    }
  },
  components: {
    IconButton,
    PreviewDialog
  },
  methods: {
    ...mapActions(useMainStore, ['getUserTasks']),
    ...mapActions(useMainStore, ['completeTask']),
    async select (record, action) {
      if (action === 'view_task') {
        this.task = record
        this.dialog.view_task = true
      }

      if (action === 'view_comment') {
        this.task = record
        this.dialog.view_comment = true
      }
    },
    complete (task) {
      const response = this.completeTask(task.task_id)
      console.log(response)
      this.$router.go(this.$router.currentRoute)
    }
  },
  async created () {
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
