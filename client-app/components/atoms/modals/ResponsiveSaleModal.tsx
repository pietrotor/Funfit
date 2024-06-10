import React, { SetStateAction } from 'react'
import { MyModal } from './MyModal'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import SalesReceipt from '@/components/organisms/SalesReceipt'

interface ResponsiveSaleModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProducts: TPointOfSaleData
  setSelectedProducts: React.Dispatch<SetStateAction<TPointOfSaleData>>
}

function ResponsiveSaleModal({
  isOpen,
  onClose,
  selectedProducts,
  setSelectedProducts
}: ResponsiveSaleModalProps) {
  return (
    <MyModal
      isForm={false}
      isOpen={isOpen}
      onClose={onClose}
      title=""
      message=""
      color="secondary"
      hideSuccessButton
      hideCancelButton
      size="5xl"
    >
      <SalesReceipt
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts as any}
      />
    </MyModal>
  )
}

export default ResponsiveSaleModal
