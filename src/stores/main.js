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
    async getTopics () {
      const { data: { data } } = await api.topics.all()
      this.topics = data
    },
    async getProjects () {
      const { data: { data } } = await api.projects.all()
      this.projects = data
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
      this.supervisorStudents = []
      const team = await this.getTeamBySupervisor(supervisorId)

      if (team) {
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
        const response = await api.messages.create(message)
        return api.unwrap(response)
      } catch (err) {
        return api.handleError(err)
      }
    },
    async getUsers () {
      const { data } = await api.users.all()
      this.users = data.data
    },
    async getUserTasks (userId) {
      const { data: { data } } = await api.tasks.get(userId)
      this.userTasks = data
    },
    async getTasks () {
      const { data: { data } } = await api.tasks.all()
      console.log(data)
      this.tasks = data
    },
    async createUser (user) {
      // check user is admin
      try {
        const { data: { data } } = await api.users.create(user)
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
        const { data: { data } } = await api.users.update(userId, user)
        console.log(data)
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    },
    async deleteUser (userId) {
      try {
        const { data: { data } } = await api.users.delete(userId)
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
      const { data: { data } } = await api.evaluations.create({
        project_id: projectId,
        evaluator_id: evaluatorId,
        originality: originality,
        evaluation: records
      })
      console.log(data)
      return true
    },
    async getEvaluation (projectId) {
      const { data: { data } } = await api.evaluations.get(projectId)
      this.evaluation = data
    },
    async getEvaluations () {
      const { data: { data } } = await api.evaluations.all()
      this.evaluations = data
    },
    async createTeam () {

    },
    async updateTeam () {

    },
    async addTask (task) {
      const team = await this.getTeamByMember(task.user_id)
      const project = await this.getProjectByTeam(team.id)
      const { data: { data } } = await api.tasks.create({
        ...task,
        team_id: team.id,
        project_id: project.project_id,
        assigned_at: new Date()
      })

      console.log(data)
      return true
    },
    async updateTask (taskId, task) {
      const { data: { data } } = await api.tasks.update(taskId, task)
      console.log(data)
      return true
    },
    async completeTask (taskId) {
      const { data: { data } } = await api.tasks.complete(taskId)
      console.log(data)
      return true
    },
    async getReports () {
      const { data: { data } } = await api.reports.all()
      this.reports = data
    },
    async getProjectReports (projectId) {
      const { data: { data } } = await api.reports.get(projectId)
      this.projectReports = data
    },
    async deleteReport (reportId) {
      const { data: { data } } = await api.reports.remove(reportId)
      return data
    },
    async updateReport (reportId, report) {
      const { data: { data } } = await api.reports.update(reportId, report)
      console.log(data)
      return true
    }
  }
})
