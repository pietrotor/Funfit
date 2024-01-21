import { useForm } from 'react-hook-form'

import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MyModal } from './MyModal'
import { showSuccessToast } from '../Toast/toasts'
import Input from '../Input'
import Selector from '@/components/atoms/InputSelector'
import {
  StatusEnum,
  StockMovementTypeEnum,
  useCreatStockMovementMutation
} from '@/graphql/graphql-types'
import { TStockData } from '@/interfaces/TData'

type TProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  hideCloseButton?: boolean
  onClose: () => void
  onOpen: () => void
  isOpen: boolean
  stockData: TStockData
  onAddWarehouse: () => void
}
export const MoveStockModal = ({
  isOpen,
  onClose,
  onOpen,
  hideCloseButton,
  size,
  stockData,
  onAddWarehouse
}: TProps) => {
  const { control, handleSubmit, reset, watch } = useForm()
  const [createStockMovement, { loading }] = useCreatStockMovementMutation()
  const onSubmit = () => {
    createStockMovement({
      variables: {
        createStockMovementInput: {
          stockId: stockData.id,
          type: watch('movementType'),
          quantity: parseInt(watch('quantity')),
          date: watch('date'),
          detail: watch('detail')
        }
      },
      onCompleted: data => {
        if (data.creatStockMovement?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.creatStockMovement.message || 'Error al crear un usuario',
            'error'
          )
          return
        }
        showSuccessToast(
          data.creatStockMovement?.message || 'Usuario creado correctamente',
          'success'
        )
        console.log(data, 'data')
        onAddWarehouse()
        onClose()
        reset()
      }
    })
  }
  const handleCancel = () => {
    onClose()
    reset()
  }

  const handlePlusController = () => {
    if (watch('movementType') === StockMovementTypeEnum.INWARD) {
      console.log(stockData?.quantity, parseInt(watch('quantity')))
      console.log(watch('movementType'))
      console.log(stockData?.quantity + parseInt(watch('quantity')))
      return stockData?.quantity + parseInt(watch('quantity'))
    } else if (
      watch('movementType') === StockMovementTypeEnum.OUTWARD ||
      watch('movementType') === StockMovementTypeEnum.DISPOSE
    ) {
      console.log(stockData?.quantity - parseInt(watch('quantity')))
      console.log(stockData?.quantity, parseInt(watch('quantity')))
      return stockData?.quantity - parseInt(watch('quantity'))
    }
    console.log(watch('date'))
    return stockData?.quantity
  }
  return (
    <MyModal
      title="Mover stock"
      message="Ingrese los datos para mover el stock"
      handleCancel={handleCancel}
      color="warning"
      loading={loading}
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton={hideCloseButton}
      size={'xl'}
      control={control}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      reset={reset}
    >
      <div className="space-y-5 px-8 ">
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
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-4">
            <Input
              name="quantity"
              label="Cantidad"
              control={control}
              placeholder="Cantidad"
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es obligatorio'
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'Solo se permiten números'
                },

                min: {
                  value:
                    stockData?.lastStockEntry -
                    stockData?.quantity -
                    stockData?.lastStockEntry +
                    1,
                  message: 'No puede ser menor a 1'
                }
              }}
            />
            <Input
              name="date"
              label="Fecha"
              control={control}
              defaultValue={new Date().toISOString().split('T')[0]}
              placeholder="Fecha"
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es obligatorio'
                }
              }}
              type="date"
            />
          </div>
          <div className="my-auto h-24 text-center font-semibold">
            <CircularProgressbar
              value={
                handlePlusController() && handlePlusController() >= 0 ? handlePlusController() : stockData?.quantity
              }
              maxValue={stockData?.lastStockEntry}
              text={
                `${
                  handlePlusController() &&
                  handlePlusController() >= 0 &&
                  handlePlusController() <= stockData?.lastStockEntry ? handlePlusController() : stockData?.quantity
                }` || '0'
              }
              className="h-full"
            />
            {stockData?.units}
          </div>
        </div>
        <Input
          name="detail"
          label="Detalle"
          control={control}
          placeholder="Detalle"
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
          type="textArea"
          customeClassName="h-16"
        />
      </div>
    </MyModal>
  )
}
