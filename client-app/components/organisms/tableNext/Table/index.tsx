import React, { ReactNode } from 'react'

import Pagination from '../Pagination'
import TableNameHeaders from '../TableNameHeaders'
import TableLoader from '../TableLoader/intex'
import PaginationRowSelector from '../PaginationRowSelector'

import { PaginationInterfaceProps } from '@/interfaces/paginationInterfaces'

interface TableProps extends PaginationInterfaceProps {
  tableName?: string;
  titles: {
      name: string;
      onUpClick?: () => void;
      onDownClick?: () => void;
  }[];
  items: {
      content: ReactNode[];
  }[];
  isLoading?: boolean;
  loadingLoadingColumns?: number;
  enablePagination?: boolean;
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
        'relative flex flex-col border-none min-w-0 break-words w-full mb-3 shadow-lg rounded-xl bg-white' +
        (color === 'light' ? '' : 'bg-primary-darken text-white')
      }
    >
      {tableName && (
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center justify-between px-4 max-w-full flex-grow flex-1">
            <h3
              className={
                'font-bold text-lg ' +
                (color === 'light' ? 'text-primary-light' : 'text-white')
              }
            >
              {tableName}
            </h3>
            {onSearch &&
            <div className="w-full md:max-w-[250px] xl:max-w-[300px] border-2 p-2 px-4 rounded-xl text-sm flex gap-2 items-end bg-gray-100 transition-all duration-300">
              <input placeholder='Buscar...' onChange={(event) => onSearch(event.target.value)} className='appearance-none w-full outline-none border-none bg-transparent'/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>}
          </div>
        </div>
      )}
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
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
            {
              isLoading
                ? <TableLoader columns={titles.length} />
                : (items.map((item, index) => (
                    <tr key={index} className={'transition-all ' + (color === 'light' ? 'hover:bg-gray-200' : 'hover:bg-tertiary-light')}>
                      {
                        item.content.map((content, i) => (
                          <td key={i} className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  p-4 max-w-sm">
                            {content}
                          </td>
                        ))
                      }
                    </tr>
                  )))
            }
          </tbody>
        </table>
      </div>
    </div>
      {
        enablePagination && (
        <div className='w-full flex flex-col gap-7 md:gap-0 items-center md:flex-row justify-between mt-8'>
          <Pagination totalPages={totalPages} onChangePage={onChangePage} currentPage={currentPage}/>
          <div className='w-full md:w-auto'>
            <PaginationRowSelector onChangeRows={onChangeRow} rows={itemsPerPage || 30}/>
          </div>
        </div>
        )
      }
    </>
  )
}

export default Table
