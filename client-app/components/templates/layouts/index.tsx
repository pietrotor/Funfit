import Head from 'next/head'
import React, { useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Sidebar, { TMenuStructure } from './sidebar'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import ToastComponent, {
  showSuccessToast
} from '@/components/atoms/Toast/toasts'
import {
  RoleTypeEnum,
  StatusEnum,
  useGetBranchesPaginatedLazyQuery,
  useGetConfigurationLazyQuery,
  useGetOrdersPaginatedLazyQuery
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
}

const AdministrationLayout: React.FC<TAdministrationLayoutProps> = ({
  onSubmit,
  showBackButton = false,
  children,
  profileButton = true,
  user
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

  const [getOrders, { data }] = useGetOrdersPaginatedLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      orderPaginationInput: {
        orderesAcepted: false
      }
    },
    onCompleted(data) {
      console.log(data, 'data')
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

  useEffect(() => {
    // const timerId = setInterval(() => {
    //   getOrders()
    // }, 60000)
    // return () => {
    //   clearInterval(timerId)
    // }
  }, [])

  console.log(data?.getOrdersPaginated?.data, 'data')
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

    console.log(datosTransformados, 'datosTransformados')
    setOrderData(datosTransformados as TPointOfSaleData[])
    console.log(orderData, 'orderData')
  }
  useEffect(() => {}, [])

  const dataToPass: TPointOfSaleData = {
    products: [
      {
        id: '1',
        branchId: '1',
        productId: '1',
        price: 100,
        quantity: 1,
        isVisibleOnMenu: true,
        isVisibleOnWeb: true,
        product: {
          id: '1',
          name: 'Producto 1',
          description: 'Descripcion del producto'
        },
        stock: 10,
        total: 100
      },
      {
        id: '2',
        branchId: '1',
        productId: '2',
        price: 200,
        quantity: 2,
        isVisibleOnMenu: true,
        isVisibleOnWeb: true,
        product: {
          id: '2',
          name: 'Producto 2',
          description: 'Descripcion del producto'
        },
        stock: 10,
        total: 200
      },
      {
        id: '3',
        branchId: '1',
        productId: '3',
        price: 300,
        quantity: 1,
        isVisibleOnMenu: true,
        isVisibleOnWeb: true,
        product: {
          id: '3',
          name: 'Producto 3',
          description: 'Descripcion del producto'
        },
        stock: 10,
        total: 300
      }
    ],
    subTotal: 600,
    total: 600,
    discount: 0
  }
  const menu: TMenuStructure = [
    {
      icon: 'home',
      text: 'Inicio',
      link: '/',
      permissions: [RoleTypeEnum.ADMINISTRATOR]
    },
    {
      icon: 'Admin',
      text: 'Administrar',
      permissions: [RoleTypeEnum.ADMINISTRATOR],
      subMenu: [
        {
          icon: 'users',
          text: 'Usuarios',
          link: '/administration-panel/users',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        },
        {
          icon: 'Box',
          text: 'Productos',
          link: '/administration-panel/products',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        }
      ]
    },
    {
      icon: 'Configuration',
      text: 'Configuración',
      permissions: [RoleTypeEnum.ADMINISTRATOR, RoleTypeEnum.SALESMAN],
      subMenu: [
        {
          icon: 'Branch',
          text: 'Sucursales',
          link: '/administration-panel/branches',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        },
        {
          icon: 'Bussines',
          text: 'Almacenes',
          link: '/administration-panel/warehouses',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        },
        {
          icon: 'Cash',
          text: 'Caja',
          link: '/administration-panel/cash',
          permissions: [RoleTypeEnum.ADMINISTRATOR, RoleTypeEnum.SALESMAN]
        },
        {
          icon: 'Admin',
          text: 'Categorías',
          link: '/administration-panel/categories',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        },
        {
          icon: 'Dealer',
          text: 'Distribuidores',
          link: '/administration-panel/dealers',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        },
        {
          icon: 'Admin',
          text: 'Lista de precios',
          link: '/administration-panel/price-list',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        }
      ]
    },
    {
      icon: 'Store',
      text: 'Ventas',
      permissions: [RoleTypeEnum.ADMINISTRATOR, RoleTypeEnum.SALESMAN],
      subMenu: [
        {
          icon: 'Admin',
          text: 'Reportes',
          link: '/administration-panel/sales',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        },
        {
          icon: 'Admin',
          text: 'Ventas diarias',
          link: '/administration-panel/dailySale',
          permissions: [RoleTypeEnum.ADMINISTRATOR, RoleTypeEnum.SALESMAN]
        }
      ]
    },
    {
      icon: 'TrunkAndBox',
      text: 'Produccion',
      permissions: [RoleTypeEnum.ADMINISTRATOR],
      subMenu: [
        {
          icon: 'Recipe',
          text: 'Recetas',
          link: '/administration-panel/recipies',
          permissions: [RoleTypeEnum.ADMINISTRATOR]
        }
      ]
    },
    {
      icon: 'PointOfSale',
      text: 'Punto de venta',
      link: '/administration-panel/point-of-sale',
      permissions: [RoleTypeEnum.ADMINISTRATOR]
    },
    {
      icon: 'Basket-shopping',
      text: 'Pedidos',
      link: '/administration-panel/order',
      permissions: [RoleTypeEnum.ADMINISTRATOR]
    },
    {
      icon: 'Dealer',
      text: 'Punto de venta a distribuidores',
      link: '/administration-panel/pos-distributors',
      permissions: [RoleTypeEnum.ADMINISTRATOR]
    }
  ]

  const buildMenu = useMemo(() => {
    const roleType = user.roleInfo?.type
    console.log('🚀 ~ buildMenu ~ roleType:', roleType)
    const menuBuilded: TMenuStructure = []
    if (!roleType) return []
    menu.forEach(page => {
      if (page.permissions.includes(roleType)) {
        menuBuilded.push({
          ...page,
          subMenu: page.subMenu?.filter(item =>
            item.permissions.includes(roleType)
          )
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
        <title>FunFit</title>
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
              <ToastComponent />
              <div className="flex items-center">
                <DropDown
                  onClick={() => {
                    getOrders()
                  }}
                  IconButtonName="Notifications"
                  values={
                    data?.getOrdersPaginated?.data?.map((order, idx) => {
                      return {
                        label: `Orden ${order.products[0]?.product?.name}`,
                        value: order.id,
                        icon: 'Notifications',
                        handleClick: () => {
                          router.push({
                            pathname: '/administration-panel/point-of-sale',
                            query: { data: JSON.stringify(dataToPass) }
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
                  IconButtonName="user"
                  label={user.name}
                  user="https://www.icmetl.org/wp-content/uploads/2020/11/user-icon-human-person-sign-vector-10206693.png"
                  values={[
                    {
                      label: 'Notificaciones',
                      value: 'notifications',
                      icon: 'Notifications',
                      handleClick: () => console.log('profile'),
                      counter: 2
                    },
                    {
                      label: 'Cerrar sesión',
                      value: 'logout',
                      icon: 'Logout',
                      handleClick: () => handleLogOut(),
                      counter: 0
                    }
                  ]}
                />
              </div>
            </div>
            <div className="h-full w-full ps-5 md:pt-16 lg:pt-5">
              {children}
            </div>
          </div>
        </main>
      ) : (
        <div className="flex h-screen w-full items-center justify-center bg-neutral-300">
          <p>Loading...</p>
        </div>
      )}
    </>
  )
}

export default AdministrationLayout
