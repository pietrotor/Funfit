import Head from 'next/head'
import React, { useState } from 'react'
import Sidebar, { TMenuStructure } from './sidebar'
import ToastComponent from '@/components/atoms/Toast/toasts'

type TAdministrationLayoutProps = {
  children: React.ReactNode
}

const AdministrationLayout: React.FC<TAdministrationLayoutProps> = ({
  children
}) => {
  const [sidebarOpen, setsidebarOpen] = useState(false)
  const menu: TMenuStructure = [
    {
      icon: 'home',
      text: 'Inicio',
      link: '/'
    },
    {
      icon: 'home',
      text: 'Productos',
      subMenu: [
        {
          icon: 'home',
          text: 'Sub inicio',
          link: '/home'
        },
        {
          icon: 'home',
          text: 'Sub inicio',
          link: '/home'
        },
        {
          icon: 'home',
          text: 'Sub inicio',
          link: '/home'
        },
        {
          icon: 'home',
          text: 'Sub inicio',
          link: '/home'
        },
        {
          icon: 'home',
          text: 'Sub inicio',
          link: '/home'
        },
        {
          icon: 'home',
          text: 'Sub inicio',
          link: '/home'
        }
      ]
    }
  ]
  return (
    <>
      <Head>
        <title>Page Title</title>
      </Head>
      <main
        className={` min-h-screen flex-row  md:flex transition-colors duration-200 ${
          sidebarOpen ? 'overflow-hidden bg-white' : 'bg-secondary/5 '
        }`}
      >
        <Sidebar
          user={{ name: 'pietro' }}
          menu={menu}
          isSidebarOpen={sidebarOpen}
          setSidebar={setsidebarOpen}
        />
        <div className="transition-duration-500 w-full transition-all">
          {children}
          <ToastComponent />
        </div>
      </main>
    </>
  )
}

export default AdministrationLayout
