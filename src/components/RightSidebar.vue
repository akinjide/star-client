<template>
  <v-navigation-drawer permanent location="right" width="300" class="py-1">
    <v-row align="center">
      <v-col cols="9">
        <v-list-item
          lines="two"
          prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
          subtitle="Logged in"
          nav
          :title="user.full_name"
        >
        </v-list-item>
      </v-col>

      <v-col cols="3">
        <v-btn icon="mdi-bell-outline" size="x-small"></v-btn>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col>
        <v-card class="calendar-card ma-4" outlined>
          <VCalendar borderless title-position="left" :attributes="attributes" />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card class="tasks-card ma-4" outlined>
          <v-card-title class="dashboard-title">Pending Tasks</v-card-title>

          <v-list>
            <v-list-item v-for="(task, index) in pendingTasks" :key="index" class="pb-4">
              <v-list-item-title>{{ task.task_name }}</v-list-item-title>

              <v-list-item-subtitle>{{ endsAt(task.task_ends_at) }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import { useDateFormat } from '@vueuse/core'

export default {
  name: 'RightSidebar',
  components: {},
  props: {
    tasks: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      attributes: [
        {
          highlight: {
            color: 'blue',
            fillMode: 'light'
          },
          popover: {
            visibility: 'click',
            label: 'Task 1: Deadline'
          },
          dates: [new Date()]
        },
        {
          highlight: 'green',
          dot: true,
          dates: [[new Date(2024, 10, 8), new Date(2024, 10, 12)]],
          popover: {
            visibility: 'click',
            label: 'Task 2: Deadline'
          }
        }
      ]
    }
  },
  methods: {
    endsAt (t) {
      return useDateFormat(t, 'dddd, YYYY-MM-DD HH:mm a')
    }
  },
  computed: {
    pendingTasks () {
      return this.tasks.filter((task) => {
        if (task.task_submitted_at) {
          return false
        }

        return true
      })
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
