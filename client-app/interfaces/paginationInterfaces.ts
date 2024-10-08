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
  rows?: number
  filter?: string
  currentPage?: number
  totalRecords?: number
}
export interface filterPaginationInterfaceState
  extends PaginationInterfaceState {
  branchIds?: string[]
  endDate?: string
  initialDate?: string
  saleBy?: string
  productId?: string
}
export interface DistributorPagination extends PaginationInterfaceState {
  distributorsIds?: string[]
  endDate?: string
  initialDate?: string
  saleBy?: string
}
export interface BillPaginationInterface extends PaginationInterfaceState {
  endDate?: string
  initialDate?: string
}
