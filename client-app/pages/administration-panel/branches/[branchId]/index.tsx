import { Chip, Image, Switch, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { GetServerSideProps } from 'next'
import { CircularProgressbar } from 'react-circular-progressbar'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { AddBranchProductModal } from '@/components/atoms/modals/AddBranchProductModal'
import PageHeader from '@/components/molecules/PageHeader'
import InformationCard from '@/components/molecules/Card/InformationCard'
import {
  useGetBranchProductQuery,
  useUpdateBranchProductQuery
} from '@/hooks/UseBranchQuery'
import Table from '@/components/organisms/tableNext/Table'
import Pagination from '@/components/organisms/tableNext/Pagination'
import { UseGetBranchByIdQuery } from '@/hooks/UseBranchByIdQuery'
import ButtonComponent from '@/components/atoms/Button'
import { MoveBranchStockModal } from '@/components/atoms/modals/MoveBranchStockModal'
import { TProductBranchData } from '@/interfaces/TData'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
import {
  ProductTypeEnum,
  StatusEnum,
  useDeleteBranchProductMutation,
  useUpdateBranchMutation
} from '@/graphql/graphql-types'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { authUserHeader } from '@/utils/verificationUser'
import { UpdateBranchProductModal } from '@/components/atoms/modals/UpdateBranchProductModal'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
import { StockComboCircularProgressBar } from '@/components/atoms/StockComboCircularProgressBar/StockComboCircularProgressBar'
import { formatBs } from '@/utils/formatBs'
import { ProductLabel } from '@/components/molecules'

interface ProductOnBranchProps {
  user: any
}
function ProductOnBranch({ user }: ProductOnBranchProps) {
  const router = useRouter()
  const { branchId } = router.query
  const [editProduct, setEditProduct] = useState<TProductBranchData>()
  const [isAviable, setIsAviable] = useState<boolean>(false)
  const handleAddBranchProduct = useDisclosure()
  const handleMoveStock = useDisclosure()
  const handleUpdatePrice = useDisclosure()
  const handleDeleteProduct = useDisclosure()
  const { loading, data, refetch, variables, setVariables, setFilter } =
    useGetBranchProductQuery(branchId as string)
  const { handleUpdateBranchProduct } = useUpdateBranchProductQuery()
  const { data: branchData } = UseGetBranchByIdQuery(branchId as string)
  const [deleteProductMutation, { loading: loadingDelete }] =
    useDeleteBranchProductMutation({
      onCompleted(data) {
        if (data.deleteBranchProduct?.status !== StatusEnum.OK) {
          showSuccessToast(
            data.deleteBranchProduct?.message || 'No se pudo borra el producto',
            'error'
          )
          return
        }
        showSuccessToast(
          data.deleteBranchProduct?.message ||
            'Se elimino el producto correctamente',
          'success'
        )
        handleDeleteProduct.onClose()
        refetch()
      },
      onError() {
        showSuccessToast('No se pudo eliminar el producto', 'error')
      }
    })
  const branchInfo = branchData?.getBranchById?.data

  const handleDelete = () => {
    deleteProductMutation({
      variables: {
        id: editProduct?.id
      }
    })
  }

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  const [updateBranchInput] = useUpdateBranchMutation()
  const handleUpdateVisibilityOnBranch = () => {
    updateBranchInput({
      variables: {
        updateBranchInput: {
          id: branchId as string,
          visibleOnWeb: isAviable
        }
      },
      onCompleted: data => {
        if (data.updateBranch?.status === StatusEnum.ERROR) {
          showSuccessToast(
            'Ocurrió un error al actualizar la sucursal',
            'error'
          )
        } else {
          showSuccessToast('La sucursal se actualizó correctamente', 'success')
        }
      },
      onError: () => {
        showSuccessToast('Ocurrió un error al actualizar la sucursal', 'error')
      }
    })
  }

  const handleSwitchChange = (
    productBranch: TProductBranchData,
    field: string
  ) => {
    handleUpdateBranchProduct(productBranch, field, refetch)
  }
  const handleEdit = (
    productBranch: TProductBranchData,
    isDeliting?: boolean
  ) => {
    setEditProduct(productBranch)
    if (!isDeliting) handleMoveStock.onOpen()
    else handleDeleteProduct.onOpen()
  }

  const handleEditPrice = (productBranch: TProductBranchData) => {
    setEditProduct(productBranch)
    handleUpdatePrice.onOpen()
  }

  const branchProducts = data?.getBranchProductsPaginated?.data || []

  return (
    <AdministrationLayout user={user} showBackButton={true}>
      <div className="w-full space-y-5">
        <PageHeader
          title={branchInfo?.name || 'Sucursal'}
          description="Administración de productos de la sucursal"
          actions={
            <AdminButton
              iconName="Branch"
              text="Agregar producto"
              color="secondary"
              addPlusIcon={false}
              showMinIcon={true}
              onClick={handleAddBranchProduct.onOpen}
            />
          }
        />
        <div className="flex w-full items-center">
          <div className="hidden lg:flex lg:w-1/5 lg:justify-center">
            <Image
              className="h-full w-full rounded-lg object-cover"
              src="/common/missing_image.png"
              alt={`Imagen de ${branchInfo?.name || 'sucursal'}`}
              width={150}
            />
          </div>
          <div className="min-h-36 w-full lg:w-4/5">
            <InformationCard className="h-full w-full !max-w-none self-stretch rounded-2xl border border-stone-200">
              <section className="flex flex-col gap-4 p-4 sm:px-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-left text-2xl font-bold text-tertiary lg:text-3xl">
                    {branchInfo?.name}
                  </h2>
                  <Chip color="primary" variant="flat" className="shrink-0">
                    {branchInfo?.code}
                  </Chip>
                </div>
                <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">
                      Ciudad
                    </dt>
                    <dd className="break-words text-stone-700">
                      {branchInfo?.city || '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">
                      Teléfono
                    </dt>
                    <dd className="break-words text-stone-700">
                      {branchInfo?.phone || '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">
                      Dirección
                    </dt>
                    <dd className="break-words text-stone-700">
                      {branchInfo?.direction || '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">
                      NIT
                    </dt>
                    <dd className="break-words text-stone-700">
                      {branchInfo?.nit || '—'}
                    </dd>
                  </div>
                </dl>
                <div className="flex items-center justify-between gap-3 border-t border-stone-100 pt-3">
                  <p className="text-sm text-stone-700">Habilitado para ventas</p>
                  <Switch
                    size="sm"
                    aria-label="Habilitado para ventas"
                    isSelected={branchInfo?.visibleOnWeb}
                    onChange={() => {
                      setIsAviable(!isAviable)
                      handleUpdateVisibilityOnBranch()
                    }}
                  />
                </div>
              </section>
            </InformationCard>
          </div>
        </div>
        <div className="space-y-3 md:hidden">
          <div className="rounded-2xl bg-white p-4 shadow-md">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-stone-700">Productos</h3>
              <p className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-600">
                {variables?.totalRecords || branchProducts.length} registros
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border-2 border-stone-200 bg-stone-50 px-3 py-2">
              <input
                placeholder="Buscar por nombre o código"
                onChange={event => {
                  setFilter(event.target.value)
                  setVariables({ ...variables, currentPage: 1 })
                }}
                className="w-full appearance-none border-none bg-transparent text-base outline-none"
              />
            </div>
          </div>
          {loading && (
            <p className="py-6 text-center text-sm text-stone-500">
              Cargando productos...
            </p>
          )}
          {!loading && branchProducts.length === 0 && (
            <p className="rounded-2xl bg-white px-4 py-8 text-center text-sm text-stone-500 shadow-md">
              No hay productos en esta sucursal
            </p>
          )}
          {branchProducts.map((productBranch, idx) => (
            <article
              key={productBranch.id || idx}
              className="rounded-2xl bg-white p-4 shadow-md"
            >
              <ProductLabel
                code={productBranch.product?.code || ''}
                name={productBranch.product?.name || ''}
                image={productBranch.product?.image}
                type={productBranch.product?.type}
              />
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                    Precio
                  </p>
                  <p className="font-semibold text-tertiary">
                    {formatBs(productBranch.price)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                    Stock
                  </p>
                  {productBranch.product?.type === ProductTypeEnum.COMBO ? (
                    <div className="w-12">
                      <StockComboCircularProgressBar
                        branchProductId={productBranch.id}
                      />
                    </div>
                  ) : (
                    <p className="font-semibold text-tertiary">
                      {productBranch.stock}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-2 border-t border-stone-100 pt-3">
                <label className="flex items-center justify-between gap-3 text-sm text-stone-700">
                  Visible en el POS
                  <Switch
                    size="sm"
                    isSelected={productBranch.isVisibleOnMenu}
                    onChange={() =>
                      handleSwitchChange(
                        productBranch as TProductBranchData,
                        'menu'
                      )
                    }
                  />
                </label>
                <label className="flex items-center justify-between gap-3 text-sm text-stone-700">
                  Visible en la web
                  <Switch
                    size="sm"
                    isSelected={productBranch.isVisibleOnWeb}
                    onChange={() =>
                      handleSwitchChange(
                        productBranch as TProductBranchData,
                        'web'
                      )
                    }
                  />
                </label>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {productBranch.product?.type !== ProductTypeEnum.COMBO && (
                  <ButtonComponent
                    onClick={() =>
                      handleEdit(productBranch as TProductBranchData)
                    }
                    type="eye"
                    showTooltip={false}
                    className="min-h-11 px-3"
                  >
                    <span className="flex items-center gap-1 text-sm">
                      <IconSelector
                        name="Stock"
                        color="text-primary-600"
                        width="w-6"
                      />
                      Stock
                    </span>
                  </ButtonComponent>
                )}
                <ButtonComponent
                  onClick={() =>
                    handleEditPrice(productBranch as TProductBranchData)
                  }
                  type="edit"
                  showTooltip={false}
                  className="min-h-11 px-3"
                >
                  <span className="flex items-center gap-1 text-sm">
                    <IconSelector name="edit" color="text-primary" width="w-6" />
                    Precio
                  </span>
                </ButtonComponent>
                <ButtonComponent
                  type="delete"
                  showTooltip={false}
                  className="min-h-11 px-3 text-red-600"
                  onClick={() =>
                    handleEdit(productBranch as TProductBranchData, true)
                  }
                >
                  <span className="flex items-center gap-1 text-sm">
                    <IconSelector
                      name="trash"
                      className="text-red-600"
                      width="w-6"
                    />
                    Quitar
                  </span>
                </ButtonComponent>
              </div>
            </article>
          ))}
          <Pagination
            currentPage={variables?.currentPage}
            totalPages={variables?.totalPages}
            onChangePage={page =>
              setVariables({ ...variables, currentPage: page })
            }
          />
        </div>
        <div className="hidden md:block">
        <Table
          titles={[
            { name: '#' },
            { name: 'Producto' },
            { name: 'Precio' },
            { name: 'Stock' },
            { name: 'Visible en el POS' },
            { name: 'Visible en la Web' },
            { name: 'Acciones' }
          ]}
          items={(data?.getBranchProductsPaginated?.data || []).map(
            (productBranch, idx) => ({
              content: [
                <h3 key={idx} className="text-sm">
                  {((variables?.currentPage || 0) - 1) *
                    (variables?.rows || 0) +
                    idx +
                    1}
                </h3>,
                <ProductLabel
                  key={idx}
                  code={productBranch.product?.code || ''}
                  name={productBranch.product?.name || ''}
                  image={productBranch.product?.image}
                  type={productBranch.product?.type}
                />,
                <p key={idx}>{formatBs(productBranch.price)}</p>,
                <div key={idx} className="mx-auto w-16 text-sm">
                  {productBranch.product?.type === ProductTypeEnum.COMBO ? (
                    <StockComboCircularProgressBar
                      branchProductId={productBranch.id}
                    />
                  ) : (
                    <CircularProgressbar
                      value={productBranch.stock}
                      maxValue={productBranch.lastStockEntry as number}
                      text={`${productBranch.stock}`}
                    />
                  )}
                </div>,
                <Switch
                  key={idx}
                  size="sm"
                  className="text-xs"
                  isSelected={productBranch.isVisibleOnMenu}
                  onChange={() =>
                    handleSwitchChange(
                      productBranch as TProductBranchData,
                      'menu'
                    )
                  }
                >
                  {productBranch.isVisibleOnMenu ? 'Sí' : 'No'}
                </Switch>,
                <Switch
                  key={idx}
                  size="sm"
                  className="text-xs"
                  isSelected={productBranch.isVisibleOnWeb}
                  onChange={() =>
                    handleSwitchChange(
                      productBranch as TProductBranchData,
                      'web'
                    )
                  }
                >
                  {productBranch.isVisibleOnWeb ? 'Sí' : 'No'}
                </Switch>,
                <div key={idx} className="flex gap-2">
                  {productBranch.product?.type !== ProductTypeEnum.COMBO && (
                    <ButtonComponent
                      onClick={() =>
                        handleEdit(productBranch as TProductBranchData)
                      }
                      type="eye"
                      showTooltip
                      tooltipText="Mover Stock"
                      className="px-3"
                    >
                      <IconSelector
                        name="Stock"
                        color="text-primary-600"
                        width="w-6"
                      />
                    </ButtonComponent>
                  )}
                  <ButtonComponent
                    onClick={() =>
                      handleEditPrice(productBranch as TProductBranchData)
                    }
                    type="edit"
                    showTooltip
                    tooltipText="Editar Precio"
                  >
                    <IconSelector
                      name="edit"
                      color="text-primary"
                      width="w-6"
                    />
                  </ButtonComponent>
                  <ButtonComponent
                    showTooltip
                    tooltipText="Eliminar Producto"
                    type="delete"
                    className="text-red-600"
                    onClick={() =>
                      handleEdit(productBranch as TProductBranchData, true)
                    }
                  >
                    <IconSelector
                      name="trash"
                      className="text-red-600"
                      width="w-6"
                    />
                  </ButtonComponent>
                </div>
              ]
            })
          )}
          onChangeRow={row => handleChangeRow(row)}
          tableName="PRODUCTOS"
          onChangePage={page =>
            setVariables({ ...variables, currentPage: page })
          }
          itemsPerPage={variables?.rows}
          currentPage={variables?.currentPage}
          totalPages={variables?.totalPages}
          isLoading={loading}
          enablePagination={true}
          onSearch={value => {
            setFilter(value)
            setVariables({ ...variables, currentPage: 1 })
          }}
          totalItems={variables?.totalRecords}
        />
        </div>
      </div>
      <AddBranchProductModal
        isOpen={handleAddBranchProduct.isOpen}
        onClose={handleAddBranchProduct.onClose}
        onAdd={() => refetch()}
      />
      {handleMoveStock.isOpen && (
        <MoveBranchStockModal
          productBranch={editProduct as TProductBranchData}
          isOpen={handleMoveStock.isOpen}
          onClose={handleMoveStock.onClose}
        />
      )}
      <UpdateBranchProductModal
        data={{
          id: editProduct?.id,
          price: editProduct?.price
        }}
        isOpen={handleUpdatePrice.isOpen}
        onClose={handleUpdatePrice.onClose}
        onSuccess={() => refetch()}
      />
      <ConfirmModal
        cancelText="Cancelar"
        color="error"
        confirmText="Eliminar"
        name="trash"
        title="Eliminar producto"
        onConfirm={handleDelete}
        loading={loadingDelete}
        message={`¿Esta seguro de eliminar a ${editProduct?.product?.name} ?`}
        isOpen={handleDeleteProduct.isOpen}
        onClose={handleDeleteProduct.onClose}
      />
    </AdministrationLayout>
  )
}
export default ProductOnBranch

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
