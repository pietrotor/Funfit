import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  Radio,
  RadioGroup
} from '@nextui-org/react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useForm } from 'react-hook-form'
import { activeDirection } from '../PaymentMethod/paymentMethod'
import InputComponent from '@/components/atoms/Input'
import { useAppSelector } from '@/store/index'

type Props = {
  activeDirection: { lat: number; lng: number }
  changeDirection: (p: activeDirection) => void
  send: any
}

function SendOrder({
  activeDirection,
  changeDirection,
  send
}: Props) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['0']))
  const [selectedPlace, setSelectedPlace] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const branch = useAppSelector(state => state.ecommerceInformationReducer.name)
  const { handleSubmit, control, watch } = useForm()

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

  const onSubmit = () => {
    if (send.current.type.trim() === '' || send.current.address.trim() === '') {
      setShowAlert(true)
      return
    }
    console.log('Formulario enviado')
    setShowAlert(false)
    console.log(send.current)
  }

  const handlePlace = (place: string, type: string) => {
    setSelectedPlace(type)
    send.current = {
      type,
      address: place
    }
  }

  return (
    <form
      className="flex h-full w-full flex-col justify-between space-y-5 p-5 text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
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
              onValueChange={setSelectedPlace}
              onChange={(e) => handlePlace(e.target.value, 'Recoger en sucursal')}
              value={selectedPlace}
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
                className='mt-3'
                onValueChange={value =>
                  handlePlace(value, 'Recoger en sucursal')
                }
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
                onValueChange={setSelectedPlace}
                value={selectedPlace}
                onChange={e => handlePlace(e.target.value, 'Entrega a domicilio')}
              >
                <Radio value="Entrega a domicilio">Entrega a domicilio</Radio>
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
                placeholder="Descripción de la dirección"
                isRequired
                onValueChange={value =>
                  handlePlace(value, 'Entrega a domicilio')
                }
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
    </form>
  )
}

export default SendOrder
