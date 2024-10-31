import axios from 'axios'

import api from '@/api'
import { useAuthStore } from '@/stores/auth'

const request = axios.create({
  baseURL: 'http://localhost:3000'
})

/**
 * Add Authorization header on every request when connected
*/
request.interceptors.request.use(function (config) {
  const authStore = useAuthStore()

  if (authStore.accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`
  }

  return config
})

request.interceptors.response.use(response => {
  // Log every request
  console.log(response)
  return response
}, async (error) => {
  const { config } = error
  console.log(error)

  // Handle access token refresh for 401
  if (error.response && error.response.status === 401) {
    const accessToken = await api.auth.requestNewAccessToken()

    if (accessToken) {
      const authStore = useAuthStore()

      authStore.accessToken = accessToken
      config.headers.Authorization = `Bearer ${accessToken}`

      return request(config)
    }
  }

  // const errorMsg = (error.response?.data?.error?.message || error) as string
  console.log(error.response?.data, 'catastropic error when accessing API')

  return Promise.reject(error)
})

export default request