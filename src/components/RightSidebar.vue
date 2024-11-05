<template>
  <v-container class="right-sidebar">
    <v-list>
      <div>
        <v-list-subheader class="text-uppercase dashboard-title">Upcoming Tasks</v-list-subheader>

        <v-list-item v-for="(task, index) in tasks" :key="index">
          <v-list-item-title>{{ task.task_name }}</v-list-item-title>
          <v-list-item-subtitle>{{ endsAt(task.task_ends_at) }}</v-list-item-subtitle>
        </v-list-item>
      </div>
    </v-list>
  </v-container>
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
