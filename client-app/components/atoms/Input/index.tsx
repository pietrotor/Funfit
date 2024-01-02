import { ErrorMessage } from '@hookform/error-message'
import { Input, InputProps } from '@nextui-org/react'
import React from 'react'
import { Control, Controller, RegisterOptions } from 'react-hook-form'

type TLabelProps = {
  label?: string
  children: React.ReactNode
  required?: boolean
  labelColor?: string
}

const Label = ({ label, children, required, labelColor = 'text-white' }: TLabelProps) => {
  if (!label) {
    return <>{children}</>
  }
  return (
    <label className="w-full mt-2">
      <p className={`mb-2 font-bold ${labelColor}`}>
        {label} {required ? '*' : ''}
      </p>
      {children}
    </label>
  )
}

type TInputProps = InputProps & {
  name: string
  control?: Control<any>
  type?: 'text' | 'number' | 'date' | 'textArea' | 'email' | 'password'
  valueAs?: 'number' | 'date' | 'string'
  placeholder?: string
  label?: string
  onChange?: () => void
  value?: any
  disabled?: boolean
  rules?:
    | Omit<
        RegisterOptions<any, string>,
        'valueAsNumber' | 'valueAsDat' | 'setValueAs' | 'disabled'
      >
    | undefined
  customeClassName?: string
  labelColor?: string
  defaultValue?: any
}

const InputComponent: React.FC<TInputProps> = ({
  control,
  valueAs = 'string',
  required = true,
  type = 'text',
  name,
  label = '',
  placeholder = '',
  onChange,
  value,
  rules,
  customeClassName,
  labelColor = 'text-black',
  disabled = false,
  defaultValue,
  ...props
}) => {
  function getTypeOfValue(event: React.ChangeEvent<HTMLInputElement>) {
    switch (valueAs) {
      case 'number':
        return event.target.valueAsNumber
      case 'date':
        return event.target.valueAsDate
      default:
        return event.target.value
    }
  }
  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={ type === 'date' ? new Date().toISOString().split('T')[0] : ''}
        rules={rules}
        render={({ field, formState: { errors } }) => (
          <div className="w-full">
            {type !== 'textArea' ? (
              <>
                <Input
                  {...field}
                  defaultValue={defaultValue}
                  type={type}
                  variant={'bordered'}
                  radius="sm"
                  label={label}
                  onChange={event => field.onChange(getTypeOfValue(event))}
                  className={`w-full appearance-none rounded-md bg-gray-100/30 text-black placeholder-gray-700 outline-none transition-all focus:bg-teal-50 focus:shadow-xl disabled:bg-gray-300 disabled:text-gray-600 ${customeClassName}`}
                  placeholder={placeholder}
                  value={field.value || ''}
                  {...props}
                />
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) => (
                    <p className="ml-2 text-sm font-semibold text-red-500">
                      {message || 'Este campo es obligatorio'}
                    </p>
                  )}
                />
              </>
            ) : (
              <>
                <Input
                  {...field}
                  type={type}
                  variant={'bordered'}
                  label={label}
                  radius="sm"
                  onChange={event => field.onChange(getTypeOfValue(event))}
                  className={`w-full appearance-none rounded-md  border-gray-500 bg-gray-100/30 p-2 text-black outline-none  transition-all focus:bg-teal-50 focus:shadow-xl disabled:bg-gray-300 disabled:text-gray-600 ${customeClassName}`}
                />
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) => (
                    <p className="ml-2 text-sm font-semibold text-red-500">
                      {message || 'Este campo es obligatorio'}
                    </p>
                  )}
                />
              </>
            )}
          </div>
        )}
      />
    )
  }
  return (
    <Label required={required} label={label}>
      <Input
        disabled={disabled}
        type={type}
        value={value}
        {...props}
      />
    </Label>
  )
}

export default InputComponent
