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
    reset () {
      // this.accessToken = ''
    }
  }
})
