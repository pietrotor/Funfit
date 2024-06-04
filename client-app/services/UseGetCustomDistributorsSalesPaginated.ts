import { useEffect, useState } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  StatusEnum,
  useGetDistributorSalesPaginatedLazyQuery
} from '@/graphql/graphql-types'
import { DistributorPagination } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

const UseGetCustomDistributorsSalesPaginated = () => {
  const [variables, setVariables] = useState<DistributorPagination>()
  console.log(
    '🚀 ~ UseGetCustomDistributorsSalesPaginated ~ variables:',
    variables
  )
  const [filter, setFilter] = useState<string>()
  const filtroDebounced = UseDebouncedValue(filter, 500)

  const [getSales, { data, loading, refetch }] =
    useGetDistributorSalesPaginatedLazyQuery({
      fetchPolicy: 'network-only',
      variables: {
        distributorSalePaginationInput: {
          filter: filtroDebounced,
          page: variables?.currentPage,
          rows: variables?.rows || 30,
          distributorsIds: variables?.distributorsIds || [],
          endDate: variables?.endDate || new Date().toISOString().split('T')[0],
          initialDate:
            variables?.initialDate ||
            new Date(new Date().getFullYear(), new Date().getMonth(), 1)
              .toISOString()
              .split('T')[0],
          saleBy: variables?.saleBy
        }
      },
      onCompleted: result => {
        if (result.getDistributorSalesPaginated?.status === StatusEnum.ERROR) {
          showSuccessToast(
            result.getDistributorSalesPaginated?.message ||
              'Error al cargar los productos',
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
    getSales({
      variables: {
        distributorSalePaginationInput: {
          filter: variables?.filter,
          page: variables?.currentPage,
          rows: variables?.rows,
          distributorsIds: variables?.distributorsIds || [],
          initialDate: variables?.initialDate,
          endDate: variables?.endDate,
          saleBy: variables?.saleBy
        }
      }
    })
  }, [variables, getSales])

  return {
    data,
    loading,
    refetch,
    variables,
    setVariables,
    setFilter
  }
}

export { UseGetCustomDistributorsSalesPaginated }
