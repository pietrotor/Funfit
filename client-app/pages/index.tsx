'use client'
import { GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'
import { getCategoryName } from '../helpers'
import ClientLayout from '@/components/templates/ClientLayout/ClientLayout'
import { UserProducts } from '@/components/organisms/Products/UserProducts'
import Container from '@/components/molecules/Container/Container'
import HeroShot from '@/components/atoms/FrontPage/heroShot'
import { TProductBranchData } from '@/interfaces/TData'
import {
  GetPublicProductsQuery,
  GetPublicProductsQueryVariables
} from '@/graphql/graphql-types'
import { sortObjectsByKey } from '@/helpers/sort.helper'
import apolloClientSSR from '@/graphql/apollo-ssr'
import { GET_PUBLIC_BRANCH_PRODUCTS } from '@/utils/queries'

const Index = ({ data }: { data: GetPublicProductsQuery }) => {
  const [currentBranchId, setBranchId] = useState<string>('')
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false)

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
      // getPublicProducts()
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
              loading={false}
              title={getCategoryName(category.name)}
            />
          </Container>
        )
      )}
    </ClientLayout>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async context => {
  try {
    const { data } = await apolloClientSSR.query<
      GetPublicProductsQuery,
      GetPublicProductsQueryVariables
    >({
      query: GET_PUBLIC_BRANCH_PRODUCTS,
      fetchPolicy: 'network-only'
    })

    return {
      props: {
        data
      },
      revalidate: 60
    }
  } catch (error) {
    return {
      props: {},
      revalidate: 60
    }
  }
}
