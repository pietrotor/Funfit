import { useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'

import { useState } from 'react'
import { MyModal } from './MyModal'
import Selector from '../InputSelector'
import InputComponent from '../Input'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const CashMovimentModal = ({
  isOpen,
  onClose,
  onConfirm
}: ModalProps) => {
  const [value, setValue] = useState <number>(0)
  const { handleSubmit, control, watch, reset } = useForm()
  const onSubmit = () => {
    console.log(watch())
  }
  const handleCancel = () => {
    reset()
    onClose()
  }
  const handleChangeValue = (e:number) => {
    if (watch('movement') === 'entrada') {
      setValue(value - parseInt(watch('money')))
      console.log(value)
    }
    if (watch('movement') === 'salida') {
      setValue(value - parseInt(watch('money')))
    }
    console.log(value)
  }
  return (
    <MyModal isOpen={isOpen} onClose={onClose} size="lg">
      <section className="p-6 text-lg font-semibold">
        <h2 className=" mb-4 text-center ">Agregar movimiento</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-3 mb-3">
            <div className="flex justify-between">
              <div className="3/5">Tipo de movimiento</div>
              <div className="w-2/5">
                <Selector
                  name="movement"
                  label="Unidades"
                  defaultValue={'entrada'}
                  control={control}
                  options={[
                    { label: 'Entrada', value: 'entrada' },
                    { label: 'Salida', value: 'salida' }
                  ]}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>Dinero en caja</div>
              <div>300 Bs</div>
            </div>
            <div className="flex justify-between ">
              <div>Monto del movimiento</div>
              <div className="flex w-20 items-baseline">
                <div className='h-2'>
                <InputComponent
                  defaultValue={'0'}
                  customeClassName=""
                  control={control}
                  onChange={ (e) => handleChangeValue(parseInt(e.target.value))}
                  name="money"
                  height={'h-full'}
                  variant="underlined"
                  rules={{
                    required: {
                      value: true,
                      message: 'Este campo es obligatorio'
                    }
                  }}
                />
                </div>
                Bs
              </div>
            </div>
          </div>
          <hr />
          <div className="my-4 flex justify-between">
            <div>Diferencia</div>
            <div> {value} Bs</div>
          </div>
          <InputComponent name="details" control={control} type="textArea"
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
          />
          <div className="mt-6 grid h-12 w-full grid-cols-2 gap-3 ">
            <Button
              type="submit"
              color="secondary"
              className="h-full text-lg font-bold"
            >
              Agregar
            </Button>
            <Button
              variant="flat"
              color="danger"
              className="h-full text-lg font-bold"
              onClick={() => handleCancel() }
            >
              Cancelar
            </Button>
          </div>
        </form>
      </section>
    </MyModal>
  )
}
