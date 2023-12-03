import React, { ReactNode } from 'react'

import TableLoader from '../TableLoader'
import TableNameHeaders from '../TableNameHeaders'
import { PaginationInterfaceProps } from '@/interfaces/paginationInterfaces'

interface TableProps extends PaginationInterfaceProps {
  tableName?: string
  color?: 'light' | 'dark'
  titles: {
    name: string | React.ReactNode
    onUpClick?: () => void
    onDownClick?: () => void
  }[]
  items: {
    content: ReactNode[]
  }[]
  isLoading?: boolean
  loadingLoadingColumns?: number
  enablePagination?: boolean
  isInput?: String
}
const Table = ({
  color = 'light',
  tableName,
  titles,
  items,
  isLoading = false,
  loadingLoadingColumns = 5,
  totalItems,
  itemsPerPage,
  currentPage,
  totalPages,
  onChangeRow,
  onChangePage,
  enablePagination = true,
  isInput
}: TableProps) => {
  return (
    <>
      <div
        className={
          'relative mb-3 flex w-full min-w-0 flex-col break-words rounded-xl  border-none ' +
          (color === 'light' ? 'bg-white' : 'text-white')
        }
      >
        {tableName && (
          <div className="mb-0 rounded-t border-0 px-4 py-3">
            <div className="flex flex-wrap items-center">
              <div className="twflex-1 relative w-full max-w-full flex-grow px-4">
                <h3
                  className={
                    'flex text-lg font-bold  ' +
                    (color === 'light' ? 'text-primary-light' : 'text-white')
                  }
                >
                  {tableName}{' '}
                  {totalItems ? (
                    <p className="ms-5 flex items-center rounded-2xl bg-indigo-600/20 px-2 text-small font-bold text-slate-900 ">
                      {totalItems} usuarios
                    </p>
                  ) : (
                    ''
                  )}
                </h3>
              </div>
            </div>
          </div>
        )}
        <div className="block w-full overflow-x-auto">
          <table className="w-full border-collapse items-center bg-gray-500/10">
            <thead>
              <tr className="bg-primary text-white">
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
                      <td key={i} className="whitespace-nowrap px-6 py-4">
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
      {/*
        *enablePagination && (
          <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={onChangePage}
          onChangeRow={onChangeRow}
        />
        )
        */}
    </>
  )
}

export default Table
