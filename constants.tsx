
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    price: 1299,
    image: 'https://picsum.photos/seed/iphone16/600/600',
    description: 'The ultimate iPhone with Titanium design and the A18 Pro chip.',
    category: 'Flagship',
    specs: {
      screen: '6.9" Super Retina XDR',
      processor: 'A18 Pro',
      ram: '8GB',
      storage: '256GB/512GB/1TB',
      camera: '48MP Main | 12MP Ultra Wide | 12MP Telephoto'
    }
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 1199,
    image: 'https://picsum.photos/seed/s24u/600/600',
    description: 'The AI smartphone that redefines what a phone can do.',
    category: 'Flagship',
    specs: {
      screen: '6.8" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB/512GB/1TB',
      camera: '200MP Main | 12MP Ultra Wide | 50MP Telephoto'
    }
  },
  {
    id: '3',
    name: 'Google Pixel 9 Pro',
    brand: 'Google',
    price: 999,
    image: 'https://picsum.photos/seed/pixel9/600/600',
    description: 'Advanced AI meets the best camera system on a Pixel.',
    category: 'Flagship',
    specs: {
      screen: '6.7" LTPO OLED',
      processor: 'Google Tensor G4',
      ram: '16GB',
      storage: '128GB/256GB/512GB',
      camera: '50MP Main | 48MP Ultra Wide | 48MP Telephoto'
    }
  },
  {
    id: '4',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    price: 1099,
    image: 'https://picsum.photos/seed/xiaomi14/600/600',
    description: 'A masterpiece in collaboration with Leica.',
    category: 'Flagship',
    specs: {
      screen: '6.73" AMOLED',
      processor: 'Snapdragon 8 Gen 3',
      ram: '16GB',
      storage: '512GB',
      camera: '50MP Quad Camera with Leica Optics'
    }
  },
  {
    id: '5',
    name: 'Nothing Phone (2)',
    brand: 'Nothing',
    price: 599,
    image: 'https://picsum.photos/seed/nothing2/600/600',
    description: 'Unique design meets powerful performance.',
    category: 'Mid-range',
    specs: {
      screen: '6.7" LTPO OLED',
      processor: 'Snapdragon 8+ Gen 1',
      ram: '12GB',
      storage: '256GB',
      camera: '50MP Dual Main'
    }
  },
  {
    id: '6',
    name: 'Redmi Note 13 Pro',
    brand: 'Xiaomi',
    price: 349,
    image: 'https://picsum.photos/seed/redminote13/600/600',
    description: 'Premium features at an accessible price point.',
    category: 'Mid-range',
    specs: {
      screen: '6.67" AMOLED 120Hz',
      processor: 'Helio G99-Ultra',
      ram: '8GB',
      storage: '256GB',
      camera: '200MP Main'
    }
  }
];

export const CATEGORIES = ['All', 'Flagship', 'Mid-range', 'Budget'];
export const STORE_LOCATION = "Urban Mall, Basement Floor, Osh, Kyrgyzstan";
