import request from './request'

import auth from './auth'
import user from './user'
import task from './task'

export default {
  auth,
  user,
  task,
  teams: {
    all: async () => {
      return request.get('teams')
    },
    get: async (userId) => {
      return request.get(`tasks/${userId}`)
    },
    create: async (team) => {
      return request.post('teams', team)
    },
    addMember: async (teamId, member) => {
      return request.put(`teams/${teamId}/members`, member)
    },
    remove: async (teamId) => {
      return request.delete(`teams/${teamId}`)
    }
  },
  messages: {
    all: async () => {
      return request.get('messages')
    },
    create: async (message) => {
      return request.post('messages', { message })
    }
  },
  upload: {
    create: async (file, uploadType, onUploadProgress) => {
      const formData = new FormData()

      formData.append('blob', file)
      formData.append('upload_type', uploadType)

      return request.post('/blob/upload', formData, {
        params: {
          upload_type: uploadType
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
      })
    }
  }
}
