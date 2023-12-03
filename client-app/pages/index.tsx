'use client'
import { NextPage } from 'next'
import React from 'react'
import ClientLayout from '@/components/templates/ClientLayout/ClientLayout'
import { UserProducts } from '@/components/organisms/Products/UserProducts'
import Container from '@/components/molecules/Container/Container'
import HeroShot from '@/components/atoms/FrontPage/heroShot'
import Providers from '@/components/redux/providers'

const Index: NextPage = () => {
  return (
    <Providers>
      <ClientLayout>
        <HeroShot />
        <Container>
          <UserProducts />
        </Container>
      </ClientLayout>
    </Providers>
  )
}

export default Index
