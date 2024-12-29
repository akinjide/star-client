<template>
  <v-container>
    <Dashboard :tasks="userTasks" :team="userTeam" :user="user" :getRoleName="getRoleName" />
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'pinia'

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
  methods: {
    ...mapActions(useUserStore, ['getUser']),
    ...mapActions(useMainStore, ['getUserTasks']),
    ...mapActions(useMainStore, ['getTeamByMember'])
  },
  async created () {
    await this.getUserTasks(this.user.id)

    if (this.user.role_id === 4) {
      await this.getTeamByMember(this.user.id)
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useMainStore, ['userTeam']),
    ...mapState(useMainStore, ['userTasks']),
    ...mapState(useMainStore, ['userTeam']),
    ...mapState(useMainStore, ['getRoleName'])
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
