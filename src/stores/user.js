import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import api from '@/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    data: useStorage('user.data', {})
  }),
  getters: {
    user (state) {
      return state.data
    }
  },
  actions: {
    async getUser (userId) {
      try {
        const response = await api.user.get(userId)
        const result = api.unwrap(response)
        const { data } = result

        if (data) {
          this.data = data
        }

        return result
      } catch (error) {
        console.log(api.handleError(error))
      }
    },
    reset () {
      this.id = ''
      this.data = {}
    }
  }
})
