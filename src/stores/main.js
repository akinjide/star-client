// import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

// import api from '@/api'
// import { useAuthStore } from './auth'

const ADMINISTRATOR = 1
const SUPERVISOR = 2
const COMMITTEE_MEMBER = 3
const STUDENT = 4

export const useMainStore = defineStore('main', {
  state: () => ({
    tasks: [],
    users: [],
    messages: [],
    teams: [],
    rolesmap: {
      [ADMINISTRATOR]: 'Administrator',
      [SUPERVISOR]: 'Supervisor',
      [COMMITTEE_MEMBER]: 'Committee Member',
      [STUDENT]: 'Student'
    }
  }),
  getters: {
    getImage (state) {
      return (image) => {
        if (image) {
          if (image.startsWith('https')) {
            return image
          }

          return 'http://localhost:3000/' + image
        }
      }
    },
    getRoles (state) {
      const roles = []

      for (const role in state.rolesmap) {
        roles.push({
          id: role,
          name: state.rolesmap[role]
        })
      }

      return roles
    }
  },
  actions: {}
})
