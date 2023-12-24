import React from 'react'

interface ComboInputProps {
  label: string;
  options: {
    label: string;
  }[];
  value?: string;
  onChange: (value: string) => void;
  onClick: () => void;
}

const ComboInput: React.FC<ComboInputProps> = ({ label, options, value, onChange, onClick }) => {
  return (
    <div className='px-4'>
      <label className='mb-2 font-bold'>{label}</label>
      <input
        onClick={onClick}
        className="w-full bg-gray-100 border-b-3   transition-all border-b-gray-300 text-gray-900 focus:bg-gray-200 focus:!shadow-xl rounded-lg focus:ring-secondary focus:border-secondary block p-2.5 outline-none"
        list="options"
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Selecciona o escribe ${label.toLowerCase()}`}
      />
      <datalist
        id="options"
        className="bg-white absolute z-10 top-100 border border-gray-300 left-0 rounded-md overflow-y-auto max-h-60 focus:outline-none"
      >
        {options.map((option, idx) => (
          <option className='bg-white' key={idx} >
            {option.label}
          </option>
        ))}
      </datalist>
    </div>
  )
}

export default ComboInput
