import { MyModal } from './MyModal'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import SalesReceipt from '@/components/organisms/SalesReceipt'

interface ResponsiveSaleModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProducts: TPointOfSaleData
  setSelectedProducts: (products: TPointOfSaleData) => void
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
      color='secondary'
      hideSuccessButton
      hideCancelButton
      size='5xl'
    >
      <SalesReceipt
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </MyModal>
  )
}

export default ResponsiveSaleModal