import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  CreateBillInput,
  StatusEnum,
  useCreateBillMutation,
  useDeleteBillMutation
} from '@/graphql/graphql-types'

const useBillController = () => {
  const disclosure = useDisclosure()
  const deleteDisclosure = useDisclosure()

  const [createBill, { loading }] = useCreateBillMutation()
  const [deleteBil, { loading: loadingDelete }] = useDeleteBillMutation()

  const [selectedItem, setSelectedItem] = useState<string | null>()

  const handleDelete = (id: string) => {
    setSelectedItem(id)
    deleteDisclosure.onOpen()
  }

  const onSubmit = (data: CreateBillInput, callBack?: () => void) => {
    createBill({
      variables: {
        createBillInput: data
      },
      onCompleted(data) {
        if (data?.createBill?.status !== StatusEnum.OK) {
          return showSuccessToast(data?.createBill?.message || 'Error', 'error')
        }
        showSuccessToast(
          data?.createBill?.message || 'Se creo correctamente',
          'success'
        )
        disclosure.onClose()
        callBack?.()
      },
      onError(error) {
        console.log('🚀 ~ onError ~ error:', error)
        showSuccessToast('No se pudo crear', 'error')
        disclosure.onClose()
      }
    })
  }

  const onDelete = (callBack?: () => void) => {
    if (!selectedItem) return
    deleteBil({
      variables: {
        deleteBillId: selectedItem
      },
      onCompleted(data) {
        if (data?.deleteBill?.status !== StatusEnum.OK) {
          return showSuccessToast(data?.deleteBill?.message || 'Error', 'error')
        }
        showSuccessToast(
          data?.deleteBill?.message || 'Se elimino correctamente',
          'success'
        )
        disclosure.onClose()
        callBack?.()
      },
      onError(error) {
        console.log('🚀 ~ onError ~ error:', error)
        showSuccessToast('No se pudo eliminar', 'error')
        disclosure.onClose()
      }
    })
  }

  return {
    disclosure,
    isMutating: loading || loadingDelete,
    onSubmit,
    onDelete,
    handleDelete,
    deleteDisclosure
  }
}

export { useBillController }
