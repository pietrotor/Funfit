import { useState } from 'react'
import PointOfSaleCard from '@/components/molecules/Card/PointOfSaleCard'
import Search from '@/components/molecules/Search'
import AdministrationLayout from '@/components/templates/layouts'
import SalesReceipt from '@/components/organisms/SalesReceipt'

export type TPointOfSaleProduct = {
  id: number
  name: string
  description: string
  price: number
  image?: string
  quantity: number
  inventory: number
}
function PointOfSale() {
  const [selectedProducts, setSelectedProducts] = useState<
    TPointOfSaleProduct[]
  >([])
  const [subtotal, setSubtotal] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const data: TPointOfSaleProduct[] = [
    {
      id: 1,
      name: 'Chocolate cake',
      description: 'Torta de chocolate y naranja',
      price: 55,
      image:
        'https://assets.elgourmet.com/wp-content/uploads/2023/03/torta_gqNKZT20I8boDjLiyUWpaPGJr7kYH4-1024x683.png.webp',
      inventory: 5,
      quantity: 1
    },
    {
      id: 2,
      name: 'Lava cake',
      description: 'Torta de chocolate y naranja',
      price: 55,
      image:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dessert-main-image-molten-cake-0fbd4f2.jpg?resize=768,574',
      inventory: 50,
      quantity: 1
    },
    {
      id: 3,
      name: 'Lemon cake',
      description: 'Torta de chocolate y naranja',
      price: 55,
      image:
        'https://img.buzzfeed.com/buzzfeed-static/static/2014-02/enhanced/webdr02/12/16/enhanced-15625-1392240816-19.jpg?downsize=900:*&output-format=auto&output-quality=auto',
      inventory: 100,
      quantity: 1
    }
  ]

  const handleSelected = (id: number) => {
    const existingProduct = selectedProducts.find(item => item.id === id)

    if (existingProduct) {
      setSelectedProducts(prevProducts =>
        prevProducts.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
      setSubtotal(prevSubtotal => prevSubtotal + existingProduct.price)
    } else {
      const productToAdd = data.find(item => item.id === id)
      if (productToAdd) {
        setSelectedProducts(prevProducts => [
          ...prevProducts,
          { ...productToAdd, quantity: 1 }
        ])
        setSubtotal(prevSubtotal => prevSubtotal + productToAdd.price)
      }
    }
  }

  return (
    <AdministrationLayout>
      <section className="flex h-full w-full">
        <div className="w-2/3 border-1 border-secondary/30 bg-secondary/10 p-4">
          <div className="flex w-full">
            <Search onChange={() => {}} />
          </div>
          <div className="grid grid-cols-3 gap-4 p-4">
            {data.map(item => (
                <PointOfSaleCard
                  key={item.id}
                  product={item}
                  handleSelected={() => handleSelected(item.id)}
                />
            ))}
          </div>
        </div>
        <div className="h-full w-1/3">
          <SalesReceipt
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            subtotal={subtotal}
            setSubtotal={setSubtotal}
            total={total}
            setTotal={setTotal}
            discount={discount}
            setDiscount={setDiscount}
          />
        </div>
      </section>
    </AdministrationLayout>
  )
}

export default PointOfSale
