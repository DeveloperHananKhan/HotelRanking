import { HotelForm } from './components/HotelForm'
import { HotelCard } from './components/HotelCard'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import { HotelDetail } from './components/HotelDetail'




function App() {
  
  
  return (
    <>
    {/* */}
    <Routes>
     <Route path='/hotels-form' element={<HotelForm />} /> 
      <Route path='/hotels-form/:id' element={<HotelForm/>} /> 
      <Route path='/' element={<HotelCard/>} />
      <Route path='/hotels/:id' element={<HotelDetail/>} />
      
    
    </Routes>
      
    </>
  )
}

export default App
