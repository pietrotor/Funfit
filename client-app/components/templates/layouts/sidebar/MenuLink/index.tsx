import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { getMenuIcon, TMenuIconName } from '../menuIcons'

type TMenuLinkProps = {
  isSidebarOpen: boolean
  text: string
  icon?: TMenuIconName
  detailView?: boolean
  link?: string
  subMenuIsOpen?: boolean | null
  onClick?: () => void
}

const MenuLink: React.FC<TMenuLinkProps> = ({
  isSidebarOpen,
  detailView = true,
  icon,
  link,
  text,
  subMenuIsOpen,
  onClick = () => {}
}) => {
  const router = useRouter()
  const [isCurrent] = useState(
    link ? link === '/' ? link === router.asPath : router.asPath.includes(link) : false
  )
  const Icon = getMenuIcon(icon)
  if (!link) {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`flex w-full gap-3 overflow-hidden py-4 text-base text-tertiary transition-all duration-200 hover:hover:rounded-md hover:bg-secondary-transparent ${
          isCurrent ? 'bg-secondary' : 'bg-transparent'
        } ${isSidebarOpen ? 'px-10' : 'px-0'} ${
          detailView ? 'justify-between' : 'justify-center'
        }`}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />}
          {detailView && (
            <p className={'flex-1 text-left font-semibold leading-normal'}>
              {text}
            </p>
          )}
        </div>
        {typeof subMenuIsOpen === 'boolean' && detailView && (
          <ChevronDown
            className={`h-5 w-5 shrink-0 ${
              subMenuIsOpen ? 'rotate-0' : '-rotate-90'
            } transition-transform duration-300`}
            strokeWidth={2}
          />
        )}
      </button>
    )
  }
  return (
    <Link
      href={link}
      className={`flex w-full items-center justify-center gap-3 overflow-hidden py-4 text-tertiary transition-all duration-200 hover:rounded-md hover:bg-secondary-transparent ${
        isCurrent ? 'bg-secondary' : 'bg-transparent'
      } ${isSidebarOpen ? 'px-10' : 'px-0'} ${
        detailView ? 'justify-between' : 'justify-center'
      }`}
    >
      <div className={'flex items-center gap-2'}>
        {Icon && <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />}
        {detailView && (
          <p className={'flex-1 text-left font-semibold'}>{text}</p>
        )}
      </div>
      {typeof subMenuIsOpen === 'boolean' && detailView && (
        <ChevronDown
          className={`h-5 w-5 shrink-0 ${
            subMenuIsOpen ? 'rotate-0' : '-rotate-90'
          } transition-transform duration-300`}
          strokeWidth={2}
        />
      )}
    </Link>
  )
}

export default MenuLink
