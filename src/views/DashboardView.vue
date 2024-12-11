<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <LeftSidebar :user="user" />
          </v-col>

          <v-col cols="8">
            <HeadBar :name="$route.name"/>

            <div class="pa-2 pl-2 pr-10">
              <router-view />
            </div>
         </v-col>

          <v-col cols="2">
            <RightSidebar :tasks="tasks" :user="user" :roles="roles"/>
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
import { useUserStore } from '@/stores/user'

export default {
  name: 'Dashboard',
  data () {
    return {
      roles: {
        1: 'Administrator',
        2: 'Supervisor',
        3: 'Committee Member',
        4: 'Student'
      }
    }
  },
  components: {
    HeadBar,
    LeftSidebar,
    RightSidebar
  },
  methods: {
    ...mapActions(useUserStore, ['getUserTasks']),
    ...mapActions(useUserStore, ['getUser'])
  },
  async created () {
    await this.getUserTasks(this.user.id)
  },
  computed: {
    ...mapState(useUserStore, ['tasks']),
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
