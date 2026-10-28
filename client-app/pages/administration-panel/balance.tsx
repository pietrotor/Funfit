import { GetServerSideProps } from 'next'

import { useForm } from 'react-hook-form'
import { ReactNode, useMemo, useState } from 'react'
import { Tab, Tabs } from '@nextui-org/react'
import { Banknote, MinusCircle, TrendingUp } from 'lucide-react'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import PageHeader from '@/components/molecules/PageHeader'
import StatCard from '@/components/molecules/StatCard'
import { formatBs } from '@/utils/formatBs'
import InputComponent from '@/components/atoms/Input'
import { useGetBusinessBalanceQuery } from '@/graphql/graphql-types'
import { useAppSelector } from '@/store/index'

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('es-BO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

type TAmountTone = 'success' | 'danger'

const AmountPill = ({
  tone,
  className = 'text-base',
  children
}: {
  tone: TAmountTone
  className?: string
  children: ReactNode
}) => (
  <p
    className={`num ml-auto mr-0 w-fit self-end rounded-md px-2 text-right font-semibold ${
      tone === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
    } ${className}`}
  >
    {children}
  </p>
)

interface SalesProps {
  user: any
}

function BalancePage({ user }: SalesProps) {
  const { currentBranch } = useAppSelector(state => state.branchReducer)
  const [scope, setScope] = useState<'all' | 'branch'>('all')
  const { control, watch } = useForm({
    defaultValues: {
      initialDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    }
  })

  const isBranchScope = scope === 'branch'
  const { data } = useGetBusinessBalanceQuery({
    variables: {
      endDate: watch('endDate'),
      initialDate: watch('initialDate'),
      branchId: isBranchScope ? currentBranch.id : null
    },
    skip: isBranchScope && !currentBranch.id,
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

  const balance = data?.getBusinessBalance?.data
  const result = balance?.result || 0

  return (
    <AdministrationLayout user={user}>
      <div className="m-auto w-full">
        <PageHeader title="Balance" />

        <div className="grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-4 md:space-y-0">
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
          />
        </div>
        <Tabs
          aria-label="Alcance del balance"
          className="mt-4"
          color="primary"
          variant="solid"
          selectedKey={scope}
          onSelectionChange={key => setScope(key as 'all' | 'branch')}
        >
          <Tab key="all" title="Todas las sucursales" />
          <Tab
            key="branch"
            title={`Sucursal activa${
              currentBranch.name ? ` (${currentBranch.name})` : ''
            }`}
          />
        </Tabs>

        <section className="mb-8 mt-6 grid gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-3">
          <StatCard
            label="Resultado del periodo"
            value={
              <span className={result >= 0 ? 'text-emerald-700' : 'text-red-600'}>
                {formatBs(result)}
              </span>
            }
            icon={TrendingUp}
            tone={result >= 0 ? 'success' : 'danger'}
          />
          <StatCard
            label="Ingresos"
            value={formatBs(balance?.totalEarnings || 0)}
            icon={Banknote}
            tone="success"
          />
          <StatCard
            label="Egresos"
            value={formatBs(balance?.totalExpenses || 0)}
            icon={MinusCircle}
            tone="danger"
          />
        </section>

        <section className="flex w-full justify-center pb-10">
          <div className="w-full max-w-3xl rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_1px_3px_rgba(28,25,23,0.04)]">
            <h2 className="text-center font-amsipro text-xl font-bold text-tertiary">
              Balance del periodo
            </h2>
            <p className="mt-1 text-center text-sm font-medium text-stone-500">
              {formatDate(watch('initialDate'))} -{' '}
              {formatDate(watch('endDate'))}
            </p>
            <div className="mt-4">
              <h4 className="font-amsipro text-base font-semibold uppercase tracking-wide text-stone-600">
                Ingresos
              </h4>
              <div className="mt-1 border-t border-stone-200"></div>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex w-full justify-between">
                <div className="flex w-fit items-center gap-1">
                  <IconSelector name="Branch" width="w-5" height="h-5" />
                  <p className="text-base font-semibold text-tertiary">
                    Puntos de venta
                  </p>
                </div>
                <AmountPill tone="success">
                  {formatBs(
                    balance?.salesByBranch.reduce(
                      (prevValue, branch) => prevValue + branch.total,
                      0
                    ) || 0
                  )}
                </AmountPill>
              </div>
              {(balance?.salesByBranch || []).map(branchSale => (
                <div className="grid w-full grid-cols-2" key={branchSale.id}>
                  <p className="ml-6 flex items-center gap-2 text-sm font-medium text-stone-700">
                    <span className="h-1 w-1 rounded-full bg-stone-400"></span>
                    {branchSale.name}
                  </p>
                  <p className="num mr-6 text-right text-sm font-medium text-stone-500">
                    {formatBs(branchSale.total)}
                  </p>
                </div>
              ))}
              <div className="flex w-full justify-between">
                <div className="flex w-fit items-center gap-1">
                  <IconSelector name="Truck" width="w-5" height="h-5" />
                  <p className="text-base font-semibold text-tertiary">
                    Distribuidores
                  </p>
                </div>
                <AmountPill tone="success">
                  {formatBs(
                    (balance?.totalPaid || 0) + (balance?.balance || 0)
                  )}
                </AmountPill>
              </div>
              {isBranchScope && (
                <p className="ml-6 text-xs text-stone-500">
                  Global (no depende de sucursal)
                </p>
              )}
            </div>
            <div className="mt-4">
              <h4 className="font-amsipro text-base font-semibold uppercase tracking-wide text-stone-600">
                Egresos
              </h4>
              <div className="mt-1 border-t border-stone-200"></div>
              <div className="mt-3 space-y-1">
                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-1">
                    <IconSelector name="Debts" width="w-5" height="h-5" />
                    <p className="text-base font-semibold text-tertiary">
                      Cuentas por cobrar
                    </p>
                  </div>
                  <AmountPill tone="danger">
                    {formatBs(balance?.balance || 0)}
                  </AmountPill>
                </div>
                {isBranchScope && (
                  <p className="text-xs text-stone-500">
                    Global (no depende de sucursal)
                  </p>
                )}
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-1">
                    <IconSelector name="Minus" width="w-5" height="h-5" />
                    <p className="text-base font-semibold text-tertiary">
                      Gastos registrados
                    </p>
                  </div>
                  <AmountPill tone="danger">
                    {formatBs(balance?.bills || 0)}
                  </AmountPill>
                </div>
                {(balance?.billsByBranch || []).map(branchBill => (
                  <div className="grid w-full grid-cols-2" key={branchBill.id}>
                    <p className="ml-6 flex items-center gap-2 text-sm font-medium text-stone-700">
                      <span className="h-1 w-1 rounded-full bg-stone-400"></span>
                      {branchBill.name}
                    </p>
                    <p className="num mr-6 text-right text-sm font-medium text-stone-500">
                      {formatBs(branchBill.total)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 border-t border-stone-200 pt-2">
              <div className="grid w-full grid-cols-4">
                <h4 className="col-span-2 font-amsipro font-semibold uppercase text-stone-600">
                  Subtotal
                </h4>
                <AmountPill tone="danger" className="text-lg font-bold">
                  {formatBs(balance?.totalExpenses || 0)}
                </AmountPill>
                <AmountPill tone="success" className="text-lg font-bold">
                  {formatBs(balance?.totalEarnings || 0)}
                </AmountPill>
              </div>
            </div>
            <div className="mt-2 border-t border-stone-200 pt-2">
              <div className="grid w-full grid-cols-4">
                <h2 className="col-span-2 font-amsipro text-lg font-bold uppercase text-tertiary">
                  Total
                </h2>
                {!isSuperavit ? (
                  <AmountPill tone="danger" className="text-2xl font-bold">
                    {formatBs(result)}
                  </AmountPill>
                ) : (
                  <p></p>
                )}
                {isSuperavit ? (
                  <AmountPill tone="success" className="text-2xl font-bold">
                    {formatBs(result)}
                  </AmountPill>
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
