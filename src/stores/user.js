// import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import api from '@/api'
import { useAuthStore } from './auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    username: '',
    data: null
  }),
  getters: {
    user (state) {
      return state.data
    }
  },
  actions: {
    async getUser (userId) {
      try {
        const auth = useAuthStore()

        if (auth.isAuthenticated) {
          const response = await api.user.get(userId)

          if (response && response.data) {
            this.data = response.data
            return
          }
        }

        throw new Error('User must be authenticated')
      } catch (error) {
        return error
      }
    },
    reset () {
      this.id = ''
      this.username = ''
    }
  }
})
