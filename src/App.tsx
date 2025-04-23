import { HotelForm } from './components/HotelForm'
import { HotelCard } from './components/HotelCard'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import { HotelDetail } from './components/HotelDetail'
import { useState,useEffect } from 'react'


function App() {
  const [coordinates, setCoordinates] = useState<{lat: number; lng: number } | null>(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
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
