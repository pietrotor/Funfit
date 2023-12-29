export interface PaginationInterfaceProps {
  itemsPerPage?: number
  totalItems?: number
  currentPage?: number
  totalPages?: number
  onChangeRow?: (row: number) => void
  onChangePage?: (page: number) => void
}
export interface PaginationInterfaceState {
  totalPages?: number
  rows? : number
  filter?: string
  currentPage?: number
  totalRecords?: number
}
