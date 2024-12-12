<template>
  <v-container>
    <Dashboard :user="user" />
  </v-container>
</template>

<script>
import { mapState } from 'pinia'

import Dashboard from '@/components/Dashboard.vue'
import { useUserStore } from '@/stores/user'

export default {
  name: 'Home',
  data () {
    return {}
  },
  components: {
    Dashboard
  },
  methods: {
  },
  computed: {
    ...mapState(useUserStore, ['user'])
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
