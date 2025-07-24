import React from 'react'
import styles from './form.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode
  error?: string
}

const TextArea = ({ label, error, ...props }: TextAreaProps) => {
  return (
    <div className={cx('form-group')}>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <textarea className={cx('textarea', { 'input-error': error })} {...props} />
      {error && <span className={cx('form-error')}>{error}</span>}
    </div>
  )
}

export default TextArea
