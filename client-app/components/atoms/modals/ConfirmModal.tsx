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
      <div className='m-4 space-y-5'>
        <h1 className="mb-10 mt-10 text-center text-3xl font-bold text-gray-500">
          {title}
        </h1>
        <p className="px-6 text-center text-lg text-gray-500">{message}</p>
        <div className="grid h-12 w-full grid-cols-2 gap-3 ">
          <Button color="secondary" className="h-full text-lg font-bold" onClick={onConfirm}>
            {confirmButtonText}
          </Button>
          <Button variant="flat" color="danger" className="h-full text-lg font-bold" onClick={onCancel}>
            {cancelButtonText}
          </Button>
        </div>
      </div>
    </MyModal>
  )
}
