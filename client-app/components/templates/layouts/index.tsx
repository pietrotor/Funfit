import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Sidebar, { TMenuStructure } from './sidebar'
import ToastComponent from '@/components/atoms/Toast/toasts'
import {
  useGetBranchesPaginatedLazyQuery,
  useGetConfigurationLazyQuery
} from '@/graphql/graphql-types'

import { useAppDispatch, useAppSelector } from '@/store/index'
import { setBusiness } from '@/store/slices'
import BackButton from '@/components/atoms/BackButton/intex'
import { setBranch, setBranches } from '@/store/slices/branches/branchSlice'
import { DropDown } from '@/components/atoms/DropDown'

type TAdministrationLayoutProps = {
  children: React.ReactNode
  showBackButton?: boolean
  onSubmit?: () => void
  profileButton?: boolean
}

const AdministrationLayout: React.FC<TAdministrationLayoutProps> = ({
  onSubmit,
  showBackButton = false,
  children,
  profileButton = true
}) => {
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
        console.log('entro')
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
  const menu: TMenuStructure = [
    {
      icon: 'home',
      text: 'Inicio',
      link: '/'
    },
    {
      icon: 'Admin',
      text: 'Administrar',
      subMenu: [
        {
          icon: 'users',
          text: 'Usuarios',
          link: '/administration-panel/users'
        },
        {
          icon: 'Box',
          text: 'Productos',
          link: '/administration-panel/products'
        }
      ]
    },
    {
      icon: 'Configuration',
      text: 'Configuración',
      subMenu: [
        {
          icon: 'Branch',
          text: 'Sucursales',
          link: '/administration-panel/branches'
        },
        {
          icon: 'Bussines',
          text: 'Almacenes',
          link: '/administration-panel/warehouses'
        },
        {
          icon: 'Cash',
          text: 'Caja',
          link: '/administration-panel/cash'
        },
        {
          icon: 'Admin',
          text: 'Categorías',
          link: '/administration-panel/categories'
        }
      ]
    },
    {
      icon: 'Store',
      text: 'Ventas',
      subMenu: [
        {
          icon: 'Admin',
          text: 'Reportes',
          link: '/administration-panel/sales'
        },
        {
          icon: 'Admin',
          text: 'Ventas diarias',
          link: '/administration-panel/dailySale'
        }
      ]
    },
    {
      icon: 'TrunkAndBox',
      text: 'Produccion',
      subMenu: [
        {
          icon: 'Recipe',
          text: 'Recetas',
          link: '/administration-panel/recipies'
        }
      ]
    },
    {
      icon: 'PointOfSale',
      text: 'Punto de venta',
      link: '/administration-panel/point-of-sale'
    }
  ]
  useEffect(() => {
    if (!business) getConfiguration()
    if (branches.length === 0) getBranchesPaginated()

    const storedBranchId = localStorage
      .getItem('branchId')
      ?.replace(/^"|"$/g, '')

    if (
      storedBranchId !== null &&
      storedBranchId !== undefined &&
      storedBranchId !== ''
    ) {
      setCurrentId(storedBranchId)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Page Title</title>
      </Head>
      {business ? (
        <main
          className={` min-h-screen flex-row  transition-colors duration-200 md:flex ${
            sidebarOpen ? 'overflow-hidden bg-white' : 'bg-secondary/5 '
          }`}
        >
          <Sidebar
            onSubmit={onSubmit}
            user={{ name: 'pietro' }}
            menu={menu}
            isSidebarOpen={sidebarOpen}
            setSidebar={setsidebarOpen}
          />
          <div className="w-full">
            <div className={` fixed  z-10 ${sidebarOpen ? 'left-64' : 'lg:left-24 left-10'} `}>
            {showBackButton && <BackButton />}
            </div>
            <div className={` fixed right-5 z-10 ${sidebarOpen ? '' : ''} `}>
              <ToastComponent />
              <div className="flex items-center">
                <DropDown
                  IconButtonName="Notifications"
                  values={[]}
                  counter={0}
                  avatar="https://static.vecteezy.com/system/resources/previews/000/376/699/original/notification-vector-icon.jpg"
                />
                <DropDown
                  fill
                  IconButtonName="user"
                  label={'Pietro'}
                  user='https://www.icmetl.org/wp-content/uploads/2020/11/user-icon-human-person-sign-vector-10206693.png'
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
            <div className="h-full w-full ps-5 lg:pt-5 pt-16">{children}</div>
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
