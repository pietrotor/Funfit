import React from 'react'
import { Accordion, AccordionItem, Radio, RadioGroup } from '@nextui-org/react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { Control, FieldValues, UseFormWatch } from 'react-hook-form'
import { activeDirection } from '../PaymentMethod/paymentMethod'
import InputComponent from '@/components/atoms/Input'
import { useAppSelector } from '@/store/index'
import { TCustomer, TOrder } from '@/interfaces/TData'
import { DeliveryMethodEnum } from '@/graphql/graphql-types'
import { TDetails } from '@/components/templates/OrderLayout/orderLayout'

type Props = {
  activeDirection: { lat: number; lng: number }
  changeDirection: (p: activeDirection) => void
  customer: TCustomer
  control: Control<FieldValues, any>
  watch: UseFormWatch<FieldValues>
  order: TOrder
  setOrder: (order: TOrder) => void
  selectedOption: string
  setSelectedOption: (selectedOption: string) => void
  details: TDetails
  setDetails: (details: TDetails) => void
}

function SendOrder({
  activeDirection,
  changeDirection,
  customer,
  control,
  watch,
  order,
  setOrder,
  selectedOption,
  setSelectedOption,
  details,
  setDetails
}: Props) {
  const branch = useAppSelector(state => state.ecommerceInformationReducer.name)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDcrnsyWSi4kyUOyUujyL0zhmuOfyubZ9U' || ''
  })

  const onSetDirection = (marker: any) => {
    const { lat, lng } = marker.latLng
    changeDirection({
      location: {
        lat: lat(),
        lng: lng()
      },
      address: watch('address')
    })
  }
  return (
    <div className="flex h-full w-full flex-col justify-between space-y-5 p-5 text-center">
      <div className="overflow-y-auto px-8">
        <h2 className="text-gray-500 md:pb-6">Datos de ubicación</h2>
        <Accordion>
          <AccordionItem title="Recoger de la sucursal">
            <RadioGroup
              name="branch"
              onValueChange={setSelectedOption}
              onChange={event => {
                setOrder({
                  ...order,
                  deliveryMethod: DeliveryMethodEnum.PICKUP,
                  addressId: ''
                })
              }}
              value={selectedOption}
              color="secondary"
            >
              <Radio value={DeliveryMethodEnum.PICKUP}>
                Recoger en: {branch}
              </Radio>
            </RadioGroup>
            <InputComponent
              name="pickUpInformation"
              control={control}
              type="text"
              label="Detalles para el recojo"
              isDisabled={selectedOption !== DeliveryMethodEnum.PICKUP}
              className="mt-3"
              onValueChange={value => {
                setOrder({
                  ...order,
                  pickUpInformation: value
                })
                setDetails({
                  ...details,
                  pickUpInformation: value
                })
              }}
            />
          </AccordionItem>
          <AccordionItem title="Entrega a domicilio">
            <div className="flex flex-col space-y-3">
              <RadioGroup
                color="secondary"
                name="delivery"
                onValueChange={setSelectedOption}
                value={selectedOption}
                onChange={event => {
                  if (event.target.value !== DeliveryMethodEnum.DELIVERY) {
                    setOrder({
                      ...order,
                      deliveryMethod: DeliveryMethodEnum.DELIVERY,
                      addressId: event.target.value
                    })
                  }
                }}
              >
                {customer?.addressInfo?.map((address, index) => (
                  <Radio key={index} value={address.id}>
                    {address.detail}
                  </Radio>
                ))}
                <Radio value={DeliveryMethodEnum.DELIVERY}>
                  Otra dirección
                </Radio>
              </RadioGroup>
              <InputComponent
                name="address"
                control={control}
                type="text"
                label="Descripción de la dirección"
                isRequired
                isDisabled={selectedOption !== DeliveryMethodEnum.DELIVERY}
                rules={{
                  required: {
                    value: selectedOption === DeliveryMethodEnum.DELIVERY,
                    message: 'Este campo es requerido'
                  }
                }}
              />
              <div className="h-96 w-full">
                {isLoaded && (
                  <GoogleMap
                    onClick={onSetDirection}
                    center={activeDirection}
                    zoom={17}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                  >
                    <Marker position={activeDirection} />
                  </GoogleMap>
                )}
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
      {order?.deliveryMethod === undefined && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-red-500">Por favor, seleccione una opción</p>
        </div>
      )}
    </div>
  )
}

export default SendOrder
