<template>
  <v-container class="right-sidebar">
    <v-list>
      <div>
        <v-list-subheader class="text-uppercase dashboard-title">Upcoming Tasks</v-list-subheader>

        <v-list-item v-for="(task, index) in tasks" :key="index">
          <v-list-item-title>{{ task.task_name }}</v-list-item-title>
          <v-list-item-subtitle>{{ endsAt(task.task_ends_at) }}</v-list-item-subtitle>
        </v-list-item>
<<<<<<< Updated upstream
      </div>
    </v-list>
  </v-container>
=======
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
>>>>>>> Stashed changes
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
    return {}
  },
  methods: {
    endsAt (t) {
      return useDateFormat(t, 'YYYY-MM-DD HH:mm:ss')
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
.right-sidebar {
  background-color: #f0f0f0;
  width: 250px; /* Set width of the sidebar */
}

.v-list-item-title {
  font-size: 16px;
}
</style>
