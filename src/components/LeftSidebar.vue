<template>
  <v-navigation-drawer app permanent Left class="left-sidebar">
    <v-list>
      <div style="margin-right: 20px;">
        <v-list-item>
          <v-list-item-title class="text-uppercase dashboard-title">
            Dashboard
          </v-list-item-title>
        </v-list-item>

        <div>
          <v-list-item v-for="(item, index) in menuItems" :key="index" link>
            <div style="display: flex;">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </div>
          </v-list-item>
        </div>
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
        { title: 'Home', icon: 'mdi-home' },
        { title: 'Project', icon: 'mdi-lightbulb-outline' },
        { title: 'Tasks', icon: 'mdi-format-list-bulleted' },
        { title: 'Reports', icon: 'mdi-file-document-outline' },
        { title: 'Community', icon: 'mdi-account-group-outline' }
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
