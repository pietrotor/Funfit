type SearchInputProps = {
  onSearch: (value: string) => void
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  return (
    <div className="flex w-full items-end gap-2 rounded-xl border-2 bg-gray-100 p-2 px-4 text-sm transition-all duration-300">
      <input
        placeholder="Buscar..."
        onChange={event => onSearch(event.target.value)}
        className="w-full appearance-none border-none bg-transparent outline-none"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="h-5 w-5 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>
  )
}

export { SearchInput }
