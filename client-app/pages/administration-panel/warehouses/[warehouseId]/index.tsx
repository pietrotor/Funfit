import { useRouter } from 'next/router'
import { useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useDisclosure } from '@nextui-org/use-disclosure'

import { GetServerSideProps } from 'next'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { MoveStockModal } from '@/components/atoms/modals/MoveStockModal'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
import {
  StatusEnum,
  useDeleteStockMutation,
  useGetWarehouseStockQuery
} from '@/graphql/graphql-types'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import Table from '@/components/organisms/tableNext/Table'
import ButtonComponent from '@/components/atoms/Button'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import { TStockData } from '@/interfaces/TData'
import { WarehouseRoute } from '@/utils/routes'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
import { authUserHeader } from '@/utils/verificationUser'
import { Image } from '@nextui-org/react'

interface WarehouseProps {
  user: any
}
function Warehouse({ user }: WarehouseProps) {
  const [variables, setVariables] = useState<PaginationInterfaceState>({
    rows: 5,
    filter: '',
    currentPage: 1
  })
  const [filter, setFilter] = useState<string>('')
  const [stock, setStock] = useState<TStockData>()
  const [stockToDelete, setStockToDelete] = useState<{
    id: string
    name: string
  } | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const handleMoveStockModal = useDisclosure()
  const [deleteStock] = useDeleteStockMutation()
  const filtroDebounced = UseDebouncedValue(filter, 500)
  const router = useRouter()
  const { warehouseId } = router.query
  const { data, loading, refetch } = useGetWarehouseStockQuery({
    variables: {
      warehouseStockPaginationInput: {
        filter: filtroDebounced,
        page: variables?.currentPage,
        rows: variables?.rows,
        warehouses: [warehouseId as string]
      }
    },
    onCompleted: data => {
      setVariables({
        totalPages: data.getWarehouseStock?.totalPages || 1,
        rows: data.getWarehouseStock?.rows || 5,
        filter: filtroDebounced,
        currentPage: data.getWarehouseStock?.currentPage || 1,
        totalRecords: data.getWarehouseStock?.totalRecords || 1
      })
    }
  })

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }
  const handleCreateMovement = (stockId: TStockData) => {
    handleMoveStockModal.onOpen()
    setStock(stockId)
  }
  const handleDeleteStock = (stockId: string, productName: string) => {
    setStockToDelete({ id: stockId, name: productName })
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteStock = () => {
    if (!stockToDelete) return
    setIsDeleting(true)
    deleteStock({
      variables: { id: stockToDelete.id },
      onCompleted: data => {
        setIsDeleting(false)
        setIsDeleteModalOpen(false)
        setStockToDelete(null)
        if (data.deleteStock?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.deleteStock.message || 'Error al eliminar stock',
            'error'
          )
          return
        }
        showSuccessToast(
          data.deleteStock?.message || 'Stock eliminado correctamente',
          'success'
        )
        refetch()
      }
    })
  }
  return (
    <AdministrationLayout user={user} showBackButton={true}>
      <div className="m-auto mt-8 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Administración de Stocks
        </h3>
        <div className="flex justify-end space-x-3">
          <AdminButton
            pathname={`${WarehouseRoute}/${warehouseId}/warehouse-history`}
            color="primary"
            text="Historial del almacén"
            iconName="Warehouse"
            showMinIcon={true}
            addPlusIcon={false}
          />
          <AdminButton
            color="secondary"
            pathname={`/administration-panel/warehouses/${warehouseId}/create-stock`}
            iconName="Box"
            text="Agregar nuevo Stock"
          />
        </div>
        <Table
          titles={[
            { name: '#' },
            { name: 'Producto' },
            { name: 'Stock' },
            { name: 'Acciones' }
          ]}
          items={(data?.getWarehouseStock?.data || []).map((stock, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {((variables?.currentPage || 0) - 1) * (variables?.rows || 0) +
                  idx +
                  1}
              </h3>,
              <div key={idx} className="flex gap-2">
                <Image
                  alt="image"
                  width={80}
                  src={
                    stock.product?.image === 'null' || !stock.product?.image
                      ? 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
                      : stock.product?.image
                  }
                />
                <div className="flex flex-col justify-center align-baseline">
                  <p className="text-left text-base font-semibold">
                    {stock.product?.name}
                  </p>
                  <p className="text-left font-normal text-gray-500">
                    Código:{' '}
                    <span className="font-bold">{stock.product?.code}</span>
                  </p>
                  ,
                </div>
              </div>,
              <div key={idx} className="mx-auto w-16 text-sm">
                <CircularProgressbar
                  value={stock.quantity}
                  maxValue={stock.lastStockEntry as number}
                  text={`${stock.quantity}`}
                />{' '}
                {stock.units}
              </div>,
              <div key={idx} className="flex justify-center space-x-3">
                <ButtonComponent
                  onClick={() => handleCreateMovement(stock as TStockData)}
                  type="edit"
                  showTooltip
                  tooltipText="Mover Stock"
                  className="px-3"
                >
                  <IconSelector name="edit" color="text-primary" width="w-8" />
                </ButtonComponent>
                <ButtonComponent
                  onClick={() =>
                    handleDeleteStock(
                      stock.id,
                      stock.product?.name || 'este producto'
                    )
                  }
                  type="delete"
                  showTooltip
                  tooltipText="Eliminar del almacén"
                >
                  <IconSelector name="trash" color="text-danger" width="w-8" />
                </ButtonComponent>
                <ButtonComponent
                  onClick={() =>
                    router.push(
                      `${WarehouseRoute}/${warehouseId}/stock-history/${stock.id}`
                    )
                  }
                  type="history"
                  showTooltip
                  tooltipText="Historial de Stock"
                >
                  <IconSelector
                    name="Boxes"
                    color="text-blue-500"
                    width="w-8"
                  />
                </ButtonComponent>
              </div>
            ]
          }))}
          onChangeRow={row => handleChangeRow(row)}
          tableName="STOCKS"
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
        />
      </div>
      <MoveStockModal
        isOpen={handleMoveStockModal.isOpen}
        onClose={handleMoveStockModal.onClose}
        onOpen={handleMoveStockModal.onOpen}
        onAddWarehouse={refetch}
        stockData={stock as TStockData}
        hideCloseButton={false}
        size="md"
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setStockToDelete(null)
        }}
        onConfirm={confirmDeleteStock}
        title="Eliminar producto del almacén"
        message={`¿Estás seguro de eliminar "${stockToDelete?.name}" del almacén? Esta acción eliminará el stock y todo su historial de movimientos. Esta acción no se puede deshacer.`}
        color="error"
        confirmText="Eliminar"
        cancelText="Cancelar"
        loading={isDeleting}
      />
    </AdministrationLayout>
  )
}
export default Warehouse
export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
