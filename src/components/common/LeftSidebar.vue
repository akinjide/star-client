<template>
  <v-navigation-drawer app permanent Left class="left-sidebar py-1 px-5">
    <v-list>
      <div>
        <v-list-subheader class="text-uppercase dashboard-title">Dashboard</v-list-subheader>

        <v-list-item
          v-for="(item, index) in roleBasedMenu"
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
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      menu: [
        { title: 'Home', icon: 'mdi-home', name: 'home', allow: [1, 4, 2] },
        { title: 'Project', icon: 'mdi-lightbulb-outline', name: 'projects', allow: [4] },
        { title: 'Tasks', icon: 'mdi-format-list-bulleted', name: 'tasks', allow: [4] },
        { title: 'Reports', icon: 'mdi-file-document-outline', name: 'reports', allow: [4] },
        { title: 'Community', icon: 'mdi-forum-outline', name: 'community', allow: [4] },

        { title: 'Users', icon: 'mdi-account-multiple-outline', name: 'user management', allow: [1] },
        { title: 'Team', icon: 'mdi-account-group-outline', name: 'team management', allow: [1] },
        { title: 'Project', icon: 'mdi-lightbulb-on-outline', name: 'project management', allow: [1] },
        { title: 'Documentation', icon: 'mdi-file-document-multiple-outline', name: 'documentation management', allow: [1] },

        { title: 'Evaluations', icon: 'mdi-file-chart-outline', name: 'evaluations', allow: [1, 2, 3] }
      ]
    }
  },
  computed: {
    roleBasedMenu () {
      const menu = []
      const filterFn = (roleId) => {
        return (m) => {
          if (m.allow.includes(roleId)) { return true }
          return false
        }
      }

      if (this.menu.length) {
        menu.push(...this.menu.filter(filterFn(-1)))

        switch (this.user.role_id) {
          case 1:
          case 2:
          case 3:
          case 4:
            menu.push(...this.menu.filter(filterFn(this.user.role_id)))
            break
        }
      }

      return menu
    }
  }
}
</script>

<style scoped>
.left-sidebar {
  background-color: #445a99;
  color: white;
  width: 200px; /* Set width of the sidebar */
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
