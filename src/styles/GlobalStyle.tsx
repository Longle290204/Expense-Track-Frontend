import { PropTypes } from '~/types/interfaces/props'
import './GlobalStyle.module.scss'

function GlobalStyle({ children }: PropTypes) {
  return <div>{children}</div>
}

export default GlobalStyle
