import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  StatusEnum,
  useCancelSaleMutation
} from '@/graphql/graphql-types'
import { TCancelSale } from '@/interfaces/TData'

export const useCancelSaleQuery = () => {
  const [createSale, {loading}] = useCancelSaleMutation()

  const handleCreateSale = (data: TCancelSale) => {
    createSale({
      variables: {
        cancelSaleInput: {
          ...data
        }
      },
      onCompleted: result => {
        if (result.cancelSale?.status === StatusEnum.ERROR) {
          showSuccessToast(
            result.cancelSale.message || 'Error al cancelar la venta',
            'error'
          )
        }
        if (result.cancelSale?.status === StatusEnum.OK) {
          showSuccessToast(result.cancelSale.message || 'venta cancelada', 'success')
        }
      },
      onError: (error) => {
        console.log(error)
        showSuccessToast('Error al cancelar la venta', 'error')
      }
    }
    )
  }

  return { handleCreateSale, loading }
}
