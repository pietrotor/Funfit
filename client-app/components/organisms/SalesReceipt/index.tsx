import { Button, useDisclosure } from '@nextui-org/react'
import React, { SetStateAction } from 'react'
import Decimal from 'decimal.js'
import SelectedProductItem from '../SelectedProductItem'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import EmptySale from '@/components/atoms/EmptySale'
import SaleModal from '@/components/atoms/modals/SaleModal'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import SaleDistributorModal from '@/components/atoms/modals/SaleDistributorModal'
import { TpointOfSaleDistributor } from '@/interfaces/TData'
import { formatBs } from '@/utils/formatBs'

type SalesReceiptProps = {
  selectedProducts: TPointOfSaleData
  setSelectedProducts: React.Dispatch<SetStateAction<TPointOfSaleData>>
  refetch?: () => void
  onSaleComplete?: () => void
  isDistributorSale?: boolean
  selectedDistributors?: TpointOfSaleDistributor
}

function SalesReceipt({
  selectedProducts,
  setSelectedProducts,
  refetch,
  onSaleComplete,
  isDistributorSale,
  selectedDistributors
}: SalesReceiptProps) {
  const handleSaleModal = useDisclosure()
  const handleDistrbutorSaleModal = useDisclosure()

  const handleCancel = () => {
    setSelectedProducts({
      products: [],
      subTotal: 0,
      total: 0,
      discount: 0,
      orderId: null
    })
  }

  const handleChange = (discount: number) => {
    setSelectedProducts((state: TPointOfSaleData) => {
      if (discount > state.subTotal) return state
      return {
        ...selectedProducts,
        discount,
        total: new Decimal(selectedProducts.subTotal).minus(discount).toNumber()
      }
    })
  }

  const handleSale = () => {
    if (selectedProducts.products.length === 0) {
      showSuccessToast('No hay productos seleccionados', 'error')
    } else if (isDistributorSale) {
      handleDistrbutorSaleModal.onOpen()
    } else {
      handleSaleModal.onOpen()
    }
  }

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col bg-white">
      <div className="border-b border-secondary/30 bg-gradient-to-r from-secondary/25 to-transparent px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary-darken">
          Ticket
        </p>
        <h2 className="font-amsipro text-2xl font-bold tracking-tight text-tertiary">
          Recibo de venta
        </h2>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {selectedProducts.products.length === 0 ? (
          <EmptySale />
        ) : (
          selectedProducts.products?.map(selectedItem => (
            <SelectedProductItem
              key={selectedItem.productId}
              item={selectedItem}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          ))
        )}
      </div>

      <div className="space-y-3 border-t border-stone-200 bg-[#FFFCF6] px-4 py-4">
        <div className="space-y-2 text-sm text-stone-600">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="num font-medium text-tertiary">
              {formatBs(selectedProducts.subTotal)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Descuento</span>
            <label className="num flex items-center gap-1 font-medium text-tertiary">
              Bs
              <input
                name="discount"
                type="number"
                min={0}
                aria-label="Descuento"
                className="w-20 border-b border-secondary bg-transparent text-right outline-none focus:border-primary-600"
                onChange={e => handleChange(e.target.valueAsNumber || 0)}
                value={selectedProducts.discount}
              />
            </label>
          </div>
        </div>

        <Button
          className="h-12 w-full justify-between bg-primary-600 px-4 text-white data-[hover=true]:bg-primary-darken data-[hover=true]:opacity-100"
          onClick={handleSale}
        >
          <span className="text-base font-semibold">Finalizar venta</span>
          <span className="num text-base font-semibold">
            {formatBs(selectedProducts.total)}
          </span>
        </Button>

        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>
            {selectedProducts.products?.length || 0} productos
          </span>
          <button
            type="button"
            className="font-medium text-secondary-darken hover:underline"
            onClick={handleCancel}
          >
            Vaciar ticket
          </button>
        </div>
      </div>

      <SaleDistributorModal
        isOpen={handleDistrbutorSaleModal.isOpen}
        onClose={handleDistrbutorSaleModal.onClose}
        selectedProducts={selectedProducts as any}
        setSelectedProducts={setSelectedProducts as any}
        selectedDistributors={selectedDistributors}
        refetch={refetch}
        onSuccess={onSaleComplete}
      />
      <SaleModal
        isOpen={handleSaleModal.isOpen}
        onClose={handleSaleModal.onClose}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        refetch={refetch}
        onSuccess={onSaleComplete}
      />
    </div>
  )
}

export default SalesReceipt
