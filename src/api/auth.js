import request from '@/api/request'

export default {
  async login (email, password) {
    return request.post('/auth/login', {
      email: email,
      passwd: password
    })
  }
}
