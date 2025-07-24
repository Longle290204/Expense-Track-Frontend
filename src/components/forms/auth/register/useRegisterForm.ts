import { useState, useEffect } from 'react'
import axios from 'axios'
import useDebounce from '~/hooks/shared/useDebounce'
import { RegisterFormData, RegisterErrors } from './types'
import { getValidationRules } from './validationRules'

export function useRegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState<RegisterErrors>({})
  const [debouncedField, setDebouncedField] = useState({ name: '', value: '' })
  const debouncedValue = useDebounce(debouncedField, 500)

  useEffect(() => {
    const checkDebouncedField = async () => {
      if (debouncedValue.name && debouncedValue.value && !errors[debouncedValue.name as keyof RegisterFormData]) {
        const existError = await checkIfExists(debouncedValue.name, debouncedValue.value)
        setErrors((prev) => ({ ...prev, [debouncedValue.name]: existError }))
      }
    }

    checkDebouncedField()
  }, [debouncedValue])

  const checkIfExists = async (field: string, value: string) => {
    try {
      const response = await axios.post(`http://localhost:8080/ExpenseTrackApp/api/auth/checkIfExist`, {
        field,
        value
      })
      console.log('check exist data', response)

      return response.data.exists ? (field === 'username' ? `Tên đăng nhập đã tồn tại` : `Email đã tồn tại`) : ''
    } catch (error) {
      console.error('Lỗi kiểm tra tồn tại:', error)
      return 'Lỗi kết nối, vui lòng thử lại'
    }
  }

  type ValidationField = 'username' | 'email' | 'password' | 'confirmPassword'
  const validateField = async (
    field: ValidationField,
    value: string,
    trigger: 'blur' | 'submit' | 'change' = 'blur'
  ) => {
    const rules = getValidationRules(formData)[field]
    if (!rules) return ''

    if (rules.required && !value.trim()) return rules.required
    if ('pattern' in rules && rules.pattern && !rules.pattern.value.test(value)) return rules.pattern.message
    if ('minLength' in rules && rules.minLength && value.length < rules.minLength.value) return rules.minLength.message
    if ('custom' in rules && rules.custom && !rules.custom.isValid(value)) return rules.custom.message

    if ((field === 'username' || field === 'email') && trigger !== 'change') {
      const existError = await checkIfExists(field, value)
      if (existError) return existError
    }

    return ''
  }

  const validateAll = async () => {
    const newErrors: RegisterErrors = {}
    for (const field of Object.keys(formData) as (keyof RegisterFormData)[]) {
      const error = await validateField(field, formData[field] ?? '', 'submit')
      if (error) newErrors[field] = error
    }
    return newErrors
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))

    if (name === 'username' || name === 'email') {
      setDebouncedField({ name, value })
    }
  }

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const error = await validateField(name as keyof RegisterFormData, value, 'blur')
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = await validateAll()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      console.log(formData)

      const response = await axios.post('http://localhost:8080/ExpenseTrackApp/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      alert('Đăng ký thành công!')
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    formData,
    errors,
    handleInputChange,
    handleBlur,
    handleSubmit
  }
}
