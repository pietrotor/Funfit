import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { getMenuIcon, TMenuIconName } from '../menuIcons'

type TMenuLinkProps = {
  isSidebarOpen: boolean
  text: string
  icon?: TMenuIconName
  detailView?: boolean
  link?: string
  subMenuIsOpen?: boolean | null
  onClick?: () => void
  collapsed?: boolean
  nested?: boolean
}

const MenuLink: React.FC<TMenuLinkProps> = ({
  isSidebarOpen,
  detailView = true,
  icon,
  link,
  text,
  subMenuIsOpen,
  onClick = () => {},
  collapsed = false,
  nested = false
}) => {
  const router = useRouter()
  const isCurrent = link
    ? link === '/'
      ? link === router.asPath
      : router.asPath === link || router.asPath.startsWith(`${link}/`)
    : false
  const Icon = getMenuIcon(icon)
  const showLabel = detailView && isSidebarOpen && !collapsed

  const baseClass = clsx(
    'group relative flex w-full items-center gap-3 overflow-hidden rounded-xl text-sm font-medium transition-colors duration-200',
    collapsed || !isSidebarOpen ? 'justify-center px-0 py-3' : 'px-3 py-2.5',
    nested && showLabel && 'py-2 pl-3 text-[13px]',
    isCurrent
      ? 'bg-secondary/25 text-tertiary'
      : 'text-stone-600 hover:bg-secondary/10 hover:text-tertiary'
  )

  const content = (
    <>
      {isCurrent && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-secondary-darken"
        />
      )}
      {Icon && (
        <Icon
          className={clsx(
            'h-[18px] w-[18px] shrink-0',
            isCurrent
              ? 'text-primary-600'
              : 'text-stone-500 group-hover:text-secondary-darken'
          )}
          strokeWidth={1.75}
        />
      )}
      {showLabel && (
        <span className="flex-1 truncate text-left leading-snug">{text}</span>
      )}
      {typeof subMenuIsOpen === 'boolean' && showLabel && (
        <ChevronDown
          className={clsx(
            'h-4 w-4 shrink-0 text-stone-400 transition-transform duration-200',
            subMenuIsOpen ? 'rotate-0' : '-rotate-90'
          )}
          strokeWidth={2}
        />
      )}
    </>
  )

  if (!link) {
    return (
      <button
        type="button"
        onClick={onClick}
        title={!showLabel ? text : undefined}
        className={baseClass}
      >
        {content}
      </button>
    )
  }

  return (
    <Link
      href={link}
      title={!showLabel ? text : undefined}
      onClick={onClick}
      className={baseClass}
    >
      {content}
    </Link>
  )
}

export default MenuLink
