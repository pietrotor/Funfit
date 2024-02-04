import React, { useEffect } from 'react'
// import { UserNavBar } from '@/components/organisms/navBar/UsersNavBar'
import { useDispatch } from 'react-redux'
import { useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { UserContainer } from '../layouts/container/UserContainer'
import { UsersFooter } from '@/components/organisms/footer/UsersFooter'
import { TSections } from '@/interfaces/Sections'
import UsersNavBar from '@/components/organisms/navBar/UsersNavBar'

import {
  TCartItem,
  updateCart,
  updateLocalStorageCartDetails
} from '@/store/slices'
import { SelectBranchProductsModal } from '@/components/atoms/modals/SelectBranchProductsModal'
import { useGetBranchesPaginatedLazyQuery } from '@/graphql/graphql-types'
import { TDataBranch } from '@/interfaces/TData'
export type TClientLayoutProps = {
  children: React.ReactNode
}

function ClientLayout({ children }: TClientLayoutProps) {
  const handleSelectBranch = useDisclosure()
  const dispatch = useDispatch()
  const router = useRouter()
  const [getBranches, { data, loading }] = useGetBranchesPaginatedLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {}
    }
  })

  const menu: TSections = [
    {
      text: 'Inicio',
      link: '/'
    },
    {
      text: 'Contacto',
      link: '/contact'
    },
    {
      text: 'Seleccionar Sucursal',
      link: '/cart',
      onClick: () => {
        getBranches()
        handleSelectBranch.onOpen()
      }
    }
  ]
  useEffect(() => {
    const cart = localStorage.getItem('cartItems')
    const details = localStorage.getItem('cartDetails')
    if (details) {
      const detailsParsed = JSON.parse(details)
      dispatch(updateLocalStorageCartDetails(detailsParsed))
    }
    if (cart) {
      const cartParsed = JSON.parse(cart)
      cartParsed.forEach((item: TCartItem) => {
        dispatch(
          updateCart({
            id: item.id,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
            pictureUrl: item.pictureUrl
          })
        )
      })
    }
    getBranches()
  }, [])
  useEffect(() => {
    const availableBranches = data?.getBranchesPaginated?.data?.filter(objeto => objeto.visibleOnWeb === true)
    if (sessionStorage.getItem('branchId') === null || sessionStorage.getItem('branchId') === 'undefined') {
      if (availableBranches && availableBranches?.length > 1) {
        handleSelectBranch.onOpen()
      } else if (availableBranches && availableBranches?.length === 1) {
        sessionStorage.setItem('branchId', JSON.stringify(availableBranches[0].id))
        router.reload()
      }
    }
  }, [data])
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="">
          <UsersNavBar menu={menu} />
        </div>
        <div className="flex-grow ">
          <UserContainer>{children}</UserContainer>
        </div>
        <SelectBranchProductsModal
          isOpen={handleSelectBranch.isOpen}
          onClose={handleSelectBranch.onClose}
          data={data?.getBranchesPaginated?.data?.filter(objeto => objeto.visibleOnWeb === true) as TDataBranch[]}
          loading={loading}
        />
        <div className="">
          <UsersFooter menu={menu} />
        </div>
      </div>
    </>
  )
}

export default ClientLayout
