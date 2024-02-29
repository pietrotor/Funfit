import { Button, useDisclosure } from '@nextui-org/react'
// import React, { useEffect } from 'react'
import SelectedProductItem from '../SelectedProductItem'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import EmptySale from '@/components/atoms/EmptySale'
// import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import SaleModal from '@/components/atoms/modals/SaleModal'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
type SalesReceiptProps = {
  selectedProducts: TPointOfSaleData
  setSelectedProducts: (products: TPointOfSaleData) => void
}

function SalesReceipt({
  selectedProducts,
  setSelectedProducts
}: SalesReceiptProps) {
  const handleSaleModal = useDisclosure()

  const handleCancel = () => {
    setSelectedProducts({ products: [], subTotal: 0, total: 0, discount: 0 })
  }

  const sale: TPointOfSaleData = {
    products: [
      {
        id: '1',
        price: 100,
        branchId: '1',
        productId: '1',
        isVisibleOnMenu: true,
        isVisibleOnWeb: true,
        quantity: 1,
        product: {
          id: '1',
          name: 'Producto 1'
        },
        stock: 1,
        total: 200
      },
      {
        id: '2',
        price: 200,
        branchId: '1',
        productId: '2',
        isVisibleOnMenu: true,
        isVisibleOnWeb: true,
        quantity: 1,
        product: {
          id: '2',
          name: 'Producto 2'
        },
        stock: 1,
        total: 200
      }
    ],
    subTotal: 400,
    total: 300,
    discount: 100
  }

  const handleChange = (discount: string) => {
    setSelectedProducts({
      ...selectedProducts,
      discount: Number(discount),
      total: selectedProducts.subTotal - Number(discount)
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
        <h3 className=" p-2 text-center text-2xl font-bold text-gray-500 md:ms-6 md:p-4 md:text-left">
          Recibo de venta
        </h3>
        <div className="flex h-4/5 w-full flex-col border-y-1 border-y-secondary/30 ">
          {selectedProducts.products?.length === 0 ? (
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
                  className="transition-border md:text-md ms-2 w-full border-b-2 text-sm outline-none delay-100 duration-500 focus:border-secondary"
                  onChange={e => handleChange(e.target.value)}
                  value={selectedProducts.discount}
                />
              </p>
            </div>
          </div>

          <div className="flex w-full space-x-2">
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
                setSelectedProducts(sale)
              }}
              className="md:text-md text-sm border-1 border-secondary bg-gray-200"
            >
              Generar venta
            </Button>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500 md:text-md text-sm">
              Productos seleccionados: {selectedProducts.products?.length}
            </p>
            <span
              className="cursor-pointer text-secondary md:text-md text-sm"
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
