import { Button, Pagination as PaginationNextUi } from '@nextui-org/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PaginationInterfaceProps } from '@/interfaces/paginationInterfaces'

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onChangePage = () => {}
}: PaginationInterfaceProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-3 md:justify-start">
        <Button
          className="hidden border-stone-200 px-2 py-1 md:block"
          isDisabled={currentPage === 1}
          onClick={() => onChangePage(currentPage - 1)}
          variant="bordered"
          color="primary"
        >
          <div className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            <p>Anterior</p>
          </div>
        </Button>
        <div className="max-w-full overflow-x-auto">
          <PaginationNextUi
            radius="md"
            size="sm"
            variant="faded"
            color="primary"
            total={totalPages || 1}
            siblings={0}
            boundaries={1}
            initialPage={1}
            page={currentPage}
            onChange={page => onChangePage(page)}
          />
        </div>
        <Button
          className="hidden border-stone-200 px-2 py-1 md:block"
          isDisabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onChangePage(currentPage + 1)}
          variant="bordered"
          color="primary"
        >
          <div className="flex items-center gap-1">
            <p>Siguiente</p>
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </div>
        </Button>
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-3 md:hidden">
        <Button
          className="border-stone-200 px-2 py-1"
          isDisabled={currentPage === 1}
          onClick={() => onChangePage(currentPage - 1)}
          variant="bordered"
          color="primary"
        >
          <div className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            <p>Anterior</p>
          </div>
        </Button>
        <Button
          className="border-stone-200 px-2 py-1"
          isDisabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onChangePage(currentPage + 1)}
          variant="bordered"
          color="primary"
        >
          <div className="flex items-center gap-1">
            <p>Siguiente</p>
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default Pagination
