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
  refetch?: () => void
}

function SalesReceipt({
  selectedProducts,
  setSelectedProducts,
  refetch
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
    <div className="top-0 h-full md:sticky md:max-h-screen">
      <div className="flex h-full w-full flex-col justify-between">
        <h3 className=" ms-6 p-4 text-left text-2xl font-bold text-gray-500">
          Recibo de venta
        </h3>
        <div className="max-h-4/5 flex h-4/5 w-full flex-col overflow-y-auto border-y-1 border-y-secondary/30">
          {selectedProducts.products.length === 0 ? (
            <EmptySale />
          ) : (
            selectedProducts.products?.map(selectedItem => {
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
              <p className="md:text-md text-sm">Subtotal</p>
              <p className=" md:text-md w-1/6 text-left text-sm">
                Bs. {selectedProducts.subTotal}
              </p>
            </div>
            <tr className="border-1 border-dashed" />
            <div className="flex justify-between">
              <p className="md:text-md text-sm">Descuento</p>
              <p className="md:text-md flex w-1/6 text-sm">
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
              className="flex w-full justify-between "
              variant="solid"
              color="secondary"
              onClick={handleSale}
            >
              <p className="text-md font-bold text-white md:text-xl">
                Finalizar venta
              </p>
              <span className="w-1/6 text-sm font-bold text-white md:text-xl">
                Bs. {selectedProducts.total}
              </span>
            </Button>
            <Button
              onClick={() => {
                console.log('1')
              }}
              className="md:text-md border-1 border-secondary bg-gray-200 text-sm"
            >
              Generar venta
            </Button>
          </div>
          <div className="flex justify-between">
            <p className="md:text-md text-sm text-gray-500">
              Productos seleccionados: {selectedProducts.products?.length}
            </p>
            <span
              className="md:text-md cursor-pointer text-sm text-secondary"
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
        refetch={refetch}
      />
    </div>
  )
}

export default SalesReceipt
