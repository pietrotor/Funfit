import React, { useEffect, useState } from 'react'
// import { UserNavBar } from '@/components/organisms/navBar/UsersNavBar'
import { useDispatch } from 'react-redux'
import { useDisclosure } from '@nextui-org/react'
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
import { useGetBranchByIdLazyQuery, useGetBranchesPaginatedLazyQuery } from '@/graphql/graphql-types'
import { TDataBranch } from '@/interfaces/TData'
import { setBranchInformation } from '@/store/slices/e-commerceInformation/e-commerceInformationSlice'
export type TClientLayoutProps = {
  children: React.ReactNode
}

function ClientLayout({ children }: TClientLayoutProps) {
  const handleSelectBranch = useDisclosure()
  const dispatch = useDispatch()
  const [storedBranch, setStoredBranch] = useState<string>()
  const [getBranches, { data, loading }] = useGetBranchesPaginatedLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {}
    }
  })
  const [getBranchById] = useGetBranchByIdLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      getBranchByIdId: storedBranch
    },
    onCompleted: data => {
      console.log(data.getBranchById?.data)
      dispatch(setBranchInformation(data.getBranchById?.data))
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
    const branchSelected = sessionStorage
      .getItem('branchId')
      ?.replace(/^"|"$/g, '')
    getBranchById()
    setStoredBranch(branchSelected)

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

    if (
      sessionStorage.getItem('branchId') === null ||
      sessionStorage.getItem('branchId') === undefined
    ) {
      getBranches()
      handleSelectBranch.onOpen()
    }
  }, [])
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
          data={
            data?.getBranchesPaginated?.data?.filter(
              objeto => objeto.visibleOnWeb === true
            ) as TDataBranch[]
          }
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
