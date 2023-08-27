import React from 'react'
import { UserNavBar } from '@/components/organisms/navBar/UsersNavBar'
import { UsersFooter } from '@/components/organisms/footer/UsersFooter'
import { TSections } from '@/interfaces/Sections'
import { UserContainer } from '../layouts/container/UserContainer'

export type TClientLayoutProps = {
  children: React.ReactNode;
};
function ClientLayout ({ children }: TClientLayoutProps) {
  const menu: TSections = [
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
      <UserNavBar menu={menu} />
      <UserContainer>{children}</UserContainer>
      <UsersFooter menu={menu} />
    </>
  )
}

export default ClientLayout
