import { useEffect, useState } from 'react'
import { BillPaginationInterface } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import { StatusEnum, useGetBillsLazyQuery } from '@/graphql/graphql-types'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'

const useBills = () => {
  const [variables, setVariables] = useState<BillPaginationInterface>()
  const [filter, setFilter] = useState<string>()
  const filtroDebounced = UseDebouncedValue(filter, 500)

  const [getSales, { data, loading, refetch }] = useGetBillsLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      billPaginationInput: {
        filter: filtroDebounced,
        page: variables?.currentPage,
        rows: variables?.rows || 30,
        endDate: variables?.endDate || new Date().toISOString().split('T')[0],
        initialDate:
          variables?.initialDate ||
          new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            .toISOString()
            .split('T')[0]
      }
    },
    onCompleted: result => {
      if (result.getBills?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getBills?.message || 'Error al cargar los productos',
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
        billPaginationInput: {
          filter: variables?.filter,
          page: variables?.currentPage,
          rows: variables?.rows,
          endDate: variables?.endDate,
          initialDate: variables?.initialDate
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

export { useBills }
