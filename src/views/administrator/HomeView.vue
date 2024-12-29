<template>
  <v-container class="background d-flex flex-column">
    <v-row class="d-flex justify-center">
      <v-img
        src="/images/emu-dau-logo.png"
        alt="University Logo"
        class="logo"
        contain
      ></v-img>
    </v-row>

    <v-row class="d-flex justify-center">
      <v-col class="v-col-md-4 v-col-xs-12 v-col-sm-6">
        <v-card class="content-card">
          <v-row dense justify="center">
            <v-btn variant="tonal" color="#6975EB" rounded="xl" class="mb-4">
              <router-link :to="{ name: 'user_management' }">
                User Management
              </router-link>
            </v-btn>
            <v-btn variant="tonal" color="#6975EB" rounded="xl" class="mb-4">
              <router-link :to="{ name: 'team_management' }">
                Team Management
              </router-link>
            </v-btn>
            <v-btn variant="tonal" color="#6975EB" rounded="xl" class="mb-4">
              <router-link :to="{ name: 'documentation' }">
                Documentation
              </router-link>
            </v-btn>
            <v-btn variant="tonal" color="#6975EB" rounded="xl" class="mb-4">
              <router-link :to="{ name: 'project_management' }">
                Project Management
              </router-link>
            </v-btn>
            <v-btn variant="tonal" color="#6975EB" rounded="xl">
              <router-link :to="{ name: 'evaluations_management' }">
                Evaluations
              </router-link>
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.logo {
  max-width: 120px;
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: inherit;
}

.background {
  height: 100%;
  background-image: url('/src/assets/background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.content-card {
  padding: 3rem;
  background-color: #F3F2F7;
  border-radius: 20px;
}
</style>
