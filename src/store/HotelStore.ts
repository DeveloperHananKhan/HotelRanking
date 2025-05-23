import { create } from 'zustand';
import { Hotel } from '../types/hotel';

interface HotelState {
  hotels: Hotel[];
  editHotel: Hotel | null;
  setEditHotel: (hotel: Hotel | null) => void;
  addOrUpdateHotel: (hotelData: Hotel) => void;
  deleteHotel: (id: string) => void;
}

export const useHotelStore = create<HotelState>((set) => ({
  hotels: JSON.parse(localStorage.getItem('hotels') || '[]'),
  editHotel: null,

  setEditHotel: (hotel) => set({ editHotel: hotel }),

  addOrUpdateHotel: (hotelData) =>
    set((state) => {
      const exists = state.hotels.some((h) => h.id === hotelData.id);
      const updatedHotels =exists ?  state.hotels.map((h)=> (h.id === hotelData.id ? hotelData : h )) : [...state.hotels,hotelData];
  
      localStorage.setItem('hotels', JSON.stringify(updatedHotels));
      return { hotels: updatedHotels };
    }),

  deleteHotel: (id: string) =>
    set((state) => {
      const updatedHotels = state.hotels.filter((hotel) => hotel.id !== id);
      localStorage.setItem('hotels', JSON.stringify(updatedHotels));
      return { hotels: updatedHotels };
    }),

}));