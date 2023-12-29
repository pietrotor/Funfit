import { useEffect } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { StatusEnum, useGetProductByIdQuery } from '@/graphql/graphql-types'

const useProductsByIdQuery = (id: string) => {
  const { data, loading, refetch } = useGetProductByIdQuery({
    fetchPolicy: 'network-only',
    variables: {
      getProductByIdId: id
    },
    onCompleted: (result) => {
      if (result.getProductById?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getProductById?.message || 'Error al cargar los productos',
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

export default useProductsByIdQuery
