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
      return {
        image: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        ...state.data
      }
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

      const { data: { data } } = await api.user.get(userId)
      this.data = {
        image: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        ...data
      }
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
