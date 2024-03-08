import { ErrorMessage } from '@hookform/error-message'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import React from 'react'
import { Control, Controller, RegisterOptions } from 'react-hook-form'

interface ComboInputProps {
  name: string
  rules?:
    | Omit<
        RegisterOptions<any, string>,
        'valueAsNumber' | 'valueAsDat' | 'setValueAs' | 'disabled'
      >
    | undefined
  control?: Control<any>
  label: string
  options: {
    value: any
    label: string
  }[]
  value?: string
  onChange?: (value: string) => void
  onClick: () => void
  defaultValue?: string
  disabledKeys?: string[]
  onSelectionChange?: (e: any) => void
}

const ComboInput: React.FC<ComboInputProps> = ({
  name,
  rules,
  control,
  label,
  options,
  value,
  defaultValue,
  onChange,
  onClick,
  disabledKeys,
  onSelectionChange
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, formState: { errors } }) => (
        <div className="w-full">
          <div className="">
            <Autocomplete
              {...field}
              variant={'bordered'}
              name={name}
              label={label}
              className={`${
                value ? 'border-gray-900' : 'border-gray-300'
              } w-full`}
              radius="sm"
              onSelectionChange={e => {
                console.log('🚀 ~ e:', e)
                onSelectionChange && onSelectionChange(e)
              }}
              defaultSelectedKey={defaultValue}
              disabledKeys={disabledKeys}
              onOpenChange={onClick}
              list="options"
              onInputChange={e => {
                field.onChange(e)
                onChange && onChange(e)
              }}
              placeholder={`Selecciona o escribe ${label.toLowerCase()}`}
            >
              {options.map(option => (
                <AutocompleteItem key={option.value} value={option.value}>
                  {option.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="ml-2 font-semibold text-red-500">
                {message ? message.toString() : 'Este campo es obligatorio'}
              </p>
            )}
          />
        </div>
      )}
    />
  )
}

export default ComboInput
