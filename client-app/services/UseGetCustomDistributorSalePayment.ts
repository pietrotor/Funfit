import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  StatusEnum,
  useGetDistributorSalePaymentsQuery
} from '@/graphql/graphql-types'

const UseGetCustomDistributorSalePayment = (saleId: string) => {
  const { data, loading, refetch } = useGetDistributorSalePaymentsQuery({
    fetchPolicy: 'network-only',
    variables: {
      distibutorSaleId: saleId
    },
    onCompleted: result => {
      if (result.getDistributorSalePayments?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getDistributorSalePayments?.message ||
            'Error al cargar los productos',
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

export { UseGetCustomDistributorSalePayment }
