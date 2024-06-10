import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { StatusEnum, useGetDistributorSaleQuery } from '@/graphql/graphql-types'

const UseGetCustomDistributorSaleById = (saleId: string) => {
  const { data, loading, refetch } = useGetDistributorSaleQuery({
    fetchPolicy: 'network-only',
    variables: {
      getDistributorSaleId: saleId
    },
    onCompleted: result => {
      if (result.getDistributorSale?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getDistributorSale?.message || 'Error al cargar los productos',
          'error'
        )
      }
    },
    onError: error => {
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

export default UseGetCustomDistributorSaleById
