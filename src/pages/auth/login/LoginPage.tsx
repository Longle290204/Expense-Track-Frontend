import classNames from 'classnames/bind'
import styles from './LoginPage.module.scss'
import LoginFormCircle from '~/components/forms/auth'
import bg from '../../../assets/images/money-background.jpg'

const cx = classNames.bind(styles)
function LoginPage() {
  return (
    <div style={{ backgroundImage: `url(${bg})` }} className={cx('bg-login')}>
      <LoginFormCircle />
    </div>
  )
}

export default LoginPage
