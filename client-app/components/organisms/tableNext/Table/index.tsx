import React, { ReactNode } from 'react'

import Pagination from '../Pagination'
import TableNameHeaders from '../TableNameHeaders'
import TableLoader from '../TableLoader/intex'
import PaginationRowSelector from '../PaginationRowSelector'

import { PaginationInterfaceProps } from '@/interfaces/paginationInterfaces'

interface TableProps extends PaginationInterfaceProps {
  tableName?: string
  titles: {
    name: string
    onUpClick?: () => void
    onDownClick?: () => void
  }[]
  items: {
    content: ReactNode[]
  }[]
  isLoading?: boolean
  loadingLoadingColumns?: number
  enablePagination?: boolean
  onSearch?: (value: string) => void
}
const Table = ({
  tableName,
  titles,
  items,
  isLoading = false,
  loadingLoadingColumns = 5,
  itemsPerPage = 30,
  currentPage = 1,
  totalPages = 1,
  onChangeRow = () => {},
  onChangePage = () => {},
  enablePagination = true,
  onSearch
}: TableProps) => {
  const color = 'light'

  return (
    <>
      <div
        className={
          'relative mb-3 flex w-full min-w-0 flex-col break-words rounded-xl border-none bg-white shadow-xl' +
          (color === 'light' ? '' : 'bg-primary-darken text-white')
        }
      >
        {tableName && (
          <div className="mb-0 rounded-t border-0 px-4 py-3">
            <div className="flex max-w-full flex-1 flex-grow flex-wrap items-center justify-between px-4">
              <h3
                className={
                  'text-lg font-bold ' +
                  (color === 'light' ? 'text-primary-light' : 'text-white')
                }
              >
                {tableName}
              </h3>
              {onSearch && (
                <div className="flex w-full items-end gap-2 rounded-xl border-2 bg-gray-100 p-2 px-4 text-sm transition-all duration-300 md:max-w-[250px] xl:max-w-[300px]">
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
              )}
            </div>
          </div>
        )}
        <div className="block w-full overflow-x-auto">
          <table className="w-full border-collapse items-center bg-transparent">
            <thead>
              <tr>
                {titles.map((title, index) => (
                  <TableNameHeaders
                    key={index}
                    title={title.name}
                    color={color}
                    onUpClick={title.onUpClick}
                    onDownClick={title.onDownClick}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <TableLoader columns={titles.length} />
              ) : (
                items.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      'transition-all ' +
                      (color === 'light'
                        ? 'hover:bg-gray-200'
                        : 'hover:bg-tertiary-light')
                    }
                  >
                    {item.content.map((content, i) => (
                      <td
                        key={i}
                        className="max-w-sm border-l-0 border-r-0 border-t-0 p-4 px-6 text-center  align-middle text-xs"
                      >
                        {content}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {enablePagination && (
        <div className="mt-8 flex w-full flex-col items-center justify-between gap-7 md:flex-row md:gap-0">
          <Pagination
            totalPages={totalPages}
            onChangePage={onChangePage}
            currentPage={currentPage}
          />
          <div className="w-full md:w-auto">
            <PaginationRowSelector
              onChangeRows={onChangeRow}
              rows={itemsPerPage || 30}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Table
