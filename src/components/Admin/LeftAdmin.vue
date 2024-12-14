<template>
  <v-navigation-drawer app permanent left width="200" class="left-sidebar">
    <v-list density="compact">
      <v-list-item>
        <v-list-item-title class="text-uppercase dashboard-title">
          Dashboard
        </v-list-item-title>
      </v-list-item>

      <v-list-item-group>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          class="sidebar-item"
        >
          <v-list-item-icon class="icon-wrapper">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'LeftAdmin',
  data () {
    return {
      menuItems: [
        { title: 'User Management', icon: 'mdi-account' },
        { title: 'Team Management', icon: 'mdi-account-group-outline' },
        { title: 'Project Assignment', icon: 'mdi-note-multiple' },
        { title: 'Evaluation', icon: 'mdi-clipboard-edit-outline' },
        { title: 'Documentation', icon: 'mdi-file-document-outline' }
      ]
    }
  }
}
</script>

<style scoped>
.left-sidebar {
  background-color: #28397F;
  color: white;
  width: 200px;
}

.dashboard-title {
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 16px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
}

.icon-wrapper {
  min-width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-list-item-title {
  font-size: 14px;
  color: white;
}
</style>
