'use client'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import ClientLayout from '@/components/templates/ClientLayout/ClientLayout'
import { UserProducts } from '@/components/organisms/Products/UserProducts'
import Container from '@/components/molecules/Container/Container'
import HeroShot from '@/components/atoms/FrontPage/heroShot'
import { TProductBranchData } from '@/interfaces/TData'
import { UseCustomeGetBranchProductQuery } from '@/hooks/UsePublicBranchProduct'

const Index: NextPage = () => {
  const [currentBranchId, setBranchId] = useState<string>('')
  const { data, loading } = UseCustomeGetBranchProductQuery(currentBranchId)

  useEffect(() => {
    const branchId = sessionStorage.getItem('branchId')?.replace(/^"|"$/g, '')

    if (branchId) {
      setBranchId(branchId)
    }
  }, [])

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
