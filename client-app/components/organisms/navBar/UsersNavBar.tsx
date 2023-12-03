import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Badge, useDisclosure } from '@nextui-org/react'

import IconSelector from '@/components/atoms/IconSelector'
import Accordion from '@/components/molecules/Accordion'
import { TSections } from '@/interfaces/Sections'
import Images from '@/components/atoms/Image/Image'
import Nav from '@/components/organisms/navBar/Nav'
import CartModal from '@/components/atoms/modals/CartsModal'
import { useAppSelector } from '@/components/redux/hooks'
import ToastComponent from '@/components/atoms/Toast/toasts'

type TSubMenuLinkProps = {
  menu: TSections
}

const UsersNavBar: React.FC<TSubMenuLinkProps> = ({ menu }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const cartItems = useAppSelector(
    state => state.cartReducer.initialState.cartItems
  )

  return (
    <header className={`${isNavOpen ? 'relative h-16' : 'h-16'}`}>
      <ToastComponent />
      <div className="fixed z-[20] w-full bg-white px-6 py-4 shadow-md md:flex md:justify-between">
        <div className="flex items-center justify-between">
          <span className="cursor-pointer" onClick={() => router.push('/')}>
            <Images src="/common/logo.png" alt="logo" className="w-28" />
          </span>
          <div className="flex w-20 items-center  justify-between md:hidden">
            <span
              className="md:hidden"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <IconSelector
                name="menu"
                className="h-8 w-8"
                color="text-secondary"
              />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => {
                onOpen()
              }}
            >
              <Badge
                className="h-6 w-6 text-white"
                content={cartItems.length}
                color="primary"
              >
                <IconSelector
                  name="cart"
                  width="w-10"
                  height="h-10"
                  color="text-primary"
                />
              </Badge>
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <div className="md:hidden">
            <Accordion isOpen={isNavOpen} setIsOpen={setIsNavOpen}>
              <Nav menu={menu} />
            </Accordion>
          </div>
          <div className="hidden md:block">
            <Nav menu={menu} />
          </div>
          <span
            className="hidden cursor-pointer md:block"
            onClick={() => {
              onOpen()
            }}
          >
            <Badge
              className="h-6 w-6 text-white"
              content={cartItems.length}
              color="primary"
            >
              <IconSelector
                name="cart"
                width="w-10"
                height="h-10"
                color="text-primary"
              />
            </Badge>
          </span>
          <CartModal
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            title="Tu Pedido"
          />
        </div>
      </div>
    </header>
  )
}

export default UsersNavBar
