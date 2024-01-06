import { useDisclosure, Chip } from '@nextui-org/react'
import { GetServerSideProps } from 'next'

import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'

import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'

import useCustomGetBranchesQuery from '@/services/UseBranches'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
import InformationCard from '@/components/molecules/Card/InformationCard'
import { CashMovimentModal } from '@/components/atoms/modals/CashMovimentModal'
import { CloseCashRegister } from '@/components/atoms/modals/CloseCashRegisterModal'

function Cash() {
  const handleMovementModal = useDisclosure()
  const handleCloseCashModal = useDisclosure()

  const { loading, data, refetch, variables, setVariables, setFilter } =
    useCustomGetBranchesQuery()

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  return (
    <AdministrationLayout>
      <div className="m-auto mt-16 w-5/6 ">
        <h2 className="mb-2 text-center text-4xl font-extrabold text-gray-500 ">
          Administración de caja
        </h2>
        <section className="my-4 grid  gap-3 pt-6 md:gap-4 lg:grid-cols-2 xl:grid-cols-3 ">
          <InformationCard className="bg-slate-200 px-3 py-6">
            <div className="flex justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Dinero en caja:</div>
                <div>200 bs.</div>
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
          <InformationCard className="bg-slate-200 px-3 py-6">
            <div className="flex justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Horario de apertura:</div>
                <div>04/01/2024 A Hrs: 09:05</div>
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
          <InformationCard className="bg-slate-200 px-3 py-6">
            <div className="flex justify-between">
              <div className="text-lg font-bold">
                <div className="">Sucursal:</div>
                <div>Central</div>
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
          <InformationCard className="bg-slate-200 px-3 py-6">
            <div className="flex justify-between">
              <div className="text-lg font-bold">
                <div className="">Movimientos en caja:</div>
                <div>20</div>
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
        </section>
        <div className=" flex justify-end space-x-5 text-end">
          <AdminButton
            onClick={handleCloseCashModal.onOpen}
            color="danger"
            text="Cerrar caja"
            iconName="Padlock"
            addPlusIcon={false}
            showMinIcon={true}
          />
          <AdminButton
            onClick={handleMovementModal.onOpen}
            color="primary"
            text="Realizar movimieto"
            iconName="CrossArrowsY"
            addPlusIcon={false}
            showMinIcon={true}
          />
        </div>
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
          onSearch={value => setFilter(value)}
          totalItems={variables?.totalRecords}
          titles={[
            { name: '#' },
            { name: 'Monto' },
            { name: 'Por concepto de' },
            { name: 'En fecha' },
            { name: 'Tipo de movimiento' }
          ]}
          items={(data?.getBranchesPaginated?.data || []).map(
            (branch, idx) => ({
              content: [
                <h3 key={idx} className="text-sm">
                  {((variables?.currentPage || 0) - 1) *
                    (variables?.rows || 0) +
                    idx +
                    1}
                </h3>,
                <div key={idx} className="text-sm">
                  {branch.name}
                </div>,
                <div key={idx} className="text-left text-sm">
                  {branch.city}
                </div>,
                <div key={idx} className="text-center text-sm">
                  <p>14:37</p>
                  <p>29 de diciembre de 2023  </p>
                </div>,
                <div key={idx} className="text-center text-sm font-bold">
                  <Chip color="success" variant="flat">
                    Activo
                  </Chip>
                </div>
              ]
            })
          )}
        />
        <CashMovimentModal onClose={handleMovementModal.onClose} isOpen={handleMovementModal.isOpen} onConfirm={() => console.log('successfull')}/>
        <CloseCashRegister onClose={handleCloseCashModal.onClose} isOpen={handleCloseCashModal.isOpen} onConfirm={() => console.log('successfull')}/>
      </div>
    </AdministrationLayout>
  )
}
export default Cash

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
