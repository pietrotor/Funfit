export interface PaginationInterfaceProps {
    itemsPerPage?: number
    totalItems?: number
    currentPage?: number
    totalPages?: number
    onChangeRow?: (row: string) => void
    onChangePage?: (page: string) => void
  }
