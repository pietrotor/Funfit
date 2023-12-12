import React, { useState } from 'react'
import { Button, Image, useDisclosure } from '@nextui-org/react'
import AdministrationLayout from '@/components/templates/layouts'
import Table from '@/components/organisms/tableNext/Table'
import IconSelector from '@/components/atoms/IconSelector'
import { AddProductModal } from '@/components/atoms/modals/AddProductModal'
import { EditProductModal, TValueProductData } from '@/components/atoms/modals/EditProductModal'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
import { StatusEnum, useDeleteProductMutation, useGetProductsQuery } from '@/graphql/graphql-types'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'

const Productos = () => {
  const [editProduct, setEditProduct] = useState <TValueProductData>({})
  const [variables, setVariables] = useState<PaginationInterfaceState>({})
  const [filter, setFilter] = useState <string>('')
  const [DeleteteProductMutation] = useDeleteProductMutation()
  const handleAddProduct = useDisclosure()
  const handleEditProduct = useDisclosure()
  const handleConfirmDeleteProduct = useDisclosure()
  const filterProductDebounced = UseDebouncedValue(filter, 2000)

  const { loading, data, refetch } = useGetProductsQuery({
    variables: {
      paginationInput: {
        page: variables?.currentPage,
        rows: variables?.rows,
        filter: variables?.filter
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
    console.log(productId)
    setFilter('asd')
    handleEditProduct.onOpen()
  }

  const handleSendUpdateUser = async (values: TValueProductData) => {
    try {
      console.log(values)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteUser = (productId: string) => {
    console.log(productId)
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
      titles={
        [
          { name: '#' },
          { name: 'Imagen' },
          { name: 'Nombre' },
          { name: 'Precio' },
          { name: 'Costo' },
          { name: 'Codigo' },
          { name: 'Descripción' },
          { name: 'Unidades' },
          { name: 'Acciones' }
        ]
      }
      items={ (data?.getProducts?.data || []).map((product, idx) => ({
        content: [idx + 1,
        <Image alt='image' src={ product.image || 'asd'} key={idx}/>,
        <div key={idx} className='text-sm text-left'>{product.name}</div>,
        product.price + ' Bs.',
        product.cost + ' Bs.',
        <div key={idx} className='text-sm text-left'>{product.code}</div>,
        <div key={idx} className='text-sm text-left'>{product.description}</div>,
        product.units + ' Unidades',
      <div key={idx} className="flex space-x-3">
        <Button
          onClick={() => handleUpdateProduct(product.id)}
          color="secondary"
          className="w-1/2"
        >
          Editar
        </Button>
        <Button onClick={() => handleDeleteUser(product.id)} color="danger" className="w-1/2">
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
