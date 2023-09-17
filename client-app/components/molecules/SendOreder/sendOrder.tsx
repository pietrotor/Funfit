import React, { useState, useRef } from 'react'
import { Button, Accordion, AccordionItem, RadioGroup, Radio } from '@nextui-org/react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api'

type Props = {
    goToStep: (e:number) => void
    currentStepIndex: number
}
function SendOrder ({ goToStep, currentStepIndex }: Props) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['0']))
  const [showAlert, setShowAlert] = useState(false)
  const [activeDirection, setActiveDirection] = useState({ lat: 0, lng: 0 })
  const send = useRef({
    type: '',
    address: ''
  })

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDiFHyCkH5AcfAMHRNvzlZ2CpPzxQMXBns' || ''
  })
  const onSetDirection = (marker: any) => {
    const { lat, lng } = marker.latLng
    setActiveDirection({
      lat: lat(),
      lng: lng()
    })
  }

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
    send.current = ({
      type: e.target.name === 'Entrega a domicilo' ? 'Entrega a domicilo' : 'Recoger de la sucursal',
      address: e.target.value
    })
    console.log(send.current)
  }

  return (
    <div className='h-full w-full p-5 flex flex-col justify-between text-center space-y-5 '>
      <div className='px-8 overflow-y-auto'>
      <h2 className='text-gray-500 md:pb-6'>Datos de ubicación</h2>
      <Accordion
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys as any }
      >
        <AccordionItem key="1" aria-label="Recoger de la sucursal" title="Recoger de la sucursal">
          <RadioGroup onChange={(e) => handlePlace(e) } color='secondary'>
            <Radio value='Sucursal América'>Sucursal América</Radio>
            <Radio value='Sucursal Circunvalación'>Sucursal Circunvalación</Radio>
            <Radio value='Sucursal laguna'>Sucursal laguna</Radio>
          </RadioGroup>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Entrega a domicilo" title="Entrega a domicilo">
        <div className='w-full'>{isLoaded &&
                      <GoogleMap
                        onClick={onSetDirection}
                        center={activeDirection}
                        zoom={17}
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                      >
                        <MarkerF
                          position={activeDirection}
                        />
                      </GoogleMap>
                    }</div>
        </AccordionItem>
      </Accordion>
      </div>
      { showAlert && <div className='flex  justify-center items-center flex-col'>
        <p className='text-red-500'>Por favor, seleccione una opción</p>
      </div>
      }
      <div className='flex justify-between px-6  items-center '>
          <Button onClick={() => goToStep(currentStepIndex - 1)} color='primary' className='w-1/4' >
            Atrás
          </Button>
          <Button onClick={(e) => handleSubmit(e)} color='primary' className='w-1/4' >
            Siguiente
          </Button>
        </div>
      </div>
  )
}
export default SendOrder
