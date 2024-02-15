import React, { useEffect, useState } from 'react'
import { Accordion, AccordionItem, Radio, RadioGroup } from '@nextui-org/react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { Control, FieldValues, UseFormWatch } from 'react-hook-form'
import { activeDirection } from '../PaymentMethod/paymentMethod'
import InputComponent from '@/components/atoms/Input'
import { useAppSelector } from '@/store/index'
import { TCustomer } from '@/interfaces/TData'

type Props = {
  activeDirection: { lat: number; lng: number }
  changeDirection: (p: activeDirection) => void
  send: any
  customer: TCustomer
  control: Control<FieldValues, any>
  watch: UseFormWatch<FieldValues>
}

function SendOrder({
  activeDirection,
  changeDirection,
  send,
  customer,
  control,
  watch
}: Props) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['0']))
  const [selectedOption, setSelectedOption] = useState('')
  const [showAlert] = useState(false)
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

  useEffect(() => {
    console.log('Coordenadas actualizadas:', activeDirection)
  }, [activeDirection])

  /* const onSubmit = () => {
    if (send.current.type.trim() === '' || send.current.address.trim() === '') {
      setShowAlert(true)
      return
    }
    console.log('Formulario enviado')
    setShowAlert(false)
    console.log(send.current)
  } */

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-5 p-5 text-center">
      <div className="overflow-y-auto px-8">
        <h2 className="text-gray-500 md:pb-6">Datos de ubicación</h2>
        <Accordion
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys as any}
        >
          <AccordionItem
            key="1"
            aria-label="Recoger de la sucursal"
            title="Recoger de la sucursal"
          >
            <RadioGroup
              name="branch"
              onValueChange={setSelectedOption}
              onChange={value => {
                setSelectedOption(value.target.value)
                send.current = {
                  type: value,
                  address: branch
                }
              }}
              value={selectedOption}
              color="secondary"
            >
              <Radio value="Recoger en sucursal">Recoger en: {branch}</Radio>
            </RadioGroup>
            <InputComponent
              name="branchdetails"
              control={control}
              type="text"
              placeholder="Detalles para el recojo"
              isRequired
              className="mt-3"
              onValueChange={value => {
                setSelectedOption(value)
                send.current = {
                  type: 'Recoger en sucursal',
                  address: branch
                }
              }}
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              }}
            />
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Entrega a domicilio"
            title="Entrega a domicilio"
          >
            <div className="flex flex-col space-y-3">
              <RadioGroup
                color="secondary"
                name="delivery"
                onValueChange={setSelectedOption}
                value={selectedOption}
                onChange={value => {
                  setSelectedOption(value.target.value)
                  send.current = {
                    type: value,
                    address: watch('address')
                  }
                }}
              >
                {customer.addressInfo.map((address, index) => (
                  <Radio key={index} value={address.id}>
                    {address.detail}
                  </Radio>
                ))}
                <Radio value="Otra dirección">Otra dirección</Radio>
              </RadioGroup>

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

              <InputComponent
                name="address"
                control={control}
                type="text"
                label="Descripción de la dirección"
                isRequired
                isDisabled={selectedOption !== 'Otra dirección'}
                onValueChange={value => {
                  setSelectedOption(value)
                  send.current = {
                    type: 'Entrega a domicilio',
                    address: value
                  }
                }}
                rules={{
                  required: {
                    value: true,
                    message: 'Este campo es requerido'
                  }
                }}
              />
            </div>
          </AccordionItem>
        </Accordion>
      </div>
      {showAlert && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-red-500">Por favor, seleccione una opción</p>
        </div>
      )}
    </div>
  )
}

export default SendOrder
