import { useState } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  CreateBranchProductStockMovementInput,
  StatusEnum,
  useCreateBranchProductStockMovementMutation
} from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'

export const useCreateBranchProductStockMovement = () => {
  const [variables, setVariables] = useState<PaginationInterfaceState>()

  const [createBranchStockMovement, { loading }] =
    useCreateBranchProductStockMovementMutation()

  const handleCreateBranchStockMovement = (
    data: CreateBranchProductStockMovementInput,
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    createBranchStockMovement({
      variables: {
        createBranchProductStockMovementInput: {
          branchId: data.branchId,
          branchProductId: data.branchProductId,
          date: data.date,
          qty: data.qty,
          type: data.type,
          observation: data.observation,
          stockId: data.stockId
        }
      },
      onCompleted: result => {
        if (
          result.createBranchProductStockMovement?.status === StatusEnum.ERROR
        ) {
          showSuccessToast(
            result.createBranchProductStockMovement.message ||
              'Error al registrar el movimiento de stock',
            'error'
          )
          onError?.()
        }
        if (result.createBranchProductStockMovement?.status === StatusEnum.OK) {
          showSuccessToast('Stock modificado correctamente', 'success')
          onSuccess?.()
        }
      },
      onError: error => {
        if (error) {
          showSuccessToast(
            error.message || 'Algo sucedio, intentelo nuevamente más tarde',
            'error'
          )
          onError?.()
        }
      }
    })
  }

  return {
    handleCreateBranchStockMovement,
    variables,
    setVariables,
    loading
  }
}
