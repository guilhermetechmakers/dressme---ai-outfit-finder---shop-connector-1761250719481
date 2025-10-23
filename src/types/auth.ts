export interface SignInInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpInput {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
  acceptTerms: boolean;
  marketingOptIn?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  requiresOnboarding?: boolean;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface EmailVerification {
  token: string;
}

export interface EmailVerificationStatus {
  isVerified: boolean;
  email: string;
  verificationSentAt?: string;
  canResend: boolean;
  resendCooldown?: number;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface VerifyEmailRequest {
  token: string;
  email?: string;
}

export interface SocialAuthProvider {
  provider: 'google' | 'apple' | 'facebook';
  token: string;
  idToken?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  requiresOnboarding: boolean;
}

export interface OnboardingData {
  preferredStores: string[];
  stylePreferences: string[];
  budgetRange: {
    min: number;
    max: number;
  };
  sizeProfile: {
    gender: 'male' | 'female' | 'unisex';
    sizes: {
      tops?: string;
      bottoms?: string;
      shoes?: string;
    };
  };
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  isComplete: boolean;
}

export interface AuthError {
  field?: string;
  message: string;
  code: string;
}
