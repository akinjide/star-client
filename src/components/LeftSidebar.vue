<template>
  <v-navigation-drawer app permanent Left class="left-sidebar py-1 px-5">
    <v-list>
      <div>
        <v-list-subheader class="text-uppercase dashboard-title">Dashboard</v-list-subheader>

        <v-list-item v-for="(item, index) in menuItems" :key="index" :active="item.active" :href="item.href" :prepend-icon="item.icon ">
          <div class="d-flex align-center">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </div>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'LeftSidebar',
  data () {
    return {
      menuItems: [
        { title: 'Home', icon: 'mdi-home', active: true, href: '/dashboard' },
        { title: 'Project', icon: 'mdi-lightbulb-outline', active: false, href: '/dashboard/projects' },
        { title: 'Tasks', icon: 'mdi-format-list-bulleted', active: false, href: '/dashboard/tasks' },
        { title: 'Reports', icon: 'mdi-file-document-outline', active: false, href: '/dashboard/reports' },
        { title: 'Community', icon: 'mdi-account-group-outline', active: false, href: '/dashboard/community' }
      ]
    }
  }
}
</script>

<style scoped>
.left-sidebar {
  background-color: #445a99;
  color: white;
  width: 150px; /* Set width of the sidebar */
}

.dashboard-title {
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 0;
}

.v-list-item-title {
  color: white;
  font-size: 14px;
}

.v-list-item-icon {
  color: white;
}
</style>
