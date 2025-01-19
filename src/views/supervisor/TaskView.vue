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
          <h4 class="mx-4">{{ tasksCount }} Tasks(s)</h4>

          <IconButton
            tooltipText="Add Task"
            color="blue"
            size="small"
            icon="mdi-playlist-plus"
            @action="select({}, 'add_task')"
          ></IconButton>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-table
          height="100vh"
          fixed-header
        >
          <thead>
            <tr>
              <th class="text-left text-uppercase">Student Name</th>
              <th class="text-left text-uppercase">Task Name</th>
              <th class="text-left text-uppercase">Grade</th>
              <th class="text-left text-uppercase">Assigned</th>
              <th class="text-left text-uppercase">Ends</th>
              <th class="text-left text-uppercase">Submitted</th>
              <th class="text-left text-uppercase">Status</th>
              <th class="text-left text-uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(task, index) in tasks"
              :key="index"
            >
              <td>{{ task.user_full_name }}</td>
              <td>{{ task.task_name }}</td>
              <td>{{ task.task_grade }}</td>
              <td>{{ $parseDateTime(task.task_assigned_at) }}</td>
              <td>{{ $parseDateTime(task.task_ends_at) }}</td>
              <td>{{ $parseDateTime(task.task_submitted_at) }}</td>
              <td>
                <v-icon v-if="!task.task_submitted_at && new Date(task.task_ends_at) > new Date()" color="warning" icon="mdi-clock"></v-icon>
                <v-icon v-if="!task.task_submitted_at && new Date(task.task_ends_at) <= new Date()" color="red" icon="mdi-clock-alert"></v-icon>
                <v-icon v-if="task.task_submitted_at" color="success" icon="mdi-checkbox-marked-circle"></v-icon>
              </td>
              <td>
                <div class="d-flex">
                  <IconButton
                    tooltipText="Edit Task"
                    color="green"
                    icon="mdi-pencil-plus-outline"
                    @action="select(task, 'edit_task')"
                    v-if="!task.task_submitted_at"
                  ></IconButton>

                  <IconButton
                    tooltipText="Grade Task"
                    color="green"
                    icon="mdi-star"
                    @action="select(task, 'grade_task')"
                    v-if="task.task_submitted_at && !task.task_grade"
                  ></IconButton>

                  <IconButton
                    tooltipText="Add Comment"
                    color="orange"
                    icon="mdi-comment-edit-outline"
                    @action="select(task, 'add_comment')"
                    v-if="!task.task_comment"
                  ></IconButton>

                  <IconButton
                    tooltipText="View Comment"
                    color="blue-grey"
                    icon="mdi-comment-eye-outline"
                    @action="select(task, 'view_comment')"
                    v-if="task.task_comment"
                  ></IconButton>

                  <IconButton
                    tooltipText="View Task"
                    color="blue-grey"
                    icon="mdi-eye-outline"
                    @action="select(task, 'view_task')"
                  ></IconButton>

                  <IconButton
                    tooltipText="Remove Task"
                    color="red"
                    icon="mdi-delete-outline"
                    @action="select(task, 'remove_task')"
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
      v-model="dialog.task.value"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-account"
        :title="dialog.task.title"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                label="Name*"
                v-model="task.name"
                required
                :rules="ruleMinMax('Name', 5, 100)"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-textarea
                label="Description*"
                v-model="task.description"
                required
                :rules="ruleMinMax('Description', 10, 400)"
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-textarea
                label="(Optional) Notes"
                v-model="task.raw_text"
                required
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-select
                :items="supervisorStudents"
                item-title="full_name"
                item-value="id"
                label="Student*"
                v-model="task.user_id"
                required
                :rules="ruleRequired('Student')"
              ></v-select>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <p class="text-subtitle-1 text-grey">Deadline*</p>
              <DatePicker
                v-model="task.ends_at"
                mode="dateTime"
                is24hr
                hide-time-header
                is-required
                expanded
              />
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
            @click="dialog.task.value = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="upsert(task)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

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

  <InputDialog
    :view="dialog.grade_task"
    :header="{
      icon: 'mdi-star',
      title: 'Grade'
    }"
    :body="{
      name: '',
      label: 'Grade task'
    }"
    @close="dialog.grade_task = false"
    @confirm="grade"
  />

  <InputDialog
    :view="dialog.add_comment"
    :header="{
      icon: 'mdi-comment-edit',
      title: 'Comment'
    }"
    :body="{
      name: '',
      label: 'Leave comment'
    }"
    @close="dialog.add_comment = false"
    @confirm="comment"
  />

  <DeleteDialog
    :view="dialog.remove_task"
    :body="{
      name: selectedTask.task_name,
      text: 'Are you sure you want to proceed?'
    }"
    @close="dialog.remove_task = false"
    @confirm="remove"
  />
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { DatePicker } from 'v-calendar'

