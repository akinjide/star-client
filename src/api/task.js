// import request from './request'

export default {
  async get (userId) {
    const tasks = {
      2: [
        {
          team_id: 1,
          team_name: 'Avengers',
          team_description: 'Team Avengers',
          user_id: 2,
          user_email: 'john@gmail.com',
          user_full_name: 'John Doe',
          supervisor_id: 3,
          project_id: 1,
          project_name: 'CMSE400 - Machine Learning',
          project_description: '',
          task_id: 1,
          task_name: 'Typography in UX/UI',
          task_raw_text: null,
          task_description: null,
          task_grade: null,
          task_assigned_at: '2024-11-04T21:16:22.431Z',
          task_ends_at: '2024-11-07T22:12:06.920Z',
          task_submitted_at: null,
          task_created_at: '2024-11-04T21:16:22.431Z'
        },
        {
          team_id: 1,
          team_name: 'Avengers',
          team_description: 'Team Avengers',
          user_id: 2,
          user_email: 'john@gmail.com',
          user_full_name: 'John Doe',
          supervisor_id: 3,
          project_id: 1,
          project_name: 'CMSE400 - Machine Learning',
          project_description: '',
          task_id: 2,
          task_name: 'Figma UI UX Design',
          task_raw_text: null,
          task_description: null,
          task_grade: null,
          task_assigned_at: '2024-11-04T21:16:22.431Z',
          task_ends_at: '2024-11-10T10:12:06.920Z',
          task_submitted_at: null,
          task_created_at: '2024-11-04T21:16:22.431Z'
        },
        {
          team_id: 1,
          team_name: 'Avengers',
          team_description: 'Team Avengers',
          user_id: 3,
          user_email: 'john@gmail.com',
          user_full_name: 'John Doe',
          supervisor_id: 3,
          project_id: 1,
          project_name: 'CMSE400 - Machine Learning',
          project_description: '',
          task_id: 2,
          task_name: 'System Architecture Diagram',
          task_raw_text: null,
          task_description: null,
          task_grade: null,
          task_assigned_at: '2024-11-04T21:16:22.431Z',
          task_ends_at: '2024-11-10T10:12:06.920Z',
          task_submitted_at: '2024-11-09T10:12:06.920Z',
          task_created_at: '2024-11-04T21:16:22.431Z'
        }
      ]
    }

    return {
      data: {
        errorCode: -1,
        errorMessage: null,
        message: 'OK',
        data: tasks[userId] || []
      }
    }
    // return request.get(`tasks/${userId}`)
  },
  async create (task) {
  }
}
