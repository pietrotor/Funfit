import React from 'react'
import { Search } from 'lucide-react'

type SearchProps = {
  setFilter: (e: string) => void
}

const SearchBar: React.FC<SearchProps> = ({ setFilter }: SearchProps) => {
  return (
    <label className="flex w-full items-center gap-2 rounded-2xl border border-stone-200 bg-white px-3 py-2.5 shadow-sm focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15">
      <Search className="h-4 w-4 shrink-0 text-secondary-darken" strokeWidth={2} />
      <input
        name="text"
        type="text"
        placeholder="Buscar producto"
        onChange={event => setFilter(event.target.value)}
        className="w-full bg-transparent text-sm text-tertiary outline-none placeholder:text-stone-400"
      />
    </label>
  )
}

export default SearchBar
