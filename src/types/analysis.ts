export interface Analysis {
  id: string;
  userId: string;
  imageUrl: string;
  imageId: string;
  status: AnalysisStatus;
  progress: number;
  detectedItems: DetectedItem[];
  metadata: AnalysisMetadata;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export type AnalysisStatus = 
  | 'pending'
  | 'processing'
  | 'detecting'
  | 'matching'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface DetectedItem {
  id: string;
  type: string;
  category: string;
  subcategory: string;
  color: string;
  pattern?: string;
  material: string;
  fit: string;
  confidence: number;
  boundingBox: BoundingBox;
  segmentationMask?: string;
  attributes: ItemAttributes;
  productMatches: ProductMatch[];
  isEdited: boolean;
  userFeedback?: UserFeedback;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ItemAttributes {
  occasion: string[];
  season: string[];
  gender: 'male' | 'female' | 'unisex';
  ageGroup: 'adult' | 'teen' | 'child' | 'baby';
  features: string[];
  care: string[];
  brand?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface UserFeedback {
  isAccurate: boolean;
  correctedAttributes?: Partial<ItemAttributes>;
  rating: number;
  comments?: string;
  submittedAt: string;
}

export interface AnalysisMetadata {
  imageDimensions: {
    width: number;
    height: number;
  };
  processingTime: number;
  modelVersion: string;
  confidenceThreshold: number;
  privacySettings: {
    imageRetention: 'private' | 'shared';
    dataSharing: boolean;
  };
}

export interface AnalysisProgress {
  step: AnalysisStep;
  progress: number;
  message: string;
  estimatedTimeRemaining?: number;
}

export type AnalysisStep = 
  | 'upload'
  | 'detection'
  | 'segmentation'
  | 'attribute_extraction'
  | 'matching'
  | 'ranking'
  | 'completed';

export interface CreateAnalysisInput {
  imageUrl: string;
  imageId: string;
  attributes?: Partial<ItemAttributes>;
  privacySettings?: {
    imageRetention: 'private' | 'shared';
    dataSharing: boolean;
  };
}

export interface UpdateAnalysisInput {
  detectedItems?: DetectedItem[];
  status?: AnalysisStatus;
  progress?: number;
}

export interface AnalysisFilter {
  status?: AnalysisStatus[];
  dateRange?: {
    start: string;
    end: string;
  };
  hasMatches?: boolean;
  confidenceThreshold?: number;
}
