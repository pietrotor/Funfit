import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { GetServerSideProps } from 'next'

import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
// import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
// import {
//   EditWarehouseModal,
//   TValuesWarehouses
// } from '@/components/atoms/modals/EditWarehouseModal'
// import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
// import {
//   StatusEnum,
//   useDeleteWarehouseMutation,
//   useGetWarehousesQuery,
//   useUpdateWarehouseMutation
// } from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
// import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import ButtonComponent from '@/components/atoms/Button'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
import { ShowRecipeListModal } from '@/components/atoms/modals/ShowRecipeListModal'
import { EditRecipeModal } from '@/components/atoms/modals/EditRecipeModal'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
import { TDataRecipes } from '@/interfaces/TData'

function Sales() {
  const [edit, setEdit] = useState<TDataRecipes>({
    id: 4,
    name: 'Receta 4',
    ingredients: [
      {
        id: 1,
        name: 'Ingrediente 1',
        quantity: 5
      },
      {
        id: 2,
        name: 'Ingrediente 2',
        quantity: 5
      },
      {
        id: 3,
        name: 'Ingrediente 3',
        quantity: 5
      }
    ]
  })
  const [variables, setVariables] = useState<PaginationInterfaceState>({})
  // const [filter, setFilter] = useState<string>('')
  // const filtroDebounced = UseDebouncedValue(filter, 2000)
  const handleConfirmModal = useDisclosure()
  const handleEditModal = useDisclosure()
  const handleShowRecipeModal = useDisclosure()

  const dataRecipies: TDataRecipes[] = [
    {
      id: 1,
      name: 'Receta 1',
      ingredients: [
        {
          id: 1,
          name: 'Ingrediente 1',
          quantity: 5
        },
        {
          id: 2,
          name: 'Ingrediente 2',
          quantity: 5
        },
        {
          id: 3,
          name: 'Ingrediente 3',
          quantity: 5
        }
      ]
    },
    {
      id: 2,
      name: 'Receta 2',
      ingredients: [
        {
          id: 1,
          name: 'Ingrediente 1',
          quantity: 5
        },
        {
          id: 2,
          name: 'Ingredienteeee 2',
          quantity: 5
        },
        {
          id: 3,
          name: 'Ingredienteee 3',
          quantity: 5
        }
      ]
    },
    {
      id: 3,
      name: 'Receta 3',
      ingredients: [
        {
          id: 1,
          name: 'Ingrediente 1',
          quantity: 5
        },
        {
          id: 2,
          name: 'Ingrediente 2',
          quantity: 5
        },
        {
          id: 3,
          name: 'Ingrediente 3',
          quantity: 5
        }
      ]
    },
    {
      id: 4,
      name: 'Receta 4',
      ingredients: [
        {
          id: 1,
          name: 'Ingrediente 1',
          quantity: 5
        },
        {
          id: 2,
          name: 'Ingrediente 2',
          quantity: 5
        },
        {
          id: 3,
          name: 'Ingrediente 3',
          quantity: 5
        }
      ]
    }
  ]

  const handleShowRecipe = (id: number) => {
    setEdit(dataRecipies.find(recipe => recipe.id === id) as TDataRecipes)
    handleShowRecipeModal.onOpen()
  }

  // const [UpdateWarehousesMutationVariables] = useUpdateWarehouseMutation()
  // const [DeleteteWarehouseMutation] = useDeleteWarehouseMutation()

  // const { loading, data, refetch } = useGetWarehousesQuery({
  //   variables: {
  //     paginationInput: {
  //       rows: 5,
  //       filter: filtroDebounced
  //     }
  //   },
  //   fetchPolicy: 'network-only',
  //   onCompleted: data => {
  //     setVariables({
  //       totalPages: data.getWarehouses?.totalPages || 1,
  //       rows: data.getWarehouses?.rows || 5,
  //       filter: filtroDebounced,
  //       currentPage: data.getWarehouses?.currentPage || 1,
  //       totalRecords: data.getWarehouses?.totalRecords || 1
  //     })
  //   }
  // })

  // const handleSendUpdateWarehouse = async (values: TValuesWarehouses) => {
  //   await UpdateWarehousesMutationVariables({
  //     variables: {
  //       updateWarehouseInput: {
  //         address: values.address,
  //         description: values.description,
  //         id: values.id,
  //         name: values.name
  //       }
  //     },
  //     onCompleted: data => {
  //       showSuccessToast('Usuario actualizado', 'success')
  //       refetch()
  //       handleEditModal.onClose()
  //     },
  //     onError: error => {
  //       showSuccessToast('ocurrio un error', 'error')
  //       console.log(error)
  //     }
  //   })
  //   console.log(values)
  // }

  // const handleUpdateWarehouse = (idWarehouse: number) => {
  //   const warehouse = dataRecipies.find(
  //     warehouse => warehouse.id === idWarehouse
  //   )
  //   setEdit(warehouse as TDataRecipes)

  //   handleEditModal.onOpen()
  // }

  // const handleChangeRow = (row: number) => {
  //   setVariables({ ...variables, rows: row, currentPage: 1 })
  // }

  // const handleDeleteWarehouse = (WarehouseId: number) => {
  //   const warehouse = data?.getWarehouses?.data?.find(
  //     warehouse => warehouse.id === WarehouseId
  //   )
  //   setEdit(warehouse as TValuesWarehouses)

  //   handleConfirmModal.onOpen()
  // }

  const handleConfirmDelete = () => {
    console.log('delete')
    handleConfirmModal.onClose()
  }
  // const handleConfirmDelete = () => {
  //   DeleteteWarehouseMutation({
  //     variables: {
  //       deleteWarehouseId: edit.id
  //     },
  //     onCompleted: data => {
  //       if (data.deleteWarehouse?.status === StatusEnum.ERROR) {
  //         showSuccessToast(
  //           data?.deleteWarehouse?.message || 'error al eliminar',
  //           'error'
  //         )
  //         handleConfirmModal.onClose()
  //       } else {
  //         showSuccessToast(
  //           data.deleteWarehouse?.message ||
  //             'El Warehouse ha sido eliminado correctamente',
  //           'success'
  //         )
  //         refetch()
  //         handleConfirmModal.onClose()
  //       }
  //     }
  //   })

  //   handleConfirmModal.onClose()
  // }

  return (
    <AdministrationLayout>
      <div className="m-auto mt-16 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Reporte de ventas
        </h3>
        <AdminButton
          pathname="/administration-panel/recipies/AddRecipe"
          color="secondary"
          text="Crear nueva receta"
          iconName="Recipe"
        />
        <Table
          onChangeRow={row => console.log(row)}
          tableName="Lista de ventas"
          onChangePage={page =>
            setVariables({ ...variables, currentPage: page })
          }
          itemsPerPage={variables?.rows}
          currentPage={variables?.currentPage}
          totalPages={variables?.totalPages}
          enablePagination={true}
          onSearch={(value /** setFilter(value) */) => console.log(value)}
          totalItems={variables?.totalRecords}
          titles={[
            { name: '#' },
            { name: 'Fecha de venta' },
            { name: 'Monto total' },
            { name: 'Descuento' },
            { name: 'Productos' },
            { name: 'Vendedor' },
            { name: 'Acciones' }
          ]}
          items={(dataRecipies || []).map((warehouse, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {' '}
                {idx + 1}
              </h3>,
              <div key={idx} className="text-sm">
                {new Date().toLocaleDateString()}
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">Bs. 50.5 </div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">Bs. 5 </div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">Verduras </div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">Juan</div>
              </div>,
              <div key={idx}>
                <div className="space-x-1">
                  <ButtonComponent
                    onClick={() => handleShowRecipe(warehouse.id)}
                    type="edit"
                    showTooltip
                    tooltipText="Mostrar todos los ingredientes"
                    className="px-3"
                  >
                    <IconSelector
                      name="Recipe"
                      color="text-primary"
                      width="w-8"
                    />
                  </ButtonComponent>
                </div>
              </div>
            ]
          }))}
        />

        <ShowRecipeListModal
          isOpen={handleShowRecipeModal.isOpen}
          onClose={handleShowRecipeModal.onClose}
          data={edit as TDataRecipes}
        />
        <EditRecipeModal
          values={edit as TDataRecipes}
          isOpen={handleEditModal.isOpen}
          onClose={handleEditModal.onClose}
        />

        <ConfirmModal
          isOpen={handleConfirmModal.isOpen}
          onClose={handleConfirmModal.onClose}
          title="Eliminar receta"
          name="trash"
          color="error"
          message={`¿Esta seguro de eliminar ${edit?.name}?`}
          cancelText="Cancelar"
          confirmText="Eliminar"
          onConfirm={handleConfirmDelete}
        />
      </div>
    </AdministrationLayout>
  )
}
export default Sales

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
