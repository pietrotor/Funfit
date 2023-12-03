import React, { ReactNode } from 'react'

import TableLoader from '../TableLoader'
import TableNameHeaders from '../TableNameHeaders'
import { PaginationInterfaceProps } from '@/interfaces/paginationInterfaces'

interface TableProps extends PaginationInterfaceProps {
    tableName?: string;
    color?: 'light' | 'dark';
    titles: {
        name: string | React.ReactNode;
        onUpClick?: () => void;
        onDownClick?: () => void;
    }[];
    items: {
        content: ReactNode[];
    }[];
    isLoading?: boolean;
    loadingLoadingColumns?: number;
    enablePagination?: boolean;
    isInput?: String;
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
          'relative flex flex-col border-none min-w-0 break-words w-full mb-3  rounded-xl ' +
          (color === 'light' ? 'bg-white' : 'text-white')
        }
      >
            {
              tableName && (
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow twflex-1">
                        <h3
                          className={
                            'font-bold text-lg flex  ' +
                            (color === 'light' ? 'text-primary-light' : 'text-white')
                          }
                        >
                          {tableName}  {totalItems ? <p className='text-slate-900 ms-5 text-small flex items-center bg-indigo-600/20 rounded-2xl px-2 font-bold '>{totalItems} usuarios</p> : ''}
                        </h3>
                      </div>
                  </div>
                </div>
              )
            }
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-gray-500/10 border-collapse">
            <thead>
              <tr className='bg-primary text-white'>
                {
                    titles.map((title, index) => (
                        <TableNameHeaders
                            key={index}
                            title={title.name}
                            color={color}
                            onUpClick={title.onUpClick}
                            onDownClick={title.onDownClick}
                        />
                    ))
                }
              </tr>
            </thead>
            <tbody>
              {
                isLoading
                  ? <TableLoader columns={titles.length} />
                  : (
                      items.map((item, index) => (
                        <tr key={index} className={'transition-all ' + (color === 'light' ? 'hover:bg-gray-200' : 'hover:bg-tertiary-light')}>
                            {
                                item.content.map((content, i) => (
                                   <td key={i} className="px-6 py-4 whitespace-nowrap">
                                        {content}
                                    </td>
                                ))
                            }
                        </tr>
                      ))
                    )
              }
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
