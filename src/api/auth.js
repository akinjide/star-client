// import request from './request'

export default {
  async login (email, password) {
    return {
      data: {
        full_name: 'John Doe',
        role_id: 1,
        permissions: [
          'update-user'
        ],
        id: 1,
        email: 'john@gmail.com',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkIwMzZENUQwLTlGOTEtNDRERi05NDU0LTIwODM5RDhFM0IyOSJ9.eyJmdWxsX25hbWUiOiJKb2huIERvZSIsInJvbGVfaWQiOjEsInBlcm1pc3Npb25zIjpbInVwZGF0ZS11c2VyIl0sImlkIjoxLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiaWF0IjoxNzMwODE0Njc4NzU1LCJleHAiOjE3MzA4MTQ2Nzk5NTUsImF1ZCI6IioubG9jYWxob3N0IiwiaXNzIjoic3Rhci1zZXJ2ZXIubG9jYWxob3N0Iiwic3ViIjoiMSIsImp0aSI6IjYyZmFkZDRjLWMxYzYtNDc4YS05ZjMxLTA1ODQyOGQ4YTU4MSJ9.vNxmoYwN68lFduU_xfOfyaczAnXr6GCbG83kX8jhrO8'
      }
    }
    // return request.post('/auth/login', {
    //   email: email,
    //   passwd: password
    // })
  },
  async requestNewAccessToken () {
    // TOOD: add new accessToken logic
  },
  async create (user) {
    // return request.post('/auth/create', {
    //   full_name: user.first_name + ' ' + user.last_name,
    //   title: user.title,
    //   email: user.email,
    //   passwd: user.password,
    //   department: user.department,
    //   graduation_year: user.graduation_year,
    //   student_number: user.student_number,
    //   role_id: user.roleId
    // })
  }
}
