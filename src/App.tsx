import { HotelForm } from './components/HotelForm'
import { HotelCard } from './components/HotelCard'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import { HotelDetail } from './components/HotelDetail'
import { useState } from 'react'


function App() {
  const [coordinates, setCoordinates] = useState<{lat: number; lng: number } | null>(null);

  return (
    <>
    <Routes>
     <Route path='/hotels-form' element={<HotelForm coordinates={ coordinates} setCoordinates={setCoordinates}/>} /> 
      <Route path='/hotels-form/:id' element={<HotelForm coordinates={coordinates} setCoordinates={setCoordinates} />} /> 
      <Route path='/' element={<HotelCard/>} />
      <Route path='/hotels/:id' element={<HotelDetail coordinates={coordinates} setCoordinates={setCoordinates}/>} />
    
    </Routes>
      
    </>
  )
}

export default App
