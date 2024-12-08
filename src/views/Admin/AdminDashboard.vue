<template>
    <v-app>
        <v-main>
            <v-row>
          <!-- Left Sidebar (1) -->
          <v-col cols="2">
              <LeftAdmin />
          </v-col>
          <!-- Main Content Area (3) -->
          <v-col cols="10">
            <HeaderAdmin />
            <Dashboard />
         </v-col>
        </v-row>
        </v-main>
    </v-app>
</template>

<script>
import Dashboard from '@/components/Admin/Dashboard.vue'
import HeaderAdmin from '@/components/Admin/HeaderAdmin.vue'
import LeftAdmin from '@/components/Admin/LeftAdmin.vue'

export default {
  name: 'AdminDashboard',
  components: {
    HeaderAdmin,
    LeftAdmin,
    Dashboard
  }
}
</script>

<style>
</style>
