import React from 'react'

type TPaginationRowSelectorProps = {
  rows: number
  onChangeRows: (value: number) => void
}

const PaginationRowSelector: React.FC<TPaginationRowSelectorProps> = ({ rows, onChangeRows }) => {
  return (
    <label htmlFor="rowsPagination" className="flex gap-3 items-center mb-2 text-sm font-medium text-gray-900">
      <p className='text-sm font-medium text-gray-900'>Registros Por Página</p>
      <select value={rows} id="rowsPagination" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChangeRows(parseInt(event.target.value)) } className="w-fit bg-gray-50 border transition-all border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5 outline-none">
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
        <option value={60}>60</option>
        <option value={70}>70</option>
        <option value={80}>80</option>
        <option value={90}>90</option>
        <option value={100}>100</option>
      </select>
    </label>
  )
}

export default PaginationRowSelector
