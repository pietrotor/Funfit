import { useState } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { CreateBranchProductStockMovementInput, StatusEnum, useCreateBranchProductStockMovementMutation } from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'

export const useCreateBranchProductStockMovement = () => {
  const [variables, setVariables] = useState<PaginationInterfaceState>()

  const [createBranchStockMovement] = useCreateBranchProductStockMovementMutation()

  const handleCreateBranchStockMovement = (data: CreateBranchProductStockMovementInput) => {
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
        if (result.createBranchProductStockMovement?.status === StatusEnum.ERROR) {
          showSuccessToast(
            result.createBranchProductStockMovement.message || 'Error al registrar el movimiento de stock',
            'error'
          )
        }
        if (result.createBranchProductStockMovement?.status === StatusEnum.OK) {
          showSuccessToast('Producto creado correctamente', 'success')
        }
      }
    })
  }

  return {
    handleCreateBranchStockMovement,
    variables,
    setVariables
  }
}
