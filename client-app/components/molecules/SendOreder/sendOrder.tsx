import React, { useEffect, useRef, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  Button,
  Radio,
  RadioGroup
} from '@nextui-org/react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

type Props = {
  goToStep: (e: number) => void
  currentStepIndex: number
}

function SendOrder({ goToStep, currentStepIndex }: Props) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['0']))
  const [showAlert, setShowAlert] = useState(false)
  const [activeDirection, setActiveDirection] = useState({
    lat: -17.414,
    lng: -66.1653
  })
  const send = useRef({
    type: '',
    address: ''
  })

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDcrnsyWSi4kyUOyUujyL0zhmuOfyubZ9U' || ''
  })

  const onSetDirection = (marker: any) => {
    const { lat, lng } = marker.latLng
    setActiveDirection({
      lat: lat(),
      lng: lng()
    })
  }

  // Función para actualizar las coordenadas cuando cambian en el estado
  useEffect(() => {
    // Puedes realizar acciones aquí cuando las coordenadas cambian en el estado
    console.log('Coordenadas actualizadas:', activeDirection)
  }, [activeDirection])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (send.current.type.trim() === '' || send.current.address.trim() === '') {
      setShowAlert(true)
      return
    }
    console.log('Formulario enviado')
    setShowAlert(false)
    handleNext()
  }

  const handleNext = () => {
    goToStep(currentStepIndex + 1)
  }

  const handlePlace = (e: any) => {
    send.current = {
      type:
        e.target.name === 'Entrega a domicilio'
          ? 'Entrega a domicilio'
          : 'Recoger de la sucursal',
      address: e.target.value
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-5 p-5 text-center ">
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
            <RadioGroup onChange={e => handlePlace(e)} color="secondary">
              <Radio value="Sucursal América">Sucursal América</Radio>
              <Radio value="Sucursal Circunvalación">
                Sucursal Circunvalación
              </Radio>
              <Radio value="Sucursal laguna">Sucursal laguna</Radio>
            </RadioGroup>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Entrega a domicilio"
            title="Entrega a domicilio"
          >
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
          </AccordionItem>
        </Accordion>
      </div>
      {showAlert && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-red-500">Por favor, seleccione una opción</p>
        </div>
      )}
      <div className="flex items-center justify-between  px-6 ">
        <Button
          onClick={() => goToStep(currentStepIndex - 1)}
          color="primary"
          className="w-1/4"
        >
          Atrás
        </Button>
        <Button
          onClick={e => handleSubmit(e)}
          color="primary"
          className="w-1/4"
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}

export default SendOrder
