import { Radio, RadioGroup } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'

import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import ButtonComponent from '@/components/atoms/Button'
import { TDataBranch } from '@/interfaces/TData'
import UseGetCustomSalesPaginated from '@/services/UseGetCustomSalesPaginated'
import { useAppSelector } from '@/store/index'
import InformationCard from '@/components/molecules/Card/InformationCard'
import InputComponent from '@/components/atoms/Input'
import ComboInput from '@/components/atoms/ComboInput'
// import { useGetUsersLazyQuery } from '@/graphql/graphql-types'
import DateConverter from '@/components/atoms/DateConverter'
import {
  PaymentMethodEnum,
  useGetUsersLazyQuery
} from '@/graphql/graphql-types'
import { useGetSalesSummary } from '@/services/useGetSalesSummary'

interface SalesProps {
  user: any
}

function Sales({ user }: SalesProps) {
  const router = useRouter()
  const { branches, currentBranch } = useAppSelector(
    state => state.branchReducer
  )
  const { control, watch } = useForm({
    defaultValues: {
      initialDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    }
  })
  const [branchSelected, setSelected] = useState<TDataBranch>(currentBranch)

  const { data: summaryData, setVariables: setSummaryVariables } =
    useGetSalesSummary()

  useEffect(() => {
    setSelected(currentBranch)
    setSummaryVariables(prevVariables => ({
      ...prevVariables,
      branchIds: [currentBranch.id],
      initialDate: watch('initialDate'),
      endDate: watch('endDate')
    }))
  }, [currentBranch])

  const [getUsers, { data: users }] = useGetUsersLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      paginationInput: {}
    }
  })
  const { data, setVariables, variables, loading } = UseGetCustomSalesPaginated(
    branchSelected.id
  )

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  function getTotalByPaymentMethod(method: PaymentMethodEnum) {
    return summaryData?.paymentMethods.find(
      paymentMethod => paymentMethod.method === method
    )
  }

  const getSalePaymentMethod = (paymentMethod: PaymentMethodEnum) => {
    switch (paymentMethod) {
      case PaymentMethodEnum.CARD:
        return {
          icon: <IconSelector name="CreditCard" />,
          text: 'Tarjeta'
        }
      case PaymentMethodEnum.QR_TRANSFER:
        return {
          icon: <IconSelector name="QrCode" />,
          text: 'QR'
        }
      case PaymentMethodEnum.CASH:
        return {
          icon: <IconSelector name="Cash" />,
          text: 'Efectivo'
        }
    }
  }

  return (
    <AdministrationLayout user={user}>
      <div className="m-auto mt-7 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Reporte de ventas
        </h3>
        <InformationCard className="mt-4 p-4 ">
          <h3>Sucursales</h3>
          <RadioGroup
            value={branchSelected.name}
            onValueChange={value => {
              setSelected(
                branches.find(branch => branch.name === value) as TDataBranch
              )
              setSummaryVariables(prevVariables => ({
                ...prevVariables,
                branchIds: [branches.find(branch => branch.name === value)!.id]
              }))
            }}
            className="mt-2"
          >
            <div className="grid grid-cols-5 gap-x-4 gap-y-2 ">
              {branches.map(branch => (
                <Radio key={branch.id} value={branch.name}>
                  {branch.name}
                </Radio>
              ))}
            </div>
          </RadioGroup>
        </InformationCard>

        <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-4 md:space-y-0">
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
              setSummaryVariables(prevVariables => ({
                ...prevVariables,
                branchIds: [currentBranch.id],
                initialDate: e
              }))
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
              setSummaryVariables(prevVariables => ({
                ...prevVariables,
                branchIds: [currentBranch.id],
                initialDate: e
              }))
            }}
          />
          <div className="col-start-1 col-end-3 rounded-md bg-white md:col-start-5 md:col-end-6 ">
            <ComboInput
              label="Vendedor"
              name="seller"
              control={control}
              onSelectionChange={e => {
                setVariables({ ...variables, saleBy: e })
                setSummaryVariables(prevVariables => ({
                  ...prevVariables,
                  branchIds: [currentBranch.id],
                  saleBy: e
                }))
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

        <section className="my-4 mb-8  grid gap-3 pt-6 md:gap-4 lg:grid-cols-2 xl:grid-cols-4">
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
          isLoading={loading}
          itemsPerPage={variables?.rows}
          currentPage={variables?.currentPage}
          totalPages={variables?.totalPages}
          enablePagination={true}
          totalItems={variables?.totalRecords}
          titles={[
            { name: '#' },
            { name: 'Fecha de venta' },
            { name: 'Monto total' },
            { name: 'Descuento' },
            { name: 'Método de pago' },
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
              <div key={idx} className="text-sm">
                <DateConverter dateString={sale.date} showTime />
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm font-bold">{sale.total} Bs</div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">{sale.discount || 'S/D'}</div>
              </div>,
              <div
                key={idx}
                className=" flex items-center justify-center gap-1 rounded-sm border border-primary p-1 text-primary"
              >
                {getSalePaymentMethod(sale.paymentMethod).icon}
                <p>{getSalePaymentMethod(sale.paymentMethod).text}</p>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm ">
                  {sale.products.map((product, idx) => (
                    <p
                      key={idx}
                      className="m-auto mt-1 w-fit rounded-full bg-blue-100 px-2 py-1 font-semibold text-blue-600"
                    >
                      {product.qty} - {product.product?.name}
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
                <div className="space-x-1">
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
                </div>
              </div>
            ]
          }))}
        />
      </div>
    </AdministrationLayout>
  )
}
export default Sales

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
