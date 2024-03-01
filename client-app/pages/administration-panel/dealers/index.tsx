import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { GetServerSideProps } from 'next'

import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'

import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import ButtonComponent from '@/components/atoms/Button'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
import { useCustomGetDistributorsPaginated } from '@/hooks/UseDistributorsQuery'
import { AddDistributorModal } from '@/components/atoms/modals/AddDistributorModal'
import { TDistributor } from '@/interfaces/TData'
import { EditDistributorModal } from '@/components/atoms/modals/EditDistributorModal'
interface BranchesProps {
  user: any
}

function Dealers({ user }: BranchesProps) {
  const [edit, setEdit] = useState<TDistributor>({} as TDistributor)
  const handleEditModal = useDisclosure()
  const handleAddDistributor = useDisclosure()

  const { loading, data, refetch, variables, setVariables, setFilter } =
    useCustomGetDistributorsPaginated()

  const handleUpdateBranch = (id: number) => {
    const distributor = data?.getDistributorsPaginated?.data?.find(
      distributor => distributor.id === id
    )
    setEdit(distributor as TDistributor)

    handleEditModal.onOpen()
  }

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  return (
    <AdministrationLayout user={user}>
      <div className="m-auto mt-7 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Administración de distribuidores
        </h3>
        <div className="space-x-3 text-end">
          <AdminButton
            onClick={handleAddDistributor.onOpen}
            color="secondary"
            text="Agregar nuevo distribuidor"
            iconName="Branch"
          />
        </div>
        <Table
          onChangeRow={row => handleChangeRow(row)}
          tableName="DISTRIBUIDORES"
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
            { name: 'Nombre' },
            { name: 'Dirección' },
            { name: 'Correo' },
            { name: 'Teléfono' },
            { name: 'Nit' },
            { name: 'Razón social' },
            { name: 'Propietario' },
            { name: 'Acciones' }
          ]}
          items={(data?.getDistributorsPaginated?.data || []).map(
            (distributor, idx) => ({
              content: [
                <h3 key={idx} className="text-sm">
                  {((variables?.currentPage || 0) - 1) *
                    (variables?.rows || 0) +
                    idx +
                    1}
                </h3>,
                <div key={idx} className="text-center text-sm">
                  {distributor.name}
                </div>,
                <div key={idx} className="text-center text-sm w-[7vw]">
                  {distributor.address}
                </div>,
                <div key={idx} className="text-center text-sm">
                  {distributor.email}
                </div>,
                <div key={idx} className="text-center text-sm">
                  {distributor.phone}
                </div>,
                <div key={idx} className="text-center text-sm">
                  {distributor.nit}
                </div>,
                <div key={idx} className="text-center text-sm">
                  {distributor.socialReason}
                </div>,
                <div key={idx} className="flex flex-col text-center text-sm w-[7vw]">
                  <p>
                    {distributor.ownerInformation.name}{' '}
                    {distributor.ownerInformation.lastName}
                  </p>
                  <p> {distributor.ownerInformation.phone}</p>
                  <p>{distributor.ownerInformation.address}</p>
                </div>,
                <div key={idx} className="flex justify-center space-x-1">
                  <ButtonComponent
                    onClick={() => handleUpdateBranch(distributor.id)}
                    type="edit"
                    showTooltip
                    tooltipText="Editar"
                  >
                    <IconSelector
                      name="edit"
                      color="text-primary"
                      width="w-8"
                    />
                  </ButtonComponent>
                </div>
              ]
            })
          )}
        />

        <AddDistributorModal
          isOpen={handleAddDistributor.isOpen}
          onClose={handleAddDistributor.onClose}
          onAdd={refetch}
        />

        <EditDistributorModal
          isOpen={handleEditModal.isOpen}
          onClose={handleEditModal.onClose}
          values={edit}
          onEdit={refetch}
        />
      </div>
    </AdministrationLayout>
  )
}
export default Dealers

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
