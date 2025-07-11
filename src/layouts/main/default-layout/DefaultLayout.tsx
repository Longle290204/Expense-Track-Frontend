import classNames from 'classnames/bind'
import styles from './layout.module.scss'
import { PropTypes } from '~/types/interfaces/props'
import Header from './Header'
import Footer from './Footer'

function DefaultLayout({ children }: PropTypes) {
  const sx = classNames.bind(styles)

  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
