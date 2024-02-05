import { useEffect, useMemo, useState } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  SalesSummaryInput,
  useGetSalesSummaryLazyQuery
} from '@/graphql/graphql-types'

function useGetSalesSummary() {
  const [variables, setVariables] = useState<SalesSummaryInput>()
  const [getSummary, { data: response, loading, refetch }] =
    useGetSalesSummaryLazyQuery({
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
    if (!variables?.branchIds) return
    getSummary({
      variables: {
        salesSummaryInput: variables
      }
    })
  }, [variables, getSummary])

  const data = useMemo(() => {
    return response?.getSalesSummary?.data
  }, [response])

  return {
    data,
    loading,
    refetch,
    setVariables,
    variables
  }
}

export { useGetSalesSummary }
