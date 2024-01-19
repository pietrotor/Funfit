import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  CreateSaleInput,
  StatusEnum,
  useCreateSaleMutation
} from '@/graphql/graphql-types'

export const useCreateSaleQuery = () => {
  const [createSale] = useCreateSaleMutation()

  const handleCreateSale = (data: CreateSaleInput) => {
    console.log(data)
    createSale({
      variables: {
        createSaleInput: {
          amountRecibed: data.amountRecibed,
          branchId: data.branchId,
          change: data.change + data.discount,
          client: data.client,
          date: data.date,
          discount: data.discount,
          observations: data.observations,
          products: data.products,
          paymentMethod: data.paymentMethod,
          total: data.total + data.discount
        }
      },
      onCompleted: result => {
        if (result.createSale?.status === StatusEnum.ERROR) {
          showSuccessToast(
            result.createSale.message || 'Error al registrar la venta',
            'error'
          )
        }
        if (result.createSale?.status === StatusEnum.OK) {
          showSuccessToast('Venta registrada correctamente', 'success')
        }
      }
    })
  }

  return { handleCreateSale }
}
