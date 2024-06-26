import { Control } from 'react-hook-form'
import InputComponent from '../Input'

type ClientObservationPaymentProps = {
  control: Control<any>
  hideClient?: boolean
}

function ClientObservationPayment({
  control,
  hideClient
}: ClientObservationPaymentProps) {
  return (
    <div className="flex h-full w-full flex-col">
      {!hideClient && (
        <>
          <p className="font-thin text-gray-500">Cliente</p>
          <InputComponent
            control={control}
            name="client"
            size="sm"
            placeholder="Nombre completo"
            isRequired={false}
          />
        </>
      )}
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
