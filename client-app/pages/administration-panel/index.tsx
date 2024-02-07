// import { Inter } from 'next/font/google'
import React from 'react'
import AdministrationLayout from '@/components/templates/layouts'
import { userValidation } from '@/services/UserValidation'

// const inter = Inter({ subsets: ['latin'] })
interface BranchesProps {
  user?: any
  children: React.ReactNode
  showBackButton?: boolean
}
export default function MainPage({ user, children, showBackButton }: BranchesProps) {
  return (
    <AdministrationLayout user={user} showBackButton= {showBackButton}>
      {children}
    </AdministrationLayout>
  )
}
export const getServerSideProps = async (ctx: any) => {
  return userValidation(ctx)
}
