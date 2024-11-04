<template>
  <v-container class="right-sidebar">
    <v-list>
      <div>
        <v-list-subheader class="text-uppercase dashboard-title">Upcoming Tasks</v-list-subheader>

        <v-list-item v-for="(task, index) in tasks" :key="index">
          <v-list-item-title>{{ task.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ task.time }}</v-list-item-subtitle>
        </v-list-item>
      </div>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'RightSidebar',
  data () {
    return {
      tasks: [
        { title: 'Typography in UX/UI', time: '10:00 am' },
        { title: 'Figma UI UX Design', time: '10:00 am' }
      ]
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
