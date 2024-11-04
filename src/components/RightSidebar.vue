<template>
   <v-navigation-drawer location="right" class="right-sidebar">
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

    <!-- Pending Tasks Section -->
    <v-card class="tasks-card pa-1 ma-1" outlined>
      <v-card-title>Pending Tasks</v-card-title>
      <v-list>
        <v-list-item v-for="(task, index) in tasks" :key="index">
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
export default {
  data () {
    return {
      selectedDate: new Date(),
      tasks: [
        { title: 'Speak with stakeholders', type: 'Design', time: '10:00 am' },
        { title: 'Input Rubrics Data', type: 'Design', time: '10:00 am' }
      ]
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
