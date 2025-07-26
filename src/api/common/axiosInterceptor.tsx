import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/ExpenseTrackApp/api'
})

interface FailedQueuePromise {
  resolve: (token: any) => void
  reject: (error: any) => void
}

let isRefreshing = false
let failedQueue: FailedQueuePromise[] = []

const processQueue = (error: Error | null, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

// Gắn accessToken vào header của mỗi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Xử lý response khi accessToken hết hạn
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    /**
     * Structur error:
     * 
     * error {
     *  response: { status: 401, data: ... },
        config: {
          url: '/api/users',
          method: 'GET',
          headers: { Authorization: 'Bearer old_token' },
          // ... tất cả thông tin của request gốc
        }
     * }
     * 
    */
    const originalRequest = error.config

    // Nếu access token hết hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true

      const refreshToken = localStorage.getItem('refresh_token')
      if (!refreshToken) {
        // Token không tồn tại => có thể điều hướng login
        return Promise.reject(error)
      }

      try {
        const res = await axios.post('http://localhost:8080/ExpenseTrackApp/refresh-token', {
          refreshToken: refreshToken
        })

        const newAccessToken = res.data.accessToken
        localStorage.setItem('accessToken', newAccessToken)

        processQueue(null, newAccessToken)

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (err) {
        processQueue(err as Error, null)
        // Có thể logout tại đây nếu muốn
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
