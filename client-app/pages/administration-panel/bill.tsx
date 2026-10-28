import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TrendingDown } from 'lucide-react'
import AdministrationLayout from '@/components/templates/layouts'
import { authUserHeader } from '@/utils/verificationUser'
import { useBills } from '@/services/useBills'
import { BillForm, BillTable } from '@/components/index'
import { BillPaginationInterface } from '@/interfaces/paginationInterfaces'
import { useBillController } from '@/hooks/use-bill-controller'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
import InputComponent from '@/components/atoms/Input'
import PageHeader from '@/components/molecules/PageHeader'
import StatCard from '@/components/molecules/StatCard'
import { formatBs } from '@/utils/formatBs'
import { useBillsSummary } from '@/services/useBillsSummary'
import { useAppSelector } from '@/store/index'

const BillPage = ({ user }: { user: any }) => {
  const { currentBranch } = useAppSelector(state => state.branchReducer)
  const { control, watch } = useForm({
    defaultValues: {
      initialDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    }
  })
  const { data, loading, refetch, setFilter, setVariables, variables } =
    useBills()
  const {
    data: dataSummary,
    refetch: refetchSummary,
    setVariables: setSummaryVariables
  } = useBillsSummary()
  const {
    disclosure,
    isMutating,
    onSubmit,
    onDelete,
    handleDelete,
    deleteDisclosure
  } = useBillController()
  const initialDate = watch('initialDate')
  const endDate = watch('endDate')

  useEffect(() => {
    if (!currentBranch.id) return
    setVariables(prevVariables => ({
      ...prevVariables,
      initialDate,
      endDate,
      branchId: currentBranch.id,
      currentPage: 1
    }))
    setSummaryVariables(prevVariables => ({
      ...prevVariables,
      initialDate,
      endDate,
      branchId: currentBranch.id
    }))
  }, [currentBranch.id, initialDate, endDate])
  return (
    <>
      <AdministrationLayout user={user}>
        <div className="m-auto w-full">
          <PageHeader
            title="Gastos"
            actions={
              <AdminButton
                onClick={disclosure.onOpen}
                color="secondary"
                text="Agregar nuevo gasto"
                iconName="Box"
              />
            }
          />
          <div className="mb-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:max-w-xl">
              <InputComponent
                isRequired={false}
                name="initialDate"
                label="Fecha inicial"
                type="date"
                className="rounded-md bg-white"
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
            <StatCard
              label="Egresos"
              value={formatBs(dataSummary?.getBillSummary?.data || 0)}
              icon={TrendingDown}
              tone="danger"
            />
          </div>
          <div className="py-3">
            <BillTable
              items={data?.getBills?.data || []}
              loading={loading}
              onChangePage={page =>
                setVariables({ ...variables, currentPage: page })
              }
              onChangeRow={row => setVariables({ ...variables, rows: row })}
              onFilter={setFilter}
              pagination={variables as BillPaginationInterface}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </AdministrationLayout>
      <BillForm
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
        isLoading={isMutating}
        onSubmit={data =>
          onSubmit(
            { ...data, branchId: currentBranch.id },
            () => {
              refetch()
              refetchSummary()
            }
          )
        }
      />
      <ConfirmModal
        cancelText="Cancelar"
        color="error"
        confirmText="Eliminar"
        loading={isMutating}
        name="trash"
        title="Eliminar Registro"
        onConfirm={() =>
          onDelete(() => {
            refetch()
            refetchSummary()
          })
        }
        message={'¿Esta seguro de eliminar este registro?'}
        isOpen={deleteDisclosure.isOpen}
        onClose={deleteDisclosure.onClose}
      />
    </>
  )
}

export default BillPage

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
