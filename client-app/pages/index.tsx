import { NextPage } from 'next'
import React from 'react'
import ClientLayout from '@/components/templates/ClientLayout/ClientLayout'
import { UserProducts } from '@/components/organisms/Products/UserProducts'
import Container from '@/components/molecules/Container/Container'
import HeroShot from '@/components/atoms/FrontPage/heroShot'
const Index: NextPage = () => {
  return (
    <ClientLayout>
      <HeroShot />
      <Container>
        <UserProducts />
      </Container>
    </ClientLayout>

  )
}

export default Index
