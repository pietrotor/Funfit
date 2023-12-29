import React, { useEffect } from 'react'
// import { UserNavBar } from '@/components/organisms/navBar/UsersNavBar'
import { UserContainer } from '../layouts/container/UserContainer'
import { UsersFooter } from '@/components/organisms/footer/UsersFooter'
import { TSections } from '@/interfaces/Sections'
import UsersNavBar from '@/components/organisms/navBar/UsersNavBar'
// import { useAppDispatch, useAppSelector } from '@/components/redux/hooks'
// import { addToCart } from '@/components/redux/features/cartSlice'
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
  useEffect(() => {
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
