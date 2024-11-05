// import request from './request'

export default {
  async get (userId) {
    return {
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
    // return request.get(`users/${userId}`)
  }
}
