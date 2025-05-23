import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
interface Brand {
  id: string;
  name: string;
}

interface BrandStore {
  brands: Brand[];
  AddOrUpdateBrand: (brand: Brand) => void;
  DeleteBrand: (id: string) => void;
}
const defaultBrands: Brand[] = [
  { id: uuidv4(), name: "Wyndham Hotels & Resorts" },
  { id: uuidv4(), name: "Marriott International" },
  { id: uuidv4(), name: "Choice Hotels International" },
  { id: uuidv4(), name: "Hilton Worldwide" },
  { id: uuidv4(), name: "InterContinental Hotels Group" },
  { id: uuidv4(), name: "Accor" },
  { id: uuidv4(), name: "Best Western Hotels & Resorts" },
  { id: uuidv4(), name: "G6 Hospitality" },
  { id: uuidv4(), name: "Jin Jiang" },
  { id: uuidv4(), name: "Huazhu" },
];
interface Modal {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}
export const useModal = create<Modal>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export const useBrandStore = create<BrandStore>((set) => ({
  brands: JSON.parse(localStorage.getItem("brands") || JSON.stringify(defaultBrands)),

  AddOrUpdateBrand: (brand: Brand) =>
    set((state) => {
      const exists = state.brands.some((h) => h.id == brand.id);
      const updatedBrands = exists
        ? state.brands.map((h) => (h.id === brand.id ? brand : h))
        : [...state.brands, brand];

      localStorage.setItem("brands", JSON.stringify(updatedBrands));

      return { brands: updatedBrands };
    }),

  DeleteBrand: (id: string) =>
    set((state) => {
      const updatedBrands = state.brands.filter((b) => b.id !== id);
      localStorage.setItem("brands", JSON.stringify(updatedBrands));
      return { brands: updatedBrands };
    }),
}));
