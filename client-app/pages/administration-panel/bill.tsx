import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AdministrationLayout from '@/components/templates/layouts'
import { authUserHeader } from '@/utils/verificationUser'
import { useBills } from '@/services/useBills'
import { BillForm, BillTable } from '@/components/index'
import { BillPaginationInterface } from '@/interfaces/paginationInterfaces'
import { useBillController } from '@/hooks/use-bill-controller'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
import InputComponent from '@/components/atoms/Input'
import InformationCard from '@/components/molecules/Card/InformationCard'
import IconSelector from '@/components/atoms/IconSelector'
import { useBillsSummary } from '@/services/useBillsSummary'

const BillPage = ({ user }: { user: any }) => {
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
  useEffect(() => {
    setVariables(prevVariables => ({
      ...prevVariables,
      initialDate: watch('initialDate'),
      endDate: watch('endDate')
    }))
    setSummaryVariables(prevVariables => ({
      ...prevVariables,
      initialDate: watch('initialDate'),
      endDate: watch('endDate')
    }))
  }, [])
  return (
    <>
      <AdministrationLayout user={user}>
        <div className="m-auto mt-7 w-5/6 ">
          <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
            Registro de gastos
          </h3>
          <div className="flex justify-end pt-2">
            <InformationCard className="h-full w-full !max-w-sm bg-slate-200 px-3 py-6">
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold">
                  <div className="text-xl">Egresos</div>
                  <div className="text-center">
                    {dataSummary?.getBillSummary?.data || 0} Bs
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
          </div>

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
              }}
            />
          </div>
          <div className="flex justify-end">
            <AdminButton
              onClick={disclosure.onOpen}
              color="secondary"
              text="Agregar nuevo gasto"
              iconName="Box"
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
          onSubmit(data, () => {
            refetch()
            refetchSummary()
          })
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
