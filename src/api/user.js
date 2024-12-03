// import request from './request'

export default {
  async get (userId) {
    return {
      data: {
        errorCode: -1,
        errorMessage: null,
        message: 'Ok',
        data: {
          id: 1,
          role_id: 1,
          email: 'john@gmail.com',
          department: 'Engineering',
          graduation_year: 2025,
          full_name: 'John Doe',
          title: 'Professor',
          student_number: 2081924124,
          created_at: '2024-06-24T21:45:08.979Z',
          updated_at: '2024-06-24T21:45:08.979Z'
        }
      }
    }
    // return request.get(`users/${userId}`)
  },
  async all () {
    return {
      errorCode: -1,
      errorMessage: null,
      message: 'Ok',
      data: [
        {
          id: 1,
          role_id: 1,
          email: 'john@gmail.com',
          department: 'Engineering',
          graduation_year: 2025,
          full_name: 'John Doe',
          title: 'Professor',
          student_number: 2081924124,
          created_at: '2024-06-24T21:45:08.979Z',
          updated_at: '2024-06-24T21:45:08.979Z'
        },
        {
          id: 2,
          role_id: 1,
          email: 'hind.abdallah@gmail.com',
          department: 'Engineering',
          graduation_year: 2025,
          full_name: 'Hind Abdallah',
          title: 'Student',
          student_number: 2081924124,
          created_at: '2024-06-25 16:30:59.301',
          updated_at: '2024-06-25 16:30:59.301'
        }
      ]
    }
    // return request.get('users')
  },
  async delete (userId) {
    // return request.delete(`users/${userId}`)
    return {
      message: 'user deleted',
      data: null
    }
  }
}
