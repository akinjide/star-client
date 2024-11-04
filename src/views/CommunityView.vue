<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>Community View</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'Community',
  data () {
    return {}
  },
  components: {},
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
