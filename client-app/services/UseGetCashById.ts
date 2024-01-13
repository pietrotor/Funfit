import { useEffect } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { StatusEnum, useGetCashByIdQuery } from '@/graphql/graphql-types'

const useGetCashById = (id: string) => {
  const { data, loading, refetch } = useGetCashByIdQuery({
    fetchPolicy: 'network-only',
    variables: {
      getCashByIdId: id
    },
    onCompleted: (result) => {
      if (result.getCashById?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getCashById?.message || 'Error al cargar la caja',
          'error'
        )
      }
    }
  })

  // Use useEffect to handle changes in variables
  useEffect(() => {
    refetch()
  }, [refetch, id])

  return {
    data,
    loading,
    refetch
  }
}

export default useGetCashById
