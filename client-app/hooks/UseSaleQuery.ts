import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  CreateSaleInput,
  CreateSaleMutation,
  StatusEnum,
  useCreateSaleMutation
} from '@/graphql/graphql-types'

export const useCreateSaleQuery = () => {
  const [createSale, { loading }] = useCreateSaleMutation()

  const handleCreateSale = (
    data: CreateSaleInput,
    callback?: (result: CreateSaleMutation) => void
  ) => {
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
          callback?.(result)
        }
      }
    })
  }

  return { handleCreateSale, loading }
}
