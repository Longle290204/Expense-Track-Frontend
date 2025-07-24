import React, { ReactNode, useState } from 'react'
import styles from './form.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  error?: string
}

const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <div className={cx('form-group')}>
      {/* {label && <label htmlFor={props.id || props.name}>{label}</label>} */}
      <input className={cx('input', { 'input-error': error })} {...props} />
      {error && <span className={cx('form-error')}>{error}</span>}
    </div>
  )
}

export default Input
