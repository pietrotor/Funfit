import React, { ReactNode } from 'react'
import { Search } from 'lucide-react'

import Pagination from '../Pagination'
import TableNameHeaders from '../TableNameHeaders'
import TableLoader from '../TableLoader/intex'
import PaginationRowSelector from '../PaginationRowSelector'
import EmptyState from '@/components/molecules/EmptyState'

import { PaginationInterfaceProps } from '@/interfaces/paginationInterfaces'

const normalizeColumn = (name: string) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const isIndexColumn = (name: string) => name.trim() === '#'
const isImageColumn = (name: string) => normalizeColumn(name) === 'imagen'
const isActionColumn = (name: string) =>
  /accion|detalle/.test(normalizeColumn(name))
const isPrimaryColumn = (name: string) =>
  /nombre|producto|usuario|titulo|proveedor|por concepto/.test(
    normalizeColumn(name)
  )

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
  onSearch,
  totalItems
}: TableProps) => {
  const color = 'light'
  const indexedTitles = titles.map((title, index) => ({ title, index }))
  const imageColumn = indexedTitles.find(column =>
    isImageColumn(column.title.name)
  )
  const dataColumns = indexedTitles.filter(
    column =>
      !isIndexColumn(column.title.name) && !isImageColumn(column.title.name)
  )
  const primaryColumn =
    dataColumns
      .slice(0, 2)
      .find(column => isPrimaryColumn(column.title.name)) || dataColumns[0]
  const detailColumns = dataColumns.filter(
    column => column.index !== primaryColumn?.index
  )
  const recordCount =
    typeof totalItems === 'number' ? totalItems : items.length || 0

  return (
    <>
      <div className="relative mb-3 flex w-full min-w-0 flex-col break-words overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_1px_3px_rgba(28,25,23,0.04)]">
        {tableName && (
          <div className="border-b border-stone-100 px-4 py-3 md:px-5">
            <div className="flex max-w-full flex-1 flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <h3 className="font-amsipro text-base font-semibold tracking-tight text-tertiary md:text-lg">
                  {tableName}
                </h3>
                <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600">
                  {recordCount} registros
                </span>
              </div>
              {onSearch && (
                <label className="flex w-full items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 md:max-w-[260px]">
                  <Search
                    className="h-4 w-4 shrink-0 text-stone-400"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <input
                    placeholder="Buscar..."
                    onChange={event => onSearch(event.target.value)}
                    className="w-full appearance-none border-none bg-transparent text-sm text-tertiary outline-none placeholder:text-stone-400"
                  />
                </label>
              )}
            </div>
          </div>
        )}

        {/* Mobile cards */}
        <div className="flex flex-col gap-3 p-3 md:hidden">
          {isLoading && (
            <p className="py-6 text-center text-sm text-stone-500">
              Cargando registros...
            </p>
          )}
          {!isLoading && items.length === 0 && (
            <EmptyState title="Sin registros" />
          )}
          {!isLoading &&
            items.map((item, index) => (
              <article
                key={index}
                className="rounded-xl border border-stone-100 bg-stone-50/60 p-3"
              >
                {primaryColumn && (
                  <div className="flex items-start gap-3">
                    {imageColumn && (
                      <div className="shrink-0">
                        {item.content[imageColumn.index]}
                      </div>
                    )}
                    <div className="min-w-0 flex-1 text-left">
                      {item.content[primaryColumn.index]}
                    </div>
                  </div>
                )}
                <dl className="mt-3 space-y-3">
                  {detailColumns
                    .filter(column => !isActionColumn(column.title.name))
                    .map(column => (
                      <div key={column.index} className="text-left text-sm">
                        <dt className="text-xs font-medium tracking-wide text-stone-400">
                          {column.title.name}
                        </dt>
                        <dd className="mt-1 w-full min-w-0 break-words text-left text-stone-800 [&>*]:!w-full [&>*]:!max-w-full [&>*]:whitespace-normal [&>*]:break-words [&>*]:text-left">
                          {item.content[column.index]}
                        </dd>
                      </div>
                    ))}
                </dl>
                {detailColumns
                  .filter(column => isActionColumn(column.title.name))
                  .map(column => (
                    <div
                      key={column.index}
                      className="mt-3 flex flex-wrap items-center gap-2 border-t border-stone-200 pt-3"
                    >
                      {item.content[column.index]}
                    </div>
                  ))}
              </article>
            ))}
        </div>

        {/* Desktop table */}
        <div className="hidden w-full overflow-x-auto md:block">
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
                <TableLoader columns={titles.length || loadingLoadingColumns} />
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={titles.length}>
                    <EmptyState title="Sin registros" />
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-stone-100 transition-colors last:border-0 hover:bg-stone-50"
                  >
                    {item.content.map((content, i) => (
                      <td
                        key={i}
                        className="max-w-sm border-0 px-4 py-3 text-left align-middle text-sm text-tertiary"
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
        <div className="mt-6 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
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
