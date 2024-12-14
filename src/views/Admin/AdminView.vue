<template>
  <v-app>
    <v-container class="pa-0">
      <!-- Header Section -->
      <v-row justify="center" class="logo-section">
        <v-img
          src="/images/emu-dau-logo.png"
          alt="University Logo"
          class="logo"
          contain
        ></v-img>
        <v-btn
          icon
          class="profile-icon"
          color="primary"
        >
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </v-row>
        <v-container class="container d-flex flex-column align-center justify-center fill-height">
        <v-row class="d-flex flex-column align-center">
           <v-img src="/images/background.png" class="background" />
          <v-btn class="mb-3 button-style" block> User Management </v-btn>
          <v-btn class="mb-3 button-style" block> Team Management </v-btn>
          <v-btn class="mb-3 button-style" block> Documentation </v-btn>
          <v-btn class="mb-3 button-style" block> Project Assignment </v-btn>
          <v-btn class="button-style" block> Evaluations </v-btn>
        </v-row>
    </v-container>
  </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'AdminPage'
}
</script>

<style scoped>
.logo-section {
  position: relative;
  padding: 20px;
}

.logo {
  max-width: 120px;
  margin-bottom: 10px;
}

.profile-icon {
  position: absolute;
  top: 20px;
  right: 20px;
}

.container{
  z-index: 5;
}

.background{
  position: absolute;
  top: 2;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  z-index: 1;
  opacity: 0.9;
}

.button-style {
  background-color: #6559ff;
  color: white;
  font-weight: bold;
  border-radius: 20px;
}

.button-style:hover {
  background-color: #7b88ff;
}
</style>
