import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { Text } from '@chakra-ui/react'
import { HotelFormProps } from '../types/hotel'

const containerStyle = {
  width: '100%',
  height: '400px',
}

export const HotelMaps: React.FC<HotelFormProps> = ({ coordinates, setCoordinates }) => {
 
  if (!coordinates) {
    return <Text>Error: Coordinates not available</Text>
  }

  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'Api-Key', 
  })

  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(coordinates)
    map.fitBounds(bounds)

    setMap(map)
  }, [coordinates])

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div>
      <Text>Latitude: {coordinates.lat}</Text>
      <Text>Longitude: {coordinates.lng}</Text>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
       
        <Marker position={coordinates} />
      </GoogleMap>
    </div>
  ) : (
    <Text>Loading Map...</Text>
  )
}


