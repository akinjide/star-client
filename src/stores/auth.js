import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAdmin: useStorage('auth.isAdmin', false),
    isAuthenticated: useStorage('auth.isAuthenticated', false),
    auth: {},
    accessToken: useStorage('auth.accessToken', '')
  }),
  getters: {},
  actions: {
    logout (user, $router) {
      this.accessToken = ''
      this.isAdmin = false
      this.isAuthenticated = false

      $router.replace({ path: '/' })
      return true
    }
  }
})
