import { useRegisterForm } from './useRegisterForm'
import { RegisterFormData } from '../register/types'
import styles from './register.module.scss'
import classNames from 'classnames/bind'
import Input from '~/components/common/form-element/Input'

const cx = classNames.bind(styles)
function RegisterForm() {
  const { formData, errors, handleInputChange, handleBlur, handleSubmit } = useRegisterForm()

  const fields: (keyof RegisterFormData)[] = ['username', 'email', 'password', 'confirmPassword']
  return (
    <form onSubmit={handleSubmit} noValidate className={cx('form-Register')}>
      <h4>ĐĂNG KÝ</h4>
      {fields.map((field) => (
        <Input
          key={field}
          label={
            field === 'username'
              ? 'Tên đăng nhập'
              : field === 'email'
                ? 'Email'
                : field === 'password'
                  ? 'Mật khẩu'
                  : field === 'confirmPassword'
                    ? 'Nhắc lại mật khẩu'
                    : ''
          }
          name={field}
          id={field}
          type={field.includes('password') ? 'password' : 'text'}
          value={formData[field] || ''}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors[field]}
          placeholder={
            field === 'username'
              ? 'Tên đăng nhập'
              : field === 'email'
                ? 'Email'
                : field === 'password'
                  ? 'Mật khẩu'
                  : field === 'confirmPassword'
                    ? 'Nhắc lại mật khẩu'
                    : ''
          }
        />
      ))}
      <button className={cx('form-button')} type='submit'>
        Đăng Ký
      </button>
    </form>
  )
}

export default RegisterForm
