import { RegisterFormData } from './types'

export const getValidationRules = (formData: RegisterFormData) => ({
  username: {
    required: 'Vui lòng nhập đầy đủ tên',
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d).+$/,
      message: 'Tên phải có tối thiểu một chữ hoa và số'
    }
  },
  email: {
    required: 'Vui lòng nhập địa chỉ email của bạn.',
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Định dạng email không đúng'
    }
  },
  password: {
    required: 'Vui lòng nhập mật khẩu',
    minLength: {
      value: 6,
      message: 'Mật khẩu phải có ít nhất 6 ký tự'
    }
  },
  rePassword: {
    required: 'Vui lòng nhập lại mật khẩu',
    custom: {
      isValid: (value: string) => value === formData.password,
      message: 'Mật khẩu nhập lại không chính xác'
    }
  }
})
