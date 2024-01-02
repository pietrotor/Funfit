import { useState } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { StatusEnum, useGetWarehouseStockQuery } from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

const useCustomGetWarehousesQuery = () => {
  const [variables, setVariables] = useState <PaginationInterfaceState>()
  const [filter, setFilter] = useState <string>()
  const filtroDebounced = UseDebouncedValue(filter, 2000)

  const { data, loading, refetch } = useGetWarehouseStockQuery({
    fetchPolicy: 'network-only',
    variables: {
      warehouseStockPaginationInput: {
        warehouses: [],
        filter: filtroDebounced,
        page: variables?.currentPage || 1,
        rows: 5
      }
    },
    onCompleted: (result) => {
      setVariables({
        totalPages: result.getWarehouseStock?.totalPages || 1,
        rows: result.getWarehouseStock?.rows || 5,
        filter: filtroDebounced,
        currentPage: result.getWarehouseStock?.currentPage || 1,
        totalRecords: result.getWarehouseStock?.totalRecords || 1
      })
      if (result.getWarehouseStock?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getWarehouseStock?.message || 'Error al cargar los productos',
          'error'
        )
      }
    }
  })

  return {
    data,
    loading,
    refetch,
    variables,
    setVariables,
    setFilter
  }
}

export default useCustomGetWarehousesQuery