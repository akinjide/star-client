<template>
  <v-navigation-drawer v-if="drawer" permanent location="right" width="300" class="py-1 d-print-none">
    <v-row align="center">
      <v-col cols="9">
        <v-list-item
          lines="two"
          :title="user.full_name"
          :prepend-avatar="getImage(user.image)"
          :subtitle="activeUserRole"
          nav
        >
        </v-list-item>
      </v-col>

      <v-col cols="3">
        <v-btn icon="mdi-logout" size="x-small" @click="logout(user, this.$router)"></v-btn>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col>
        <v-card class="calendar-card ma-4" outlined>
          <VCalendar borderless title-position="left" :attributes="populateCalendar()" />
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="pendingTasks.length && isStudent">
      <v-col>
        <v-card class="tasks-card ma-4" outlined>
          <v-card-title class="dashboard-title">Pending Tasks</v-card-title>

          <v-list>
            <v-list-item v-for="(task, index) in pendingTasks" :key="index" class="pb-4">
              <v-list-item-title>{{ task.task_name }}</v-list-item-title>

              <v-list-item-subtitle>
                <v-icon v-if="new Date(task.task_ends_at) >= new Date()" class="mr-1" color="warning" icon="mdi-clock-outline"></v-icon>
                <v-icon  v-if="new Date(task.task_ends_at) <= new Date()" class="mr-1" color="red" icon="mdi-clock-alert-outline"></v-icon>
                {{ $parseDateTime(task.task_ends_at) }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import { useAuthStore, useMainStore } from '@/stores'

export default {
  name: 'RightSidebar',
  components: {},
  props: {
    tasks: {
      type: Array,
      required: false
    },
    user: {
      type: Object,
      required: true
    },
    drawer: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      attributes: []
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),
    populateCalendar () {
      this.attributes = [{
        highlight: {
          color: 'blue',
          fillMode: 'outline'
        },
        key: 'today',
        popover: {
          label: 'Another beautiful day!'
        },
        dates: [new Date()]
      }]

      if (this.tasks && this.tasks.length) {
        for (const task of this.tasks) {
          if (task.task_submitted_at) {
            this.attributes.push({
              highlight: 'green',
              dates: [task.task_assigned_at],
              popover: {
                label: `${task.task_name} submitted!`
              }
            })

            continue
          }

          if (new Date(task.task_ends_at) <= new Date()) {
            this.attributes.push({
              highlight: 'red',
              dates: [task.task_ends_at],
              popover: {
                label: `${task.task_name} exceeded deadline!`
              }
            })

            continue
          }

          this.attributes.push({
            highlight: 'orange',
            dates: [[task.task_assigned_at, task.task_ends_at]],
            popover: {
              label: `${task.task_name} ends soon!`
            }
          })
        }
      }

      return this.attributes
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isStudent']),
    ...mapState(useMainStore, ['getImage']),
    ...mapState(useMainStore, ['getRoleName']),
    pendingTasks () {
      if (this.tasks && this.tasks.length) {
        return this.tasks.filter((task) => {
          if (task.task_submitted_at) {
            return false
          }

          return true
        })
      }

      return []
    },
    activeUserRole () {
      return this.getRoleName(this.user.role_id) || 'Logged in'
    }
  }
}
</script>

<style scoped>
.right-sidebar{
  display: flex;
  justify-content: center;
  align-content: space-evenly;
}

.calendar-card :deep(.vc-weekday-1, .vc-weekday-7) {
  color: #6366f1;
}

.calendar-card, .tasks-card {
  margin-top: 20px;
  background-color: #ffffff;
}

.calendar-title {
  font-weight: bold;
  color: rgba(0, 26, 255, 0.37)
}

.task-title {
  font-weight: bold;
}
</style>
