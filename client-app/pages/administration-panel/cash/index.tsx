import { useEffect, useState } from 'react'
import { Chip, useDisclosure } from '@nextui-org/react'
import { GetServerSideProps } from 'next'

import {
  ArrowLeftRight,
  Banknote,
  CalendarClock,
  Store,
  UserRound,
  Wallet
} from 'lucide-react'
import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'

import { authUserHeader } from '@/utils/verificationUser'

import { AdminButton } from '@/components/atoms/Button/AdminButton'
import PageHeader from '@/components/molecules/PageHeader'
import StatCard from '@/components/molecules/StatCard'
import { formatBs } from '@/utils/formatBs'
import { CashMovimentModal } from '@/components/atoms/modals/CashMovimentModal'
import { CloseCashRegister } from '@/components/atoms/modals/CloseCashRegisterModal'
import { OpenCashRegister } from '@/components/atoms/modals/OpenCashRegisterModal'
import useCustomGetCashTurnMovementQuery from '@/services/UseGetTurnMovementById'
import {
  TurnMovementTypeEnum,
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
      onError: () => {}
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
      <div className="m-auto w-full">
        <PageHeader
          title="Caja"
          actions={
            <>
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
                text="Realizar movimiento"
                iconName="CrossArrowsY"
                addPlusIcon={false}
                showMinIcon={true}
              />
            </>
          }
        />
        <section className="mb-6 grid gap-3 md:gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label="Dinero en caja"
            value={formatBs(cash.data?.getCashById?.data?.amount)}
            icon={Wallet}
            tone="primary"
            isLoading={cash.loading}
          />
          {cash.data?.getCashById?.data?.isOpen && (
            <>
              <StatCard
                label="Horario de apertura"
                value={
                  <DateConverter
                    showTime
                    dateString={
                      currentBranch.data?.getBranchById?.data?.cash
                        ?.currentTurn?.openInfo.date
                    }
                  />
                }
                icon={CalendarClock}
              />
              <StatCard
                label="Sucursal"
                value={currentBranch.data?.getBranchById?.data?.name}
                icon={Store}
              />
              <StatCard
                label="Movimientos en caja"
                value={
                  cash.data?.getCashById?.data?.currentTurn?.amountOfMovents ??
                  0
                }
                icon={ArrowLeftRight}
              />
              <StatCard
                label="Caja abrió con"
                value={formatBs(
                  cash.data?.getCashById?.data?.currentTurn?.openInfo?.amount ||
                    0
                )}
                icon={Banknote}
                tone="success"
              />
              <StatCard
                label="Aperturado por"
                value={`${
                  cash.data?.getCashById?.data?.currentTurn?.openInfo
                    ?.openByInfo?.name ?? ''
                } ${
                  cash.data?.getCashById?.data?.currentTurn?.openInfo
                    ?.openByInfo?.lastName ?? ''
                }`.trim()}
                icon={UserRound}
              />
            </>
          )}
        </section>
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
                    {formatBs(movement.amount)}
                  </div>,
                  <div key={idx} className="text-left text-sm">
                    {movement.concept}
                  </div>,
                  <div key={idx} className="text-xs md:w-full w-[6rem]">
                    <DateConverter showTime dateString={movement.date} />
                  </div>,
                  <div key={idx} className="text-center text-sm font-bold">
                    {movement.type === TurnMovementTypeEnum.ADD && (
                      <Chip color="success" variant="flat">
                        Ingreso
                      </Chip>
                    )}
                    {movement.type === TurnMovementTypeEnum.ADJUST && (
                      <Chip color="warning" variant="flat">
                        Ajuste
                      </Chip>
                    )}
                    {movement.type === TurnMovementTypeEnum.WITHDRAW && (
                      <Chip color="danger" variant="flat">
                        Salida
                      </Chip>
                    )}
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
          <IsNotContent text="La caja no se encuentra abierta" />
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
