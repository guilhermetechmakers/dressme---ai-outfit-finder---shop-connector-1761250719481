export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: CartTotal;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  addedAt: string;
  notes?: string;
}

export interface CartTotal {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  breakdown: CartBreakdown[];
}

export interface CartBreakdown {
  store: Store;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface AddToCartInput {
  productId: string;
  variantId: string;
  quantity: number;
  notes?: string;
}

export interface UpdateCartItemInput {
  itemId: string;
  quantity?: number;
  notes?: string;
}

export interface CartSummary {
  itemCount: number;
  storeCount: number;
  total: number;
  currency: string;
  estimatedShipping: number;
  estimatedTax: number;
}
