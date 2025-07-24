import Input from './Input'
import TextArea from './TextArea'
import Select from './Select'

type FieldType = 'text' | 'password' | 'email' | 'number' | 'textarea' | 'select'

interface Option {
  value: string
  label: string
}

interface FormControlProps {
  type?: FieldType
  name: string
  label?: string
  required?: boolean
  value?: any
  onChange?: (e: React.ChangeEvent<any>) => void
  onBlur?: (e: React.FocusEvent<any>) => void
  error?: string
  className?: string
  options?: Option[] // cho select
  placeholder?: string
}

export default function FormControl({
  type = 'text',
  label,
  required,
  name,
  value,
  onChange,
  onBlur,
  error,
  className,
  options = [],
  placeholder
}: FormControlProps) {
  const labelContent = (
    <>
      {label}
      {required && <span style={{ color: 'red' }}> *</span>}
    </>
  )

  if (type === 'textarea') {
    return (
      <TextArea
        name={name}
        label={labelContent}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        className={className}
        placeholder={placeholder}
      />
    )
  }

  if (type === 'select') {
    return (
      <Select
        name={name}
        label={label} // Pass only the string label
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        className={className}
        options={options}
      />
    )
  }

  return (
    <Input
      type={type}
      name={name}
      label={labelContent}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      className={className}
      placeholder={placeholder}
    />
  )
}
