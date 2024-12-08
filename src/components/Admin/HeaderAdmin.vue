<template>
   <v-row class="header" align="center">
    <v-col>
      <h1 class="page-title">User Management</h1>
    </v-col>
    <v-col cols="6">
      <v-text-field label="Search" solo dense></v-text-field>
    </v-col>
    <v-col cols="1">
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-col>
  </v-row>
  </template>

<script>
export default {
  name: 'HeaderAdmin'
}
</script>

  <style scoped>
  .v-toolbar-title {
    font-size: 18px;
  }
  </style>
