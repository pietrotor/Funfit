import { ErrorMessage } from '@hookform/error-message'
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
  rules?: Omit<RegisterOptions<any, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined
  textColor?: string
}

const Selector: React.FC<TSelectorProps> = ({ onChange = () => {}, onClick, control, options, name, label, rules, placeholder, width = 'w-full', fontSize = 'text-base', textColor = 'text-gray-900' }) => {
  if (control) {
    return (
      <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, formState: { errors } }) => (
        <div className={`${width} ${fontSize}`}>
          <label className={` gap-3 items-center mb-2 t-4 font-medium ${textColor} w-full` }>
            {label && <p className='m-0 font-bold mb-2'>{label} {rules?.required ? '*' : ''}</p>}
            <select {...field} defaultValue={''} onClick= {onClick} className="!w-full !bg-gray-300/30 !border-b-3 transition-all !border-gray-500  text-gray-900 focus:!bg-gray-200 focus:!shadow-xl focus:border-none rounded-lg  p-2.5">
              {placeholder && <option value={''} selected disabled>{placeholder}</option>}
              {options.map((option, idx) => (
                <option key={idx} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <ErrorMessage errors={errors} name={name} render={({ message }) =>
            <p className='text-red-500 font-semibold ml-2'>{message ? message.toString() : 'Este campo es obligatorio'}</p>}
          />
        </div>)
      }
    />
    )
  }
  return (
    <label htmlFor="rowsPagination" className="gap-3 items-center mb-2 text-sm font-medium text-gray-900">
      {label && <p className='m-0'>{label}</p>}
      <select id="rowsPagination" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChange(event.target.value) } className="w-full bg-gray-50 border transition-all border-b-gray-300 text-gray-900 focus:bg-gray-200 focus:!shadow-xl rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5 outline-none">
        {label && <option value={''} selected disabled>{label}</option>}
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  )
}

export default Selector
