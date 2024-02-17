import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MyModal } from './MyModal'
import { TValuesWarehouses } from './EditWarehouseModal'
import Selector from '../InputSelector'
import InputComponent from '../Input'
import { showSuccessToast } from '../Toast/toasts'
import ComboInput from '../ComboInput'
import {
  StockMovementTypeEnum,
  useGetProductStockQuery,
  useGetWarehousesOfProductLazyQuery
} from '@/graphql/graphql-types'
import 'react-circular-progressbar/dist/styles.css'
import { useCreateBranchProductStockMovement } from '@/hooks/UseStockMovementQuery'
import { useAppSelector } from '@/store/index'
import { TProductBranchData } from '@/interfaces/TData'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
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
  const branchIdSelected = useAppSelector(
    state => state.branchReducer.currentBranch.id
  )

  const { control, handleSubmit, watch, reset } = useForm()
  const [filterProduct, setFilterProduct] = useState<string>('')
  const [getWarehouses, { data }] = useGetWarehousesOfProductLazyQuery()
  const valueFilterProduct = UseDebouncedValue(filterProduct, 500)
  const { data: stockData } = useGetProductStockQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {
        filter: valueFilterProduct
      },
      productId: productBranch?.productId,
      warehouseId: warehouseData?.id
    },
    onCompleted: data => {
      if (data.getProductStock?.status === 'ERROR') {
        showSuccessToast(
          data.getProductStock?.message || 'Error al cargar los productos',
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

  useEffect(() => {
    if (isOpen) {
      reset({
        warehouseId: '',
        movementType: '',
        quantity: '',
        observation: ''
      })
    }
  }, [isOpen])

  const { handleCreateBranchStockMovement } =
    useCreateBranchProductStockMovement()
  const handleCancel = () => {
    setWarehouseData(undefined)
    reset()
    onClose()
  }
  const handleGetWarehouses = () => {
    getWarehouses({
      fetchPolicy: 'network-only',
      variables: {
        paginationInput: {},
        productId: productBranch.productId
      },
      onCompleted: data => {
        if (data.getWarehousesOfProduct?.status === 'ERROR') {
          showSuccessToast(
            data.getWarehousesOfProduct?.message ||
              'Error al cargar los productos',
            'error'
          )
        }
      }
    })
  }
  const handlePlusController = () => {
    const stockD = stockData?.getProductStock?.data?.find(
      stock =>
        stock.productId === productBranch.productId &&
        stock.warehouseId === warehouseData?.id
    )
    if (watch('movementType') === StockMovementTypeEnum.OUTWARD) {
      return stockD && stockD.quantity + parseInt(watch('quantity'))
    } else if (
      watch('movementType') === StockMovementTypeEnum.INWARD ||
      watch('movementType') === StockMovementTypeEnum.DISPOSE
    ) {
      return stockD && stockD.quantity - parseInt(watch('quantity'))
    }
    return stockD?.quantity
  }

  const onSubmit = () => {
    handleCreateBranchStockMovement(
      {
        branchProductId: productBranch.id,
        branchId: branchIdSelected,
        qty: parseInt(watch('quantity')),
        type: watch('movementType'),
        date: watch('date'),
        observation: watch('observation'),
        stockId: stockData?.getProductStock?.data?.find(
          stock => stock.productId === productBranch.productId
        )?.id
      },
      onClose,
      onClose
    )
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
      reset={reset}
    >
      <div className="space-y-3 px-8">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-3">
            <ComboInput
              value={warehouseData?.name || ''}
              onChange={value => {
                setFilterProduct(value)
              }}
              control={control}
              options={
                data?.getWarehousesOfProduct?.data?.map(warehouse => ({
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
          <div className="h-full space-y-3">
            <div className="mx-auto w-4/5 p-10 text-center">
              <CircularProgressbar
                className="mx-auto w-4/5"
                value={
                  handlePlusController() ||
                  stockData?.getProductStock?.data?.find(
                    stock =>
                      stock.productId === productBranch.productId &&
                      stock.warehouseId === warehouseData?.id
                  )?.quantity ||
                  0
                }
                maxValue={
                  stockData?.getProductStock?.data?.find(
                    stock =>
                      stock.productId === productBranch.productId &&
                      stock.warehouseId === warehouseData?.id
                  )?.quantity
                }
                text={`${
                  stockData?.getProductStock?.data?.find(
                    stock =>
                      stock.productId === productBranch.productId &&
                      stock.warehouseId === warehouseData?.id
                  )?.quantity || 'No hay stock'
                }`}
                styles={{
                  path: {
                    stroke: 'rgba(62, 152, 199)',
                    strokeLinecap: 'butt',
                    transition: 'stroke-dashoffset 0.5s ease 0s'
                  },
                  trail: {
                    stroke: '#d6d6d6',
                    strokeLinecap: 'butt'
                  },
                  text: {
                    fill: '#f88',
                    fontSize: '14px',
                    fontWeight: 600
                  }
                }}
              />
              {watch('warehouseId') ? (
                stockData?.getProductStock?.data?.find(
                  stock =>
                    stock.productId === productBranch.productId &&
                    stock.warehouseId === warehouseData?.id
                )?.units
              ) : (
                <p className="text-center text-red-500">
                  Seleccione un almacén
                </p>
              )}
            </div>
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
