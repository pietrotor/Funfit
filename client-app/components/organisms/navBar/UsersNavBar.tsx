import IconSelector from '@/components/atoms/IconSelector'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Accordion from '@/components/molecules/Accordion'
import { TSections } from '@/interfaces/Sections'
import Images from '@/components/atoms/Image/Image'
import Nav from '@/components/organisms/navBar/Nav'
import { Badge, useDisclosure } from '@nextui-org/react'
import CartModal from '@/components/atoms/modals/CartsModal'
import { useAppSelector } from '@/components/redux/hooks'
import ToastComponent from '@/components/atoms/Toast/toasts'

type TSubMenuLinkProps = {
  menu: TSections
}

const UsersNavBar: React.FC<TSubMenuLinkProps> = ({ menu }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [isNavOpen, setIsNavOpen] = useState(menu.map(sub => sub.link).includes(router.asPath))
  const cartItems = useAppSelector((state) => state.cartReducer.initialState.cartItems)

  return (
    <header className={`${isNavOpen ? 'relative h-16' : 'h-16'}`}>
      <ToastComponent/>
      <div className='fixed z-[20] bg-white w-full md:flex md:justify-between px-6 py-4 shadow-md'>
        <div className='flex justify-between items-center'>
          <span className='cursor-pointer' onClick={() => router.push('/')}>
          <Images src="/common/logo.png" alt="logo" className="w-28" />
          </span>
          <div className='flex items-center justify-between  w-20 md:hidden'>
          <span className='md:hidden' onClick={() => setIsNavOpen(!isNavOpen)}>
            <IconSelector name='menu' className='w-8 h-8' color='text-secondary' />
          </span>
          <span className='cursor-pointer' onClick={() => { onOpen() }}>
            <Badge className='text-white h-6 w-6' content={ cartItems.length } color='primary'>
              <IconSelector name='cart' width='w-10' height='h-10' color='text-primary' />
            </Badge>
          </span>
          </div>
        </div>

        <div className='flex items-center'>
          <div className='md:hidden'>
            <Accordion isOpen={isNavOpen} setIsOpen={setIsNavOpen} >
              <Nav menu={menu} />
            </Accordion>
          </div>
          <div className='hidden md:block'>
            <Nav menu={menu} />
          </div>
          <span className='cursor-pointer hidden md:block' onClick={() => { onOpen() }}>
            <Badge className='text-white h-6 w-6' content={ cartItems.length } color='primary'>
              <IconSelector name='cart' width='w-10' height='h-10' color='text-primary' />
            </Badge>
          </span>
          <CartModal
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            title='Tu Pedido' />
        </div>
      </div>
    </header>
  )
}

export default UsersNavBar
