import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Badge, useDisclosure } from '@nextui-org/react'

import clsx from 'clsx'
import { throttle } from 'lodash'
import IconSelector from '@/components/atoms/IconSelector'
import Accordion from '@/components/molecules/Accordion'
import { TSections } from '@/interfaces/Sections'
import Images from '@/components/atoms/Image/Image'
import Nav from '@/components/organisms/navBar/Nav'
import CartModal from '@/components/atoms/modals/CartsModal'
import { useAppSelector } from '@/store/index'
import { useGetPublicCategoriesQuery } from '@/graphql/graphql-types'
import { getCategoryName } from '@/helpers/clean-category-name'
import { sortObjectsByKey } from '@/helpers/sort.helper'

type TSubMenuLinkProps = {
  menu: TSections
  hideCategories: boolean
}

const UsersNavBar: React.FC<TSubMenuLinkProps> = ({ menu, hideCategories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const cartItems = useAppSelector(state => state.cartReducer.cartItems)
  const { data } = useGetPublicCategoriesQuery({
    fetchPolicy: 'cache-first'
  })

  const categories = useMemo(
    () => sortObjectsByKey(data?.getPublicCategories?.data || [], 'name'),
    [data?.getPublicCategories?.data]
  )

  const [activeSection, setActiveSection] = useState<string>('')
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleIntersect = throttle((entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    })

    observer.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.01, // Adjust the threshold as needed
      rootMargin: '0px 0px -50% 0px' // Adjust the root margin as needed
    })

    categories.forEach(category => {
      const element = document.getElementById(category.id)
      if (element && observer.current) {
        observer.current.observe(element)
      }
    })

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [categories])

  return (
    <header className={`${isNavOpen ? 'relative h-16' : 'h-16'} relative`}>
      <div className="fixed z-[20] w-full">
        <div className="w-full bg-white px-6 py-1 shadow-md md:flex md:justify-between">
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
        {!hideCategories && (
          <div className="w-full max-w-[100vw] overflow-x-auto bg-secondary">
            <div className="ml-0 mr-auto flex w-full flex-nowrap justify-start px-2 text-white md:justify-center">
              {categories.map(category => (
                <a
                  href={`/#${category.id}`}
                  key={category.id}
                  className={clsx(
                    'min-w-fit appearance-none whitespace-nowrap border-b-5 border-transparent px-4 py-2 font-amatemora text-xl font-bold uppercase outline-none transition-all duration-250 hover:bg-black/10 md:px-5 xl:px-8',
                    activeSection === category.id && '!border-primary'
                  )}
                >
                  {getCategoryName(category.name)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default UsersNavBar
