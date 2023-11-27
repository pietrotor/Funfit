import React from 'react'
// import { UserNavBar } from '@/components/organisms/navBar/UsersNavBar'
import { UsersFooter } from '@/components/organisms/footer/UsersFooter'
import { TSections } from '@/interfaces/Sections'
import { UserContainer } from '../layouts/container/UserContainer'
import UsersNavBar from '@/components/organisms/navBar/UsersNavBar'
export type TClientLayoutProps = {
  children: React.ReactNode;
};
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

function ClientLayout ({ children }: TClientLayoutProps) {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <div className=''>
        <UsersNavBar menu={menu} />
        </div>
        <div className='flex-grow '>
        <UserContainer>
        {children}
      </UserContainer>
        </div>
        <div className=''>
        <UsersFooter menu={menu} />
        </div>
      </div>

    </>
  )
}

export default ClientLayout
