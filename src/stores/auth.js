import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import api from '@/api'
import {
  ADMINISTRATOR_ID,
  SUPERVISOR_ID,
  COMMITTEE_MEMBER_ID,
  STUDENT_ID
} from '@/stores/constants'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAdmin: useStorage('auth.isAdmin', false),
    isAuth: useStorage('auth.isAuth', false),
    auth: useStorage('auth.user', {}),
    accessToken: useStorage('auth.accessToken', '')
  }),
  getters: {
    isAuthenticated (state) {
      return state.isAuth
    },
    isAdministrator (state) {
      if (state.auth.role_id && state.auth.role_id === ADMINISTRATOR_ID) {
        return true
      }

      return false
    },
    isSupervisor (state) {
      if (state.auth.role_id && state.auth.role_id === SUPERVISOR_ID) {
        return true
      }

      return false
    },
    isCommitteeMember (state) {
      if (state.auth.role_id && state.auth.role_id === COMMITTEE_MEMBER_ID) {
        return true
      }

      return false
    },
    isStudent (state) {
      if (state.auth.role_id && state.auth.role_id === STUDENT_ID) {
        return true
      }

      return false
    }
  },
  actions: {
    async authenticate (email, password) {
      try {
        const response = await api.auth.login(email, password)
        const result = api.unwrap(response)
        const { data } = result

        if (data) {
          const {
            role_id: roleId,
            token
          } = data

          this.auth = data
          this.accessToken = token
          this.isAuth = true
          this.isAdmin = roleId === ADMINISTRATOR_ID
        }

        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    logout (user, $router) {
      this.accessToken = ''
      this.isAdmin = false
      this.isAuth = false
      this.auth = {}

      $router.replace({ path: '/' })
      return true
    }
  }
})
