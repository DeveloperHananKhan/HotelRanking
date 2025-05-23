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
