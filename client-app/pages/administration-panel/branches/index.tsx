import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'

import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import { StatusEnum, useDeleteBranchMutation } from '@/graphql/graphql-types'
import ButtonComponent from '@/components/atoms/Button'
import { AddBranchModal } from '@/components/atoms/modals/AddBranchModal'
import { EditBranchModal } from '@/components/atoms/modals/EditBranchModal'
import { TDataBranch } from '@/interfaces/TData'
import useCustomGetBranchesQuery from '@/services/UseBranches'
import { AdminButton } from '@/components/atoms/Button/AdminButton'

function Branches() {
  const [edit, setEdit] = useState<TDataBranch>({} as TDataBranch)

  const handleConfirmModal = useDisclosure()
  const handleEditModal = useDisclosure()
  const handleAddBranch = useDisclosure()
  const router = useRouter()

  const [DeleteteBranchMutation] = useDeleteBranchMutation()

  const { loading, data, refetch, variables, setVariables, setFilter } =
    useCustomGetBranchesQuery()

  const handleUpdateBranch = (branchId: number) => {
    const branch = data?.getBranchesPaginated?.data?.find(
      branch => branch.id === branchId
    )
    setEdit(branch as TDataBranch)

    handleEditModal.onOpen()
  }

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  const handleDeleteBranch = (BranchId: number) => {
    const branch = data?.getBranchesPaginated?.data?.find(
      branch => branch.id === BranchId
    )
    console.log(branch)
    setEdit(branch as TDataBranch)

    handleConfirmModal.onOpen()
  }

  const handleConfirmDelete = () => {
    DeleteteBranchMutation({
      variables: {
        deleteBranchId: edit?.id
      },
      onCompleted: data => {
        if (data.deleteBranch?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data?.deleteBranch.message || 'error al eliminar',
            'error'
          )
          handleConfirmModal.onClose()
        } else {
          showSuccessToast(
            data.deleteBranch?.message ||
              'La sucursal ha sido eliminado correctamente',
            'success'
          )
          refetch()
          handleConfirmModal.onClose()
        }
      }
    })

    handleConfirmModal.onClose()
  }

  return (
    <AdministrationLayout>
      <div className="m-auto mt-16 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Administración de Sucursales
        </h3>
        <div className="space-x-3 text-end">
          <AdminButton
            onClick={handleAddBranch.onOpen}
            color="secondary"
            text='Agregar nueva sucursal'
            iconName='Branch'
          />
        </div>
        <Table
          onChangeRow={row => handleChangeRow(row)}
          tableName="ALMACENES"
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
            { name: 'Ciudad' },
            { name: 'Direccion' },
            { name: 'Telefono' },
            { name: 'Codigo' },
            { name: 'Nit' },
            { name: 'Acciones' }
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
                <div key={idx} className="text-left text-sm">
                  {branch.direction}
                </div>,
                <div key={idx} className="text-left text-sm">
                  {branch.phone}
                </div>,
                <div key={idx} className="text-left text-sm">
                  {branch.code}
                </div>,
                <div key={idx} className="text-left text-sm">
                  {branch.nit}
                </div>,
                <div key={idx} className="flex justify-center space-x-1">
                  <ButtonComponent
                    onClick={() =>
                      router.push(`/administration-panel/branches/${branch.id}`)
                    }
                    type="eye"
                    showTooltip
                    tooltipText="Administrar Stock"
                    className="px-3"
                  >
                    <IconSelector
                      name="Branch"
                      color="text-secondary"
                      width="w-5"
                    />
                  </ButtonComponent>
                  <ButtonComponent
                    onClick={() => handleUpdateBranch(branch.id)}
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
                  <ButtonComponent
                    onClick={() => handleDeleteBranch(branch.id)}
                    type="delete"
                    showTooltip
                    tooltipText="Eliminar"
                  >
                    <IconSelector
                      name="trash"
                      color="text-danger"
                      width="w-8"
                    />
                  </ButtonComponent>
                </div>
              ]
            })
          )}
        />

        <AddBranchModal
          isOpen={handleAddBranch.isOpen}
          onClose={handleAddBranch.onClose}
          onAdd={refetch}
        />

        <EditBranchModal
          isOpen={handleEditModal.isOpen}
          onClose={handleEditModal.onClose}
          values={edit}
          onAdd={refetch}
        />

        <ConfirmModal
          isOpen={handleConfirmModal.isOpen}
          onClose={handleConfirmModal.onClose}
          onCancel={handleConfirmModal.onClose}
          title="Eliminar sucursal"
          message={`¿Esta seguro de eliminar a ${edit?.name}?`}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </AdministrationLayout>
  )
}
export default Branches

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
