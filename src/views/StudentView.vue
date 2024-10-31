<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <!-- Left Sidebar (1) -->
          <v-col cols="2">
            <div style="margin-right: 20px;">
              <LeftSidebar />
            </div>
          </v-col>

          <!-- Main Content Area (3) -->
          <v-col cols="8">
            <Header />
            <Dashboard :user="user" />
         </v-col>

          <!-- Right Sidebar (4) -->
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
import Dashboard from '@/components/Dashboard.vue'
import { useUserStore } from '@/stores/user'

export default {
  name: 'HomePage',
  data () {
    return {
    }
  },
  components: {
    Header,
    LeftSidebar,
    RightSidebar,
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
