<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <!-- Left Sidebar -->
          <v-col
            :cols="leftDrawer ? leftCol : 1"
            :md="leftDrawer ? 3 : 1"
            :sm="leftDrawer ? 4 : 1"
            class="d-flex"
          >
            <LeftSidebar
              :user="user"
              :drawer="leftDrawer"
              :route_data="userTeam"
            />
          </v-col>

          <!-- Main Content -->
          <v-col
            :cols="mainCol"
            :md="leftDrawer ? 7 : 9"
            :sm="leftDrawer ? 8 : 10"
          >
            <HeadBar
              :name="$route.name"
              :leftDrawer="leftDrawer"
              :rightDrawer="rightDrawer"
              :user="user"
              @action="updateDrawer"
            />

            <div class="pa-2 mt-4">
              <router-view />
            </div>
          </v-col>

          <!-- Right Sidebar -->
          <v-col
            :cols="rightDrawer ? rightCol : 1"
            :md="rightDrawer ? 2 : 1"
            :sm="rightDrawer ? 3 : 1"
            class="d-flex"
          >
            <RightSidebar
              :tasks="userTasks"
              :user="user"
              :drawer="rightDrawer"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import HeadBar from '@/components/HeadBar.vue'
import LeftSidebar from '@/components/LeftSidebar.vue'
import RightSidebar from '@/components/RightSidebar.vue'
import { useAuthStore, useUserStore, useMainStore } from '@/stores'

export default {
  name: 'Main',
  data () {
    return {
      leftCol: 3, // Default size for left sidebar
      rightCol: 2, // Default size for right sidebar
      mainCol: 7, // Default size for main content
      leftDrawer: true, // Controls left sidebar visibility
      rightDrawer: false // Controls right sidebar visibility
    }
  },
  components: {
    HeadBar,
    LeftSidebar,
    RightSidebar
  },
  methods: {
    ...mapActions(useMainStore, [
      'getUserTasks',
      'getProjects',
      'getTeamByMember',
      'getProjectReports',
      'getProjectByTeam'
    ]),
    updateDrawer (drawer) {
      if (drawer.t === 'left') {
        this.leftDrawer = drawer.value
      }

      if (drawer.t === 'right') {
        this.rightDrawer = drawer.value
      }
    }
  },
  async created () {
    await this.getProjects()

    if (this.isStudent) {
      await this.getUserTasks(this.user.id)
      const team = await this.getTeamByMember(this.user.id)

      if (team) {
        const project = await this.getProjectByTeam(team.id)
        await this.getProjectReports(project.project_id)
      }
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useMainStore, ['userTasks', 'userTeam']),
    ...mapState(useAuthStore, ['isStudent'])
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
