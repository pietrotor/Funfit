import React, { useState } from 'react'
import { Accordion, AccordionItem, Radio, RadioGroup } from '@nextui-org/react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { Control, FieldValues, UseFormWatch } from 'react-hook-form'
import { activeDirection } from '../PaymentMethod/paymentMethod'
import InputComponent from '@/components/atoms/Input'
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
  const [currenAccordion, setCurrenAccordion] = useState<
    'delivery' | 'pickup' | ''
  >('')
  const handleChangeAccordion = (value: any) => {
    setCurrenAccordion(preValue => {
      if (!value) return preValue
      if (preValue === value && !!preValue) {
        return preValue
      }

      return value
    })
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || ''
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
    <div className="flex h-full w-full flex-col justify-between space-y-5 p-2 text-center md:p-5">
      <div className="overflow-y-auto md:px-8">
        <h2 className="text-gray-500 md:pb-6">Datos de ubicación</h2>
        <Accordion
          selectedKeys={[currenAccordion]}
          onSelectionChange={value =>
            handleChangeAccordion((value as any).anchorKey)
          }
        >
          <AccordionItem
            key={'pickup'}
            title="Recoger de la sucursal"
            indicator={
              <RadioGroup
                value={currenAccordion}
                onValueChange={() => handleChangeAccordion('pickup')}
              >
                <Radio value="pickup"></Radio>
              </RadioGroup>
            }
          >
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
              <Radio value={DeliveryMethodEnum.PICKUP} className="!text-left">
                Recoger en: Venezuela #520 entre san martin y lanza
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
          <AccordionItem
            key={'delivery'}
            title="Entrega a domicilio"
            indicator={
              <RadioGroup
                value={currenAccordion}
                onValueChange={() => handleChangeAccordion('delivery')}
              >
                <Radio value="delivery"></Radio>
              </RadioGroup>
            }
          >
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
                  Nueva dirección
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
                    <MarkerF position={activeDirection} />
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
