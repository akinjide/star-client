<template>
  <v-app>
    <v-container fluid class="login-page">
      <v-row no-gutters class="my-auto">
        <v-col cols="12" md="6"></v-col>

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

            <v-form v-model="loginForm" @submit.prevent="login" class="login-form">
              <v-text-field
                v-model="email"
                label="Email"
                placeholder=""
                type="email"
                outlined
                dense
                required
                :rules="ruleRequired('Email')"
              />
              <v-text-field
                v-model="password.value"
                :append-inner-icon="password.icon"
                label="Password"
                :type="password.type"
                @click:appendInner="togglePassword"
                outlined
                dense
                required
                :rules="ruleRequired('Password')"
              />

              <v-btn :disabled="!loginForm" type="submit" color="primary" block class="login-btn">
                Log in →
              </v-btn>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'pinia'
import { useAuthStore, useUserStore, useMainStore } from '@/stores'

export default {
  data () {
    return {
      loginForm: false,
      hasError: false,
      errorMessage: 'Error Occurred. Please try again',
      password: {
        icon: 'mdi-eye-outline',
        type: 'password',
        value: ''
      },
      email: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['getUser']),
    ...mapActions(useAuthStore, ['authenticate']),
    ...mapActions(useMainStore, ['ruleRequired']),
    async login () {
      this.hasError = false

      const { errorMessage, data } = await this.authenticate(this.email, this.password.value)

      if (errorMessage) {
        this.hasError = true
        this.errorMessage = errorMessage
        return
      }

      await this.getUser(data.id)

      switch (data.role_id) {
        case 1:
          return this.$router.push('/home')
        case 3:
          return this.$router.push('/dashboard/evaluations')
        default:
          return this.$router.push('/dashboard')
      }
    },
    togglePassword (e) {
      if (this.password.type === 'text') {
        this.password.type = 'password'
        this.password.icon = 'mdi-eye-outline'
        return
      }

      this.password.type = 'text'
      this.password.icon = 'mdi-eye-off-outline'
    }
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

.login-btn {
  margin-top: 20px;
  color: white;
}
</style>
