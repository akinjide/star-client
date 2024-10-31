import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('counter', {
  state: () => ({
    isAdmin: false,
    isLoggedIn: false,
    auth: {},
    accessToken: useStorage('auth.accessToken', '')
  }),
  getters: {},
  actions: {
    reset () {
      this.accessToken = ''
    }
  }
})
