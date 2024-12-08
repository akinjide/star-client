<template>
   <v-row class="d-flex justify-space-between" align="center" >
    <v-col>
      <h3 class="page-title">User Management</h3>
    </v-col>
    <v-col cols="6">
        <v-text-field
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search"
        variant="underlined"
        hide-details
        single-line
        @click:append-inner="onClick"
      ></v-text-field>
    </v-col>
    <v-col class="ma-2 pa-2" cols="1" >
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

.v-text-field{
padding-left: 20px;
}

.page-title{
    padding-left: 10px;
    color:#4658AC;
}
  </style>
