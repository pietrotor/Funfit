import { useForm } from 'react-hook-form'
import { Button, Checkbox } from '@nextui-org/react'
import { MyModal } from './MyModal'
import InputComponent from '../Input'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const CloseCashRegister = ({ isOpen, onClose, onConfirm }: ModalProps) => {
  const { control } = useForm()
  return (
    <MyModal isOpen={isOpen} onClose={onClose} size='lg'>
      <section className='p-6 text-lg font-semibold'>
        <h2 className=' mb-4 text-center ' >Cerrar caja</h2>
        <form action="">
        <div className='flex flex-col space-y-3'>
          <div className='flex justify-between'>
            <div className='3/5'>Dinero en caja</div>
              2200 Bs
          </div>
          <div className='flex justify-between'>
            <div>Dinero fisico</div>
            <div className='flex w-20 items-baseline'><InputComponent defaultValue={'0'} customeClassName='' height={'h-3'} control={control} name='value' variant='underlined'/> Bs</div>
          </div>
        </div>
        <hr />
        <div className='flex mt-2 justify-between'>
            <div>Diferencia</div>
            <div> 0 Bs</div>
        </div>
        <InputComponent name='details' control={control} type='textArea'/>
        <Checkbox defaultSelected size="sm">Small</Checkbox>
        <div className="mt-6 w-full grid h-12 grid-cols-2 gap-3 ">
            <Button type="submit" color="secondary" className="h-full text-lg font-bold">
              Cerrar caja
            </Button>
            <Button variant="flat" color="danger" className="h-full text-lg font-bold" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </section>
    </MyModal>
  )
}
