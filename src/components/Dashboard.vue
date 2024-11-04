<template>
 <v-container>
    <v-row>
      <v-col cols>
        <v-card class="welcome-card pa-5" >
          <v-card-text >
            <h2>Welcome Back, {{ user.full_name }}!</h2>
            <p>Let’s keep working on your graduation project!</p>
          </v-card-text>
        </v-card>

        <!-- Progress bar card -->
        <v-card class="progress-card mt-5">
          <v-card-text class="text-center">
            <v-progress-circular :value="65" size="120" width="10" color="primary">
              65%
            </v-progress-circular>
            <p>PPM Report Progress</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
 </v-container>
</template>

<script>
export default {
  name: 'Dashboard',
  props: {
    user: {
      type: Object
    }
  },
  created () {
    // props are exposed on `this`
    console.log(this.user)
  }
}
</script>

  <style scoped>
  .welcome-card {
    position: relative;
    width: 600px;
    height: 120px;
    color:#f2f2f7;
   background: rgba(0, 26, 255, 0.37);
   border-radius: 20px;
   padding: 10px;
  }

  .progress-card {
    background-color: #f2f2f7;
    padding: 16px;
    width: 200px;
  }
  </style>
