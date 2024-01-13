import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Sidebar, { TMenuStructure } from './sidebar'
import ToastComponent from '@/components/atoms/Toast/toasts'
import { useGetConfigurationLazyQuery } from '@/graphql/graphql-types'
import { useAppDispatch, useAppSelector } from '@/store/index'
import { setBusiness } from '@/store/slices'
import BackButton from '@/components/atoms/BackButton/intex'

type TAdministrationLayoutProps = {
  children: React.ReactNode
  showBackButton?: boolean
}

const AdministrationLayout: React.FC<TAdministrationLayoutProps> = ({
  showBackButton = false,
  children
}) => {
  const { business } = useAppSelector(state => state.configuration)
  const dispatch = useAppDispatch()
  const [getConfiguration] = useGetConfigurationLazyQuery({
    fetchPolicy: 'cache-first',
    onCompleted(data) {
      if (!data.getConfiguration?.data) {
        getConfiguration()
        return
      }
      dispatch(setBusiness(data.getConfiguration?.data))
    },
    onError(error) {
      console.log('🚀 ~ file: index.tsx:31 ~ onError ~ error:', error)
      getConfiguration()
    }
  })
  const [sidebarOpen, setsidebarOpen] = useState(false)
  const menu: TMenuStructure = [
    {
      icon: 'home',
      text: 'Inicio',
      link: '/'
    },
    {
      icon: 'Admin',
      text: 'Administrar',
      subMenu: [
        {
          icon: 'users',
          text: 'Usuarios',
          link: '/administration-panel/users'
        },
        {
          icon: 'Box',
          text: 'Productos',
          link: '/administration-panel/products'
        },
        {
          icon: 'Bussines',
          text: 'Almacenes',
          link: '/administration-panel/warehouses'
        },
        {
          icon: 'Branch',
          text: 'Sucursales',
          link: '/administration-panel/branches'
        }
      ]
    },
    {
      icon: 'PointOfSale',
      text: 'Punto de venta',
      link: '/administration-panel/point-of-sale'
    }
  ]
  useEffect(() => {
    if (!business) getConfiguration()
  }, [])

  return (
    <>
      <Head>
        <title>Page Title</title>
      </Head>
      {business ? (
        <main
          className={` min-h-screen flex-row  transition-colors duration-200 md:flex ${
            sidebarOpen ? 'overflow-hidden bg-white' : 'bg-secondary/5 '
          }`}
        >
          <Sidebar
            user={{ name: 'pietro' }}
            menu={menu}
            isSidebarOpen={sidebarOpen}
            setSidebar={setsidebarOpen}
          />
          <div className="transition-duration-500 w-full ps-10 transition-all">
            {showBackButton && <BackButton />}
            {children}
            <ToastComponent />
          </div>
        </main>
      ) : (
        <div className="flex h-screen w-full items-center justify-center bg-neutral-300">
          <p>Loading...</p>
        </div>
      )}
    </>
  )
}

export default AdministrationLayout
