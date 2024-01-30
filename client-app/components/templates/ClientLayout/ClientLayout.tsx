import React, { useEffect } from 'react'
// import { UserNavBar } from '@/components/organisms/navBar/UsersNavBar'
import { useDispatch } from 'react-redux'
import { UserContainer } from '../layouts/container/UserContainer'
import { UsersFooter } from '@/components/organisms/footer/UsersFooter'
import { TSections } from '@/interfaces/Sections'
import UsersNavBar from '@/components/organisms/navBar/UsersNavBar'
import { TCartItem, updateCart, updateLocalStorageCartDetails } from '@/store/slices'
export type TClientLayoutProps = {
  children: React.ReactNode
}
const menu: TSections = [
  {
    text: 'Inicio',
    link: '/'
  },
  {
    text: 'Contacto',
    link: '/contact'
  }
]

function ClientLayout({ children }: TClientLayoutProps) {
  const dispatch = useDispatch()
  useEffect(() => {
    const cart = localStorage.getItem('cartItems')
    const details = localStorage.getItem('cartDetails')
    if (details) {
      const detailsParsed = JSON.parse(details)
      dispatch(updateLocalStorageCartDetails(detailsParsed))
    }
    if (cart) {
      const cartParsed = JSON.parse(cart)
      cartParsed.forEach((item: TCartItem) => {
        dispatch(
          updateCart({
            id: item.id,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
            pictureUrl: item.pictureUrl
          })
        )
      })
    }
  }, [])
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="">
          <UsersNavBar menu={menu} />
        </div>
        <div className="flex-grow ">
          <UserContainer>{children}</UserContainer>
        </div>
        <div className="">
          <UsersFooter menu={menu} />
        </div>
      </div>
    </>
  )
}

export default ClientLayout
