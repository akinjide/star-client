<template>
  <v-app-bar app color="white" flat class="header d-print-none" elevation="1">
    <v-toolbar-title class="header-title text-uppercase font-weight-medium">{{ headBarName }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  props: {
    name: {
      type: String,
      required: true
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
.header .header-title {
  color: #445a99;
}

.v-toolbar-title {
  font-size: 18px;
}
</style>
