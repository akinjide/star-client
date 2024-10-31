import request from './request'

export default {
  async login (email, password) {
    return request.post('/auth/login', {
      email: email,
      passwd: password
    })
  },
  async requestNewAccessToken () {
    // TOOD: add new accessToken logic
  }
}
