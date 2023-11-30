import React, { useState } from 'react'
import { useRouter } from 'next/router'
import MenuLink from '../MenuLink'
// import Accordion from '@/components/molecules/Accordion'
import { TSvgNames } from '@/components/atoms/IconSelector'
import Accordion from '@/components/molecules/Accordion'

type TSubMenuLinkProps = {
  isSidebarOpen: boolean
  text: string
  icon?: TSvgNames
  detailView?: boolean
  link?: string
  subMenu: {
    text: string
    icon?: TSvgNames
    detailView?: boolean
    link?: string
  }[]
}

const SubMenu: React.FC<TSubMenuLinkProps> = ({ isSidebarOpen, text, icon, detailView, subMenu }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(subMenu.map(sub => sub.link).includes(router.asPath))
  return (
    <>
      <MenuLink onClick={() => setIsOpen(!isOpen)} subMenuIsOpen={isOpen} isSidebarOpen={isSidebarOpen} text={text} icon={icon} detailView={detailView}/>
      <Accordion isOpen={isOpen} setIsOpen={setIsOpen} >
        <div className='ml-4 bg-secondary'>
          {subMenu.map((item, idx) => (
            <MenuLink key={idx} isSidebarOpen={isSidebarOpen} text={item.text} icon={item.icon} detailView={item.detailView} link={item.link}/>
          ))}
        </div>
      </Accordion>
    </>
  )
}

export default SubMenu
