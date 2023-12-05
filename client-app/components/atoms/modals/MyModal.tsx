import { Modal, ModalContent } from '@nextui-org/react'
import React from 'react'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  hideCloseButton?: boolean
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | 'full'
}

export const MyModal = ({
  isOpen,
  onClose,
  children,
  hideCloseButton = true,
  size = '2xl'
}: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full" hideCloseButton={hideCloseButton} size={size} >
      <ModalContent>{close => <>{children}</>}</ModalContent>
    </Modal>
  )
}
