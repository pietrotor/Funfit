/* eslint-disable no-unused-vars */
import Head from 'next/head'
import React, { useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import Image from 'next/image'
import {
  ArrowLeft,
  Bell,
  ClipboardList,
  LogOut,
  Menu
} from 'lucide-react'
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner as NextSpinner
} from '@nextui-org/react'
import Sidebar, { TMenuStructure } from './sidebar'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  OrderStatusEnum,
  RoleTypeEnum,
  StatusEnum,
  useGetBranchesPaginatedLazyQuery,
  useGetConfigurationLazyQuery,
  useGetOrdersPaginatedQuery
} from '@/graphql/graphql-types'

import { useAppDispatch, useAppSelector } from '@/store/index'
import { setBusiness, setOrder } from '@/store/slices'
import { setBranch, setBranches } from '@/store/slices/branches/branchSlice'
import { ICurrentUser } from '@/interfaces/currentUser.interface'

type TAdministrationLayoutProps = {
  children: React.ReactNode
  showBackButton?: boolean
  onSubmit?: () => void
  profileButton?: boolean
  user: ICurrentUser
  containerClassName?: HTMLElement['className']
}

const AdministrationLayout: React.FC<TAdministrationLayoutProps> = ({
  onSubmit,
  showBackButton = false,
  children,
  profileButton = true,
  user,
  containerClassName
}) => {
  const { business } = useAppSelector(state => state.configuration)
  const { branches, currentBranch } = useAppSelector(
    state => state.branchReducer
  )
  const dispatch = useAppDispatch()
  const [currentId, setCurrentId] = useState<string>('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()

  const [getBranchesPaginated] = useGetBranchesPaginatedLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {}
    },
    onCompleted(data) {
      if (!data.getBranchesPaginated?.data) {
        getBranchesPaginated()
        return
      }
      dispatch(setBranches(data.getBranchesPaginated?.data))

      if (currentBranch.id === '') {
        data.getBranchesPaginated?.data.forEach(branch => {
          if (branch.id === currentId) {
            dispatch(setBranch(branch))
          }
        })
      }
    },
    onError(error) {
      console.log('🚀 ~ file: index.tsx:31 ~ onError ~ error:', error)
    }
  })

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

  const handleLogOut = () => {
    Cookies.remove('sao-sess')
    router.push('/administration-panel/login')
  }

  const { data, refetch } = useGetOrdersPaginatedQuery({
    fetchPolicy: 'network-only',
    variables: {
      orderPaginationInput: {
        status: OrderStatusEnum.PENDING
      }
    },
    pollInterval: 5000,
    onCompleted(data) {
      if (data.getOrdersPaginated?.status === StatusEnum.ERROR) {
        showSuccessToast(
          data?.getOrdersPaginated?.message || 'Error al obtener las ordenes',
          'error'
        )
        return
      }
      dispatch(setOrder(data.getOrdersPaginated?.data))
    },
    onError(error) {
      console.log('🚀 ~ file: index.tsx:31 ~ onError ~ error:', error)
    }
  })

  const pendingOrders = data?.getOrdersPaginated?.data || []
  const pendingCount = pendingOrders.length

  const menu: TMenuStructure = [
    {
      icon: 'pos',
      text: 'Punto de venta',
      link: '/administration-panel/point-of-sale',
      permissions: [RoleTypeEnum.ADMINISTRATOR, RoleTypeEnum.SALESMAN]
    },
    {
      icon: 'operation',
      text: 'Operación',
      permissions: [RoleTypeEnum.ADMINISTRATOR, RoleTypeEnum.SALESMAN],
      subMenu: [
        {
          icon: 'orders',
          text: 'Pedidos',
          link: '/administration-panel/order',
          permissions: [RoleTypeEnum.ADMINISTRATOR, RoleTypeEnum.SALESMAN]
        },
        {
          icon: 'cashRegister',
          text: 'Caja',
          link: '/administration-panel/cash',
          permissions: [RoleTypeEnum.ADMINISTRATOR, RoleTypeEnum.SALESMAN]
        },
        {
          icon: 'dailySales',
          text: 'Ventas del día',
          link: '/administration-panel/dailySale',
          permissions: [RoleTypeEnum.ADMINISTRATOR, RoleTypeEnum.SALESMAN]
        },
        {
          icon: 'expenses',
          text: 'Gastos',
          link: '/administration-panel/bill',
          permissions: [RoleTypeEnum.ADMINISTRATOR, RoleTypeEnum.SALESMAN]
        }
      ]
    },
    {
      icon: 'inventory',
      text: 'Inventario',
      permissions: [RoleTypeEnum.ADMINISTRATOR, RoleTypeEnum.SALESMAN],
      subMenu: [
        {
          icon: 'branches',
          text: 'Sucursales',
          link: '/administration-panel/branches',
          permissions: [RoleTypeEnum.ADMINISTRATOR, RoleTypeEnum.SALESMAN]
        },
        {
          icon: 'warehouses',
          text: 'Almacenes',
          link: '/administration-panel/warehouses',
          permissions: [RoleTypeEnum.ADMINISTRATOR, RoleTypeEnum.SALESMAN]
        }
      ]
    },
    {
      icon: 'catalog',
      text: 'Catálogo',
      permissions: [RoleTypeEnum.ADMINISTRATOR],
      subMenu: [
        {
          icon: 'products',
          text: 'Productos',
          link: '/administration-panel/products',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        },
        {
          icon: 'categories',
          text: 'Categorías',
          link: '/administration-panel/categories',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        }
      ]
    },
    {
      icon: 'distributors',
      text: 'Distribuidores',
      permissions: [RoleTypeEnum.ADMINISTRATOR],
      subMenu: [
        {
          icon: 'distributorsList',
          text: 'Distribuidores',
          link: '/administration-panel/dealers',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        },
        {
          icon: 'priceList',
          text: 'Lista de precios',
          link: '/administration-panel/price-list',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        },
        {
          icon: 'distributorsPos',
          text: 'Vender a distribuidores',
          link: '/administration-panel/pos-distributors',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        },
        {
          icon: 'distributorsSales',
          text: 'Ventas a distribuidores',
          link: '/administration-panel/sales/distributors',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        }
      ]
    },
    {
      icon: 'reports',
      text: 'Reportes',
      permissions: [RoleTypeEnum.ADMINISTRATOR],
      subMenu: [
        {
          icon: 'salesReport',
          text: 'Reporte de ventas',
          link: '/administration-panel/sales',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        },
        {
          icon: 'balance',
          text: 'Balance',
          link: '/administration-panel/balance',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        }
      ]
    },
    {
      icon: 'team',
      text: 'Equipo',
      permissions: [RoleTypeEnum.ADMINISTRATOR],
      subMenu: [
        {
          icon: 'users',
          text: 'Usuarios',
          link: '/administration-panel/users',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        }
      ]
    }
  ]

  const buildMenu = useMemo(() => {
    const roleType = user.roleInfo?.type
    const menuBuilded: TMenuStructure = []
    if (!roleType) return []
    menu.forEach(page => {
      if (page.permissions.includes(roleType)) {
        const subMenu = page.subMenu?.filter(item =>
          item.permissions.includes(roleType)
        )
        if (page.subMenu && (!subMenu || subMenu.length === 0)) return
        menuBuilded.push({
          ...page,
          subMenu
        })
      }
    })
    return menuBuilded
  }, [user.roleInfo?.type])

  useEffect(() => {
    if (!business) {
      getConfiguration()
      return
    }
    if (branches.length === 0) {
      getBranchesPaginated()
      return
    }

    const storedBranchId = localStorage
      .getItem('branchId')
      ?.replace(/^"|"$/g, '')

    if (
      storedBranchId !== null &&
      storedBranchId !== undefined &&
      storedBranchId !== ''
    ) {
      setCurrentId(storedBranchId)
      const branch = branches.find(branch => branch.id === storedBranchId)
      if (branch) dispatch(setBranch(branch))
    } else {
      setCurrentId(branches[0]?.id)
      dispatch(setBranch(branches[0]))
      localStorage.setItem('branchId', branches[0].id)
    }
  }, [business, branches])

  const initials = (user?.name || 'U')
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <>
      <Head>
        <title>FunFit | Administración</title>
      </Head>
      {business && branches.length !== 0 && currentBranch.id !== '' ? (
        <div className="flex min-h-[100dvh] bg-surface">
          <Sidebar
            onSubmit={onSubmit}
            user={user}
            menu={buildMenu}
            isSidebarOpen={sidebarOpen}
            setSidebar={setSidebarOpen}
            onLogout={handleLogOut}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(prev => !prev)}
          />

          <div className="flex min-w-0 flex-1 flex-col">
            {(profileButton || showBackButton) && (
              <div className="px-4 pt-4 md:px-6">
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-secondary/25 bg-gradient-to-r from-white via-[#FFFCF6] to-secondary/20 px-3 py-2 shadow-[0_8px_24px_-16px_rgba(122,148,32,0.45)]">
                  <div className="flex min-w-0 items-center gap-2">
                    <button
                      type="button"
                      aria-label="Abrir menú"
                      onClick={() => setSidebarOpen(true)}
                      className="inline-flex rounded-xl bg-white p-2 text-stone-600 ring-1 ring-stone-200 transition-colors hover:bg-secondary/10 lg:hidden"
                    >
                      <Menu className="h-5 w-5" strokeWidth={1.75} />
                    </button>
                    {showBackButton && (
                      <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-50"
                      >
                        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                        Atrás
                      </button>
                    )}
                    <div className="hidden min-w-0 items-center gap-2 sm:flex">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-secondary" />
                      <p className="truncate text-sm text-stone-500">
                        <span className="font-medium text-tertiary">
                          {currentBranch.name}
                        </span>
                      </p>
                    </div>
                  </div>

                  {profileButton && (
                    <div className="flex items-center gap-2">
                      <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                          <button
                            type="button"
                            aria-label="Notificaciones"
                            onClick={() => refetch()}
                            className="relative rounded-xl bg-white p-2 text-stone-500 ring-1 ring-stone-200 transition-colors hover:text-primary-600"
                          >
                            {(pendingCount || 0) > 0 ? (
                              <Badge
                                content={pendingCount}
                                color="primary"
                                size="sm"
                              >
                                <Bell className="h-5 w-5" strokeWidth={1.75} />
                              </Badge>
                            ) : (
                              <Bell className="h-5 w-5" strokeWidth={1.75} />
                            )}
                          </button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Pedidos pendientes"
                          emptyContent="No hay pedidos pendientes"
                          onAction={() => {
                            router.push('/administration-panel/order')
                          }}
                        >
                          {pendingOrders.map(order => (
                            <DropdownItem
                              key={order.id}
                              startContent={
                                <ClipboardList
                                  className="h-4 w-4 text-primary-600"
                                  strokeWidth={1.75}
                                />
                              }
                            >
                              Nueva orden · {order.total} Bs
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>

                      <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                          <button
                            type="button"
                            className="flex items-center gap-2.5 rounded-2xl bg-white py-1 pl-1 pr-3 ring-1 ring-secondary/40 transition-colors hover:bg-secondary/10"
                          >
                            <Avatar
                              name={initials}
                              size="sm"
                              classNames={{
                                base: 'bg-secondary text-tertiary font-semibold',
                                name: 'text-tertiary text-xs'
                              }}
                            />
                            <span className="hidden text-left leading-tight sm:block">
                              <span className="block text-sm font-semibold text-tertiary">
                                {user.name}
                              </span>
                              <span className="block max-w-[140px] truncate text-[11px] text-stone-400">
                                {user.email}
                              </span>
                            </span>
                          </button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Menú de usuario">
                          <DropdownItem
                            key="logout"
                            color="danger"
                            startContent={
                              <LogOut className="h-4 w-4" strokeWidth={1.75} />
                            }
                            onClick={handleLogOut}
                          >
                            Cerrar sesión
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!profileButton && !showBackButton && (
              <button
                type="button"
                aria-label="Abrir menú"
                onClick={() => setSidebarOpen(true)}
                className="fixed left-3 top-3 z-30 inline-flex rounded-xl bg-white p-2 text-stone-700 shadow-md ring-1 ring-secondary/30 lg:hidden"
              >
                <Menu className="h-5 w-5" strokeWidth={1.75} />
              </button>
            )}

            <main
              className={clsx(
                'mx-auto w-full max-w-[1400px] flex-1 px-4 py-5 md:px-6',
                containerClassName
              )}
            >
              {children}
            </main>
          </div>
        </div>
      ) : (
        <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center gap-6 bg-surface">
          <Image
            src="/common/logo.png"
            alt="FunFit"
            width={160}
            height={80}
            className="h-auto w-40 object-contain"
            priority
          />
          <NextSpinner color="primary" size="lg" />
        </div>
      )}
    </>
  )
}

export default AdministrationLayout
