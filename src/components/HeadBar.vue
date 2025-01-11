<template>
  <v-app-bar app color="white" flat class="header d-print-none" elevation="1">
    <v-app-bar-nav-icon
      variant="flat"
      class="header-icon"
      size="small"
      @click="toggleDrawer('left', !leftDrawer)"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="header-title text-uppercase font-weight-medium">{{ headBarName }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn
      prepend-icon="mdi-logout"
      variant="flat"
      class="header-icon mr-2"
      size="small"
      @click="logout(user, this.$router)"
    >Logout</v-btn>
    <v-btn
      icon="mdi-dots-vertical"
      variant="flat"
      class="header-icon mr-2"
      size="small"
      @click="toggleDrawer('right', !rightDrawer)"
    ></v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'pinia'

import { useAuthStore } from '@/stores'

export default {
  name: 'Header',
  props: {
    name: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    leftDrawer: {
      type: Boolean,
      required: true
    },
    rightDrawer: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),
    toggleDrawer (position, value) {
      this.$emit('action', { t: position, value: value })
    }
  },
  computed: {
    headBarName () {
      return this.name.split('_').join(' ')
    }
  }
}
</script>

<style scoped>
.header .header-title,
.header .header-icon {
  color: #445a99;
}

.v-toolbar-title {
  font-size: 14px;
}
</style>
