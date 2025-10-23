# DressMe Authentication System

A comprehensive authentication system built with React, TypeScript, and modern web standards. This system provides secure user authentication with multiple sign-in methods, form validation, and a complete onboarding flow.

## Features

### 🔐 Authentication Methods
- **Email/Password**: Traditional authentication with secure password requirements
- **Social Login**: Google, Apple, and Facebook OAuth integration
- **Password Reset**: Secure password reset via email tokens
- **Email Verification**: Account verification with resend functionality

### 🎨 User Experience
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, minimalist interface following DressMe design system
- **Smooth Animations**: Motion library animations for enhanced UX
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Skeleton loaders and progress indicators

### 🛡️ Security Features
- **JWT Tokens**: Secure token-based authentication
- **Password Strength**: Enforced strong password requirements
- **CSRF Protection**: Built-in CSRF protection
- **Rate Limiting**: Protection against brute force attacks
- **Secure Storage**: Tokens stored securely in localStorage

### 🚀 Onboarding Flow
- **Multi-step Wizard**: 5-step onboarding process
- **Store Selection**: Choose preferred shopping stores
- **Style Preferences**: Select fashion style preferences
- **Budget Range**: Set spending preferences
- **Size Profile**: Configure size information
- **Notifications**: Set notification preferences

## File Structure

```
src/
├── components/
│   └── auth/
│       ├── AuthForm.tsx              # Reusable auth form wrapper
│       ├── SocialAuthButtons.tsx     # Social login buttons
│       └── ProtectedRoute.tsx        # Route protection wrapper
├── contexts/
│   └── AuthContext.tsx               # Authentication context
├── hooks/
│   └── useAuth.ts                    # Authentication hooks
├── lib/
│   ├── validations/
│   │   └── auth.ts                   # Zod validation schemas
│   └── social-auth.ts                # Social authentication service
├── pages/
│   ├── auth/
│   │   ├── login.tsx                 # Login page
│   │   ├── signup.tsx                # Signup page
│   │   ├── forgot-password.tsx       # Password reset request
│   │   ├── reset-password.tsx        # Password reset confirmation
│   │   ├── email-verification.tsx    # Email verification
│   │   └── callback.tsx              # OAuth callback handler
│   └── onboarding.tsx                # Onboarding wizard
└── types/
    └── auth.ts                       # Authentication type definitions
```

## Getting Started

### 1. Environment Setup

Copy the environment variables template:
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000/ws

# Social Authentication
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_APPLE_CLIENT_ID=your_apple_client_id_here
VITE_FACEBOOK_APP_ID=your_facebook_app_id_here
```

### 2. Social Authentication Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:5173/auth/callback/google` (development)
   - `https://yourdomain.com/auth/callback/google` (production)

#### Apple OAuth
1. Go to [Apple Developer Console](https://developer.apple.com/)
2. Create a new App ID
3. Configure Sign in with Apple
4. Create a Service ID
5. Add redirect URLs:
   - `http://localhost:5173/auth/callback/apple` (development)
   - `https://yourdomain.com/auth/callback/apple` (production)

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure OAuth redirect URIs:
   - `http://localhost:5173/auth/callback/facebook` (development)
   - `https://yourdomain.com/auth/callback/facebook` (production)

### 3. Backend API Requirements

Your backend should implement these endpoints:

#### Authentication Endpoints
```
POST /api/auth/signin
POST /api/auth/signup
POST /api/auth/signout
POST /api/auth/password-reset-request
POST /api/auth/password-reset-confirm
POST /api/auth/verify-email
POST /api/auth/resend-verification
POST /api/auth/social/callback
GET  /api/auth/me
```

#### Request/Response Examples

**Sign In**
```typescript
// Request
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "rememberMe": false
}

// Response
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe",
    "isEmailVerified": true,
    "onboardingCompleted": false,
    // ... other user fields
  },
  "token": "jwt_token",
  "refreshToken": "refresh_token"
}
```

**Social Auth Callback**
```typescript
// Request
{
  "provider": "google",
  "code": "authorization_code",
  "redirectUri": "http://localhost:5173/auth/callback/google"
}

// Response
{
  "accessToken": "access_token",
  "idToken": "id_token"
}
```

## Usage

### Authentication Context

The `AuthContext` provides authentication state throughout the app:

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please sign in</div>;
  
  return (
    <div>
      <h1>Welcome, {user?.fullName}!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Protected Routes

Wrap protected components with `ProtectedRoute`:

```typescript
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/onboarding" 
        element={
          <ProtectedRoute requireOnboarding={true}>
            <OnboardingPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

### Form Validation

Use the provided Zod schemas for form validation:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, type SignInFormData } from '@/lib/validations/auth';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Sign In</button>
    </form>
  );
}
```

## Design System

The authentication system follows the DressMe design system:

### Colors
- **Primary**: #000000 (black)
- **Secondary**: #F4F4F4 (light gray)
- **Accent**: #FF5757 (red)
- **Muted**: #6E6E6E (gray)
- **Success**: #22C55E (green)
- **Destructive**: #EF4444 (red)

### Typography
- **Font Family**: Inter, SF Pro Display, Helvetica Neue
- **Weights**: 400 (regular), 500 (medium), 700 (bold)

### Components
- **Cards**: Rounded corners (12px), subtle shadows
- **Buttons**: Pill-shaped, hover animations
- **Inputs**: Rounded, focus states
- **Animations**: Smooth transitions (200-300ms)

## Security Considerations

1. **Password Requirements**: Minimum 8 characters with uppercase, lowercase, and numbers
2. **Token Storage**: JWT tokens stored in localStorage (consider httpOnly cookies for production)
3. **HTTPS**: Always use HTTPS in production
4. **Rate Limiting**: Implement rate limiting on authentication endpoints
5. **Input Validation**: All inputs validated on both client and server
6. **CSRF Protection**: Implement CSRF tokens for state-changing operations

## Testing

The authentication system is designed to be easily testable:

```typescript
// Mock the auth context for testing
const mockAuthContext = {
  user: mockUser,
  isAuthenticated: true,
  isLoading: false,
  signOut: jest.fn(),
};

// Test protected routes
render(
  <AuthContext.Provider value={mockAuthContext}>
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  </AuthContext.Provider>
);
```

## Troubleshooting

### Common Issues

1. **Social Auth Not Working**
   - Check environment variables are set correctly
   - Verify redirect URIs match exactly
   - Ensure OAuth apps are properly configured

2. **Form Validation Errors**
   - Check Zod schema definitions
   - Verify form field names match schema
   - Ensure proper error handling

3. **Token Issues**
   - Check token storage in localStorage
   - Verify token expiration handling
   - Ensure proper token refresh logic

### Debug Mode

Enable debug mode by setting:
```env
VITE_DEBUG=true
```

This will log additional information to the console.

## Contributing

When adding new authentication features:

1. Update the validation schemas in `src/lib/validations/auth.ts`
2. Add new types to `src/types/auth.ts`
3. Update the authentication hooks in `src/hooks/useAuth.ts`
4. Add corresponding UI components
5. Update this documentation

## License

This authentication system is part of the DressMe application and follows the same license terms.
