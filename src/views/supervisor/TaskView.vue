<template>
  <v-container fluid>
    <v-row class="mt-4">
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
        <div class="d-flex justify-end">
          <h4 class="mx-4">{{ tasksCount }} Tasks(s)</h4>
          <v-btn class="ml-2" color="blue" size="small" variant="tonal" @click="select({}, 'add_task')">
            Add Task
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-table
          height="100vh"
          fixed-header
          density="compact"
        >
          <thead>
            <tr>
              <th class="text-left text-uppercase">Project Name</th>
              <th class="text-left text-uppercase">Student Name</th>
              <th class="text-left text-uppercase">Team Name</th>
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
              <td>{{ task.project_name }}</td>
              <td>{{ task.user_full_name }}</td>
              <td>{{ task.team_name }}</td>
              <td>{{ task.task_name }}</td>
              <td>{{ task.task_grade }}</td>
              <td>{{ parseDateTime(task.task_assigned_at) }}</td>
              <td>{{ parseDateTime(task.task_ends_at) }}</td>
              <td>{{ parseDateTime(task.task_submitted_at) }}</td>
              <td>
                <v-icon v-if="!task.task_submitted_at" color="warning" icon="mdi-clock"></v-icon>
                <v-icon v-if="task.task_submitted_at" color="success" icon="mdi-checkbox-marked-circle"></v-icon>
              </td>
              <td>
                <v-btn class="ml-1" size="x-small" color="blue" variant="tonal">View</v-btn>
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
      v-model="addTaskDialog"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-account"
        title="Add Task"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                label="Name*"
                v-model="task.name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-textarea
                label="Description*"
                v-model="task.description"
                required
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-select
                :items="getStudents"
                item-title="full_name"
                item-value="id"
                label="Student*"
                v-model="task.user_id"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <p class="text-subtitle-1 text-grey">Deadline*</p>
              <DatePicker v-model="task.ends_at" mode="dateTime" is24hr  hide-time-header is-required expanded />
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
            @click="addTaskDialog = false"
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
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { DatePicker } from 'v-calendar'
import { useUserStore, useMainStore } from '@/stores'
import { useDateFormat } from '@vueuse/core'

export default {
  name: 'Tasks',
  data () {
    return {
      addTaskDialog: false,
      searchQuery: null,
      task: {}
    }
  },
  components: {
    DatePicker
  },
  methods: {
    ...mapActions(useMainStore, ['addTask']),
    ...mapActions(useMainStore, ['getTasks']),
    ...mapActions(useMainStore, ['getUsers']),
    ...mapActions(useMainStore, ['getTeams']),
    ...mapActions(useMainStore, ['getUserTasks']),
    ...mapActions(useMainStore, ['getProjects']),
    parseDateTime (t) {
      if (!t) {
        return ''
      }

      return useDateFormat(t, 'ddd, YYYY-MM-DD')
    },
    select (record, action) {
      if (action === 'add_task') {
        this.addTaskDialog = true
        this.task = {
          ...record,
          ends_at: new Date(),
          action: action
        }
      }

      if (action === 'edit_task') {
        // this.projectDialog = true
        // this.project = {
        //   ...record,
        //   name: '',
        //   course_code: '',
        //   action: action
        // }
      }
    },
    async upsert (record) {
      if (record.action === 'add_task') {
        const response = await this.addTask(record)

        if (response) {
          this.addTaskDialog = false
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
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useMainStore, ['tasks']),
    ...mapState(useMainStore, ['projects']),
    ...mapState(useMainStore, ['userTasks']),
    ...mapState(useMainStore, ['getStudents']),
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
