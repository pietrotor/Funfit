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
import { sortObjectsByKey } from '@/helpers/sort.helper'

const Index: NextPage = () => {
  const [currentBranchId, setBranchId] = useState<string>('')
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false)
  const [getPublicProducts, { data, loading }] = useGetPublicProductsLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      branchId: currentBranchId
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
      {sortObjectsByKey(data?.getPublicProducts?.data || [], 'name')?.map(
        category => (
          <Container key={category.id}>
            <UserProducts
              data={category.products as TProductBranchData[]}
              loading={loading}
              title={category.name.split('..')?.[1].trim()}
            />
          </Container>
        )
      )}
    </ClientLayout>
  )
}

export default Index
