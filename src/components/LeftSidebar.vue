<template>
  <v-navigation-drawer app permanent Left class="left-sidebar py-1 px-5">
    <v-list>
      <div>
        <v-list-subheader class="text-uppercase dashboard-title">Dashboard</v-list-subheader>

        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index" nav
          :active="item.name === $route.name"
          :to="{name: item.name}"
          :prepend-icon="item.icon"
        >
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
        { title: 'Home', icon: 'mdi-home', name: 'home' },
        { title: 'Project', icon: 'mdi-lightbulb-outline', name: 'projects' },
        { title: 'Tasks', icon: 'mdi-format-list-bulleted', name: 'tasks' },
        { title: 'Reports', icon: 'mdi-file-document-outline', name: 'reports' },
        { title: 'Community', icon: 'mdi-account-group-outline', name: 'community' }
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
