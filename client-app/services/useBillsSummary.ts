import { useEffect, useState } from 'react'
import { BillPaginationInterface } from '@/interfaces/paginationInterfaces'
import { StatusEnum, useGetBillSummaryLazyQuery } from '@/graphql/graphql-types'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'

const useBillsSummary = () => {
  const [variables, setVariables] = useState<BillPaginationInterface>()

  const [getSales, { data, loading, refetch }] = useGetBillSummaryLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      billSummaryInput: {
        endDate: variables?.endDate || new Date().toISOString().split('T')[0],
        initialDate:
          variables?.initialDate ||
          new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            .toISOString()
            .split('T')[0]
      }
    },
    onCompleted: result => {
      if (result.getBillSummary?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getBillSummary?.message || 'Error al cargar los productos',
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
        billSummaryInput: {
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
    setVariables
  }
}

export { useBillsSummary }
