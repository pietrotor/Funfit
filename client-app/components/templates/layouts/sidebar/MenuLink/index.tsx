import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import IconSelector, { TSvgNames } from '@/components/atoms/IconSelector'

type TMenuLinkProps = {
  isSidebarOpen: boolean
  text: string
  icon?: TSvgNames
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
          {icon && <IconSelector name={icon} className="" />}
          {detailView && (
            <p className={'flex-1 text-left font-semibold leading-normal'}>
              {text}
            </p>
          )}
        </div>
        {typeof subMenuIsOpen === 'boolean' && detailView && (
          <IconSelector
            name="down-arrow"
            width="w-5"
            stroke={3}
            className={`${
              subMenuIsOpen ? 'rotate-90' : '-rotate-90'
            } transition-all duration-500`}
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
      <div className={'flex gap-2 '}>
        {icon && <IconSelector name={icon} />}
        {detailView && (
          <p className={'flex-1 text-left font-semibold'}>{text}</p>
        )}
      </div>
      {typeof subMenuIsOpen === 'boolean' && detailView && (
        <IconSelector
          name="down-arrow"
          width="w-5"
          stroke={3}
          className={`${
            subMenuIsOpen ? '-rotate-90' : '-rotate-[270deg]'
          } transition-all duration-300`}
        />
      )}
    </Link>
  )
}

export default MenuLink
