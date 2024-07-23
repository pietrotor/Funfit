import { GetServerSideProps } from 'next'

import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import InformationCard from '@/components/molecules/Card/InformationCard'
import InputComponent from '@/components/atoms/Input'
import { useGetBusinessBalanceQuery } from '@/graphql/graphql-types'

interface SalesProps {
  user: any
}

function BalancePage({ user }: SalesProps) {
  const { control, watch } = useForm({
    defaultValues: {
      initialDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    }
  })

  const { data } = useGetBusinessBalanceQuery({
    variables: {
      endDate: watch('endDate'),
      initialDate: watch('initialDate')
    },
    fetchPolicy: 'network-only'
  })

  const isSuperavit = useMemo(() => {
    if (
      (data?.getBusinessBalance?.data?.totalExpenses || 0) <=
      (data?.getBusinessBalance?.data?.totalEarnings || 0)
    ) {
      return true
    }
    return false
  }, [
    data?.getBusinessBalance?.data?.totalExpenses,
    data?.getBusinessBalance?.data?.totalEarnings
  ])

  return (
    <AdministrationLayout user={user}>
      <div className="m-auto mt-7 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Balance
        </h3>

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
          />
          <InputComponent
            isRequired={false}
            name="endDate"
            label="Fecha final"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="rounded-md bg-white"
            control={control}
            // onValueChange={e => {
            //   setVariables({ ...variables, endDate: e })
            //   setSummaryVariables(prevVariables => ({
            //     ...prevVariables,
            //     branchIds: [currentBranch.id],
            //     endDate: e
            //   }))
            // }}
          />
        </div>

        <section className="my-4 mb-8  grid gap-3 pt-6 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-center">
              <div
                className={`text-lg font-bold ${
                  (data?.getBusinessBalance?.data?.result || 0) >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                <div className="text-xl">Resultado del periodo</div>
                <div className={'text-center'}>
                  {data?.getBusinessBalance?.data?.result || 0} Bs
                </div>
              </div>
            </div>
          </InformationCard>
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Ingresos</div>
                <div className="text-center">
                  {data?.getBusinessBalance?.data?.totalEarnings || 0} Bs
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
                <div className="text-xl">Egresos</div>
                <div className="text-center">
                  {data?.getBusinessBalance?.data?.totalExpenses || 0} Bs
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="Minus"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
        </section>

        <section className="flex w-full justify-center pb-10">
          <div className="w-full max-w-3xl rounded-md border bg-white p-4 shadow-2xl">
            <h2 className="text-center">Balance del periodo</h2>
            <p className="text-center text-sm font-semibold text-gray-400">
              {new Date(watch('initialDate')).toDateString()} -{' '}
              {new Date(watch('endDate')).toDateString()}
            </p>
            <div className="mt-4">
              <h4 className="text-lg uppercase">Ingresos</h4>
              <div className="h-[1px] w-full bg-gray-300"></div>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex w-full justify-between">
                <div className="flex w-fit items-center gap-1">
                  <IconSelector name="Branch" width="w-5" height="h-5" />
                  <p className="text-base font-bold">Puntos de venta</p>
                </div>
                <p className="rounded-md bg-green-100 px-1 text-base font-semibold text-green-500">
                  {data?.getBusinessBalance?.data?.salesByBranch.reduce(
                    (prevValue, branch) => prevValue + branch.total,
                    0
                  ) || 0}{' '}
                  Bs
                </p>
              </div>
              {(data?.getBusinessBalance?.data?.salesByBranch || []).map(
                branchSale => (
                  <div className="grid w-full grid-cols-2" key={branchSale.id}>
                    <p className="ml-6 flex items-center gap-2 text-sm font-semibold">
                      <span className="h-1 w-1 rounded-full bg-black"></span>
                      {branchSale.name}
                    </p>
                    <div className="grid w-full grid-cols-2">
                      <p></p>
                      <p className="mr-6 text-right text-sm font-semibold text-gray-400">
                        {branchSale.total} Bs
                      </p>
                    </div>
                  </div>
                )
              )}
              <div className="flex w-full justify-between">
                <div className="flex w-fit items-center gap-1">
                  <IconSelector name="Truck" width="w-5" height="h-5" />
                  <p className="text-base font-bold">Distribuidores</p>
                </div>
                <p className="rounded-md bg-green-100 px-1 text-base font-semibold text-green-500">
                  {(data?.getBusinessBalance?.data?.totalPaid || 0) +
                    (data?.getBusinessBalance?.data?.balance || 0)}{' '}
                  Bs
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-lg uppercase">Egresos</h4>
              <div className="h-[0.5px] w-full bg-gray-300"></div>
              <div className="mt-3 space-y-1">
                <div className="grid w-full grid-cols-4">
                  <div className="col-span-2 flex w-full items-center gap-1">
                    <IconSelector name="Debts" width="w-5" height="h-5" />
                    <p className="text-base font-bold">Cuentas por cobrar</p>
                  </div>
                  <p className="ml-auto mr-0 w-fit justify-end self-end rounded-md bg-red-100 px-1 text-right text-base font-semibold text-red-500">
                    {data?.getBusinessBalance?.data?.balance || 0} Bs
                  </p>
                  <p className="text-base font-bold"></p>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <div className="grid w-full grid-cols-4">
                  <div className="col-span-2 flex w-full items-center gap-1">
                    <IconSelector name="Minus" width="w-5" height="h-5" />
                    <p className="text-base font-bold">Gastos registrados</p>
                  </div>
                  <p className="ml-auto mr-0 w-fit justify-end self-end rounded-md bg-red-100 px-1 text-right text-base font-semibold text-red-500">
                    {data?.getBusinessBalance?.data?.bills || 0} Bs
                  </p>
                  <p className="text-base font-bold"></p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="mb-1 h-[1px] w-full bg-gray-300"></div>
              <div className="grid w-full grid-cols-4">
                <h4 className="col-span-2 uppercase">Sub Total</h4>
                <p className="ml-auto mr-0 w-fit justify-end self-end rounded-md bg-red-100 px-1 text-right text-lg font-bold text-red-500">
                  {data?.getBusinessBalance?.data?.totalExpenses || 0} Bs
                </p>
                <p className="ml-auto mr-0 w-fit justify-end self-end rounded-md bg-green-100 px-1 text-right text-lg font-bold text-green-500">
                  {data?.getBusinessBalance?.data?.totalEarnings || 0} Bs
                </p>
              </div>
            </div>
            <div className="mt-2">
              <div className="mb-1 h-[1px] w-full bg-gray-300"></div>
              <div className="grid w-full grid-cols-4">
                <h2 className="col-span-2 uppercase">Total</h2>
                {!isSuperavit ? (
                  <p className="ml-auto mr-0 w-fit justify-end self-end rounded-md bg-red-100 px-1 text-right text-2xl font-bold text-red-600">
                    {data?.getBusinessBalance?.data?.result || 0} Bs
                  </p>
                ) : (
                  <p></p>
                )}
                {isSuperavit ? (
                  <p className="ml-auto mr-0 w-fit justify-end self-end rounded-md bg-green-100 px-1 text-right text-2xl font-bold text-green-600">
                    {data?.getBusinessBalance?.data?.result || 0} Bs
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdministrationLayout>
  )
}
export default BalancePage

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
