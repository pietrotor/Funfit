import { useDisclosure } from '@nextui-org/react'
import React from 'react'
import Image from 'next/image'
import {
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  Store
} from 'lucide-react'
import clsx from 'clsx'
import MenuLink from './MenuLink'
import SubMenu from './SubMenu'
import { TMenuIconName } from './menuIcons'
import { ICurrentUser } from '@/interfaces/currentUser.interface'
import { SelectBranchModal } from '@/components/atoms/modals/SelectBranchModal'
import {
  RoleTypeEnum,
  useGetBranchesPaginatedLazyQuery
} from '@/graphql/graphql-types'
import { useAppDispatch, useAppSelector } from '@/store/index'
import { setBranch, setBranches } from '@/store/slices/branches/branchSlice'

export type TMenuStructure = {
  text: string
  link?: string
  icon: TMenuIconName
  onClick?: () => void
  permissions: RoleTypeEnum[]
  subMenu?: {
    text: string
    link?: string
    icon: TMenuIconName
    permissions: RoleTypeEnum[]
  }[]
}[]

type TSidebarProps = {
  setSidebar: (visible: boolean) => void
  onSubmit?: () => void
  isSidebarOpen: boolean
  menu: TMenuStructure
  user: ICurrentUser
  onClick?: () => void
  onLogout?: () => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

const Sidebar: React.FC<TSidebarProps> = ({
  onSubmit,
  setSidebar,
  isSidebarOpen,
  menu,
  onClick,
  user,
  onLogout,
  collapsed = false,
  onToggleCollapse
}) => {
  const handleChangeBranch = useDisclosure()
  const dispatch = useAppDispatch()
  const currentBranch = useAppSelector(
    state => state.branchReducer.currentBranch
  )
  const [getBranch] = useGetBranchesPaginatedLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {}
    },
    onCompleted(data) {
      if (!data.getBranchesPaginated?.data) {
        getBranch()
        return
      }
      dispatch(setBranches(data.getBranchesPaginated?.data))
      data.getBranchesPaginated?.data.forEach(branch => {
        if (branch.id === currentBranch?.id) {
          dispatch(setBranch(branch))
        }
      })
    },
    onError(error) {
      console.log('🚀 ~ file: index.tsx:31 ~ onError ~ error:', error)
    }
  })

  const isAdmin = user.roleInfo?.type === RoleTypeEnum.ADMINISTRATOR
  // Desktop icon-only mode
  const desktopCollapsed = collapsed

  const renderMenu = (forceCollapsed: boolean) =>
    menu.map((menuItem, idx) =>
      !menuItem.subMenu ? (
        <MenuLink
          key={menuItem.link || idx}
          onClick={() => {
            onClick?.()
            setSidebar(false)
          }}
          detailView={!forceCollapsed}
          isSidebarOpen={!forceCollapsed}
          text={menuItem.text}
          icon={menuItem.icon}
          link={menuItem.link}
          collapsed={forceCollapsed}
        />
      ) : (
        <SubMenu
          key={menuItem.text + idx}
          detailView={!forceCollapsed}
          isSidebarOpen={!forceCollapsed}
          text={menuItem.text}
          icon={menuItem.icon}
          subMenu={menuItem.subMenu}
          collapsed={forceCollapsed}
          onNavigate={() => setSidebar(false)}
        />
      )
    )

  const panel = (forceCollapsed: boolean, isMobileDrawer = false) => (
    <div
      className={clsx(
        'flex h-full flex-col border-r border-secondary/25 bg-[linear-gradient(180deg,#FFF8EC_0%,#FFFFFF_38%,#F4F8E4_100%)]',
        forceCollapsed ? 'w-[72px]' : 'w-64',
        isMobileDrawer && 'shadow-xl'
      )}
    >
      <div
        className={clsx(
          'flex h-16 shrink-0 items-center border-b border-secondary/20',
          forceCollapsed ? 'justify-center px-2' : 'justify-between px-4'
        )}
      >
        {!forceCollapsed ? (
          <Image
            alt="FunFit"
            width={110}
            height={40}
            src="/common/logo.png"
            className="h-9 w-auto object-contain"
            priority
          />
        ) : (
          <Image
            alt="FunFit"
            width={36}
            height={36}
            src="/common/logo_1.png"
            className="h-9 w-9 object-contain"
            priority
          />
        )}
        {onToggleCollapse && !isMobileDrawer && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={forceCollapsed ? 'Expandir menú' : 'Colapsar menú'}
            className="hidden rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-tertiary lg:inline-flex"
          >
            {forceCollapsed ? (
              <ChevronsRight className="h-4 w-4" strokeWidth={2} />
            ) : (
              <ChevronsLeft className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        )}
        {isMobileDrawer && (
          <button
            type="button"
            onClick={() => setSidebar(false)}
            aria-label="Cerrar menú"
            className="rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-tertiary"
          >
            <ChevronsLeft className="h-4 w-4" strokeWidth={2} />
          </button>
        )}
      </div>

      <button
        type="button"
        disabled={!isAdmin}
        onClick={() => {
          if (isAdmin) {
            getBranch()
            handleChangeBranch.onOpen()
          }
        }}
        className={clsx(
          'mx-3 mt-3 flex items-center gap-2.5 rounded-2xl border border-secondary/30 bg-white/80 px-3 py-2.5 text-left shadow-sm transition-colors',
          isAdmin && 'hover:border-secondary hover:bg-secondary/10',
          forceCollapsed && 'mx-2 justify-center px-2'
        )}
        title={currentBranch?.name || 'Sucursal'}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary/30 text-secondary-darken">
          <Store className="h-4 w-4" strokeWidth={1.75} />
        </span>
        {!forceCollapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-secondary-darken">
              Sucursal
            </p>
            <p className="truncate text-sm font-semibold text-tertiary">
              {currentBranch?.name || '—'}
            </p>
          </div>
        )}
      </button>

      <nav className="mt-3 flex-1 overflow-y-auto px-2 pb-4">
        <div className="flex flex-col gap-0.5">{renderMenu(forceCollapsed)}</div>
      </nav>

      <div className="shrink-0 border-t border-secondary/20 p-3">
        <div
          className={clsx(
            'flex items-center gap-2.5 rounded-2xl bg-white/70 p-2 ring-1 ring-secondary/25',
            forceCollapsed && 'justify-center bg-transparent p-0 ring-0'
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-tertiary">
            {(user?.name || 'U').charAt(0).toUpperCase()}
          </div>
          {!forceCollapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-tertiary">
                  {user?.name}
                </p>
                <p className="truncate text-xs text-stone-400">
                  {user?.email || ''}
                </p>
              </div>
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  aria-label="Cerrar sesión"
                  className="rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.75} />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={() => setSidebar(false)}
        className={clsx(
          'fixed inset-0 z-40 bg-stone-900/40 transition-opacity duration-200 lg:hidden',
          isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <aside
        className={clsx(
          'fixed left-0 top-0 z-50 h-[100dvh] transition-transform duration-300 lg:hidden',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {panel(false, true)}
      </aside>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 z-30 hidden h-[100dvh] shrink-0 lg:block">
        {panel(desktopCollapsed)}
      </aside>

      <SelectBranchModal
        onSubmit={onSubmit}
        isOpen={handleChangeBranch.isOpen}
        onClose={handleChangeBranch.onClose}
      />
    </>
  )
}

export default Sidebar
