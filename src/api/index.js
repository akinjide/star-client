import request from '@/api/request'
import auth from '@/api/auth'

const unwrap = (response) => {
  if (response && response.data) {
    const {
      data: {
        data
      }
    } = response

    return {
      errorMessage: null,
      data
    }
  }

  return handleError()
}

const handleError = (error) => {
  let message = null

  if (error && error.data) {
    const {
      data: {
        // errorCode,
        errorMessage
      } = {}
    } = error

    message = errorMessage
  }

  return {
    errorMessage: message || 'Unknown error. Try again',
    data: null
  }
}

export default {
  unwrap,
  handleError,
  auth,
  users: {
    get: async (userId) => {
      return request.get(`users/${userId}`)
    },
    all: async () => {
      return request.get('users')
    },
    create: async (user) => {
      return request.post('/auth/create', {
        ...user,
        passwd: user.password
      })
    },
    update: async (userId, user) => {
      return request.put(`users/${userId}`, {
        ...user,
        passwd: user.password
      })
    },
    delete: async (userId) => {
      return request.delete(`users/${userId}`)
    }
  },
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
    update: async (teamId, team) => {
      return request.put(`teams/${teamId}`, team)
    },
    getByMember: async (memberId) => {
      return request.get(`teams/members/${memberId}`)
    },
    addMember: async (teamId, member) => {
      return request.put(`teams/${teamId}/members`, member)
    },
    removeMember: async (teamId, memberId) => {
      return request.delete(`teams/${teamId}/members/${memberId}`)
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
  },
  topics: {
    all: async (topicId) => {
      return request.get('topics')
    },
    get: async (topicId) => {
      return request.get(`topics/${topicId}`)
    },
    create: async (topic) => {
      return request.post('topics', topic)
    }
  },
  projects: {
    all: async (topicId) => {
      return request.get('projects')
    },
    assign: async (record) => {
      return request.post('projects', {
        ...record,
        name: record.topic_name,
        description: record.topic_description
      })
    }
  },
  tasks: {
    get: async (userId) => {
      return request.get(`tasks/${userId}`)
    },
    create: async (task) => {
      return request.post('/tasks', task)
    },
    all: async () => {
      return request.get('/tasks')
    },
    complete: async (taskId) => {
      return request.put(`tasks/${taskId}/complete`)
    },
    update: async (taskId, task) => {
      return request.put(`tasks/${taskId}`, task)
    }
  },
  evaluations: {
    get: async (projectId) => {
      return request.get(`evaluations/projects/${projectId}/download`)
    },
    create: async (evaluation) => {
      return request.post('/evaluations', evaluation)
    },
    all: async () => {
      return request.get('/evaluations')
    }
  },
  rubrics: {
    all: async () => {
      return request.get('/rubrics')
    }
  },
  reports: {
    create: async (report) => {
      return request.post('/reports', report)
    },
    all: async () => {
      return request.get('/reports')
    },
    get: async (projectId) => {
      return request.get(`reports/projects/${projectId}`)
    },
    remove: async (reportId) => {
      return request.delete(`reports/${reportId}`)
    },
    update: async (reportId, report) => {
      return request.put(`reports/${reportId}`, report)
    }
  }
}
