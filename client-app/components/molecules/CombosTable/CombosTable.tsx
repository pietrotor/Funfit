import { Chip } from '@nextui-org/react'
import { ProductLabel } from '../ProductLabel'
import Table from '@/components/organisms/tableNext/Table'
import { GetProductsQuery, Product } from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import ButtonComponent from '@/components/atoms/Button'
import IconSelector from '@/components/atoms/IconSelector'

type Combo = NonNullable<
  NonNullable<GetProductsQuery['getProducts']>['data']
>[0]

type CombosTableProps = {
  isLoading?: boolean
  pagination: PaginationInterfaceState
  combos: Combo[]
  onUpdate?: (id: string) => void
  onUpdateImage?: (product: Product) => void
  onDelete?: (id: string) => void
  changeRow: (row: number) => void
  changePage: (page: number) => void
  onSearch: (value: string) => void
}

const CombosTable = ({
  pagination,
  isLoading,
  combos,
  onDelete,
  onUpdate,
  onUpdateImage,
  changePage,
  changeRow,
  onSearch
}: CombosTableProps) => {
  return (
    <Table
      tableName="Productos Combos"
      isLoading={isLoading}
      currentPage={pagination.currentPage}
      totalItems={pagination.totalRecords}
      totalPages={pagination.totalPages}
      itemsPerPage={pagination.rows}
      enablePagination={true}
      onSearch={onSearch}
      onChangeRow={changeRow}
      onChangePage={changePage}
      titles={[
        { name: '#' },
        { name: 'Nombre' },
        { name: 'Categoría' },
        { name: 'Productos' },
        { name: 'Precio' },
        { name: 'Costo' },
        { name: 'Descripción' },
        { name: 'Acciones' }
      ]}
      items={combos.map((product, idx) => ({
        content: [
          <h3 key={idx} className="text-sm">
            {((pagination?.currentPage || 0) - 1) * (pagination?.rows || 0) +
              idx +
              1}
          </h3>,
          <ProductLabel
            key={idx}
            code={product?.code || ''}
            name={product?.name || ''}
            image={product?.image}
          />,
          <Chip
            key={idx}
            className="text-left text-sm"
            variant="flat"
            color={`${
              product.category?.name === undefined ? 'default' : 'success'
            }`}
          >
            {product.category?.name || 'Sin categoría'}
          </Chip>,
          <div key={idx} className="flex flex-wrap gap-2">
            {(product.subProducts || [])?.map(subProduct => (
              <p
                className="w-fit rounded border-2 border-primary px-3 py-1 font-medium text-primary"
                key={subProduct.productId}
              >
                {subProduct.product?.name} ({subProduct.stockRequirement})
              </p>
            ))}
          </div>,
          product.suggetedPrice + ' Bs.',
          product.cost + ' Bs.',
          <div key={idx} className="text-left text-sm">
            {product.description}
          </div>,
          <div key={idx} className="flex justify-center space-x-1">
            {onUpdate && (
              <ButtonComponent
                onClick={() => onUpdate(product.id)}
                type="edit"
                showTooltip
                tooltipText="Editar"
              >
                <IconSelector name="edit" color="text-primary" width="w-8" />
              </ButtonComponent>
            )}
            {onDelete && (
              <ButtonComponent
                onClick={() => onDelete(product.id)}
                type="delete"
                showTooltip
                tooltipText="Eliminar"
              >
                <IconSelector name="trash" color="text-danger" width="w-8" />
              </ButtonComponent>
            )}
            {onUpdateImage && (
              <ButtonComponent
                onClick={() => onUpdateImage(product as Product)}
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
            )}
          </div>
        ]
      }))}
    />
  )
}

export { CombosTable }
