import { ErrorMessage } from '@hookform/error-message'
import React from 'react'
import { Control, Controller, RegisterOptions } from 'react-hook-form'

type TLabelProps = {
  label?: string
  children: React.ReactNode
  required?: boolean
  labelColor?: string
}

const Label = ({ label, children, required, labelColor }: TLabelProps) => {
  if (!label) {
    return (<>{children}</>)
  }
  return (
    <label className='w-full'>
      <p className={`mb-2 font-bold ${labelColor}`}>{label} {required ? '*' : ''}</p>
      {children}
    </label>
  )
}

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
  control?: Control<any>
  type?: 'text' | 'number' | 'date' | 'textArea' | 'email' | 'password'
  valueAs?: 'number' | 'date' | 'string'
  placeholder?: string
  label?: string
  onChange?: () => void
  value?: any
  disabled?: boolean
  rules?: Omit<RegisterOptions<any, string>, 'valueAsNumber' | 'valueAsDat' | 'setValueAs' | 'disabled'> | undefined
  customeClassName?: string
  labelColor?: string
}

const Input: React.FC<TInputProps> = ({
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
        rules={rules}
        render={({ field, formState: { errors } }) => (
          <div className='w-full'>
            {type !== 'textArea' ? <>
                <Label required={!!rules?.required || false} label={label} labelColor={labelColor}>
                  <input
                    {...field}
                    type={type}
                    onChange={(event) => field.onChange(getTypeOfValue(event))}
                    className={`p-2 appearance-none bg-gray-300/30 placeholder-gray-700 border-b-3 border-gray-500 outline-none w-full rounded-md focus:bg-gray-200 focus:shadow-xl transition-all text-black disabled:bg-gray-300 disabled:text-gray-600 ${customeClassName}`}
                    placeholder={placeholder}
                    {...props}
                  />
                </Label>
                <ErrorMessage errors={errors} name={name} render={({ message }) =>
                  <p className='text-red-500 text-sm font-semibold ml-2'>{message || 'Este campo es obligatorio'}</p>}
                />
              </> : <>
                <Label required={required} label={label} labelColor={labelColor}>
                  <input
                    {...field}
                    type={type}
                    onChange={(event) => field.onChange(getTypeOfValue(event))}
                    className={`p-2 appearance-none bg-gray-600/30 border-b-3 border-gray-500 outline-none w-full rounded-md focus:bg-gray-200 focus:shadow-xl transition-all text-black disabled:bg-gray-300 disabled:text-gray-600 ${customeClassName}`}
                    {...props}
                  />
                </Label>
              <ErrorMessage errors={errors} name={name} render={({ message }) =>
                <p className='text-red-500 text-sm font-semibold ml-2'>{message || 'Este campo es obligatorio'}</p>}
              />
            </>
            }
          </div>)
        }
      />
    )
  }
  return (
    <Label required={required} label={label}>
      <input
        disabled = {disabled}
        type={type}
        value={value}
        className={`p-2 appearance-none border border-gray-300 border-b-3 outline-none w-full rounded-md focus:bg-gray-200 focus:shadow-xl transition-all text-black disabled:bg-gray-100 disabled:text-gray-600 ${customeClassName}`}
        {...props}
      />
    </Label>
  )
}

export default Input
