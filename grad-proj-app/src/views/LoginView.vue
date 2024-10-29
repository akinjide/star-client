<template>
  <v-app>
    <v-container fluid class="login-page">
      <v-row no-gutters class="my-auto">
        <!-- Left Side with Illustration -->
        <v-col cols="12" md="6" class="illustration-col">
          <img src="grad-proj-app\src\assets\illustration1.svg" alt="Illustration" class="illustration-img" />
        </v-col>

        <!-- Right Side with Form -->
        <v-col cols="12" md="6" class="form-col">
          <v-card class="login-card">
            <v-card-title class="d-flex justify-center logo">
              <img src="grad-proj-app\src\assets\logo.svg" alt="Logo" class="logo-img" />
            </v-card-title>

            <h2 class="text-center title">Graduation Project Manager</h2>

            <v-form @submit.prevent="login" class="login-form">
              <v-text-field
                v-model="email"
                label="Email"
                placeholder=""
                type="email"
                outlined
                dense
                required
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                outlined
                dense
                required
              />
              <v-row class="forgot-password">
                <a href="#">Forgot your password?</a>
              </v-row>
              <v-btn color="primary" block class="login-btn" @click="login">
                Log in →
              </v-btn>
              <v-row class="signup-link">
                <p>
                  You do not have an account? <a href="#">Create an account</a>
                </p>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      console.log('Email:', this.email)
      console.log('Password:', this.password)
    }
  }
}
</script>

<style scoped>
.login-page {
  background: linear-gradient(to right, #1b53ad, #edf2ff);
  height: 100vh;
  display: flex;
}

.illustration-col {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #edf2ff; /* Adjust the background color to blend with the gradient */
}

.illustration-img {
  max-width: 80%;
}

.form-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  max-width: 400px;
  width: 100%;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
}

.logo-img {
  max-width: 80px;
}

.title {
  margin-top: 10px;
  margin-bottom: 20px;
}

.login-form {
  width: 100%;
}

.forgot-password,
.signup-link {
  text-align: center;
  margin: 10px 0;
}

.login-btn {
  margin-top: 20px;
  color: white;
}
</style>
