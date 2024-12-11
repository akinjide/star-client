// import request from './request'

export default {
  async get (userId) {
    const users = {
      1: {
        id: 1,
        role_id: 1,
        email: 'john@gmail.com',
        department: '',
        graduation_year: null,
        full_name: 'John Doe',
        title: 'Sys. Admin.',
        student_number: null,
        image: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        created_at: '2024-06-24T21:45:08.979Z',
        updated_at: '2024-06-24T21:45:08.979Z'
      },
      2: {
        id: 2,
        role_id: 4,
        email: 'mark@gmail.com',
        department: 'Engineering',
        graduation_year: 2026,
        full_name: 'Mark Twain',
        title: 'Student',
        image: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        student_number: 12345678,
        created_at: '2022-02-11T21:45:08.979Z',
        updated_at: '2024-06-24T21:45:08.979Z'
      },
      3: {
        id: 3,
        role_id: 4,
        email: 'hind.abdallah@gmail.com',
        department: 'Engineering',
        graduation_year: 2025,
        full_name: 'Hind Abdallah',
        title: 'Student',
        student_number: 2081924124,
        image: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        created_at: '2021-06-25 16:30:59.301',
        updated_at: '2024-06-25 16:30:59.301'
      },
      4: {
        id: 4,
        role_id: 2,
        email: 'cem.ergun@emu.edu.tr',
        department: 'Engineering',
        graduation_year: null,
        full_name: 'Cem Ergun',
        title: 'Assoc. Prof. Dr.',
        student_number: null,
        image: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        created_at: '2024-06-25 16:30:59.301',
        updated_at: '2024-06-25 16:30:59.301'
      }
    }

    return {
      data: {
        errorCode: -1,
        errorMessage: null,
        message: 'Ok',
        data: users[userId]
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
          department: null,
          graduation_year: null,
          full_name: 'John Doe',
          title: 'Sys. Admin.',
          student_number: null,
          image: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          created_at: '2024-06-24T21:45:08.979Z',
          updated_at: '2024-06-24T21:45:08.979Z'
        },
        {
          id: 2,
          role_id: 4,
          email: 'mark@gmail.com',
          department: 'Engineering',
          graduation_year: 2026,
          full_name: 'Mark Twain',
          title: '',
          student_number: 12345678,
          image: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          created_at: '2022-02-11T21:45:08.979Z',
          updated_at: '2024-06-24T21:45:08.979Z'
        },
        {
          id: 3,
          role_id: 4,
          email: 'hind.abdallah@gmail.com',
          department: 'Engineering',
          graduation_year: 2025,
          full_name: 'Hind Abdallah',
          title: '',
          student_number: 2081924124,
          image: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          created_at: '2021-06-25 16:30:59.301',
          updated_at: '2024-06-25 16:30:59.301'
        },
        {
          id: 4,
          role_id: 2,
          email: 'cem.ergun@emu.edu.tr',
          department: 'Engineering',
          graduation_year: 2025,
          full_name: 'Cem Ergun',
          title: 'Assoc. Prof. Dr.',
          student_number: null,
          image: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
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
