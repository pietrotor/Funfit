import { Button, Chip, Image, Switch, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { AddBranchProductModal } from '@/components/atoms/modals/AddBranchProductModal'
import InformationCard from '@/components/molecules/Card/InformationCard'
import { useGetBranchProductQuery, useUpdateBranchProductQuery } from '@/hooks/UseBranchQuery'
import Table from '@/components/organisms/tableNext/Table'
import { UseGetBranchByIdQuery } from '@/hooks/UseBranchByIdQuery'
import ButtonComponent from '@/components/atoms/Button'
import { MoveBranchStockModal } from '@/components/atoms/modals/MoveBranchStockModal'
import { TProductBranchData } from '@/interfaces/TData'

function ProductOnBranch() {
  const router = useRouter()
  const { branchId } = router.query
  const [editProduct, setEditProduct] = useState<TProductBranchData>()
  const handleAddBranchProduct = useDisclosure()
  const handleMoveStock = useDisclosure()
  const { loading, data, refetch, variables, setVariables, setFilter } =
    useGetBranchProductQuery(branchId as string)
  const { handleUpdateBranchProduct } = useUpdateBranchProductQuery()
  const { data: branchData } = UseGetBranchByIdQuery(branchId as string)
  const branchInfo = branchData?.getBranchById?.data

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  const handleSwitchChange = (productBranch: TProductBranchData, field: string) => {
    console.log(productBranch, field)
    handleUpdateBranchProduct(productBranch, field)
  }
  const handleEdit = (productBranch: TProductBranchData) => () => {
    setEditProduct(productBranch)
    handleMoveStock.onOpen()
  }

  return (
    <AdministrationLayout showBackButton={true}>
      <div className="m-auto w-5/6 space-y-7">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Administración de productos
        </h3>
        <div className="flex w-full items-center">
          <div className="flex w-1/5 justify-center">
            <Image
              className="h-full w-full rounded-lg object-cover"
              src="data:image/png;base64,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"
              alt={''}
              width={150}
            />
          </div>
          <div className="h-36 w-3/5">
            <InformationCard className="h-full rounded-3xl border-2 border-primary/60">
              <section className="flex flex-col space-y-3 p-2 px-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-left text-4xl font-extrabold text-primary">
                    {branchInfo?.name}
                  </h2>
                  <Chip color="primary" variant="flat">
                    {branchInfo?.code}
                  </Chip>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p>Ciudad: {branchInfo?.city}</p>
                    <p>Dirección: {branchInfo?.direction}</p>
                  </div>
                  <div className="flex flex-col">
                    <p>Teléfono: {branchInfo?.phone}</p>
                    <p>NIT: {branchInfo?.nit}</p>
                  </div>
                </div>
              </section>
            </InformationCard>
          </div>
          <div className="flex w-1/5 justify-center">
            <Button
              color="secondary"
              className="float-right my-4 font-extrabold text-white"
              onClick={handleAddBranchProduct.onOpen}
            >
              <IconSelector name="Branch" />
              Agregar producto
            </Button>
          </div>
        </div>
        <Table
          titles={[
            { name: '#' },
            { name: 'Producto' },
            { name: 'Precio' },
            { name: 'Visible en la página' },
            { name: 'Visible en la web' },
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
                productBranch.product?.name,
                productBranch.price,
                <Switch
                  key={idx}
                  size="sm"
                  className="text-xs"
                  isSelected={productBranch.isVisibleOnMenu}
                  onChange={() => handleSwitchChange(productBranch, 'menu')}
                >
                  {productBranch.isVisibleOnMenu ? 'Sí' : 'No'}
                </Switch>,
                <Switch
                  key={idx}
                  size="sm"
                  className="text-xs"
                  isSelected={productBranch.isVisibleOnWeb}
                  onChange={() => handleSwitchChange(productBranch, 'web')}
                >
                  {productBranch.isVisibleOnWeb ? 'Sí' : 'No'}
                </Switch>,
                <ButtonComponent key={idx}
                  onClick={ handleEdit(productBranch)
                  }
                  type="eye"
                  showTooltip
                  tooltipText="Mover Stock"
                  className="px-3"
                >
                  <IconSelector
                    name="Stock"
                    color="text-secondary"
                    width="w-5"
                  />
                </ButtonComponent>
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
      <AddBranchProductModal
        isOpen={handleAddBranchProduct.isOpen}
        onClose={handleAddBranchProduct.onClose}
        onAdd={() => refetch()}
      />
      <MoveBranchStockModal
      productBranch={editProduct as TProductBranchData }
      isOpen={handleMoveStock.isOpen}
      onClose={handleMoveStock.onClose}/>
    </AdministrationLayout>
  )
}
export default ProductOnBranch
