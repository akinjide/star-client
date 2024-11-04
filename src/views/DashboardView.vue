<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <LeftSidebar />
          </v-col>

          <v-col cols="8">
            <Header :name="$route.name"/>
            <router-view />
         </v-col>

          <v-col cols="2">
            <RightSidebar />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'pinia'

import Header from '@/components/Header.vue'
import LeftSidebar from '@/components/LeftSidebar.vue'
import RightSidebar from '@/components/RightSidebar.vue'
import { useUserStore } from '@/stores/user'

export default {
  name: 'Dashboard',
  data () {
    return {}
  },
  components: {
    Header,
    LeftSidebar,
    RightSidebar
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
