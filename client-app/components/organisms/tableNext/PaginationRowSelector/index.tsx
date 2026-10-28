import React from 'react'

type TPaginationRowSelectorProps = {
  rows: number
  onChangeRows: (value: number) => void
}

const PaginationRowSelector: React.FC<TPaginationRowSelectorProps> = ({
  rows,
  onChangeRows
}) => {
  return (
    <label
      htmlFor="rowsPagination"
      className="mb-2 flex items-center gap-3 text-sm font-medium text-stone-600"
    >
      <span>Registros por página</span>
      <select
        value={rows}
        id="rowsPagination"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          onChangeRows(parseInt(event.target.value))
        }
        className="block w-fit rounded-xl border border-stone-200 bg-white p-2 text-sm text-tertiary outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15"
      >
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