import DeleteDialog from '@/components/DeleteDialog'
import IconButton from '@/components/IconButton'
import InputDialog from '@/components/InputDialog'
import PreviewDialog from '@/components/PreviewDialog'
import { useUserStore, useMainStore } from '@/stores'

export default {
  name: 'Tasks',
  data () {
    return {
      dialog: {
        task: {
          value: false,
          title: 'Add Task'
        },
        view_task: false,
        add_comment: false,
        view_comment: false,
        grade_task: false,
        remove_task: false
      },
      searchQuery: null,
      selectedTask: {},
      task: {}
    }
  },
  components: {
    DatePicker,
    DeleteDialog,
    IconButton,
    InputDialog,
    PreviewDialog
  },
  methods: {
    ...mapActions(useMainStore, ['addTask']),
    ...mapActions(useMainStore, ['updateTask']),
    ...mapActions(useMainStore, ['removeTask']),
    ...mapActions(useMainStore, ['getTasks']),
    ...mapActions(useMainStore, ['getUsers']),
    ...mapActions(useMainStore, ['getTeams']),
    ...mapActions(useMainStore, ['getUserTasks']),
    ...mapActions(useMainStore, ['getProjects']),
    ...mapActions(useMainStore, ['getTeamBySupervisor']),
    ...mapActions(useMainStore, ['getSupervisorStudents']),
    ...mapActions(useMainStore, ['ruleRequired']),
    ...mapActions(useMainStore, ['ruleMinMax']),
    select (record, action) {
      if (action === 'add_task') {
        this.dialog.task.title = 'Add Task'
        this.task = {
          ...record,
          ends_at: new Date(),
          action: action
        }
        this.dialog.task.value = true
      }

      if (action === 'view_task') {
        this.task = record
        this.dialog.view_task = true
      }

      if (action === 'edit_task') {
        this.dialog.task.title = 'Edit Task'
        this.task = {
          ...record,
          name: record.task_name,
          description: record.task_description,
          raw_text: record.task_raw_text,
          ends_at: record.task_ends_at,
          action: action
        }
        this.dialog.task.value = true
      }

      if (action === 'view_comment') {
        this.task = record
        this.dialog.view_comment = true
      }

      if (action === 'add_comment') {
        this.task = record
        this.dialog.add_comment = true
      }

      if (action === 'grade_task') {
        this.task = record
        this.dialog.grade_task = true
      }

      if (action === 'remove_task') {
        this.selectedTask = record
        this.dialog.remove_task = true
      }
    },
    async upsert (record) {
      if (record.action === 'add_task') {
        const response = await this.addTask(record)

        if (response) {
          this.dialog.task.value = false
          this.$router.go(this.$router.currentRoute)
        }
      }

      if (record.action === 'edit_task') {
        const response = await this.updateTask(record.task_id, record)

        if (response) {
          this.dialog.task.value = false
          this.$router.go(this.$router.currentRoute)
        }
      }
    },
    async grade (value) {
      const response = await this.updateTask(this.task.task_id, { grade: value })

      if (response) {
        this.dialog.grade_task = false
        this.$router.go(this.$router.currentRoute)
      }
    },
    async comment (value) {
      const response = await this.updateTask(this.task.task_id, {
        comment: value
      })

      if (response) {
        this.dialog.add_comment = false
        this.$router.go(this.$router.currentRoute)
      }
    },
    async remove (confirm) {
      if (confirm) {
        const response = await this.removeTask(this.selectedTask.task_id)

        if (response) {
          this.dialog.remove_task = false
          this.$router.go(this.$router.currentRoute)
        }
      }
    }
  },
  async created () {
    await this.getTeams()
    await this.getUsers()
    await this.getTasks()
    await this.getProjects()
    await this.getSupervisorStudents(this.user.id)
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useMainStore, ['tasks']),
    ...mapState(useMainStore, ['projects']),
    ...mapState(useMainStore, ['userTasks']),
    ...mapState(useMainStore, ['getStudents']),
    ...mapState(useMainStore, ['supervisorStudents']),
    resultQuery () {
      if (this.searchQuery) {
        return this.tasks.filter((item) => {
          return this.searchQuery.toLowerCase().split(' ').every((v) => {
            if (
              item.team_name.toLowerCase().includes(v) ||
              item.project_name.toLowerCase().includes(v) ||
              item.task_name.toLowerCase().includes(v) ||
              item.user_full_name.toLowerCase().includes(v)
            ) {
              return true
            }

            return false
          })
        })
      } else {
        return this.tasks
      }
    },
    tasksCount () {
      if (this.tasks) {
        return this.tasks.length
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
