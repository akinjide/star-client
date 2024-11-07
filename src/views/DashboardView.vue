<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <LeftSidebar />
          </v-col>

          <v-col cols="8">
            <HeadBar :name="$route.name"/>

            <div class="pa-2">
              <router-view />
            </div>
         </v-col>

          <v-col cols="2">
            <RightSidebar :tasks="tasks" :user="user" />
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
    return {}
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
