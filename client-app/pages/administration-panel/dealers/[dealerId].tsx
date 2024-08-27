import { useEffect } from 'react'
import { GetServerSideProps } from 'next'

import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'

import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import ButtonComponent from '@/components/atoms/Button'
import { useCustomGetDistributorById } from '@/hooks/UseDistributorsQuery'
import { UseGetCustomDistributorsSalesPaginated } from '@/services/UseGetCustomDistributorsSalesPaginated'
import { useGetDistributorsSalesSummary } from '@/services/useGetDistributorsSalesSummary'
import DateConverter from '@/components/atoms/DateConverter'
import InformationCard from '@/components/molecules/Card/InformationCard'
import ComboInput from '@/components/atoms/ComboInput'
import InputComponent from '@/components/atoms/Input'
import {
  DistributorSalePaymentMethod,
  useGetUsersLazyQuery
} from '@/graphql/graphql-types'
interface BranchesProps {
  user: any
}

function DealersDetailPage({ user }: BranchesProps) {
  const router = useRouter()
  const { control, watch } = useForm({
    defaultValues: {
      initialDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    }
  })

  const { data } = useCustomGetDistributorById(router.query.dealerId as string)

  const {
    data: purchases,
    setVariables,
    variables,
    loading: loadingPurchases
  } = UseGetCustomDistributorsSalesPaginated()

  const { data: summaryData, setVariables: setSummaryVariables } =
    useGetDistributorsSalesSummary()

  useEffect(() => {
    setSummaryVariables(prevVariables => ({
      ...prevVariables,
      initialDate: watch('initialDate'),
      endDate: watch('endDate'),
      distributorsIds: [router.query.dealerId as string]
    }))
    setVariables(prevVariables => ({
      ...prevVariables,
      initialDate: watch('initialDate'),
      endDate: watch('endDate'),
      distributorsIds: [router.query.dealerId as string]
    }))
  }, [router.query.dealerId])

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  const [getUsers, { data: users }] = useGetUsersLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      paginationInput: {
        rows: 100
      }
    }
  })

  const getSalePaymentMethod = (
    paymentMethod: DistributorSalePaymentMethod
  ) => {
    switch (paymentMethod) {
      case DistributorSalePaymentMethod.CREDIT:
        return {
          icon: <IconSelector name="Bill" />,
          text: 'Crédito'
        }
      case DistributorSalePaymentMethod.MIXED:
        return {
          icon: <IconSelector name="Bill" />,
          text: 'Crédito - Contado'
        }
      case DistributorSalePaymentMethod.CASH:
        return {
          icon: <IconSelector name="Cash" />,
          text: 'Contado'
        }
    }
  }

  return (
    <AdministrationLayout user={user} showBackButton>
      <div className="m-auto mt-7 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Compras del distribuidor:{' '}
          <span className="text-primary">
            {data?.getDistributorById?.data?.name}
          </span>
        </h3>

        <div className="mb-5 mt-10 grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-4 md:space-y-0">
          <InputComponent
            isRequired={false}
            name="initialDate"
            label="Fecha inicial"
            type="date"
            className=" rounded-md bg-white"
            control={control}
            defaultValue={
              new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                .toISOString()
                .split('T')[0]
            }
            onValueChange={e => {
              setVariables({ ...variables, initialDate: e })
              setSummaryVariables({ ...variables, initialDate: e })
            }}
          />
          <InputComponent
            isRequired={false}
            name="finalDate"
            label="Fecha final"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="rounded-md bg-white"
            control={control}
            onValueChange={e => {
              setVariables({ ...variables, endDate: e })
              setSummaryVariables({ ...variables, endDate: e })
            }}
          />
          <div className="col-start-1 col-end-3 rounded-md bg-white md:col-start-5 md:col-end-6 ">
            <ComboInput
              label="Vendedor"
              name="seller"
              control={control}
              onSelectionChange={e => {
                setVariables({ ...variables, saleBy: e })
                setSummaryVariables({ ...variables, saleBy: e })
              }}
              onClick={() => getUsers()}
              options={
                users?.getUsers?.data?.map(user => ({
                  label: user.name,
                  value: user.id
                })) || [
                  {
                    label: 'cargando...',
                    value: ''
                  }
                ]
              }
            />
          </div>
        </div>

        <section className="mb-8  grid gap-3 pt-6 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Total en ventas</div>
                <div className="text-center">{summaryData?.total || 0} Bs</div>
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
          <InformationCard className="h-full !bg-blue-500 px-3 py-6 text-white">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Al Contado</div>
                <div className="text-center">
                  {summaryData?.totalPaid || 0}
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
          <InformationCard className="h-full !bg-red-500 px-3 py-6 text-white">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Créditos Pendientes</div>
                <div className="text-center">
                  {summaryData?.balance || 0} Bs
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="Recipe"
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
          tableName="Lista de ventas a distribuidores"
          onChangePage={page =>
            setVariables({ ...variables, currentPage: page })
          }
          isLoading={loadingPurchases}
          itemsPerPage={variables?.rows}
          currentPage={variables?.currentPage}
          totalPages={variables?.totalPages}
          enablePagination={true}
          totalItems={variables?.totalRecords}
          titles={[
            { name: '#' },
            { name: 'Almacen' },
            { name: 'Lista de precios' },
            { name: 'Fecha de venta' },
            { name: 'Monto total' },
            { name: 'Método de pago' },
            { name: 'Vendedor' },
            { name: 'Observaciones' },
            { name: 'Acciones' }
          ]}
          items={(purchases?.getDistributorSalesPaginated?.data || []).map(
            (sale, idx) => ({
              content: [
                <h3 key={idx} className="text-sm">
                  {' '}
                  {idx + 1}
                </h3>,
                <div key={idx} className="text-left">
                  <h3 className="text-sm">{sale.warehouse?.name}</h3>
                </div>,
                <div key={idx} className="text-left">
                  <h3 className="text-sm">{sale.priceList?.name}</h3>
                </div>,
                <div key={idx} className="w-[10rem] text-sm md:w-full">
                  <DateConverter dateString={sale.date} showTime />
                </div>,
                <div
                  key={idx}
                  className=" flex min-w-[100px] flex-col justify-center gap-2"
                >
                  <p className="text-sm font-bold">
                    Total: <span>{sale.total} Bs</span>
                  </p>
                  <p className="text-xs font-semibold text-blue-500">
                    Total pagado: <span>{sale.totalPaid} Bs</span>
                  </p>
                  {!!sale.balance && (
                    <p className="text-xs font-semibold text-red-500">
                      Saldo: <span>{sale.balance} Bs</span>
                    </p>
                  )}
                </div>,
                <div
                  key={idx}
                  className=" flex items-center justify-center gap-1 rounded-sm border border-primary p-1 text-primary"
                >
                  {getSalePaymentMethod(sale.paymentMethod).icon}
                  <p>{getSalePaymentMethod(sale.paymentMethod).text}</p>
                </div>,
                <div key={idx} className=" flex justify-center">
                  <div className="text-sm">
                    {sale.createdByInfo?.name} {sale.createdByInfo?.lastName}
                  </div>
                </div>,
                <div key={idx}>
                  {sale.canceled && (
                    <div className="flex h-full flex-col items-center justify-center gap-3">
                      <p className="m-auto w-fit bg-red-600 px-4 py-1 font-bold text-white">
                        Venta Anulada
                      </p>
                      <div>
                        <DateConverter dateString={sale.canceledAt} showTime />
                      </div>
                    </div>
                  )}
                </div>,
                <div key={idx}>
                  <div className="space-x-1">
                    <ButtonComponent
                      onClick={() =>
                        router.push(
                          `/administration-panel/sales/distributors/${sale.id}`
                        )
                      }
                      type="edit"
                      showTooltip
                      tooltipText="Ver detalles de venta"
                    >
                      <IconSelector
                        name="Recipe"
                        color="text-primary"
                        width="w-8"
                      />
                    </ButtonComponent>
                    {/* {!sale.canceled && (
                      <ButtonComponent
                        onClick={() => {
                          setSelectedItem(sale as any)
                          handleDeleteModal.onOpen()
                        }}
                        type="delete"
                        showTooltip
                        tooltipText="Eliminar"
                      >
                        <IconSelector
                          name="trash"
                          color="text-danger"
                          width="w-8"
                        />
                      </ButtonComponent>
                    )} */}
                  </div>
                </div>
              ]
            })
          )}
        />
      </div>
    </AdministrationLayout>
  )
}
export default DealersDetailPage

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
