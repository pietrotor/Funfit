import { useEffect, useState } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { StatusEnum, useGetSalesPaginatedQuery } from '@/graphql/graphql-types'
import { filterPaginationInterfaceState } from '@/interfaces/paginationInterfaces'

const UseGetCustomSalesPaginated = (branchId: string) => {
  const [variables, setVariables] = useState <filterPaginationInterfaceState>()

  const { data, loading, refetch } = useGetSalesPaginatedQuery({
    fetchPolicy: 'network-only',
    variables: {
      salesPaginationInput: {
        filter: variables?.filter,
        page: variables?.currentPage,
        rows: variables?.rows,
        branchIds: [branchId],
        endDate: variables?.endDate,
        initialDate: variables?.initialDate,
        saleBy: variables?.saleBy
      }
    },
    onCompleted: (result) => {
      if (result.getSalesPaginated?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getSalesPaginated?.message || 'Error al cargar los productos',
          'error'
        )
      }
    }
  })

  // Use useEffect to handle changes in variables
  useEffect(() => {
    refetch({
      salesPaginationInput: {
        filter: variables?.filter,
        page: variables?.currentPage,
        rows: variables?.rows,
        branchIds: [branchId],
        endDate: variables?.endDate,
        initialDate: variables?.initialDate,
        saleBy: variables?.saleBy
      }
    })
  }, [variables, refetch])

  return {
    data,
    loading,
    refetch,
    variables,
    setVariables
  }
}

export default UseGetCustomSalesPaginated
