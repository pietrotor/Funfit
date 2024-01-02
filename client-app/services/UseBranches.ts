import { useState } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { StatusEnum, useGetWarehousesQuery } from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

const useCustomGetWarehousesQuery = () => {
  const [variables, setVariables] = useState <PaginationInterfaceState>()
  const [filter, setFilter] = useState <string>()
  const filtroDebounced = UseDebouncedValue(filter, 2000)

  const { data, loading, refetch } = useGetWarehousesQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {
        filter: filtroDebounced,
        page: variables?.currentPage || 1,
        rows: 5
      }
    },
    onCompleted: (result) => {
      setVariables({
        totalPages: result.getWarehouses?.totalPages || 1,
        rows: result.getWarehouses?.rows || 5,
        filter: filtroDebounced,
        currentPage: result.getWarehouses?.currentPage || 1,
        totalRecords: result.getWarehouses?.totalRecords || 1
      })
      if (result.getWarehouses?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getWarehouses?.message || 'Error al cargar los productos',
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
