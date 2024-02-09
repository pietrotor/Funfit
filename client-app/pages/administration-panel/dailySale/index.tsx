import { GetServerSideProps } from 'next'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@nextui-org/react'
import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import ButtonComponent from '@/components/atoms/Button'
import UseGetCustomSalesPaginated from '@/services/UseGetCustomSalesPaginated'
import { useAppSelector } from '@/store/index'
import InformationCard from '@/components/molecules/Card/InformationCard'
import DateConverter from '@/components/atoms/DateConverter'
import { useGetSalesSummary } from '@/services/index'
import { PaymentMethodEnum } from '@/graphql/graphql-types'
import { CandelSaleModal } from '@/components/atoms/modals/CancelSaleModal'

interface DailySaleProps {
  user: any
}

function DailySale({ user }: DailySaleProps) {
  const [edit, setEdit] = useState<string>('')
  const handleCancelModal = useDisclosure()
  const router = useRouter()
  const { currentBranch } = useAppSelector(state => state.branchReducer)

  const { data, setVariables, variables, setFilter, loading, refetch } =
    UseGetCustomSalesPaginated(currentBranch.id)

  const {
    data: summary,
    setVariables: setSummaryVariables,
    variables: summaryVariables
  } = useGetSalesSummary()

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  useEffect(() => {
    if (!currentBranch.id) return
    setSummaryVariables({
      ...summaryVariables,
      branchIds: [currentBranch.id],
      initialDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    })
  }, [currentBranch.id])

  useEffect(() => {
    setVariables({
      ...variables,
      branchIds: [currentBranch.id],
      initialDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    })
  }, [currentBranch.id])

  function getTotalByPaymentMethod(method: PaymentMethodEnum) {
    return summary?.paymentMethods.find(
      paymentMethod => paymentMethod.method === method
    )
  }
  const handleCancelSale = (saleId: string) => {
    setEdit(saleId)
    handleCancelModal.onOpen()
  }

  return (
    <AdministrationLayout user= {user}>
      <div className="m-auto mt-7 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Ventas del día
        </h3>
        <section className="my-4 mb-8  grid gap-3 pt-6 md:gap-4 lg:grid-cols-2 xl:grid-cols-4">
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Total en ventas</div>
                <div className="text-center">{`${summary?.total || 0} Bs`}</div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="Coins"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Ventas en efectivo</div>
                <div className="text-center">
                  {getTotalByPaymentMethod(PaymentMethodEnum.CASH)?.total || 0}{' '}
                  Bs
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="Cash"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl"> Ventas por QR</div>
                <div className="text-center">
                  {getTotalByPaymentMethod(PaymentMethodEnum.QR_TRANSFER)
                    ?.total || 0}{' '}
                  Bs
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="QrCode"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Ventas por tarjeta</div>
                <div className="text-center">
                  {getTotalByPaymentMethod(PaymentMethodEnum.CARD)?.total || 0}{' '}
                  Bs
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="CreditCard"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
        </section>
        <Table
          onChangeRow={row => handleChangeRow(row)}
          tableName="Lista de ventas"
          onChangePage={page =>
            setVariables({ ...variables, currentPage: page })
          }
          itemsPerPage={variables?.rows}
          currentPage={variables?.currentPage}
          totalPages={variables?.totalPages}
          enablePagination={true}
          onSearch={value => setFilter(value)}
          totalItems={variables?.totalRecords}
          isLoading={loading}
          titles={[
            { name: '#' },
            { name: 'Código de venta' },
            { name: 'Estado' },
            { name: 'Fecha de venta' },
            { name: 'Monto total' },
            { name: 'Descuento' },
            { name: 'Productos' },
            { name: 'Vendedor' },
            { name: 'Acciones' }
          ]}
          items={(data?.getSalesPaginated?.data || []).map((sale, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {' '}
                {idx + 1}
              </h3>,
              <p key={idx} className="text-sm">
                {sale.code}
              </p>,
              <div key={idx} className="text-sm">
                <DateConverter showTime dateString={sale.date} />
              </div>,
              <div key={idx} className={`m-auto mt-1 w-fit rounded-full  px-2 py-1 font-semibold ${sale.canceled ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                {sale.canceled ? 'Cancelada' : 'Activa'}
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">{sale.total} Bs</div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">
                  {sale.discount ? sale.discount + 'Bs' : '-'}
                </div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">
                  {sale.products.map((product, idx) => (
                    <p
                      key={idx}
                      className="m-auto w-fit rounded-full bg-blue-100 px-2 py-1 font-semibold text-blue-600"
                    >
                      {product.product?.name}
                    </p>
                  ))}
                </div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">
                  {sale.createdByInfo?.name} {sale.createdByInfo?.lastName}
                </div>
              </div>,
              <div key={idx}>
                <div className="space-x-1 flex">
                  <ButtonComponent
                    onClick={() =>
                      router.push(`/administration-panel/sales/${sale.id}`)
                    }
                    type="edit"
                    showTooltip
                    tooltipText="Ver detalles de venta"
                    className="px-3"
                  >
                    <IconSelector
                      name="Recipe"
                      color="text-primary"
                      width="w-8"
                    />
                  </ButtonComponent>
                  <ButtonComponent
                    onClick={() =>
                      handleCancelSale(sale.id)
                    }
                    type="delete"
                    showTooltip
                    tooltipText="Cancelar venta"
                    className="px-3"
                    disabled={sale?.canceled || false}
                  >
                    <IconSelector
                      name="CircleMinus"
                      color="text-red-500"
                      width="w-5"
                    />
                  </ButtonComponent>
                </div>
              </div>
            ]
          }))}
        />
      </div>
      <CandelSaleModal
      isOpen={handleCancelModal.isOpen}
      onClose={handleCancelModal.onClose}
      onConfirm={refetch}
      saleId={edit}
      />
    </AdministrationLayout>
  )
}
export default DailySale

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
