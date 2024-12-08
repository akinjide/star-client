<template>
    <v-navigation-drawer app permanent Left width="200" class="left-sidebar" >
      <v-list density="compact">
        <v-list-item>
          <v-list-item-title class="text-uppercase dashboard-title">
            Dashboard
          </v-list-item-title>
        </v-list-item>

        <v-list-item v-for="(item, index) in menuItems" :key="index" link>
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        </v-list>
    </v-navigation-drawer>
  </template>

<script>
export default {
  name: 'LeftAdmin',
  data () {
    return {
      menuItems: [
        { title: 'Home', icon: 'mdi-home' },
        { title: 'Projects', icon: 'mdi-lightbulb-outline' },
        { title: 'Users', icon: 'mdi-account-group-outline' }
      ]
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
    padding-bottom: 40px;
  }

  .v-list-item-icon {
    color: white;
    padding-bottom: 40px;
  }
  </style>
