import React, { useEffect, useState } from 'react'
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
// import { SelectBranchProductsModal } from '@/components/atoms/modals/SelectBranchProductsModal'
import {
  useGetBranchByIdLazyQuery,
  useGetBranchesPaginatedLazyQuery
} from '@/graphql/graphql-types'
import { setBranchInformation } from '@/store/slices/e-commerceInformation/e-commerceInformationSlice'
export type TClientLayoutProps = {
  children: React.ReactNode
}

function ClientLayout({ children }: TClientLayoutProps) {
  const handleSelectBranch = useDisclosure()
  const dispatch = useDispatch()
  const router = useRouter()
  const [storedBranch, setStoredBranch] = useState<string>()
  const [getBranches, { data }] = useGetBranchesPaginatedLazyQuery({
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
    getBranches()

    if (
      sessionStorage.getItem('branchId') === null ||
      sessionStorage.getItem('branchId') === undefined
    ) {
      getBranches()
      handleSelectBranch.onOpen()
    }
  }, [])
  useEffect(() => {
    const availableBranches = data?.getBranchesPaginated?.data?.filter(
      objeto => objeto.visibleOnWeb === true
    )
    if (
      sessionStorage.getItem('branchId') === null ||
      sessionStorage.getItem('branchId') === 'undefined'
    ) {
      if (availableBranches && availableBranches?.length > 1) {
        handleSelectBranch.onOpen()
      } else if (availableBranches && availableBranches?.length === 1) {
        sessionStorage.setItem(
          'branchId',
          JSON.stringify(availableBranches[0].id)
        )
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
        <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black/40">
          <div className="max-w-lg space-y-5 rounded-xl bg-white p-7">
            <h1>Tienda en mantenimiento</h1>
            <p>
              ¡Disculpa las molestias! Estamos realizando mejoras en nuestra
              tienda para brindarte una experiencia de compra aún mejor. Estamos
              trabajando arduamente para completar el mantenimiento lo antes
              posible
            </p>
          </div>
        </div>

        {/* <SelectBranchProductsModal
          isOpen={handleSelectBranch.isOpen}
          onClose={handleSelectBranch.onClose}
          data={
            data?.getBranchesPaginated?.data?.filter(
              objeto => objeto.visibleOnWeb === true
            ) as TDataBranch[]
          }
          loading={loading}
        /> */}
        <div className="">
          <UsersFooter menu={menu} />
        </div>
      </div>
    </>
  )
}

export default ClientLayout
