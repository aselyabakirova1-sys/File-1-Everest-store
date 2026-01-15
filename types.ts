
export type Language = 'kg' | 'ru';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  specs: {
    screen: string;
    processor: string;
    ram: string;
    storage: string;
    camera: string;
  };
  category: 'Flagship' | 'Mid-range' | 'Budget';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface AppState {
  cart: Product[];
  isCartOpen: boolean;
  searchQuery: string;
  selectedCategory: string;
  language: Language;
}
