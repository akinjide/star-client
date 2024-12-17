import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import api from '@/api'
import { useAuthStore } from './auth'

const ADMINISTRATOR = 1
const SUPERVISOR = 2
const COMMITTEE_MEMBER = 3
const STUDENT = 4

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    data: useStorage('user.data', {}),
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
    user (state) {
      return state.data
    },
    getRoleName (state) {
      return (roleId) => {
        return state.rolesmap[roleId]
      }
    },
    getRoles (state) {
      return state.rolesmap
    },
    getStudents (state) {
      return state.users.filter((u) => {
        return u.role_id === STUDENT
      })
    },
    getAdministrators (state) {
      return state.users.filter((u) => {
        return u.role_id === ADMINISTRATOR
      })
    },
    getCommitteeMembers (state) {
      return state.users.filter((u) => {
        return u.role_id === COMMITTEE_MEMBER
      })
    },
    getSupervisors (state) {
      return state.users.filter((u) => {
        return u.role_id === SUPERVISOR
      })
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
    async getUsers () {
      this.isAuthenticated()

      const { data } = await api.user.all()
      this.users = data.data
    },
    async getUser (userId) {
      this.isAuthenticated()

      const { data: { data } } = await api.user.get(userId)
      this.data = data
    },
    async getTeams () {
      this.isAuthenticated()

      const { data } = await api.teams.all()
      this.teams = data.data
    },
    async getMessages () {
      this.isAuthenticated()

      const { data: { data } } = await api.messages.all()
      console.log(data)
      this.messages = data
    },
    async createMessage (message) {
      this.isAuthenticated()

      try {
        const { data: { data } } = await api.messages.create(message)
        console.log(data)
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
    async getUserTasks (userId) {
      this.isAuthenticated()

      const { data: { data } } = await api.task.get(userId)
      this.tasks = data
    },
    async createUser (user) {
      this.isAuthenticated()
      // check user is admin
      try {
        const { data: { data } } = await api.user.create(user)
        console.log(data)
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
    async updateUser (userId, user) {
      this.isAuthenticated()
      // check user is admin
      try {
        const { data: { data } } = await api.user.update(userId, user)
        console.log(data)
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
    reset () {
      this.id = ''
      this.data = {}
      this.tasks = []
      this.users = []
    }
  }
})
