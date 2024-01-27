import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { StatusEnum, useGetSaleByIdQuery } from '@/graphql/graphql-types'

const useCustomGetSaleById = (saleId:string) => {
  const { data, loading, refetch } = useGetSaleByIdQuery({
    fetchPolicy: 'network-only',
    variables: {
      getSaleByIdId: saleId
    },
    onCompleted: (result) => {
      if (result.getSaleById?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getSaleById?.message || 'Error al cargar los productos',
          'error'
        )
      }
    },
    onError: (error) => {
      setTimeout(() => {
        refetch()
      }, 15000)
      console.log(error)
    }

  })

  return {
    data,
    loading,
    refetch
  }
}

export default useCustomGetSaleById
