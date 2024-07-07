import React, { useMemo, useState } from 'react'
import { Chip, Image, Tab, Tabs, useDisclosure } from '@nextui-org/react'
import { GetServerSideProps } from 'next'
import AdministrationLayout from '@/components/templates/layouts'
import Table from '@/components/organisms/tableNext/Table'
import IconSelector from '@/components/atoms/IconSelector'
import { AddProductModal } from '@/components/atoms/modals/AddProductModal'
import {
  EditProductModal,
  TValueProductData
} from '@/components/atoms/modals/EditProductModal'
import {
  Product,
  ProductTypeEnum,
  StatusEnum,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation
} from '@/graphql/graphql-types'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { authUserHeader } from '@/utils/verificationUser'
import ButtonComponent from '@/components/atoms/Button'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
import { AddProductImageModal } from '@/components/atoms/modals/AddProductImageModal'
import { CombosTable } from '@/components/molecules/CombosTable'

interface IProduct {
  user: any
}

const Productos = ({ user }: IProduct) => {
  const [editProduct, setEditProduct] = useState<TValueProductData>()
  const [variables, setVariables] = useState<PaginationInterfaceState>({
    rows: 5,
    filter: '',
    currentPage: 1
  })
  const [variablesCombo, setVariablesCombo] =
    useState<PaginationInterfaceState>({
      rows: 5,
      filter: '',
      currentPage: 1
    })
  const [filter, setFilter] = useState<string>('')
  const [filterCombo, setFilterCombo] = useState<string>('')
  const [DeleteteProductMutation] = useDeleteProductMutation()
  const [UpdateUserMutationVariables] = useUpdateProductMutation()
  const [selectedTab, setSelectedTab] = useState('products')
  const handleAddProduct = useDisclosure()
  const handleEditProduct = useDisclosure()
  const handleUploadFileImage = useDisclosure()
  const handleConfirmDeleteProduct = useDisclosure()
  const filterProductDebounced = UseDebouncedValue(filter, 800)
  const filterComboDebounced = UseDebouncedValue(filterCombo, 800)

  const { loading, data, refetch } = useGetProductsQuery({
    variables: {
      paginationInput: {
        page: variables?.currentPage,
        rows: variables?.rows,
        filter: filterProductDebounced
      },
      type: ProductTypeEnum.SIMPLE
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

  const { data: comboData, refetch: refetchCombo } = useGetProductsQuery({
    variables: {
      paginationInput: {
        page: variablesCombo?.currentPage,
        rows: variablesCombo?.rows,
        filter: filterComboDebounced
      },
      type: ProductTypeEnum.COMBO
    },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setVariablesCombo({
        totalPages: data.getProducts?.totalPages || 1,
        rows: data.getProducts?.rows || 5,
        filter: filterProductDebounced,
        currentPage: data.getProducts?.currentPage || 1,
        totalRecords: data.getProducts?.totalRecords || 1
      })
    }
  })

  const isCombo = useMemo(() => selectedTab === 'combo', [selectedTab])

  const handleUpdateProduct = (productId: string) => {
    const product = data?.getProducts?.data?.find(
      product => product.id === productId
    )
    setEditProduct(product as TValueProductData)
    handleEditProduct.onOpen()
  }

  const handleSendUpdateUser = async (values: TValueProductData) => {
    UpdateUserMutationVariables({
      variables: {
        updateProductInput: {
          id: editProduct?.id,
          name: values.name,
          suggetedPrice: values.suggetedPrice,
          code: values.code,
          cost: values.cost,
          description: values.description,
          image: values.image,
          categoryId: values.categoryId
        }
      },
      onCompleted: data => {
        if (data.updateProduct?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.updateProduct.message || 'Ocurrio un error',
            'error'
          )
          return
        }
        showSuccessToast(
          data.updateProduct?.message || 'Usuario actualizado correctamente',
          'success'
        )
        refetch()
        handleEditProduct.onClose()
      }
    })
  }
  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  const handleChangeComboRow = (row: number) => {
    setVariablesCombo({ ...variables, rows: row, currentPage: 1 })
  }

  const handleDeleteProduct = (productId: string) => {
    const product = data?.getProducts?.data?.find(
      product => product.id === productId
    )
    setEditProduct(product as TValueProductData)
    handleConfirmDeleteProduct.onOpen()
  }

  const handleUploadImage = (productId: string) => {
    const product = data?.getProducts?.data?.find(
      product => product.id === productId
    )
    setEditProduct(product as TValueProductData)
    handleUploadFileImage.onOpen()
  }

  const handleUploadComboImage = (product: Product) => {
    setEditProduct(product as TValueProductData)
    handleUploadFileImage.onOpen()
  }

  const handleConfirmDelete = () => {
    DeleteteProductMutation({
      variables: {
        deleteProductId: editProduct?.id
      },
      onCompleted: data => {
        if (data.deleteProduct?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data?.deleteProduct?.message || 'error al eliminar',
            'error'
          )
          handleConfirmDeleteProduct.onClose()
        } else {
          showSuccessToast(
            data.deleteProduct?.message ||
              'El producto ha sido eliminado correctamente',
            'success'
          )
          refetch()
          handleConfirmDeleteProduct.onClose()
        }
      }
    })
  }

  return (
    <AdministrationLayout user={user}>
      <div className="m-auto mt-7  w-5/6 ">
        <h2 className="text-center text-4xl font-extrabold text-gray-500 ">
          Administración de productos
        </h2>
        <Tabs
          color="primary"
          size="lg"
          variant={'underlined'}
          selectedKey={selectedTab}
          onSelectionChange={tab => setSelectedTab(tab as string)}
          className="relative z-20"
        >
          <Tab
            key="simple"
            title={<p className="text-lg font-bold">Productos</p>}
          />
          <Tab
            key="combo"
            title={<p className="text-lg font-bold">Combos</p>}
          />
        </Tabs>

        <div className="relative -z-10 -mt-[6px] h-[2px] w-full bg-gray-200"></div>

        {selectedTab === 'simple' && (
          <>
            <AdminButton
              onClick={handleAddProduct.onOpen}
              color="secondary"
              text="Agregar nuevo producto"
              iconName="Box"
            />

            <Table
              tableName="Productos Simples"
              isLoading={loading}
              currentPage={variables.currentPage}
              totalItems={variables.totalRecords}
              totalPages={variables.totalPages}
              itemsPerPage={variables.rows}
              enablePagination={true}
              onSearch={value => {
                setFilter(value)
                setVariables({ ...variables, filter: value, currentPage: 1 })
              }}
              onChangeRow={row => handleChangeRow(row)}
              onChangePage={page =>
                setVariables({ ...variables, currentPage: page })
              }
              titles={[
                { name: '#' },
                { name: 'Imagen' },
                { name: 'Nombre' },
                { name: 'Categoría' },
                { name: 'Precio' },
                { name: 'Costo' },
                { name: 'Código' },
                { name: 'Descripción' },
                { name: 'Acciones' }
              ]}
              items={(data?.getProducts?.data || []).map((product, idx) => ({
                content: [
                  <h3 key={idx} className="text-sm">
                    {((variables?.currentPage || 0) - 1) *
                      (variables?.rows || 0) +
                      idx +
                      1}
                  </h3>,
                  <Image
                    alt="image"
                    width={100}
                    src={
                      product.image === 'null' || !product.image
                        ? 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
                        : product.image
                    }
                    key={idx}
                  />,
                  <div key={idx} className="text-left text-sm">
                    {product.name}
                  </div>,
                  <Chip
                    key={idx}
                    className="text-left text-sm"
                    variant="flat"
                    color={`${
                      product.category?.name === undefined
                        ? 'default'
                        : 'success'
                    }`}
                  >
                    {product.category?.name || 'Sin categoría'}
                  </Chip>,
                  product.suggetedPrice + ' Bs.',
                  product.cost + ' Bs.',
                  <div key={idx} className="text-left text-sm">
                    {product.code}
                  </div>,
                  <div key={idx} className="text-left text-sm">
                    {product.description}
                  </div>,
                  <div key={idx} className="flex justify-center space-x-1">
                    <ButtonComponent
                      onClick={() => handleUpdateProduct(product.id)}
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
                      onClick={() => handleDeleteProduct(product.id)}
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
                    <ButtonComponent
                      onClick={() => handleUploadImage(product.id)}
                      type="eye"
                      showTooltip
                      tooltipText="Actualizar foto"
                    >
                      <IconSelector
                        name="Upload"
                        color="text-secondary"
                        width="w-8"
                      />
                    </ButtonComponent>
                  </div>
                ]
              }))}
            />
          </>
        )}
        {isCombo && (
          <>
            <AdminButton
              onClick={handleAddProduct.onOpen}
              color="secondary"
              text="Agregar nuevo combo"
              iconName="Box"
            />
            <CombosTable
              combos={comboData?.getProducts?.data || []}
              changeRow={handleChangeComboRow}
              changePage={page =>
                setVariablesCombo(prevState => ({ ...prevState, page }))
              }
              onSearch={value => {
                setFilterCombo(value)
                setVariablesCombo({
                  ...variablesCombo,
                  filter: value,
                  currentPage: 1
                })
              }}
              pagination={variablesCombo}
              onDelete={handleDeleteProduct}
              onUpdate={handleUpdateProduct}
              onUpdateImage={handleUploadComboImage}
            />
          </>
        )}
      </div>

      <AddProductModal
        isOpen={handleAddProduct.isOpen}
        onClose={handleAddProduct.onClose}
        onAdd={isCombo ? refetchCombo : refetch}
        isCombo={selectedTab === 'combo'}
      />

      <EditProductModal
        isOpen={handleEditProduct.isOpen}
        onClose={handleEditProduct.onClose}
        handleSendUpdateUser={handleSendUpdateUser}
        values={editProduct as TValueProductData}
      />

      <AddProductImageModal
        isOpen={handleUploadFileImage.isOpen}
        onClose={handleUploadFileImage.onClose}
        onAdd={isCombo ? refetchCombo : refetch}
        values={editProduct as TValueProductData}
      />

      <ConfirmModal
        cancelText="Cancelar"
        color="error"
        confirmText="Eliminar"
        name="trash"
        title="Eliminar producto"
        onConfirm={handleConfirmDelete}
        message={`¿Esta seguro de eliminar a ${editProduct?.name} ?`}
        isOpen={handleConfirmDeleteProduct.isOpen}
        onClose={handleConfirmDeleteProduct.onClose}
      />
    </AdministrationLayout>
  )
}

export default Productos

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
