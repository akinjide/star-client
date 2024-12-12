// import request from './request'

export default {
  async get (userId) {
    return {
      data: {
        errorCode: -1,
        errorMessage: null,
        message: 'OK',
        data: []
      }
    }
    // return request.get(`tasks/${userId}`)
  },
  async create (task) {
  }
}
