import { ErrorMessage } from '@hookform/error-message'
import { Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { Control, Controller, RegisterOptions } from 'react-hook-form'

type TSelectorProps = {
  name: string
  control?: Control<any>
  onChange?: (value: any) => void
  onClick?: () => void
  placeholder?: string
  options: {
    value: any
    label: string
  }[]
  label?: string
  width?: string
  fontSize?: string
  defaultValue: string[] | any
  rules?:
    | Omit<
        RegisterOptions<any, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined
  textColor?: string
}

const Selector: React.FC<TSelectorProps> = ({
  onChange = () => {},
  onClick,
  control,
  options,
  name,
  label,
  rules,
  placeholder,
  width = 'w-full',
  fontSize = 'text-base',
  defaultValue,
  textColor = 'text-gray-900'
}) => {
  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, formState: { errors } }) => (
          <div className={`${width} ${fontSize}`}>
              <Select
                {...field}
                variant={'bordered'}
                label={label}
                onClick={onClick}
                defaultSelectedKeys={[defaultValue]}
                style={{ border: '1px solid' }}
              >
                {options.map((option, idx) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
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
  return (
    <Select
      id="rowsPagination"
      variant={'bordered'}
      label="Select an animal"
      className="max-w-xs"
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(event.target.value)
      }
    >
      {options.map((option, idx) => (
        <SelectItem key={idx} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  )
}

export default Selector
