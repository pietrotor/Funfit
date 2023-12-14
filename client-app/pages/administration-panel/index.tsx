// import { Inter } from 'next/font/google'
import AdministrationLayout from '@/components/templates/layouts'
import { userValidation } from '@/services/UserValidation'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <AdministrationLayout>
      <h1>YOUR CONTENT</h1>
    </AdministrationLayout>
  )
}
export const getServerSideProps = async (ctx: any) => {
  return userValidation(ctx)
}
