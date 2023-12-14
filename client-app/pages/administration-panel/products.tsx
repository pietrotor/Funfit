import React, { useState } from 'react'
import { Button, Image, useDisclosure } from '@nextui-org/react'
import AdministrationLayout from '@/components/templates/layouts'
import Table from '@/components/organisms/tableNext/Table'
import IconSelector from '@/components/atoms/IconSelector'
import { AddProductModal } from '@/components/atoms/modals/AddProductModal'
import { EditProductModal, TValueProductData } from '@/components/atoms/modals/EditProductModal'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
import { StatusEnum, useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from '@/graphql/graphql-types'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { userValidation } from '@/services/UserValidation'

const Productos = () => {
  const [editProduct, setEditProduct] = useState <TValueProductData>({})
  const [variables, setVariables] = useState<PaginationInterfaceState>({})
  const [filter, setFilter] = useState <string>('')
  const [DeleteteProductMutation] = useDeleteProductMutation()
  const [UpdateUserMutationVariables] = useUpdateProductMutation()
  const handleAddProduct = useDisclosure()
  const handleEditProduct = useDisclosure()
  const handleConfirmDeleteProduct = useDisclosure()
  const filterProductDebounced = UseDebouncedValue(filter, 800)

  const { loading, data, refetch } = useGetProductsQuery({
    variables: {
      paginationInput: {
        page: variables?.currentPage,
        rows: variables?.rows,
        filter: filterProductDebounced
      }
    },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setVariables({
        totalPages: data.getProducts?.totalPages || 1,
        rows: data.getProducts?.rows || 5,
        filter: filterProductDebounced,
        currentPage: data.getProducts?.currentPage || 1,
        totalRecords: data.getProducts?.totalRecords || 1
      })
    }
  })
  console.log(data?.getProducts?.data)

  const handleUpdateProduct = (productId: number) => {
    const product = data?.getProducts?.data?.find(product => product.id === productId)
    setEditProduct(product as TValueProductData)
    handleEditProduct.onOpen()
  }

  const handleSendUpdateUser = async (values: TValueProductData) => {
    UpdateUserMutationVariables({
      variables: {
        updateProductInput: {
          id: editProduct.id,
          name: values.name,
          suggetedPrice: values.suggetedPrice,
          code: values.code,
          cost: values.cost,
          description: values.description,
          image: values.image
        }
      },
      onCompleted: data => {
        if (data.updateProduct?.status === StatusEnum.ERROR) {
          showSuccessToast(data.updateProduct.message || 'Ocurrio un error', 'error')
          return
        }
        showSuccessToast(data.updateProduct?.message || 'Usuario actualizado correctamente', 'success')
        refetch()
        handleEditProduct.onClose()
      }
    })
  }
  const handleChangeRow = (row:number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  const handleDeleteProduct = (productId: string) => {
    const product = data?.getProducts?.data?.find(product => product.id === productId)
    setEditProduct(product as TValueProductData)
    handleConfirmDeleteProduct.onOpen()
  }

  const handleConfirmDelete = () => {
    DeleteteProductMutation(
      {
        variables: {
          deleteProductId: editProduct.id
        },
        onCompleted: data => {
          if (data.deleteProduct?.status === StatusEnum.ERROR) {
            showSuccessToast(data?.deleteProduct?.message || 'error al eliminar', 'error')
            handleConfirmDeleteProduct.onClose()
          } else {
            showSuccessToast(data.deleteProduct?.message || 'El producto ha sido eliminado correctamente', 'success')
            refetch()
            handleConfirmDeleteProduct.onClose()
          }
        }
      }
    )
  }

  return <AdministrationLayout>
    <div className="m-auto w-5/6 mt-16 ">
    <h2 className='text-center font-extrabold text-2xl text-gray-500 '>Administración de productos</h2>
    <Button onClick={handleAddProduct.onOpen} color="secondary" className="float-right my-4 text-white font-extrabold">
          Agregar nuevo producto
          <IconSelector name="addUser" />
        </Button>
      <Table
      tableName='Productos'
      isLoading={loading}
      currentPage={variables.currentPage}
      totalItems={variables.totalRecords}
      totalPages={variables.totalPages}
      itemsPerPage={variables.rows}
      enablePagination={true}
      onSearch={ value => setFilter(value) }
      onChangeRow={row => handleChangeRow(row)}
      onChangePage={page => setVariables({ ...variables, currentPage: page }) }

      titles={
        [
          { name: '#' },
          { name: 'Imagen' },
          { name: 'Nombre' },
          { name: 'Precio' },
          { name: 'Costo' },
          { name: 'Codigo' },
          { name: 'Descripción' },
          { name: 'Acciones' }
        ]
      }
      items={ (data?.getProducts?.data || []).map((product, idx) => ({
        content: [idx + 1,
        <Image alt='image' src={ product.image || 'asd'} key={idx}/>,
        <div key={idx} className='text-sm text-left'>{product.name}</div>,
        product.suggetedPrice + ' Bs.',
        product.cost + ' Bs.',
        <div key={idx} className='text-sm text-left'>{product.code}</div>,
        <div key={idx} className='text-sm text-left'>{product.description}</div>,
      <div key={idx} className="flex space-x-3">
        <Button
          onClick={() => handleUpdateProduct(product.id)}
          color="secondary"
          className="w-1/2"
        >
          Editar
        </Button>
        <Button onClick={() => handleDeleteProduct(product.id)} color="danger" className="w-1/2">
          Eliminar
        </Button>
      </div>
        ]
      }))} />
    </div>

    <AddProductModal
      isOpen={handleAddProduct.isOpen}
      onClose={handleAddProduct.onClose}
      onAdd={refetch}
    />

    <EditProductModal
      isOpen={handleEditProduct.isOpen}
      onClose={handleEditProduct.onClose}
      handleSendUpdateUser={ handleSendUpdateUser}
      values={ editProduct }
    />

    <ConfirmModal
      onCancel={() => console.log()}
      title='Eliminar producto'
      onConfirm={ handleConfirmDelete }
      message={`Seguro que quiere eliminar a ${editProduct.name} ?`}
      isOpen={handleConfirmDeleteProduct.isOpen}
      onClose={handleConfirmDeleteProduct.onClose}
    />

  </AdministrationLayout>
}

export default Productos

export const getServerSideProps = async (ctx: any) => {
  return await userValidation(ctx)
}
