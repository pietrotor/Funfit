import { Tab, Tabs } from '@nextui-org/react'
import { GetServerSideProps } from 'next'
import AdministrationLayout from '@/components/templates/layouts'
import { authUserHeader } from '@/utils/verificationUser'
import Orders from '@/components/molecules/Orders'

interface OrderProps {
  user: any
}

function Order({ user }: OrderProps) {
  return (
    <AdministrationLayout user={user} profileButton={false}>
      <div className="m-auto mt-8 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Administración de pedidos
        </h3>
        <Tabs className="mt-16 w-full rounded bg-gray-100" color="secondary">
          <Tab title="Pedidos">
            <Orders ordersAcepted={undefined} />
          </Tab>
          <Tab title="Pedidos pendientes">
            <Orders ordersAcepted={false} />
          </Tab>
          <Tab title="Pedidos aceptados">
            <Orders ordersAcepted={true} />
          </Tab>
        </Tabs>
      </div>
    </AdministrationLayout>
  )
}

export default Order

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
