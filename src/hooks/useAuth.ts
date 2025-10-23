import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import type { 
  SignInInput, 
  SignUpInput, 
  AuthResponse, 
  User, 
  PasswordResetRequest,
  PasswordResetConfirm,
  EmailVerification 
} from '@/types';

// Query keys
export const authKeys = {
  user: ['auth', 'user'] as const,
};

// Get current user
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user,
    queryFn: () => api.get<User>('/auth/me'),
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!localStorage.getItem('auth_token'),
  });
};

// Sign in mutation
export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: SignInInput) => 
      api.post<AuthResponse>('/auth/signin', credentials),
    onSuccess: (data) => {
      // Store auth token
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }
      
      // Update the user in the cache
      if (data.user) {
        queryClient.setQueryData(authKeys.user, data.user);
      }
      
      toast.success('Signed in successfully!');
    },
    onError: (error: any) => {
      toast.error(`Sign in failed: ${error.message}`);
    },
  });
};

// Sign up mutation
export const useSignUp = () => {
  return useMutation({
    mutationFn: (credentials: SignUpInput) => 
      api.post<AuthResponse>('/auth/signup', credentials),
    onSuccess: (data) => {
      // Store auth token
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }
      
      toast.success('Account created! Please check your email to verify your account.');
    },
    onError: (error: any) => {
      toast.error(`Sign up failed: ${error.message}`);
    },
  });
};

// Sign out mutation
export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.post('/auth/signout'),
    onSuccess: () => {
      // Clear auth token
      localStorage.removeItem('auth_token');
      
      // Clear all cached data
      queryClient.clear();
      
      toast.success('Signed out successfully!');
    },
    onError: (error: any) => {
      toast.error(`Sign out failed: ${error.message}`);
    },
  });
};

// Password reset request mutation
export const usePasswordResetRequest = () => {
  return useMutation({
    mutationFn: (data: PasswordResetRequest) => 
      api.post('/auth/password-reset-request', data),
    onSuccess: () => {
      toast.success('Password reset email sent! Check your inbox.');
    },
    onError: (error: any) => {
      toast.error(`Password reset failed: ${error.message}`);
    },
  });
};

// Password reset confirm mutation
export const usePasswordResetConfirm = () => {
  return useMutation({
    mutationFn: (data: PasswordResetConfirm) => 
      api.post('/auth/password-reset-confirm', data),
    onSuccess: () => {
      toast.success('Password reset successfully! You can now sign in.');
    },
    onError: (error: any) => {
      toast.error(`Password reset failed: ${error.message}`);
    },
  });
};

// Email verification mutation
export const useEmailVerification = () => {
  return useMutation({
    mutationFn: (data: EmailVerification) => 
      api.post('/auth/verify-email', data),
    onSuccess: () => {
      toast.success('Email verified successfully!');
    },
    onError: (error: any) => {
      toast.error(`Email verification failed: ${error.message}`);
    },
  });
};

// Resend verification email mutation
export const useResendVerification = () => {
  return useMutation({
    mutationFn: () => api.post('/auth/resend-verification'),
    onSuccess: () => {
      toast.success('Verification email sent! Check your inbox.');
    },
    onError: (error: any) => {
      toast.error(`Failed to send verification email: ${error.message}`);
    },
  });
};
