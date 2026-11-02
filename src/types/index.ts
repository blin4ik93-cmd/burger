export type ProductCategory = 
  | 'burgers'
  | 'rolls'
  | 'snacks'
  | 'chicken'
  | 'combos'
  | 'drinks'
  | 'desserts';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: ProductCategory;
  imageUrl: string;
  calories: number;
  weightGrams: number;
  isHit?: boolean;
  isNew?: boolean;
  isSpicy?: boolean;
  isFlameGrilled?: boolean;
  isBeef?: boolean;
  isChicken?: boolean;
  ingredients?: string[];
  allergens?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: string[];
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  minOrder: number;
  description: string;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  metro?: string;
  hours: string;
  hasDriveThru: boolean;
  hasPlayground: boolean;
  is24Hours: boolean;
  coordinates: [number, number];
  phone: string;
}

export interface OrderCheckoutData {
  name: string;
  phone: string;
  address: string;
  comment?: string;
  paymentMethod: 'card_courier' | 'card_online' | 'sbp' | 'cash';
  cutleryNeeded: boolean;
}
