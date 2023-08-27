import React from 'react'
import { NavBar } from './navBar/UsersNavBar'
import { UsersFooter } from './footer/UsersFooter'
import { TNavBarStructure } from '@/components/layouts/navBar/UsersNavBar'
import { UserContainer } from './container/UserContainer'

export type TClientLayoutProps = {
  children: React.ReactNode;
};
function ClientLayout ({ children }: TClientLayoutProps) {
  const menu: TNavBarStructure = [
    {
      text: 'Inicio',
      link: '/'
    },
    {
      text: 'Contacto',
      link: '/'
    }
  ]
  return (
    <>
      <NavBar menu={menu} />
      <UserContainer>{children}</UserContainer>
      <UsersFooter />
    </>
  )
}

export default ClientLayout
