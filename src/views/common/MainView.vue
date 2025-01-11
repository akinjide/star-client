<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col :cols="leftCol">
            <LeftSidebar
              :user="user"
              :drawer="leftDrawer"
              :route_data="userTeam"
            />
          </v-col>

          <v-col :cols="mainCol">
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

          <v-col :cols="rightCol">
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
      leftCol: 2,
      rightCol: 2,
      mainCol: 9,
      leftDrawer: true,
      rightDrawer: false
    }
  },
  components: {
    HeadBar,
    LeftSidebar,
    RightSidebar
  },
  methods: {
    ...mapActions(useMainStore, ['getUserTasks']),
    ...mapActions(useMainStore, ['getProjects']),
    ...mapActions(useMainStore, ['getTeamByMember']),
    ...mapActions(useMainStore, ['getProjectReports']),
    ...mapActions(useMainStore, ['getProjectByTeam']),
    updateDrawer (drawer) {
      if (drawer.t === 'left') {
        this.leftDrawer = drawer.value

        if (!drawer.value) {
          this.leftCol = 1
          this.mainCol = this.mainCol + this.leftCol
        } else {
          this.mainCol = this.mainCol - this.leftCol
          this.leftCol = 2
        }
      }

      if (drawer.t === 'right') {
        this.rightDrawer = drawer.value

        if (!drawer.value) {
          this.rightCol = 1
          this.mainCol = this.mainCol + this.rightCol
        } else {
          this.rightCol = 1
          this.mainCol = this.mainCol - this.rightCol
        }
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
    ...mapState(useMainStore, ['userTasks']),
    ...mapState(useMainStore, ['userTeam']),
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
