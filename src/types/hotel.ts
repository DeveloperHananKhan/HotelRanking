export interface Coordinates {
    lat: number;
    lng: number;
  }
export interface Hotel{
    id: string ;
    name: string;
    city: string;
    country: string;
    address: string;
    brand?: string;
    rating:number;
    review:string;
    coordinates: Coordinates | null;
  

}
export interface HotelFormProps {
    coordinates: Coordinates | null;
  setCoordinates: (coords: Coordinates | null) => void;
  }