/* eslint-disable no-unused-vars */
import Head from 'next/head'
import React, { useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Bell, ClipboardList, LogOut } from 'lucide-react'
import Sidebar, { TMenuStructure } from './sidebar'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
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
import BackButton from '@/components/atoms/BackButton/intex'
import { setBranch, setBranches } from '@/store/slices/branches/branchSlice'
import { DropDown } from '@/components/atoms/DropDown'
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
  const [orderData, setOrderData] = useState<TPointOfSaleData[]>()
  const { business } = useAppSelector(state => state.configuration)
  const { branches, currentBranch } = useAppSelector(
    state => state.branchReducer
  )
  const dispatch = useAppDispatch()
  const [currentId, setCurrentId] = useState<string>('')
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
  const [sidebarOpen, setsidebarOpen] = useState(false)
  const router = useRouter()
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
      handleOrder()
      dispatch(setOrder(data.getOrdersPaginated?.data))
    },
    onError(error) {
      console.log('🚀 ~ file: index.tsx:31 ~ onError ~ error:', error)
    }
  })

  const handleOrder = () => {
    const datosTransformados = data?.getOrdersPaginated?.data?.map(order => {
      return {
        products: order.products.map(product => {
          return {
            id: product.product?.id,
            branchId: product.branchProductId,
            productId: product.productId,
            price: product.price,
            isVisibleOnWeb: true,
            isVisibleOnMenu: true,
            quantity: product.qty,
            product: {
              id: product.product?.id || '',
              name: product.product?.name || '',
              description: product.product?.description || ''
            },
            stock: product.qty,
            total: product.total
          }
        }),
        subTotal: order.subTotal,
        total: order.total,
        discount: order.discount
      }
    })

    setOrderData(datosTransformados as TPointOfSaleData[])
  }
  useEffect(() => {}, [])

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

  return (
    <>
      <Head>
        <title>FunFit | Punto de Venta</title>
      </Head>
      {business && branches.length !== 0 && currentBranch.id !== '' ? (
        <main
          className={` min-h-screen flex-row  transition-colors duration-200 md:flex ${
            sidebarOpen ? 'overflow-hidden bg-white' : 'bg-secondary/5 '
          }`}
        >
          <Sidebar
            onSubmit={onSubmit}
            user={user}
            menu={buildMenu}
            isSidebarOpen={sidebarOpen}
            setSidebar={setsidebarOpen}
          />
          <div className="w-full">
            <div
              className={` fixed  z-10 ${
                sidebarOpen ? 'left-64' : 'left-10 lg:left-24'
              } `}
            >
              {showBackButton && <BackButton />}
            </div>
            <div className={` fixed right-5 z-30 ${sidebarOpen ? '' : ''} `}>
              <div className="flex items-center">
                <DropDown
                  IconButton={Bell}
                  iconButtonLabel="Notificaciones"
                  onClick={() => refetch()}
                  values={
                    data?.getOrdersPaginated?.data?.map((order, idx) => {
                      return {
                        label: `Nueva orden - ${order.total} Bs`,
                        value: order.id,
                        icon: ClipboardList,
                        handleClick: () => {
                          router.push({
                            pathname: '/administration-panel/order'
                          })
                        },
                        counter: 0
                      }
                    }) || []
                  }
                  counter={data?.getOrdersPaginated?.data?.length || 0}
                  avatar="https://static.vecteezy.com/system/resources/previews/000/376/699/original/notification-vector-icon.jpg"
                />
                <DropDown
                  fill
                  label={user.name}
                  user="https://www.icmetl.org/wp-content/uploads/2020/11/user-icon-human-person-sign-vector-10206693.png"
                  values={[
                    {
                      label: 'Notificaciones',
                      value: 'notifications',
                      icon: Bell,
                      handleClick: () => console.log('profile'),
                      counter: 2
                    },
                    {
                      label: 'Cerrar sesión',
                      value: 'logout',
                      icon: LogOut,
                      handleClick: () => handleLogOut(),
                      counter: 0
                    }
                  ]}
                />
              </div>
            </div>
            <div
              className={clsx(
                'h-full w-full ps-5 md:pt-16 lg:pt-5',
                containerClassName
              )}
            >
              {children}
            </div>
          </div>
        </main>
      ) : (
        <div className="relative flex h-screen w-full flex-col items-center justify-center bg-secondary/20">
          <img src="/common/logo.png" className="md:w-48" />
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default AdministrationLayout
