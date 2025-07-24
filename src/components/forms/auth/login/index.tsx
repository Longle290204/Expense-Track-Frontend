import classNames from 'classnames/bind'
import styles from './LoginForm.module.scss'
import { useLoginForm } from './useLoginForm'
import { LoginFormData } from './types'
import Input from '~/components/common/form-element/Input'

const cx = classNames.bind(styles)
function LoginForm() {
  const { formData, errors, loading, handleInputChange, handleLogin } = useLoginForm()

  const fields: (keyof LoginFormData)[] = ['username', 'password']
  return (
    <form onSubmit={handleLogin} autoComplete='off' className={cx('form-Login')}>
      <h4>ĐĂNG NHẬP</h4>

      {loading && <span>Đang xử lý...</span>}
      {errors.errorMessage && (
        <div className={cx('error-message')}>
          <span>{errors.errorMessage}</span>
        </div>
      )}

      {fields.map((field) => (
        <Input
          key={field}
          label={field === 'username' ? 'Tên đăng nhập' : field === 'password' ? 'Mật khẩu' : ''}
          id={field}
          type={field.includes('password') ? 'password' : 'text'}
          value={formData[field] || ''}
          onChange={handleInputChange}
          error={errors[field]}
          placeholder={field === 'username' ? 'Tên đăng nhập' : field === 'password' ? 'Mật khẩu' : ''}
          required
        />
      ))}

      <button className={cx('form-button')} type='submit'>
        Đăng Nhập
      </button>
      <a className={cx('forget-password')} href='#!'>
        Quên mật khẩu?
      </a>
    </form>
  )
}

export default LoginForm
