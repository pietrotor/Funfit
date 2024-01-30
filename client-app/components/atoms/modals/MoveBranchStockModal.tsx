import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { MyModal } from './MyModal'
import { TValuesWarehouses } from './EditWarehouseModal'
import Selector from '../InputSelector'
import InputComponent from '../Input'
import { showSuccessToast } from '../Toast/toasts'
import ComboInput from '../ComboInput'
import { StockMovementTypeEnum, useGetStocksPaginatedLazyQuery, useGetWarehousesLazyQuery } from '@/graphql/graphql-types'
import { useCreateBranchProductStockMovement } from '@/hooks/UseStockMovementQuery'
import { useAppSelector } from '@/store/index'
import { TProductBranchData } from '@/interfaces/TData'
type ModalProps = {
  productBranch: TProductBranchData
  isOpen: boolean
  onClose: () => void
}
export const MoveBranchStockModal = ({
  isOpen,
  onClose,
  productBranch
}: ModalProps) => {
  const [warehouseData, setWarehouseData] = useState<TValuesWarehouses>()
  const branchIdSelected = useAppSelector(state => state.branchReducer.currentBranch.id)

  const { control, handleSubmit, watch, reset } = useForm()
  const [getWarehouses, { data }] = useGetWarehousesLazyQuery()
  const [getStockWarehouse, { data: stockData }] = useGetStocksPaginatedLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {}
    },
    onCompleted: data => {
      if (data.getStocksPaginated?.status === 'ERROR') {
        showSuccessToast(
          data.getStocksPaginated?.message || 'Error al cargar los productos',
          'error'
        )
      }
    },
    onError: error => {
      showSuccessToast(
        error.message || 'Error al cargar los productos',
        'error'
      )
    }
  })
  const { handleCreateBranchStockMovement } =
    useCreateBranchProductStockMovement()
  const handleCancel = () => {
    onClose()
    reset()
  }
  const handleGetWarehouses = () => {
    getWarehouses({
      fetchPolicy: 'network-only',
      variables: {
        paginationInput: {}
      }
    })
  }
  const onSubmit = () => {
    console.log(stockData?.getStocksPaginated?.data?.find(
      stock => stock.product?.id === productBranch.id
    )?.id)
    handleCreateBranchStockMovement({
      branchProductId: productBranch.id,
      branchId: branchIdSelected,
      qty: parseInt(watch('quantity')),
      type: watch('movementType'),
      date: watch('date'),
      observation: watch('observation'),
      stockId: stockData?.getStocksPaginated?.data?.find(
        stock => stock.productId === productBranch.productId
      )?.id
    })
  }
  return (
    <MyModal
      control={control}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      color="warning"
      isOpen={isOpen}
      onClose={onClose}
      title="Mover stock"
      message="Ingrese los datos del stock a mover"
      isForm
    >
      <div className="space-y-3 px-8">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-3">
            <ComboInput
              value={warehouseData?.name || ''}
              onChange={value => {
                setWarehouseData(
                  data?.getWarehouses?.data?.find(
                    product => product.name === value
                  ) as TValuesWarehouses
                )
                getStockWarehouse()
              }
            }
              control={control}
              options={
                data?.getWarehouses?.data?.map(warehouse => ({
                  label: warehouse.name,
                  value: warehouse.id
                })) || [{ label: 'Cargando..', value: 'Cargando..' }]
              }
              name="warehouseId"
              onClick={() => {
                handleGetWarehouses()
              }}
              label="Seleccione el almacén"
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              }}
            />
            <Selector
              name="movementType"
              label="Tipo de movimiento"
              control={control}
              placeholder="Tipo de movimiento"
              options={
                [
                  {
                    value: StockMovementTypeEnum.INWARD,
                    label: 'Ingreso'
                  },
                  {
                    value: StockMovementTypeEnum.OUTWARD,
                    label: 'Egreso'
                  },
                  {
                    value: StockMovementTypeEnum.DISPOSE,
                    label: 'Descarte'
                  }
                ] || [{ label: 'Cargando..' }]
              }
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              }}
            />
          </div>
          <div className="h-full space-y-3">
            <InputComponent
              type="date"
              name="date"
              label={'Fecha'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                },
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/i,
                  message: 'Este campo solo acepta mm/dd/aaaa'
                }
              }}
            />
            <InputComponent
              name="quantity"
              label={'Cantidad'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'Este campo solo acepta números'
                }
              }}
            />
          </div>
        </div>
        <InputComponent
          customeClassName="h-full w-full"
          name="observation"
          type="textArea"
          label={'Observación'}
          control={control}
        />
      </div>
    </MyModal>
  )
}
