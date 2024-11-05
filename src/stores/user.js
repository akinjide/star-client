import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import api from '@/api'
import { useAuthStore } from './auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    username: '',
    data: useStorage('user.data', {}),
    tasks: []
  }),
  getters: {
    user (state) {
      return state.data
    }
  },
  actions: {
    isAuthenticated () {
      const auth = useAuthStore()

      if (auth.isAuthenticated) {
        return true
      }

      throw new Error('User must be authenticated')
    },
    async getUser (userId) {
      this.isAuthenticated()

      const { data } = await api.user.get(userId)
      this.data = data
    },
    async getUserTasks (userId) {
      this.isAuthenticated()

      const { data: { data } } = await api.task.get(userId)
      this.tasks = data
    },
    reset () {
      this.id = ''
      this.username = ''
    }
  }
})
