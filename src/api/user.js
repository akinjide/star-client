import request from './request'

export default {
  async get (userId) {
    return request.get(`users/${userId}`)
  }
}
