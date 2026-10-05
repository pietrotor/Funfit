// import { Inter } from 'next/font/google'
import React from 'react'
import AdministrationLayout from '@/components/templates/layouts'
import { userValidation } from '@/services/UserValidation'
import { DAILY_SALE_PATH } from '@/utils/panelRoutes'

// const inter = Inter({ subsets: ['latin'] })
interface BranchesProps {
  user?: any
  children: React.ReactNode
  showBackButton?: boolean
}
export default function MainPage({
  user,
  children,
  showBackButton
}: BranchesProps) {
  return (
    <AdministrationLayout user={user} showBackButton={showBackButton}>
      {children}
    </AdministrationLayout>
  )
}
export const getServerSideProps = async (ctx: any) => {
  const result = await userValidation(ctx)
  if ('props' in result && (result.props as { user?: unknown })?.user) {
    return {
      redirect: {
        permanent: false,
        destination: DAILY_SALE_PATH
      }
    }
  }
  return result
}
