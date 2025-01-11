<template>
  <v-container>
    <Dashboard
      :tasks="userTasks"
      :team="userTeam"
      :user="user"
    />
  </v-container>
</template>

<script>
import { mapState } from 'pinia'

import Dashboard from '@/components/Dashboard.vue'
import { useUserStore, useMainStore } from '@/stores'

export default {
  name: 'Home',
  data () {
    return {}
  },
  components: {
    Dashboard
  },
  methods: {},
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useMainStore, ['userTasks']),
    ...mapState(useMainStore, ['userTeam'])
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
