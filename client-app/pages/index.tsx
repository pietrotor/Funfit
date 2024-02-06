'use client'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import ClientLayout from '@/components/templates/ClientLayout/ClientLayout'
import { UserProducts } from '@/components/organisms/Products/UserProducts'
import Container from '@/components/molecules/Container/Container'
import HeroShot from '@/components/atoms/FrontPage/heroShot'
import { TProductBranchData } from '@/interfaces/TData'
import { useGetPublicProductsLazyQuery } from '@/graphql/graphql-types'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'

const Index: NextPage = () => {
  const [currentBranchId, setBranchId] = useState<string>('')
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false)
  const [getPublicProducts, { data, loading }] = useGetPublicProductsLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      branchId: currentBranchId,
      paginationInput: {}
    },
    onCompleted: data => {
      console.log(data)
    },
    onError: error => {
      showSuccessToast('Error al cargar los productos' + error, 'error')
    }
  })

  useEffect(() => {
    const branchId = sessionStorage.getItem('branchId')?.replace(/^"|"$/g, '')

    if (branchId) {
      setBranchId(branchId)
      setIsInitialLoadComplete(true)
    }
  }, [])

  useEffect(() => {
    const branchId = sessionStorage.getItem('branchId')?.replace(/^"|"$/g, '')

    if (branchId && isInitialLoadComplete) {
      getPublicProducts()
    }
  }, [isInitialLoadComplete, currentBranchId])

  return (
    <ClientLayout>
      <HeroShot />
      <Container>
        <UserProducts
          data={
            data?.getPublicProducts?.data?.filter(
              product => product.isVisibleOnWeb === true
            ) as TProductBranchData[]
          }
          loading={loading}
        />
      </Container>
    </ClientLayout>
  )
}

export default Index
