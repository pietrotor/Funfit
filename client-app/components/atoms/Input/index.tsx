import { ErrorMessage } from '@hookform/error-message'
import { Input, InputProps, Textarea } from '@nextui-org/react'
import React from 'react'
import { Control, Controller, RegisterOptions } from 'react-hook-form'

type TLabelProps = {
  label?: string
  children: React.ReactNode
  required?: boolean
  labelColor?: string
}

const Label = ({
  label,
  children,
  required,
  labelColor = 'text-tertiary'
}: TLabelProps) => {
  if (!label) {
    return <>{children}</>
  }
  return (
    <label className="mt-2 w-full">
      <p className={`mb-2 text-sm font-medium ${labelColor}`}>
        {label} {required ? '*' : ''}
      </p>
      {children}
    </label>
  )
}

const inputClassNames = {
  label: 'text-sm font-medium text-tertiary',
  inputWrapper: [
    'bg-white shadow-none border-1 border-stone-300',
    'data-[hover=true]:border-stone-400',
    'group-data-[focus=true]:border-primary group-data-[focus=true]:ring-4 group-data-[focus=true]:ring-primary/15'
  ].join(' '),
  input: 'text-[15px] text-tertiary placeholder:text-stone-400'
}

type TInputProps = InputProps & {
  name: string
  control?: Control<any>
  type?: 'text' | 'number' | 'date' | 'time' | 'textArea' | 'email' | 'password'
  variant?: 'bordered' | 'flat' | 'faded' | 'underlined'
  valueAs?: 'number' | 'date' | 'string'
  placeholder?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
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
  defaultValue?: string
}

const InputComponent: React.FC<TInputProps> = ({
  control,
  valueAs = 'string',
  required = true,
  isRequired = true,
  type = 'text',
  variant = 'bordered',
  name,
  label = '',
  size = 'md',
  placeholder = '',
  onChange,
  value,
  rules,
  customeClassName,
  labelColor = 'text-tertiary',
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
        defaultValue={
          type === 'date' ? new Date().toISOString().split('T')[0] : defaultValue
        }
        rules={rules}
        render={({ field, formState: { errors } }) => (
          <div className="w-full">
            {type !== 'textArea' ? (
              <>
                <Input
                  {...field}
                  defaultValue={defaultValue}
                  type={type}
                  variant={variant}
                  radius="md"
                  label={label + (isRequired ? '*' : '')}
                  onChange={event => field.onChange(getTypeOfValue(event))}
                  className={`w-full ${customeClassName || ''}`}
                  classNames={inputClassNames}
                  placeholder={placeholder}
                  value={field.value || ''}
                  {...props}
                />
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) => (
                    <p className="ml-2 text-left text-sm font-medium text-red-600">
                      {message || 'Este campo es obligatorio'}
                    </p>
                  )}
                />
              </>
            ) : (
              <>
                <Textarea
                  {...field}
                  type={type}
                  variant="bordered"
                  label={`${label} ${required ? '*' : ''}`}
                  placeholder={placeholder}
                  size="sm"
                  radius="md"
                  onChange={event => field.onChange(getTypeOfValue(event))}
                  className={`w-full ${customeClassName || ''}`}
                  classNames={inputClassNames}
                />
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) => (
                    <p className="ml-2 text-sm font-medium text-red-600">
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
    <Label required={required} label={label} labelColor={labelColor}>
      {type !== 'textArea' ? (
        <Input
          disabled={disabled}
          type={type}
          variant={variant}
          radius="md"
          label={label}
          size={size}
          className={`w-full ${customeClassName || ''}`}
          classNames={inputClassNames}
          value={value}
          placeholder={placeholder}
          {...props}
        />
      ) : (
        <Textarea
          type={type}
          variant={variant}
          label={`${label} ${required ? '*' : ''}`}
          placeholder={placeholder}
          radius="md"
          size="sm"
          className={`w-full ${customeClassName || ''}`}
          classNames={inputClassNames}
          value={value}
        />
      )}
    </Label>
  )
}

export default InputComponent
