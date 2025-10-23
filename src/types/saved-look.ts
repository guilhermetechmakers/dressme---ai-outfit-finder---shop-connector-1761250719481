export interface SavedLook {
  id: string;
  userId: string;
  name: string;
  description?: string;
  imageUrl: string;
  items: SavedLookItem[];
  total: SavedLookTotal;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SavedLookItem {
  id: string;
  detectedItem: DetectedItem;
  selectedProduct?: Product;
  selectedVariant?: ProductVariant;
  notes?: string;
}

export interface SavedLookTotal {
  estimatedPrice: number;
  currency: string;
  storeCount: number;
  itemCount: number;
  availability: 'full' | 'partial' | 'none';
}

export interface CreateSavedLookInput {
  name: string;
  description?: string;
  imageUrl: string;
  items: {
    detectedItemId: string;
    selectedProductId?: string;
    selectedVariantId?: string;
    notes?: string;
  }[];
  tags?: string[];
  isPublic?: boolean;
}

export interface UpdateSavedLookInput {
  name?: string;
  description?: string;
  items?: {
    detectedItemId: string;
    selectedProductId?: string;
    selectedVariantId?: string;
    notes?: string;
  }[];
  tags?: string[];
  isPublic?: boolean;
}

export interface SavedLookFilter {
  tags?: string[];
  isPublic?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
  availability?: 'full' | 'partial' | 'none';
  priceRange?: {
    min: number;
    max: number;
  };
}
