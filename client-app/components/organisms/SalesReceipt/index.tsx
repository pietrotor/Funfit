import { Button, useDisclosure } from '@nextui-org/react'
// import React, { useEffect } from 'react'
import React, { SetStateAction } from 'react'
import Decimal from 'decimal.js'
import SelectedProductItem from '../SelectedProductItem'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import EmptySale from '@/components/atoms/EmptySale'
// import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import SaleModal from '@/components/atoms/modals/SaleModal'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'

type SalesReceiptProps = {
  selectedProducts: TPointOfSaleData
  setSelectedProducts: React.Dispatch<SetStateAction<TPointOfSaleData>>
}

function SalesReceipt({
  selectedProducts,
  setSelectedProducts
}: SalesReceiptProps) {
  const handleSaleModal = useDisclosure()

  const handleCancel = () => {
    setSelectedProducts({ products: [], subTotal: 0, total: 0, discount: 0 })
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
    } else {
      handleSaleModal.onOpen()
    }
  }

  return (
    <div className="h-full">
      <div className="flex h-full w-full flex-col justify-between">
        <h3 className=" ms-6 p-4 text-left text-2xl font-bold text-gray-500">
          Recibo de venta
        </h3>
        <div className="flex h-4/5 w-full flex-col border-y-1 border-y-secondary/30 ">
          {selectedProducts.products.length === 0 ? (
            <EmptySale />
          ) : (
            selectedProducts.products.map(selectedItem => {
              return (
                <SelectedProductItem
                  key={selectedItem.productId}
                  item={selectedItem}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              )
            })
          )}
        </div>
        <div className="flex w-full flex-col space-y-3 px-4 py-2">
          <div className="flex flex-col justify-between space-y-2 text-gray-500">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className=" w-1/6 text-left">
                Bs. {selectedProducts.subTotal}
              </p>
            </div>
            <tr className="border-1 border-dashed" />
            <div className="flex justify-between">
              <p className="">Descuento</p>
              <p className="flex w-1/6">
                Bs.
                <input
                  name="discount"
                  type="number"
                  min={'0'}
                  className="transition-border ms-2 w-full border-b-2 outline-none delay-100 duration-500 focus:border-secondary"
                  onChange={e => handleChange(e.target.valueAsNumber || 0)}
                  value={selectedProducts.discount}
                />
              </p>
            </div>
          </div>

          <div className="flex w-full">
            <Button
              className="flex w-full justify-between"
              variant="solid"
              color="secondary"
              onClick={handleSale}
            >
              <p className="text-xl font-bold text-white">Finalizar venta</p>
              <span className="w-1/6 text-xl font-bold text-white">
                Bs. {selectedProducts.total}
              </span>
            </Button>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">
              Productos seleccionados: {selectedProducts.products.length}
            </p>
            <span
              className="cursor-pointer text-secondary"
              onClick={handleCancel}
            >
              Cancelar
            </span>
          </div>
        </div>
      </div>

      <SaleModal
        isOpen={handleSaleModal.isOpen}
        onClose={handleSaleModal.onClose}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </div>
  )
}

export default SalesReceipt
