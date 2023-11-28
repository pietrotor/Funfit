// import Link from 'next/link'
import React from 'react'
import MenuLink from './MenuLink'
import SubMenu from './SubMenu'
import IconSelector, { TSvgNames } from '@/components/atoms/IconSelector'
import { ICurrentUser } from '@/interfaces/currentUser.interface'
import Image from 'next/image'

export type TMenuStructure = {
  text: string
  link?: string
  icon: TSvgNames
  subMenu?: {
    text: string
    link?: string
    icon: TSvgNames
  }[]
}[]

type TSidebarProps = {
  setSidebar: (visible: boolean) => void
  isSidebarOpen: boolean
  menu: TMenuStructure
  user: ICurrentUser
}

const Sidebar: React.FC<TSidebarProps> = ({
  setSidebar,
  isSidebarOpen,
  menu,
  user
}) => {
  return (
    <div className={`${isSidebarOpen ? 'relative w-60' : 'md:w-16'}`}>
      {/* backdrop (mobile) */}
      <div onClick={() => setSidebar(false)} className={`fixed inset-0 bg-primary bg-opacity-50 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true"></div>
      <div className={`fixed max-h-screen z-50 flex left-0 top-0 h-screen text-white transition-all duration-700 ${isSidebarOpen ? 'w-80 -translate-x-20' : 'w-16 xl:w-[70px] -translate-x-20 md:-translate-x-0'}`}>
        {/* Simple sidebar */}
        <div className={`w-16 min-w-[64px] h-full flex flex-col justify-between bg-primary ${!isSidebarOpen ? 'rounded-tr-2xl rounded-br-2xl' : ''}`}>
          <div>
            <Image alt='100' width={100} height={100} src='https://www.pinclipart.com/picdir/big/344-3445395_generic-company-logo-clipart-best-generic-computer-logo.png' className='mt-10 mb-4 h-40 px-1 object-contain m-auto'/>
            <div>
              {menu.map((menuItem, idx) => {
                return (!menuItem.subMenu
                  ? <MenuLink detailView={false} isSidebarOpen={isSidebarOpen} text={menuItem.text} icon={menuItem.icon} link={menuItem.link}/>
                  : <SubMenu detailView={false} isSidebarOpen={isSidebarOpen} text={menuItem.text} icon={menuItem.icon} subMenu={menuItem.subMenu}/>)
              })}
            </div>
          </div>
          <div className='w-full py-5 bg-primary-darken flex justify-center text-white'>
            <IconSelector name='user' width='w-8' height='h-8' />
          </div>
        </div>
        {/* Detail sidebar */}
        <div className={`h-full overflow-hidden flex flex-col justify-between bg-primary transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-0'}`}>
          <button
            onClick={() => setSidebar(!isSidebarOpen)}
            type='button'
            className={`absolute ${isSidebarOpen ? 'top-10 -right-3' : '-right-16 top-10 md:-right-3'} top-10 -right-3 aspect-square bg-secondary rounded-full p-1`}
          >
            <IconSelector name='menu' stroke={3}/>
          </button>
          <div>
            <div className='mt-10 mb-4 h-32 md:h-40 flex items-center'>
              <Image alt='s' width={100} height={100} src='https://www.pinclipart.com/picdir/big/344-3445395_generic-company-logo-clipart-best-generic-computer-logo.png' className='h-[80%] object-contain m-auto'/>
            </div>
            <div>
              {menu.map((menuItem, idx) => {
                return (!menuItem.subMenu
                  ? <MenuLink isSidebarOpen={isSidebarOpen} text={menuItem.text} icon={menuItem.icon} link={menuItem.link}/>
                  : <SubMenu isSidebarOpen={isSidebarOpen} text={menuItem.text} icon={menuItem.icon} subMenu={menuItem.subMenu}/>)
              })}
            </div>
          </div>
          <div className='py-5 px-10 bg-primary-darken overflow-hidden flex items-center gap-3 w-full text-white'>
            <IconSelector name='user' width='w-8' height='h-8' />
            <p className='font-semibold capitalize'>{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
