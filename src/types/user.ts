export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  onboardingCompleted: boolean;
  preferences: UserPreferences;
  subscription: UserSubscription;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  styleTags: string[];
  budgetRange: {
    min: number;
    max: number;
  };
  currency: string;
  sizeProfile: SizeProfile;
  connectedStores: string[];
  notificationSettings: NotificationSettings;
  privacySettings: PrivacySettings;
}

export interface SizeProfile {
  gender: 'male' | 'female' | 'unisex';
  sizes: {
    tops: string;
    bottoms: string;
    shoes: string;
    dresses?: string;
  };
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    inseam?: number;
  };
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  analysisComplete: boolean;
  newMatches: boolean;
  priceDrops: boolean;
  orderUpdates: boolean;
}

export interface PrivacySettings {
  imageRetention: 'private' | 'shared';
  dataSharing: boolean;
  analyticsOptIn: boolean;
}

export interface UserSubscription {
  plan: 'free' | 'premium' | 'pro';
  status: 'active' | 'cancelled' | 'expired';
  expiresAt?: string;
  features: string[];
}

export interface UpdateUserInput {
  fullName?: string;
  avatarUrl?: string;
  preferences?: Partial<UserPreferences>;
}
