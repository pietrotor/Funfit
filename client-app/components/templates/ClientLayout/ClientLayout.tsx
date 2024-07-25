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
import { SelectBranchProductsModal } from '@/components/atoms/modals/SelectBranchProductsModal'
import { TDataBranch } from '@/interfaces/TData'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { ScheduleModal } from '@/components/molecules/ScheduleModal/ScheduleModal'
import Script from 'next/script'
export type TClientLayoutProps = {
  children: React.ReactNode
  hideCategories?: boolean
}

function ClientLayout({
  children,
  hideCategories = false
}: TClientLayoutProps) {
  const handleSelectBranch = useDisclosure()
  const dispatch = useDispatch()
  const router = useRouter()
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
      dispatch(setBranchInformation(data.getBranchById?.data))
    },
    onError: () => {
      showSuccessToast('Error al obtener la sucursal', 'error')
    }
  })

  const menu: TSections = [
    {
      text: 'Inicio',
      link: '/'
    }
    // {
    //   text: 'Contacto',
    //   link: '/contact'
    // },
    // {
    //   text: 'Seleccionar Sucursal',
    //   link: '/cart',
    //   onClick: () => {
    //     getBranches()
    //     handleSelectBranch.onOpen()
    //   }
    // }
  ]
  useEffect(() => {
    const cart = localStorage.getItem('cartItems')
    const details = localStorage.getItem('cartDetails')
    const branchSelected = sessionStorage
      .getItem('branchId')
      ?.replace(/^"|"$/g, '')
    setStoredBranch(branchSelected)
    if (storedBranch) {
      getBranchById()
    }

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
      <Script id="facebook-pixel">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '558379483052411');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          className="hidden"
          src="https://www.facebook.com/tr?id=558379483052411&ev=PageView&noscript=1"
        />
      </noscript>

      <div className="flex min-h-screen flex-col font-amsipro">
        <div className="">
          <UsersNavBar menu={menu} hideCategories={hideCategories} />
        </div>
        <div className="flex-grow ">
          <UserContainer>{children}</UserContainer>
        </div>
        {/* <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black/40">
          <div className="max-w-lg space-y-5 rounded-xl bg-white p-7">
            <h1>Tienda en mantenimiento</h1>
            <p>
              ¡Disculpa las molestias! Estamos realizando mejoras en nuestra
              tienda para brindarte una experiencia de compra aún mejor. Estamos
              trabajando arduamente para completar el mantenimiento lo antes
              posible
            </p>
          </div>
            </div> */}
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
      <ScheduleModal />
    </>
  )
}

export default ClientLayout
