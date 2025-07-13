import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { LoginFormData, LoginErrors } from './types'

export function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' })
  const [errors, setErrors] = useState<LoginErrors>({})
  const [loading, setLoading] = useState<Boolean>(false)

  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => ({ ...prev, [id]: '', errorMessage: '' }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      const response = await axios.post('http://localhost:8080/ExpenseTrackApp/api/auth/login', formData)

      const { accessToken, refreshToken } = response.data

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      const decoded: any = jwtDecode(accessToken)

      if (decoded?.username === 'superadmin') {
        window.location.href = '/admin'
      } else {
        window.location.href = '/'
      }
    } catch (error) {
      setErrors({ errorMessage: 'Tên đăng nhập hoặc mật khẩu không đúng' })
      alert('Đăng nhập không thành công. Vui lòng thử lại!')
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    errors,
    loading,
    handleInputChange,
    handleLogin
  }
}
