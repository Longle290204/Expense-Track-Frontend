import React from 'react'
import styles from './form.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: SelectOption[]
}

const Select = ({ label, error, options, ...props }: SelectProps) => {
  return (
    <div className={cx('form-group')}>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <select className={cx('select', { 'input-error': error })} {...props}>
        <option value=''>-- Chọn --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className={cx('form-error')}>{error}</span>}
    </div>
  )
}

export default Select
