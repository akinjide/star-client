<template>
  <v-navigation-drawer v-if="drawer" app permanent Left class="left-sidebar py-1 px-5 d-print-none">
    <v-list>
      <div>
        <v-list-subheader class="text-uppercase dashboard-title">Dashboard</v-list-subheader>

        <v-list-item
          v-for="(menu, index) in roleBasedMenu"
          :key="index" nav
          :active="menu.name === $route.name"
          :to="getRoute(menu)"
          :prepend-icon="menu.icon"
        >
          <div class="d-flex align-center">
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
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
    },
    route_data: {
      type: Object,
      required: false
    },
    drawer: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      menu: [
        // All
        { title: 'Home', icon: 'mdi-home', name: 'home', allow: [2, 4] },
        { title: 'Project', icon: 'mdi-file-document-multiple-outline', name: 'moderate_projects', allow: [2] },
        { title: 'Project', icon: 'mdi-file-document-multiple-outline', name: 'projects', allow: [4] },
        { title: 'Tasks', icon: 'mdi-format-list-bulleted', name: 'tasks', allow: [4] },
        { title: 'Tasks', icon: 'mdi-format-list-bulleted', name: 'moderate_tasks', allow: [2] },
        { title: 'Reports', icon: 'mdi-file-import-outline', name: 'reports', allow: [4], route_resolver: (p) => {} },
        { title: 'Reports', icon: 'mdi-file-import-outline', name: 'moderate_reports', allow: [2] },
        { title: 'Community', icon: 'mdi-forum-outline', name: 'community', allow: [4] },
        { title: 'Evaluations', icon: 'mdi-clipboard-edit-outline', name: 'evaluations', allow: [2, 3] },
        { title: 'Evaluations', icon: 'mdi-clipboard-edit-outline', name: 'team_evaluation', allow: [4], route_resolver: (p) => { return p.id } },

        // Administrators
        { title: 'Home', icon: 'mdi-home', name: 'home_management', allow: [1] },
        { title: 'Users', icon: 'mdi-account-multiple-outline', name: 'user_management', allow: [1] },
        { title: 'Team', icon: 'mdi-account-group-outline', name: 'team_management', allow: [1] },
        { title: 'Project', icon: 'mdi-file-document-multiple-outline', name: 'project_management', allow: [1] },
        { title: 'Reports', icon: 'mdi-file-import-outline', name: 'report_management', allow: [1] },
        { title: 'Evaluations', icon: 'mdi-clipboard-edit-outline', name: 'evaluations_management', allow: [1] }
      ]
    }
  },
  methods: {
    getRoute (menu) {
      if (menu.route_resolver && this.route_data) {
        const id = menu.route_resolver(this.route_data)

        if (id) {
          return {
            name: menu.name,
            params: {
              team_id: id
            }
          }
        }
      }

      return { name: menu.name }
    }
  },
  computed: {
    roleBasedMenu () {
      const menu = []
      const filterFn = (roleId) => {
        return (m) => {
          if (m.allow.includes(roleId)) {
            if (m.route_resolver && !(this.route_data && this.route_data.id)) {
              return false
            }

            return true
          }

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
