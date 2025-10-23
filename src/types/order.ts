export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: OrderTotal;
  status: OrderStatus;
  payment: PaymentInfo;
  shipping: ShippingInfo;
  tracking: TrackingInfo[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  price: number;
  store: Store;
  status: OrderItemStatus;
}

export interface OrderTotal {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type OrderItemStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface PaymentInfo {
  method: 'card' | 'paypal' | 'apple_pay' | 'google_pay' | 'store_redirect';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  amount: number;
  currency: string;
  processedAt?: string;
}

export interface ShippingInfo {
  address: Address;
  method: string;
  cost: number;
  estimatedDelivery: string;
  trackingNumber?: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface TrackingInfo {
  carrier: string;
  trackingNumber: string;
  status: string;
  location: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface CreateOrderInput {
  items: {
    productId: string;
    variantId: string;
    quantity: number;
  }[];
  shippingAddress: Address;
  paymentMethod: string;
  notes?: string;
}

export interface OrderFilter {
  status?: OrderStatus[];
  dateRange?: {
    start: string;
    end: string;
  };
  store?: string[];
}
