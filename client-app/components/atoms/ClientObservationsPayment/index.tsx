import { Control } from 'react-hook-form'
import InputComponent from '../Input'

type ClientObservationPaymentProps = {
  control: Control<any>
}

function ClientObservationPayment({ control }: ClientObservationPaymentProps) {
  return (
    <div className="flex h-full w-full flex-col">
      <p className="font-thin text-gray-500">Cliente</p>
      <InputComponent
        control={control}
        name="client"
        size="sm"
        placeholder="Nombre completo"
        rules={{
          required: {
            value: true,
            message: 'Este campo es obligatorio'
          },
          pattern: {
            value: /^[a-zA-Z\s]+$/i,
            message: 'Solo se permiten letras'
          }
        }}
      />
      <p className="font-thin text-gray-500">Observaciones</p>
      <InputComponent
        control={control}
        name="observations"
        type="textArea"
        size="lg"
      />
    </div>
  )
}

export default ClientObservationPayment
