import { Button } from '@nextui-org/react'

import { MyModal } from './MyModal'

type ConfirmModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  message?: string
  onConfirm: () => void
  onCancel: () => void
  confirmButtonText?: string
  cancelButtonText?: string
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  onCancel,
  confirmButtonText = 'Confirmar',
  cancelButtonText = 'Cancelar'
}: ConfirmModalProps) => {
  return (
      <MyModal isOpen={isOpen} size="lg" onClose={onClose}>
      <h1 className="mb-10 mt-10 text-center text-3xl font-bold">{title}</h1>
      <p className="text-center text-lg">{message}</p>
      <div className="flex justify-center space-x-4 my-10">
          <Button color="danger" onClick={onConfirm}>
          {confirmButtonText}
          </Button>
          <Button color="secondary" onClick={onCancel}>
          {cancelButtonText}
          </Button>
      </div>
      </MyModal>
  )
}
