import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/ExpenseTrackApp'
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

const redirectLogin = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  window.location.href = '/login'
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
    const originalRequest = error.config

    if (!originalRequest) {
      return Promise.reject(error)
    }

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

      const refreshToken = localStorage.getItem('refreshToken')

      if (!refreshToken) {
        redirectLogin()
        return Promise.reject(error)
      }

      try {
        const res = await api.post('/refresh-token', {
          refreshToken: refreshToken
        })

        const newAccessToken = res.data.accessToken
        localStorage.setItem('accessToken', newAccessToken)
        // Có thể server trả về refreshToken mới
        const newRefreshToken = res.data.refreshToken
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken)
        }

        processQueue(null, newAccessToken)

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (err) {
        console.error('Refresh token failed:', err)
        processQueue(err as Error, null)
        redirectLogin()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    } else {
      console.log('Not 401 or already retried') // 7. Check tại sao không vào
    }

    return Promise.reject(error)
  }
)

export default api
