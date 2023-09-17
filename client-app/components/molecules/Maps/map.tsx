import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const Map = () => {
  const [activeDirection, setActiveDirection] = useState({ lat: 0, lng: 0 })

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDiFHyCkH5AcfAMHRNvzlZ2CpPzxQMXBns' // Reemplaza 'TU_API_KEY_AQUI' con tu propia API Key de Google Maps
  })

  const onSetDirection = (event:any) => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    setActiveDirection({ lat, lng })
  }

  return (
    <>
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
    </>
  )
}

export default Map
