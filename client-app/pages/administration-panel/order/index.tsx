import { Tab, Tabs } from '@nextui-org/react'
import { GetServerSideProps } from 'next'
import AdministrationLayout from '@/components/templates/layouts'
import { authUserHeader } from '@/utils/verificationUser'
import Orders from '@/components/molecules/Orders'
import { OrderStatusEnum } from '@/graphql/graphql-types'
import IconSelector from '@/components/atoms/IconSelector'

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
        <Tabs className="mt-16" color="primary" variant="solid">
          <Tab
            title={
              <div className="flex items-center gap-1">
                <IconSelector name="Clock" />
                <p>Pendientes</p>
              </div>
            }
          >
            <Orders orderStatus={OrderStatusEnum.PENDING} />
          </Tab>
          <Tab
            title={
              <div className="flex items-center gap-1">
                <IconSelector name="check" />
                <p>Aceptados</p>
              </div>
            }
          >
            <Orders orderStatus={OrderStatusEnum.ACEPTED} />
          </Tab>
          <Tab
            title={
              <div className="flex items-center gap-1">
                <IconSelector name="cart" />
                <p>Vendidos</p>
              </div>
            }
          >
            <Orders orderStatus={OrderStatusEnum.SOLD} />
          </Tab>
          <Tab
            title={
              <div className="flex items-center gap-1">
                <IconSelector name="Truck" />
                <p>Entregados</p>
              </div>
            }
          >
            <Orders orderStatus={OrderStatusEnum.DELIVERED} />
          </Tab>
          <Tab
            title={
              <div className="flex items-center gap-1">
                <IconSelector name="close" />
                <p>Rechazados</p>
              </div>
            }
          >
            <Orders orderStatus={OrderStatusEnum.REJECTED} />
          </Tab>
          <Tab
            title={
              <div className="flex items-center gap-1">
                <IconSelector name="Recipe" />
                <p>Todos</p>
              </div>
            }
          >
            <Orders orderStatus={undefined} />
          </Tab>
        </Tabs>
      </div>
    </AdministrationLayout>
  )
}

export default Order

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
