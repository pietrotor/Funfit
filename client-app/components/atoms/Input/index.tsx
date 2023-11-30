import { Input as InputNextUi, InputProps, Textarea } from '@nextui-org/react'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

type TInputProps = InputProps & {
  name: string
  control?: Control<any>
  type?: 'text' | 'number' | 'date' | 'textArea' | 'email' | 'password'
  valueAs?: 'number' | 'date' | 'string'
  required?: boolean
  placeholder?: string
  label?: string
  value?: any
  refComponent?: any
}

const Input: React.FC<TInputProps> = ({
  control,
  valueAs = 'string',
  required = true,
  type = 'text',
  name,
  label = '',
  placeholder = '',
  value,
  refComponent,
  ...props
}) => {
  function getTypeOfValue (event: React.ChangeEvent<HTMLInputElement>) {
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
        rules={{ required }}
        render={({ field, formState: { errors } }) => (
          <div className='w-full'>
            {type !== 'textArea'
              ? <>
                  <InputNextUi
                  {...field}
                  ref={refComponent}
                  onChange={(event) => field.onChange(getTypeOfValue(event))}
                  validationState={`${errors[`${name}`] ? 'invalid' : 'valid'}`}
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  variant={'bordered'}
                  size='lg'
                  {...props}
                />
                <ErrorMessage errors={errors} name={name} render={({ message }) =>
                  <p className='text-red-500 text-sm font-semibold ml-2'>{message ? name : 'Este campo es obligatorio'}</p>}
                />
              </>
              : <>
                <Textarea
                {...field}
                ref={refComponent}
                onChange={(event) => field.onChange(getTypeOfValue(event))}
                validationState={`${errors[`${name}`] ? 'invalid' : 'valid'}`}
                type={type}
                label={label}
                placeholder={placeholder}
                variant={'bordered'}
                size='lg'
                {...props}
              />
              <ErrorMessage errors={errors} name={name} render={({ message }) =>
                <p className='text-red-500 text-sm font-semibold ml-2'>{message ? name : 'Este campo es obligatorio'}</p>}
              />
            </>
            }
          </div>)
        }
      />
    )
  }
  return (
    <InputNextUi
      type={type}
      label={label}
      value={value}
      ref={refComponent}
      placeholder={placeholder}
      variant={'bordered'}
      size='lg'
      {...props}
    />
  )
}

export default Input
