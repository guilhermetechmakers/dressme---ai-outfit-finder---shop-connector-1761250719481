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
  description?: string;
  categories: string[];
  shippingInfo: StoreShippingInfo;
  returnPolicy: StoreReturnPolicy;
  affiliateInfo: StoreAffiliateInfo;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StoreShippingInfo {
  freeShippingThreshold?: number;
  standardShipping: number;
  expressShipping?: number;
  estimatedDays: {
    standard: number;
    express?: number;
  };
  countries: string[];
}

export interface StoreReturnPolicy {
  returnWindow: number; // days
  returnCost: number;
  refundMethod: 'original' | 'store_credit';
  conditions: string[];
}

export interface StoreAffiliateInfo {
  isEnabled: boolean;
  commissionRate: number;
  trackingId: string;
  linkFormat: string;
}

export interface StoreConnection {
  storeId: string;
  isConnected: boolean;
  connectedAt?: string;
  lastSyncAt?: string;
  syncStatus: 'active' | 'error' | 'paused';
  errorMessage?: string;
}

export interface StoreFilter {
  countries?: string[];
  categories?: string[];
  isConnected?: boolean;
  hasFreeShipping?: boolean;
  rating?: number;
  priceRange?: {
    min: number;
    max: number;
  };
}
