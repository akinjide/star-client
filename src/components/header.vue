<template>
  <v-app-bar app color="white" flat>
    <v-toolbar-title class="text-uppercase">{{ name }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  props: {
    name: {
      type: String
    }
  }
}
</script>

<style scoped>
.v-toolbar-title {
  font-size: 18px;
}
</style>
