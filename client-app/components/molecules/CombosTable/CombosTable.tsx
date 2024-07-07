import { Chip, Image } from '@nextui-org/react'
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
        { name: 'Imagen' },
        { name: 'Nombre' },
        { name: 'Categoría' },
        { name: 'Precio' },
        { name: 'Costo' },
        { name: 'Código' },
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
              product.category?.name === undefined ? 'default' : 'success'
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
