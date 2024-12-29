import { defineStore } from 'pinia'

import api from '@/api'

const ADMINISTRATOR = 1
const SUPERVISOR = 2
const COMMITTEE_MEMBER = 3
const STUDENT = 4

export const useMainStore = defineStore('main', {
  state: () => ({
    userTasks: [],
    tasks: [],
    users: [],
    messages: [],
    teams: [],
    team: {},
    userTeam: {},
    topics: [],
    projects: [],
    project: {},
    evaluations: [],
    evaluation: {},
    rubrics: [],
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
    },
    getRoleName (state) {
      return (roleId) => {
        return state.rolesmap[roleId]
      }
    },
    getRoleMap (state) {
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
    },
    getUser (state) {
      return (userId) => {
        if (userId && state.users.length) {
          for (const user of state.users) {
            if (user.id === userId) {
              return user.full_name
            }
          }
        }

        return ''
      }
    }
  },
  actions: {
    async getTopics () {
      const { data: { data } } = await api.topics.all()
      this.topics = data
    },
    async getProjects () {
      const { data: { data } } = await api.projects.all()
      this.projects = data
    },
    async getProjectByTeam (teamId) {
      if (this.projects.length) {
        for (const project of this.projects) {
          if (project.team_id && project.team_id === teamId) {
            this.project = project
            break
          }
        }
      }

      return this.project
    },
    async getTeam (teamId) {
      if (this.teams.length) {
        for (const team of this.teams) {
          if (team.id === teamId) {
            this.team = team
            break
          }
        }
      }

      return this.team
    },
    async getTeamByMember (memberId) {
      const { data: { data } } = await api.teams.getByMember(memberId)
      this.userTeam = data
      return this.userTeam
    },
    async getTeams () {
      const { data } = await api.teams.all()
      this.teams = data.data
    },
    async getMessages () {
      const { data: { data } } = await api.messages.all()
      this.messages = data
    },
    async createMessage (message) {
      try {
        const { data: { data } } = await api.messages.create(message)
        console.log(data)
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
    async getUsers () {
      const { data } = await api.user.all()
      this.users = data.data
    },
    async getUserTasks (userId) {
      const { data: { data } } = await api.task.get(userId)
      console.log(data)
      this.userTasks = data
    },
    async getTasks () {
      const { data: { data } } = await api.task.all()
      console.log(data)
      this.tasks = data
    },
    async createUser (user) {
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
    async deleteUser (userId) {
      try {
        const { data: { data } } = await api.user.delete(userId)
        console.log(data)
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
    async getRubrics () {
      const { data: { data } } = await api.rubrics.all()
      this.rubrics = data
    },
    async createEvaluation (records, originality, evaluatorId, projectId) {
      const { data: { data } } = await api.evaluations.create(records, originality, evaluatorId, projectId)
      console.log(data)
      return true
    },
    async getEvaluation (projectId) {
      const { data: { data } } = await api.evaluations.get(projectId)
      this.evaluation = data
    },
    async getEvaluations () {
      const { data: { data } } = await api.evaluations.all()
      console.log(data, 'line 190')
      this.evaluations = data
    },
    async createTeam () {

    },
    async updateTeam () {

    },
    async addTask (task) {
      const team = await this.getTeamByMember(task.user_id)
      const project = await this.getProjectByTeam(team.id)
      const { data: { data } } = await api.task.create({
        ...task,
        team_id: team.id,
        project_id: project.project_id,
        assigned_at: new Date()
      })
      console.log(data)
      return true
    }
  }
})
