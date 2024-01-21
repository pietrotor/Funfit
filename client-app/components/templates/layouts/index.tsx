import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Sidebar, { TMenuStructure } from './sidebar'
import ToastComponent from '@/components/atoms/Toast/toasts'
import { useGetBranchesPaginatedLazyQuery, useGetConfigurationLazyQuery } from '@/graphql/graphql-types'
import { useAppDispatch, useAppSelector } from '@/store/index'
import { setBusiness } from '@/store/slices'
import BackButton from '@/components/atoms/BackButton/intex'
import { setBranch, setBranches } from '@/store/slices/branches/branchSlice'
import { useRouter } from 'next/router'
import { DropDown } from '@/components/atoms/DropDown'

type TAdministrationLayoutProps = {
  children: React.ReactNode
  showBackButton?: boolean
  onSubmit?: () => void
}

const AdministrationLayout: React.FC<TAdministrationLayoutProps> = ({
  onSubmit,
  showBackButton = false,
  children
}) => {
  const { business } = useAppSelector(state => state.configuration)
  const { branches, currentBranch } = useAppSelector(state => state.branchReducer)
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
      console.log(data.getConfiguration?.data)
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
        }
      ]
    },
    {
      icon: 'Store',
      text: 'Ventas',
      subMenu: [
        {
          icon: 'Cash',
          text: 'Caja',
          link: '/administration-panel/cash'
        },
        {
          icon: 'Admin',
          text: 'Reporte de ventas',
          link: '/administration-panel/sales'
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
      icon: 'Logout',
      text: 'Cerrar sesión',
      link: '/administration-panel/login',
      onClick: () => handleLogOut()
    }
  ]
  useEffect(() => {
    if (!business) getConfiguration()
    if (branches.length === 0) getBranchesPaginated()

    const storedBranchId = localStorage.getItem('branchId')?.replace(/^"|"$/g, '')

    if (storedBranchId !== null && storedBranchId !== undefined && storedBranchId !== '') {
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
          <div className="transition-duration-500 w-full ps-10 transition-all flex  justify-around">
            {showBackButton && (
              <BackButton/>
            )}
            {children}
            <ToastComponent />
            <DropDown
            IconButtonName='user'
            label={ 'Pietro' }
            values={['cerrar sesion']}
            handleClick={() => handleLogOut()}
            />
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
