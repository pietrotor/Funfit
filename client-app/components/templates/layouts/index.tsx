import Head from 'next/head'
import React, { useState } from 'react'
import Sidebar, { TMenuStructure } from './sidebar'
import ToastComponent from '@/components/atoms/Toast/toasts'

type TAdministrationLayoutProps = {
  children: React.ReactNode
}

const AdministrationLayout: React.FC<TAdministrationLayoutProps> = ({ children }) => {
  const [sidebarOpen, setsidebarOpen] = useState(true)
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
      <main className={`md:flex bg-white flex-row max-h-screen h-screen ${sidebarOpen ? 'overflow-hidden' : ''}`}>
        <Sidebar user={{ name: 'pietro' }} menu={menu} isSidebarOpen={sidebarOpen} setSidebar={setsidebarOpen}/>
        <div className='transition-all transition- duration-500'>
          {children}
          <ToastComponent/>
        </div>
      </main>
    </>
  )
}

export default AdministrationLayout
