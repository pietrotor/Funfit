import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  StatusEnum,
  usePublicCreateOrderMutation
} from '@/graphql/graphql-types'
import { TOrder } from '@/interfaces/TData'

export const useCustomPublicCreateOrder = () => {
  const [createOrder] = usePublicCreateOrderMutation()

  const handleCreateOrder = (data: TOrder, callback: () => void) => {
    console.log(data)
    if (data) {
      createOrder({
        variables: {
          createOrderInput: {
            ...data
          }
        },
        onCompleted: result => {
          if (result.publicCreateOrder?.status === StatusEnum.OK) {
            showSuccessToast('Orden creada con éxito', 'success')
            callback()
          } else {
            showSuccessToast(
              result.publicCreateOrder?.message || 'Error al crear la orden',
              'error'
            )
          }
        },
        onError: error => {
          showSuccessToast(error.message, 'error')
        }
      })
    }
  }

  return { handleCreateOrder }
}
