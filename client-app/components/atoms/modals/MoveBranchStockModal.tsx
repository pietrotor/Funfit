import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { MyModal } from './MyModal'
import { TValuesWarehouses } from './EditWarehouseModal'
import Selector from '../InputSelector'
import InputComponent from '../Input'
import ComboInput from '../ComboInput'
import { StockMovementTypeEnum, useGetWarehousesLazyQuery } from '@/graphql/graphql-types'
import { BranchProductData } from '@/hooks/UseBranchQuery'
import { useCreateBranchProductStockMovement } from '@/hooks/UseStockMovementQuery'
import { useAppSelector } from '@/store/index'
type ModalProps = {
  productBranch: BranchProductData
  isOpen: boolean
  onClose: () => void
}
export const MoveBranchStockModal = ({
  isOpen,
  onClose,
  productBranch
}: ModalProps) => {
  const { control, handleSubmit, watch } = useForm()
  const [getWarehouses, { data }] = useGetWarehousesLazyQuery()
  const [productsData, setProductsData] = useState<TValuesWarehouses>()
  const { handleCreateBranchStockMovement } =
    useCreateBranchProductStockMovement()
  const branchIdSelected = useAppSelector(state => state.branchReducer.currentBranch.id)
  const handleCancel = () => {
    onClose()
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
    console.log('submit')
    handleCreateBranchStockMovement({
      branchProductId: productBranch.id,
      branchId: branchIdSelected,
      qty: parseInt(watch('quantity')),
      type: watch('movementType'),
      date: watch('date'),
      observation: watch('observation')
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
              value={productsData?.name || ''}
              onChange={value => {
                setProductsData(
                  data?.getWarehouses?.data?.find(
                    product => product.name === value
                  ) as TValuesWarehouses
                )
              }}
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
