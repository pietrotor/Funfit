import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  CreateSaleInput,
  StatusEnum,
  useCreateSaleMutation
} from '@/graphql/graphql-types'
import { on } from 'events'

export const useCreateSaleQuery = () => {
  const [createSale] = useCreateSaleMutation()

  const handleCreateSale = (data: CreateSaleInput) => {
    createSale({
      variables: {
        createSaleInput: {
          ...data
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
    }
    )
  }

  return { handleCreateSale }
}
