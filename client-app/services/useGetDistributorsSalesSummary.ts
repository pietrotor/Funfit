import { useEffect, useMemo, useState } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { useGetDistributorsSalesSummaryLazyQuery } from '@/graphql/graphql-types'
import { DistributorPagination } from '@/interfaces/paginationInterfaces'

function useGetDistributorsSalesSummary() {
  const [variables, setVariables] = useState<DistributorPagination>()
  const [getSummary, { data: response, loading, refetch }] =
    useGetDistributorsSalesSummaryLazyQuery({
      fetchPolicy: 'network-only',
      onError(error) {
        console.log('🚀 ~ onError ~ error:', error)
        showSuccessToast(
          'Algo salio mal, intentelo nuevamente más tarde',
          'error'
        )
      }
    })

  useEffect(() => {
    getSummary({
      variables: {
        distributorSalePaginationInput: variables || {}
      }
    })
  }, [variables, getSummary])

  const data = useMemo(() => {
    return response?.getDistributorsSalesSummary?.data
  }, [response])

  return {
    data,
    loading,
    refetch,
    setVariables,
    variables
  }
}

export { useGetDistributorsSalesSummary }
