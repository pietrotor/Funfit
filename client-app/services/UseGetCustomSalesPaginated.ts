import { useEffect, useState } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  StatusEnum,
  useGetSalesPaginatedLazyQuery
} from '@/graphql/graphql-types'
import { filterPaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

const UseGetCustomSalesPaginated = (branchId: string) => {
  const [variables, setVariables] = useState<filterPaginationInterfaceState>()
  const [filter, setFilter] = useState<string>()
  const filtroDebounced = UseDebouncedValue(filter, 500)

  const [getSales, { data, loading, refetch }] = useGetSalesPaginatedLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      salesPaginationInput: {
        filter: filtroDebounced,
        page: variables?.currentPage,
        rows: variables?.rows || 30,
        branchIds: [branchId],
        endDate: variables?.endDate || new Date().toISOString().split('T')[0],
        initialDate:
          variables?.initialDate ||
          new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            .toISOString()
            .split('T')[0],
        saleBy: variables?.saleBy,
        productId: variables?.productId,
        initialHour: variables?.initialHour || null,
        endHour: variables?.endHour || null
      }
    },
    onCompleted: result => {
      if (result.getSalesPaginated?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getSalesPaginated?.message || 'Error al cargar los productos',
          'error'
        )
      }
    },
    onError(error) {
      console.log('🚀 ~ onError ~ error:', error)
    }
  })

  // Use useEffect to handle changes in variables
  useEffect(() => {
    // The branch travels inside the variables: when it changes the query runs
    // again even if the rest of the filters stay the same.
    const branchIds = variables?.branchIds
    if (!branchIds?.[0]) return
    getSales({
      variables: {
        salesPaginationInput: {
          filter: filtroDebounced,
          page: variables?.currentPage,
          rows: variables?.rows,
          branchIds,
          endDate: variables?.endDate,
          initialDate: variables?.initialDate,
          saleBy: variables?.saleBy,
          productId: variables?.productId,
          initialHour: variables?.initialHour || null,
          endHour: variables?.endHour || null
        }
      }
    })
  }, [variables, branchId, filtroDebounced, getSales])

  return {
    data,
    loading,
    refetch,
    variables,
    setVariables,
    setFilter
  }
}

export default UseGetCustomSalesPaginated
