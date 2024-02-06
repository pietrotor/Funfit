import SalesReceipt from '@/components/organisms/SalesReceipt'
import { MyModal } from './MyModal'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'

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
      hideCloseButton={false}
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
