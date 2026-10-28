import React, { useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import MenuLink from '../MenuLink'
import { TMenuIconName } from '../menuIcons'

type TSubMenuLinkProps = {
  isSidebarOpen: boolean
  text: string
  icon?: TMenuIconName
  detailView?: boolean
  subMenu: {
    text: string
    icon?: TMenuIconName
    detailView?: boolean
    link?: string
  }[]
  collapsed?: boolean
  onNavigate?: () => void
}

const SubMenu: React.FC<TSubMenuLinkProps> = ({
  isSidebarOpen,
  text,
  icon,
  subMenu,
  collapsed = false,
  onNavigate
}) => {
  const router = useRouter()
  const hasActiveChild = subMenu.some(item =>
    item.link ? router.asPath === item.link || router.asPath.startsWith(`${item.link}/`) : false
  )
  const [isOpen, setIsOpen] = useState(hasActiveChild)
  const showLabel = isSidebarOpen && !collapsed

  if (!showLabel) {
    return (
      <div className="flex flex-col gap-0.5">
        <div className="mx-auto my-2 h-px w-6 bg-secondary/40" aria-hidden />
        {subMenu.map((item, idx) => (
          <MenuLink
            key={item.link || idx}
            isSidebarOpen={false}
            text={item.text}
            icon={item.icon}
            link={item.link}
            collapsed
            onClick={onNavigate}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="mb-1">
      <MenuLink
        isSidebarOpen
        text={text}
        icon={icon}
        link={undefined}
        subMenuIsOpen={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
      />
      <div
        className={clsx(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="ml-4 border-l-2 border-secondary/50 py-1 pl-1">
            {subMenu.map((item, idx) => (
              <MenuLink
                key={item.link || idx}
                isSidebarOpen
                text={item.text}
                icon={item.icon}
                link={item.link}
                nested
                onClick={onNavigate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubMenu
