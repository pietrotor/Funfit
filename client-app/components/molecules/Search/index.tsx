import React from 'react'
import IconSelector from '@/components/atoms/IconSelector'
import Input from '@/components/atoms/Input'

interface SearchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search: React.FC<SearchProps> = ({ onChange }) => {
  return (
    <div className="flex w-full items-center justify-center rounded border-1 border-secondary">
      <div className="flex h-full items-center justify-center px-4 bg-secondary">
        <IconSelector name="Search" color='text-gray-500'/>
      </div>
      <Input name="text" type="text" size="sm" placeholder="Buscar producto" variant='flat'/>
    </div>
  )
}

export default Search
