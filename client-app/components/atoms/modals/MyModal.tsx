import { Modal, ModalContent } from '@nextui-org/react'
import React from 'react'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  hideCloseButton?: boolean
  isDimissable?: boolean
  radius?: 'sm' | 'md' | 'lg' | 'none' | undefined
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
  size = '2xl',
  isDimissable = true,
  radius = 'md'
}: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} radius={radius} className="w-full" hideCloseButton={hideCloseButton} size={size} isDismissable={isDimissable} >
      <ModalContent>{close => <>{children}</>}</ModalContent>
    </Modal>
  )
}
