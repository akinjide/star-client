<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <LeftSidebar :user="user" :route_data="userTeam" />
          </v-col>

          <v-col cols="8">
            <HeadBar :name="$route.name"/>

            <div class="pa-2 pl-2 pr-10">
              <router-view />
            </div>
         </v-col>

          <v-col cols="2">
            <RightSidebar :tasks="userTasks" :user="user" :getRoleName="getRoleName" />
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
import { useUserStore, useMainStore } from '@/stores'

export default {
  name: 'Dashboard',
  data () {
    return {}
  },
  components: {
    HeadBar,
    LeftSidebar,
    RightSidebar
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
