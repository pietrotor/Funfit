import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  CreateDistributorSaleInput,
  CreateSaleMutation,
  StatusEnum,
  useCreateDistributorSaleMutation
} from '@/graphql/graphql-types'

export const UseDistributorSaleQuery = () => {
  const [createSale, { loading }] = useCreateDistributorSaleMutation()

  const handleCreateSale = (
    data: CreateDistributorSaleInput,
    callback?: (result: CreateSaleMutation) => void
  ) => {
    createSale({
      variables: {
        createDistributorSaleInput: {
          ...data
        }
      },
      onCompleted: result => {
        if (result.createDistributorSale?.status === StatusEnum.ERROR) {
          showSuccessToast(
            result.createDistributorSale.message ||
              'Error al registrar la venta',
            'error'
          )
        }
        if (result.createDistributorSale?.status === StatusEnum.OK) {
          showSuccessToast('Venta registrada correctamente', 'success')
          callback?.(result)
        }
      }
    })
  }

  return { handleCreateSale, loading }
}
