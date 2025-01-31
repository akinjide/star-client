import { defineStore } from 'pinia'

import api from '@/api'
import {
  HTTP,
  HTTPS,
  SERVER_ADDRESS,
  ROLE_MAP,
  ADMINISTRATOR_ID,
  SUPERVISOR_ID,
  COMMITTEE_MEMBER_ID,
  STUDENT_ID
} from '@/stores/constants'

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
    projectReports: [],
    evaluations: [],
    evaluation: {},
    rubrics: [],
    reports: [],
    supervisorStudents: [],
    rolesmap: ROLE_MAP
  }),
  getters: {
    getImage (state) {
      return (image) => {
        if (image) {
          if (image.startsWith(HTTP) || image.startsWith(HTTPS)) {
            return image
          }

          return `${SERVER_ADDRESS}/${image}`
        }
      }
    },
    getDocument (state) {
      return (url) => {
        if (url) {
          if (url.startsWith(HTTP) || url.startsWith(HTTPS)) {
            return url
          }

          return `${SERVER_ADDRESS}/${url}`
        }
      }
    },
    getRoles (state) {
      const roles = []

      for (const role in state.rolesmap) {
        roles.push({
          id: Number(role),
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
        return u.role_id === STUDENT_ID
      })
    },
    getAdministrators (state) {
      return state.users.filter((u) => {
        return u.role_id === ADMINISTRATOR_ID
      })
    },
    getCommitteeMembers (state) {
      return state.users.filter((u) => {
        return u.role_id === COMMITTEE_MEMBER_ID
      })
    },
    getSupervisors (state) {
      return state.users.filter((u) => {
        return u.role_id === SUPERVISOR_ID
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
    reset () {
      this.userTasks = []
      this.tasks = []
      this.users = []
      this.messages = []
      this.teams = []
      this.team = {}
      this.userTeam = {}
      this.topics = []
      this.projects = []
      this.project = {}
      this.projectReports = []
      this.evaluations = []
      this.evaluation = {}
      this.rubrics = []
      this.reports = []
      this.supervisorStudents = []
    },
    ruleRequired (field, skip) {
      if (skip) {
        return []
      }

      return [
        v => !!v || `${field} is required`
      ]
    },
    ruleMinMax (field, min, max, skip) {
      const rules = [...this.ruleRequired(field, skip)]

      if (min > -1) {
        rules.push(v => (v && v.length >= min) || `${field} should be above ${min}`)
      }

      if (max > -1) {
        rules.push(v => (v && v.length <= max) || `${field} should be below ${max}`)
      }

      return rules
    },
    ruleIntMinMax (field, min, max, skip) {
      const rules = [...this.ruleRequired(field, skip)]

      if (min > -1) {
        rules.push(v => (v && v >= min) || `${field} should be above ${min}`)
      }

      if (max > -1) {
        rules.push(v => (v && v <= max) || `${field} should be below ${max}`)
      }

      return rules
    },
    async getTopics () {
      try {
        const response = await api.topics.all()
        const result = api.unwrap(response)
        const { data } = result

        this.topics = data
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async getProjects () {
      try {
        const response = await api.projects.all()
        const result = api.unwrap(response)
        const { data } = result

        this.projects = data
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async getProjectByTeam (teamId) {
      if (this.projects && this.projects.length) {
        for (const project of this.projects) {
          if (project.team_id && project.team_id === teamId) {
            this.project = project
            break
          }
        }
      }

      return this.project
    },
    async getSupervisorStudents (supervisorId) {
      const team = await this.getTeamBySupervisor(supervisorId)
      this.supervisorStudents = []

      if (team && Object.keys(team).length) {
        for (const member of team.members) {
          this.supervisorStudents.push({
            ...member,
            id: member.member_id
          })
        }
      }
    },
    async getTeam (teamId) {
      if (this.teams && this.teams.length) {
        for (const team of this.teams) {
          if (team.id === teamId) {
            this.team = team
            break
          }
        }
      }

      return this.team
    },
    async getTeamBySupervisor (supervisorId) {
      if (this.teams && this.teams.length) {
        for (const team of this.teams) {
          if (team.supervisor_id === supervisorId) {
            this.team = team
            break
          }
        }
      }

      return this.team
    },
    async getTeamByMember (memberId) {
      try {
        const response = await api.teams.getByMember(memberId)
        const result = api.unwrap(response)
        const { data } = result

        this.userTeam = data
        return this.userTeam
      } catch (err) {
        return api.handleError(err)
      }
    },
    async getTeams () {
      try {
        const response = await api.teams.all()
        const result = api.unwrap(response)
        const { data } = result

        this.teams = data
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async getMessages () {
      try {
        const response = await api.messages.all()
        const result = api.unwrap(response)
        const { data } = result

        this.messages = data
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async createMessage (message) {
      try {
        const response = await api.messages.create(message)
        const result = api.unwrap(response)

        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async getUsers () {
      try {
        const response = await api.users.all()
        const result = api.unwrap(response)
        const { data } = result

        this.users = data
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async getUserTasks (userId) {
      try {
        const response = await api.tasks.get(userId)
        const result = api.unwrap(response)
        const { data } = result

        this.userTasks = data
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async getTasks () {
      try {
        const response = await api.tasks.all()
        const result = api.unwrap(response)
        const { data } = result

        this.tasks = data
      } catch (err) {
        return api.handleError(err)
      }
    },
    async createUser (user) {
      try {
        const response = await api.users.create(user)
        const result = api.unwrap(response)
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async updateUser (userId, user) {
      try {
        const response = await api.users.update(userId, user)
        const result = api.unwrap(response)
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async deleteUser (userId) {
      try {
        const response = await api.users.delete(userId)
        const result = api.unwrap(response)
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async getRubrics () {
      try {
        const response = await api.rubrics.all()
        const result = api.unwrap(response)
        const { data } = result

        this.rubrics = data
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async createEvaluation (records, originality, evaluatorId, projectId) {
      try {
        const response = await api.evaluations.create({
          project_id: projectId,
          evaluator_id: evaluatorId,
          originality: originality,
          evaluation: records
        })
        const result = api.unwrap(response)
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async getEvaluation (projectId) {
      try {
        const response = await api.evaluations.get(projectId)
        const result = api.unwrap(response)
        const { data } = result

        this.evaluation = data
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async getEvaluations () {
      try {
        const response = await api.evaluations.all()
        const result = api.unwrap(response)
        const { data } = result

        this.evaluations = data
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async createTeam () {

    },
    async updateTeam () {

    },
    async addTask (task) {
      try {
        const team = await this.getTeamByMember(task.user_id)
        const project = await this.getProjectByTeam(team.id)
        const response = await api.tasks.create({
          ...task,
          team_id: team.id,
          project_id: project.project_id,
          assigned_at: new Date()
        })
        const result = api.unwrap(response)
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async updateTask (taskId, task) {
      try {
        const response = await api.tasks.update(taskId, task)
        const result = api.unwrap(response)
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async completeTask (taskId) {
      try {
        const response = await api.tasks.complete(taskId)
        const result = api.unwrap(response)
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async removeTask (taskId) {
      try {
        const response = await api.tasks.remove(taskId)
        const result = api.unwrap(response)
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async getReports () {
      try {
        const response = await api.reports.all()
        const result = api.unwrap(response)
        const { data } = result

        this.reports = data
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async getProjectReports (projectId) {
      try {
        const response = await api.reports.get(projectId)
        const result = api.unwrap(response)
        const { data } = result

        this.projectReports = data
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async deleteReport (reportId) {
      try {
        const response = await api.reports.remove(reportId)
        const result = api.unwrap(response)
        return result
      } catch (err) {
        return api.handleError(err)
      }
    },
    async updateReport (reportId, report) {
      try {
        const response = await api.reports.update(reportId, report)
        const result = api.unwrap(response)
        return result
      } catch (err) {
        return api.handleError(err)
      }
    }
  }
})
