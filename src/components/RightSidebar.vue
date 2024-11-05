<template>
  <v-navigation-drawer absolute app permanent right location="right" class="right-sidebar">
  <!-- <v-navigation-drawer app permanent location="right" class="right-sidebar py-1 px-5"> -->
    <div>
      <!-- Profile Section -->
      <div class="profile-section">
        <v-icon large>mdi-bell-outline</v-icon>
        <v-avatar size="30" color="primary">
          <v-icon>mdi-account</v-icon>
        </v-avatar>
        <span class="user-name">Hind Abdalla</span>
        <v-icon>mdi-chevron-down</v-icon>
      </div>

      <!-- Calendar Section -->
      <v-card class="calendar-card pa-1 ma-1" outlined >
        <v-date-picker v-model="selectedDate" size="small"></v-date-picker>
      </v-card>

      <v-container class="right-sidebar">
      </v-container>

      <!-- Pending Tasks Section -->
      <v-card class="tasks-card pa-1 ma-1" outlined>
        <v-card-title>Pending Tasks</v-card-title>

        <v-list>
          <div>
            <v-list-subheader class="text-uppercase dashboard-title">Upcoming Tasks</v-list-subheader>

            <v-list-item v-for="(task, index) in tasks" :key="index">
              <v-list-item-title>{{ task.task_name }}</v-list-item-title>
              <v-list-item-subtitle>{{ endsAt(task.task_ends_at) }}</v-list-item-subtitle>
            </v-list-item>
          </div>
        </v-list>

        <v-list>
          <v-list-item v-for="(task, index) in t" :key="index">
            <v-list-item-avatar>
              <v-icon color="red">mdi-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="task-title">{{ task.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ task.type }} • {{ task.time }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon small>mdi-dots-horizontal</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>

      </v-card>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { useDateFormat } from '@vueuse/core'

export default {
  name: 'RightSidebar',
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selectedDate: new Date(),
      t: [
        { title: 'Speak with stakeholders', type: 'Design', time: '10:00 am' },
        { title: 'Input Rubrics Data', type: 'Design', time: '10:00 am' }
      ]
    }
  },
  methods: {
    endsAt (t) {
      return useDateFormat(t, 'YYYY-MM-DD HH:mm:ss')
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
.profile-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.user-name {
  margin: 0 8px;
  font-weight: bold;
  color: #445a99;
}

.calendar-card, .tasks-card {
  margin-top: 20px;
  padding: 16px;
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
