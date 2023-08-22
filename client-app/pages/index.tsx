import { NextPage } from 'next'
import React from 'react'
import ClientLayout from '@/components/layouts/clientView'
import { UserProducts } from '@/components/organisms/Products/UserProducts'
import Banner from '@/components/atoms/portada'
const Index: NextPage = () => {
  return (
    <ClientLayout>
      <Banner />
      <UserProducts />
    </ClientLayout>

  )
}

export default Index
