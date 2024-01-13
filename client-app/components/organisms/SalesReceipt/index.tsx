import { Button, useDisclosure } from '@nextui-org/react'
import React, { useEffect } from 'react'
import SelectedProductItem from '../SelectedProductItem'
import { TPointOfSaleProduct } from '../../../pages/administration-panel/point-of-sale'
import EmptySale from '@/components/atoms/EmptySale'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import SaleModal from '@/components/atoms/modals/SaleModal'

type SalesReceiptProps = {
  selectedProducts: TPointOfSaleProduct[]
  setSelectedProducts: (products: TPointOfSaleProduct[]) => void
  subtotal: number
  setSubtotal: (subtotal: number) => void
  total: number
  setTotal: (total: number) => void
  discount: number
  setDiscount: (discount: number) => void
}

function SalesReceipt({
  selectedProducts,
  setSelectedProducts,
  subtotal,
  setSubtotal,
  total,
  setTotal,
  discount,
  setDiscount
}: SalesReceiptProps) {
  const handleSaleModal = useDisclosure()

  useEffect(() => {
    setTotal(subtotal - discount)
  }, [subtotal, discount, selectedProducts])

  const increment = (id: number) => {
    const products = selectedProducts.map(item => {
      if (item.id === id && item.quantity < item.inventory) {
        item.quantity += 1
        setSubtotal(subtotal + item.price)
      }
      return item
    })
    setSelectedProducts(products)
  }

  const decrement = (id: number) => {
    const products = selectedProducts.map(item => {
      if (item.id === id && item.quantity > 1) {
        item.quantity -= 1
        setSubtotal(subtotal - item.price)
      }
      return item
    })
    setSelectedProducts(products)
  }

  const handleDelete = (id: number) => {
    const productToDelete = selectedProducts.find(item => item.id === id)
    if (productToDelete) {
      setSubtotal(subtotal - productToDelete?.price * productToDelete?.quantity)
    }
    const products = selectedProducts.filter(item => item.id !== id)
    setSelectedProducts(products)
    console.log(products)
  }

  const handleCancelSale = () => {
    setSelectedProducts([])
    setSubtotal(0)
    setTotal(0)
    setDiscount(0)
  }

  const handleSale = () => {
    if (selectedProducts.length === 0) {
      return showSuccessToast('No hay productos seleccionados', 'error')
    } else {
      handleSaleModal.onOpen()
    }
  }

  return (
    <>
      <div className="flex h-full w-full flex-col justify-between">
        <h3 className=" p-4 text-center text-2xl font-bold text-gray-500">
          Recibo de venta
        </h3>
        <div className="flex h-4/5 w-full flex-col border-y-1 border-y-secondary/30 ">
          {selectedProducts.length === 0 ? (
            <EmptySale />
          ) : (
            selectedProducts.map(selectedItem => {
              return (
                <SelectedProductItem
                  key={selectedItem.id}
                  item={selectedItem}
                  increment={id => increment(id)}
                  decrement={id => decrement(id)}
                  handleDelete={id => handleDelete(id)}
                />
              )
            })
          )}
        </div>
        <div className="flex w-full flex-col space-y-3 px-4 py-2">
          <div className="flex flex-col justify-between space-y-2 text-gray-500">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className=" w-1/6 text-left">Bs. {subtotal}</p>
            </div>
            <tr className="border-1 border-dashed" />
            <div className="flex justify-between">
              <p className="">Descuento</p>
              <p className="flex w-1/6">
                Bs.
                <input
                  name="discount"
                  className="transition-border ms-2 w-full border-b-2 outline-none delay-100 duration-500 focus:border-secondary"
                  onChange={e => setDiscount(parseFloat(e.target.value))}
                />
              </p>
            </div>
          </div>

          <div className="w-full ">
            <Button
              className="flex w-full justify-between"
              variant="solid"
              color="secondary"
              onClick={handleSale}
            >
              <p className="text-xl font-bold text-white">Finalizar venta</p>
              <span className="w-1/6 text-xl font-bold text-white">
                Bs. {total}
              </span>
            </Button>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">
              Productos seleccionados: {selectedProducts.length}
            </p>
            <span
              className="cursor-pointer text-secondary"
              onClick={handleCancelSale}
            >
              Cancelar
            </span>
          </div>
        </div>
      </div>

      <SaleModal
        isOpen={handleSaleModal.isOpen}
        onClose={handleSaleModal.onClose}
        total={total}
      />
    </>
  )
}

export default SalesReceipt
