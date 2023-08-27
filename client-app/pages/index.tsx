import { NextPage } from 'next'
import React from 'react'
import ClientLayout from '@/components/layouts/clientView'
import { UserProducts } from '@/components/organisms/Products/UserProducts'
import Banner from '@/components/atoms/portada'
import Container from '@/components/molecules/Container'
const Index: NextPage = () => {
  return (
    <ClientLayout>
      <Banner />
      <Container>
        <UserProducts />
      </Container>
    </ClientLayout>

  )
}

export default Index
