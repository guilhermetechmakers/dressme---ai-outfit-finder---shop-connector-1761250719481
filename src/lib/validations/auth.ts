import { z } from 'zod';

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password validation regex - at least 8 characters, 1 uppercase, 1 lowercase, 1 number
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

// Sign in schema
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .regex(emailRegex, 'Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional().default(false),
});

// Sign up schema
export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address')
      .regex(emailRegex, 'Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        passwordRegex,
        'Password must contain at least 8 characters with uppercase, lowercase, and number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Full name must be at least 2 characters')
      .max(50, 'Full name must be less than 50 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, 'You must accept the terms and conditions'),
    marketingOptIn: z.boolean().optional().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Password reset request schema
export const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .regex(emailRegex, 'Please enter a valid email address'),
});

// Password reset confirm schema
export const passwordResetConfirmSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        passwordRegex,
        'Password must contain at least 8 characters with uppercase, lowercase, and number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Email verification schema
export const emailVerificationSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

// Social auth schema
export const socialAuthSchema = z.object({
  provider: z.enum(['google', 'apple', 'facebook'], {
    required_error: 'Please select a provider',
  }),
  token: z.string().min(1, 'Authentication token is required'),
  idToken: z.string().optional(),
});

// Onboarding schemas
export const storeSelectionSchema = z.object({
  preferredStores: z
    .array(z.string())
    .min(1, 'Please select at least one store')
    .max(10, 'You can select up to 10 stores'),
});

export const stylePreferencesSchema = z.object({
  stylePreferences: z
    .array(z.string())
    .min(1, 'Please select at least one style preference')
    .max(15, 'You can select up to 15 style preferences'),
});

export const budgetRangeSchema = z.object({
  budgetRange: z.object({
    min: z
      .number()
      .min(0, 'Minimum budget must be 0 or greater')
      .max(10000, 'Minimum budget must be less than $10,000'),
    max: z
      .number()
      .min(0, 'Maximum budget must be 0 or greater')
      .max(50000, 'Maximum budget must be less than $50,000'),
  }),
}).refine((data) => data.budgetRange.min <= data.budgetRange.max, {
  message: 'Maximum budget must be greater than minimum budget',
  path: ['budgetRange', 'max'],
});

export const sizeProfileSchema = z.object({
  sizeProfile: z.object({
    gender: z.enum(['male', 'female', 'unisex'], {
      required_error: 'Please select your gender preference',
    }),
    sizes: z.object({
      tops: z.string().optional(),
      bottoms: z.string().optional(),
      shoes: z.string().optional(),
    }),
  }),
});

export const notificationPreferencesSchema = z.object({
  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(true),
    marketing: z.boolean().default(false),
  }),
});

// Complete onboarding schema
export const onboardingSchema = z.object({
  preferredStores: z
    .array(z.string())
    .min(1, 'Please select at least one store'),
  stylePreferences: z
    .array(z.string())
    .min(1, 'Please select at least one style preference'),
  budgetRange: z.object({
    min: z.number().min(0).max(10000),
    max: z.number().min(0).max(50000),
  }),
  sizeProfile: z.object({
    gender: z.enum(['male', 'female', 'unisex']),
    sizes: z.object({
      tops: z.string().optional(),
      bottoms: z.string().optional(),
      shoes: z.string().optional(),
    }),
  }),
  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(true),
    marketing: z.boolean().default(false),
  }),
}).refine((data) => data.budgetRange.min <= data.budgetRange.max, {
  message: 'Maximum budget must be greater than minimum budget',
  path: ['budgetRange', 'max'],
});

// Type exports
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type PasswordResetRequestFormData = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetConfirmFormData = z.infer<typeof passwordResetConfirmSchema>;
export type EmailVerificationFormData = z.infer<typeof emailVerificationSchema>;
export type SocialAuthFormData = z.infer<typeof socialAuthSchema>;
export type StoreSelectionFormData = z.infer<typeof storeSelectionSchema>;
export type StylePreferencesFormData = z.infer<typeof stylePreferencesSchema>;
export type BudgetRangeFormData = z.infer<typeof budgetRangeSchema>;
export type SizeProfileFormData = z.infer<typeof sizeProfileSchema>;
export type NotificationPreferencesFormData = z.infer<typeof notificationPreferencesSchema>;
export type OnboardingFormData = z.infer<typeof onboardingSchema>;
