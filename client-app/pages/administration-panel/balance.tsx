import { GetServerSideProps } from 'next'

import { useForm } from 'react-hook-form'
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
    }
  })

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
            name="finalDate"
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

        <section className="flex w-full justify-center">
          <div className="w-full max-w-3xl rounded-md border bg-white p-4 shadow-2xl">
            <h2 className="text-center">Balance del periodo</h2>
            <p className="text-center text-sm font-semibold text-gray-400">
              {new Date(watch('initialDate')).toDateString()} -{' '}
              {new Date(watch('endDate')).toDateString()}
            </p>
            <div className="mt-4">
              <h4 className="uppercase">Ingresos</h4>
              <div className="h-[1px] w-full bg-black"></div>
            </div>
            <div className="space-y-1">
              <p>Sucursales</p>
              {(data?.getBusinessBalance?.data?.salesByBranch || []).map(
                branchSale => (
                  <div className="grid w-full grid-cols-2" key={branchSale.id}>
                    <p className="ml-6 text-base font-semibold">
                      {branchSale.name}
                    </p>
                    <div className="grid w-full grid-cols-2">
                      <p></p>
                      <p className="mr-6 text-right text-base font-semibold">
                        {branchSale.total} Bs
                      </p>
                    </div>
                  </div>
                )
              )}
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
