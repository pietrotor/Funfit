'use client'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { getCategoryName } from '../helpers'
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
        (category, idx) => (
          <Container id={category.id} key={idx}>
            <UserProducts
              data={category.products as TProductBranchData[]}
              loading={loading}
              title={getCategoryName(category.name)}
            />
          </Container>
        )
      )}
    </ClientLayout>
  )
}

export default Index
