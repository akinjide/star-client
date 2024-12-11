<template>
  <v-app>
    <v-container fluid class="login-page">
      <v-row no-gutters class="my-auto">
        <!-- Left Side with Illustration -->
        <v-col cols="12" md="6">
          <!-- <img src="src\assets\illustration1.svg" alt="Illustration" class="illustration-img" /> -->
        </v-col>

        <!-- Right Side with Form -->
        <v-col cols="12" md="6" class="form-col">
          <div class="login-card">
            <div class="d-flex justify-center logo">
              <img src="/images/logo.svg" alt="Logo" class="logo-img" />
            </div>

            <h2 class="text-center title">Graduation Project Manager</h2>

            <v-alert
              class="my-2"
              color="#C51162"
              theme="dark"
              border
              v-if="hasError"
            > {{ errorMessage }}
            </v-alert>

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
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'pinia'

import api from '@/api'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

export default {
  data () {
    return {
      hasError: false,
      errorMessage: 'Error Occurred. Please try again',
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        this.hasError = false

        const store = useAuthStore()
        const response = await api.auth.login(this.email, this.password)

        if (response && response.data) {
          const {
            data: {
              role_id: roleId,
              id,
              token
            }
          } = response

          store.$patch({
            auth: response.data,
            accessToken: token,
            isAuthenticated: true,
            isAdmin: roleId === 1
          })

          await this.getUser(id)

          return this.$router.push('/dashboard')
        }

        // Temporary
        this.errorMessage = response.errorMessage
        this.hasError = true
      } catch (error) {
        console.log(error)
        if (error && error.response) {
          const {
            response: {
              data: {
                errorMessage = null
              } = {}
            }
          } = error

          if (errorMessage) {
            this.errorMessage = errorMessage
          }
        }

        this.hasError = true
      }
    },
    ...mapActions(useUserStore, ['getUser'])
  }
}
</script>

<style scoped>
.login-page {
  background-image: url("/src/assets/bg-login.svg");
  background-size: contain;
  height: 100vh;
  display: flex;
}

.illustration-col {
  display: flex;
  justify-content: center;
  align-items: center;
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
