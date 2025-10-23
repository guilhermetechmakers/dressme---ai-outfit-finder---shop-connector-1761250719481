export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: ProductImage[];
  variants: ProductVariant[];
  attributes: ProductAttributes;
  store: Store;
  availability: ProductAvailability;
  affiliate: AffiliateInfo;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex?: string;
  sku: string;
  price: number;
  stock: number;
  isAvailable: boolean;
}

export interface ProductAttributes {
  category: string;
  subcategory: string;
  type: string;
  color: string;
  pattern?: string;
  material: string;
  fit: string;
  occasion: string[];
  season: string[];
  gender: 'male' | 'female' | 'unisex';
  ageGroup: 'adult' | 'teen' | 'child' | 'baby';
  features: string[];
  care: string[];
}

export interface ProductAvailability {
  inStock: boolean;
  quantity: number;
  estimatedDelivery: string;
  shippingInfo: ShippingInfo;
}

export interface ShippingInfo {
  freeShipping: boolean;
  shippingCost: number;
  estimatedDays: number;
  countries: string[];
}

export interface AffiliateInfo {
  link: string;
  commission: number;
  trackingId: string;
  expiresAt?: string;
}

export interface Store {
  id: string;
  name: string;
  logo: string;
  domain: string;
  country: string;
  currency: string;
  isConnected: boolean;
  rating: number;
  reviewCount: number;
}

export interface ProductMatch {
  product: Product;
  confidence: number;
  matchReasons: string[];
  priceScore: number;
  styleScore: number;
  availabilityScore: number;
}

export interface ProductFilter {
  priceRange?: [number, number];
  brands?: string[];
  colors?: string[];
  sizes?: string[];
  categories?: string[];
  stores?: string[];
  availability?: boolean;
  sortBy?: 'price' | 'relevance' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
}
