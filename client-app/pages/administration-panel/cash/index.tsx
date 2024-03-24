import { useEffect, useState } from 'react'
import { Chip, useDisclosure } from '@nextui-org/react'
import { GetServerSideProps } from 'next'

import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'

import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'

import { AdminButton } from '@/components/atoms/Button/AdminButton'
import InformationCard from '@/components/molecules/Card/InformationCard'
import { CashMovimentModal } from '@/components/atoms/modals/CashMovimentModal'
import { CloseCashRegister } from '@/components/atoms/modals/CloseCashRegisterModal'
import { OpenCashRegister } from '@/components/atoms/modals/OpenCashRegisterModal'
import useCustomGetCashTurnMovementQuery from '@/services/UseGetTurnMovementById'
import {
  useGetBranchByIdLazyQuery,
  useGetCashByIdLazyQuery
} from '@/graphql/graphql-types'
import { IsNotContent } from '@/components/atoms/IsNotContent'
import DateConverter from '@/components/atoms/DateConverter'
interface CashProps {
  user: any
}

function Cash({ user }: CashProps) {
  const handleMovementModal = useDisclosure()
  const handleCloseCashModal = useDisclosure()
  const handleOpenCashModal = useDisclosure()
  const [cashId, setCashId] = useState<string>('')

  const [getBranch, currentBranch] = useGetBranchByIdLazyQuery()
  const [getCashById, cash] = useGetCashByIdLazyQuery()

  useEffect(() => {
    const branchId = localStorage
      .getItem('branchId')
      ?.toString()
      .replace(/^"|"$/g, '')
    getBranch({
      variables: {
        getBranchByIdId: branchId
      },
      onCompleted: data => {
        setCashId(data.getBranchById?.data?.cashId)
        getCashById({
          variables: {
            getCashByIdId: data.getBranchById?.data?.cashId
          }
        })
      },
      onError: error => {
        console.log(error)
      }
    })
  }, [])

  const { loading, data, variables, setVariables, refetch } =
    useCustomGetCashTurnMovementQuery(
      cash.data?.getCashById?.data?.currentTurn?.id
    )
  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }
  return (
    <AdministrationLayout user={user} onSubmit={currentBranch.refetch}>
      <div className="m-auto mt-7 w-5/6 ">
        <h2 className="mb-2 text-center text-4xl font-extrabold text-gray-500 ">
          Administración de caja
        </h2>
        <section className="my-4 grid  gap-3 pt-6 md:gap-4 lg:grid-cols-2 xl:grid-cols-3 ">
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Dinero en caja:</div>
                <div>{cash.data?.getCashById?.data?.amount} bs.</div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="Coins"
                  className=" rounded-md text-white"
                  height="h-8"
                  width="w-8"
                />
              </span>
            </div>
          </InformationCard>
          {cash.data?.getCashById?.data?.isOpen && (
            <>
              <InformationCard className="h-full bg-slate-200 px-3 py-6">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">
                    <div className="text-xl">Horario de apertura:</div>
                    <div className="text-center">
                      {' '}
                      <DateConverter
                        showTime
                        dateString={
                          currentBranch.data?.getBranchById?.data?.cash
                            ?.currentTurn?.openInfo.date
                        }
                      />{' '}
                    </div>
                  </div>
                  <span className="rounded-full bg-secondary p-3 ">
                    <IconSelector
                      name="Calendar"
                      className=" rounded-md text-white"
                      height="h-8"
                      width="w-8"
                    />
                  </span>
                </div>
              </InformationCard>
              <InformationCard className="h-full bg-slate-200 px-3 py-6">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">
                    <div className="">Sucursal:</div>
                    <div>{currentBranch.data?.getBranchById?.data?.name}</div>
                  </div>
                  <span className="rounded-full bg-secondary p-3 ">
                    <IconSelector
                      name="Branch"
                      className=" rounded-md text-white"
                      height="h-8"
                      width="w-8"
                    />
                  </span>
                </div>
              </InformationCard>
              <InformationCard className="h-full bg-slate-200  px-3 py-6">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">
                    <div className="">Movimientos en caja:</div>
                    <div>
                      {
                        cash.data?.getCashById?.data?.currentTurn
                          ?.amountOfMovents
                      }
                    </div>
                  </div>
                  <span className="rounded-full bg-secondary p-3 ">
                    <IconSelector
                      name="CrossArrowsY"
                      className=" rounded-md text-white"
                      height="h-8"
                      width="w-8"
                    />
                  </span>
                </div>
              </InformationCard>
            </>
          )}
        </section>
        <div className=" flex justify-end space-x-5 text-end">
          {cash.data?.getCashById?.data?.isOpen ? (
            <AdminButton
              onClick={handleCloseCashModal.onOpen}
              color="danger"
              text="Cerrar caja"
              iconName="Padlock"
              addPlusIcon={false}
              showMinIcon={true}
            />
          ) : (
            <AdminButton
              onClick={handleOpenCashModal.onOpen}
              color="secondary"
              text="Abrir caja"
              iconName="Padlock"
              addPlusIcon={false}
              showMinIcon={true}
            />
          )}
          <AdminButton
            disabled={!cash.data?.getCashById?.data?.isOpen}
            onClick={handleMovementModal.onOpen}
            color="primary"
            text="Realizar movimieto"
            iconName="CrossArrowsY"
            addPlusIcon={false}
            showMinIcon={true}
          />
        </div>
        {cash.data?.getCashById?.data?.isOpen ? (
          <Table
            onChangeRow={row => handleChangeRow(row)}
            tableName="CAJA"
            onChangePage={page =>
              setVariables({ ...variables, currentPage: page })
            }
            itemsPerPage={variables?.rows}
            currentPage={variables?.currentPage}
            totalPages={variables?.totalPages}
            isLoading={loading}
            enablePagination={true}
            totalItems={variables?.totalRecords}
            titles={[
              { name: '#' },
              { name: 'Monto' },
              { name: 'Por concepto de' },
              { name: 'En fecha' },
              { name: 'Tipo de movimiento' },
              { name: 'Realizado por' }
            ]}
            items={(data?.getCashTurnMovements?.data || []).map(
              (movement, idx) => ({
                content: [
                  <h3 key={idx} className="text-sm">
                    {((variables?.currentPage || 0) - 1) *
                      (variables?.rows || 0) +
                      idx +
                      1}
                  </h3>,
                  <div key={idx} className="text-sm">
                    {movement.amount} Bs
                  </div>,
                  <div key={idx} className="text-left text-sm">
                    {movement.concept}
                  </div>,
                  <div key={idx} className="text-xs md:w-full w-[6rem]">
                    <DateConverter showTime dateString={movement.date} />
                  </div>,
                  <div key={idx} className="text-center text-sm font-bold">
                    <Chip color="success" variant="flat">
                      Activo
                    </Chip>
                  </div>,
                  <p key={idx}>
                    {movement.createdByInfo?.name}{' '}
                    {movement.createdByInfo?.lastName}
                  </p>
                ]
              })
            )}
          />
        ) : (
          <IsNotContent text="La caja no se encuetra abierta" />
        )}
        <CashMovimentModal
          cashId={cashId}
          onClose={handleMovementModal.onClose}
          isOpen={handleMovementModal.isOpen}
          onConfirm={() => {
            refetch()
            cash.refetch()
            setVariables({ ...variables, currentPage: 1 })
          }}
        />
        <CloseCashRegister
          cashId={cashId}
          onClose={handleCloseCashModal.onClose}
          isOpen={handleCloseCashModal.isOpen}
          onConfirm={refetch}
        />
        <OpenCashRegister
          cashId={cashId}
          onClose={handleOpenCashModal.onClose}
          isOpen={handleOpenCashModal.isOpen}
          onConfirm={refetch}
        />
      </div>
    </AdministrationLayout>
  )
}
export default Cash

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
