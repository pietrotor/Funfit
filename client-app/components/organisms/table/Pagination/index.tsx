//import Selector from '@/components/common/ui/Select/Select'
import IconSelector from '@/components/atoms/IconSelector'
import { PaginationInterfaceProps } from '@/interfaces/paginationInterfaces'

const Pagination = ({
  itemsPerPage = 10,
  totalItems = 0,
  currentPage = 1,
  totalPages = 1,
  onChangeRow,
  onChangePage
}: PaginationInterfaceProps) => {
  const optionsConstructor = (idx: number, multiplicator: number = 1, plus: number = 1) => (
    { value: ((idx + plus) * multiplicator).toString(), label: ((idx + plus) * multiplicator).toString() }
  )

  const pageOptions = Array.from(Array(totalPages), (_, i) => (optionsConstructor(i, _, _)))
  const itemsPerPageOptions = Array.from(Array(10), (_, i) => (optionsConstructor(i, 10, _)))

  const onNextPage = () => {
    if (onChangePage && currentPage < totalPages) {
      onChangePage((currentPage + 1).toString())
    }
  }
  const onPreviousPage = () => {
    if (onChangePage && currentPage > 0) onChangePage((currentPage - 1).toString())
  }

  return (
    <div className="flex flex-row mt-1 gap-2 items-center">
      <p>Mostrando:</p>
      <Selector
        name='itemsPerPage'
        options={itemsPerPageOptions}
        onChange={onChangeRow}
      />
      <p>de {totalItems}</p>
      <div className='flex gap-1 items-center'>
        {currentPage > 1
          ? <div onClick={onPreviousPage} className='cursor-pointer'>
            <IconSelector name='arrow-left' />
          </div>
          : <></>}
        <Selector

          value={currentPage.toString()}
          field={currentPage.toString()}
          options={pageOptions}
          onChange={onChangePage}
        />
        {currentPage < totalPages
          ? <div onClick={onNextPage} className='cursor-pointer'>
            <IconSelector svgName='next-arrow' />
          </div>
          : <></>
        }
      </div>
    </div>
  )
}

export default Pagination
