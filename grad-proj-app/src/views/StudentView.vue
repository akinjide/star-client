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
            <Dashboard />
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
import Header from '@/components/Header.vue'
import LeftSidebar from '@/components/LeftSidebar.vue'
import RightSidebar from '@/components/RightSidebar.vue'
import Dashboard from '@/components/Dashboard.vue'

export default {
  name: 'HomePage',
  components: {
    Header,
    LeftSidebar,
    RightSidebar,
    Dashboard
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
