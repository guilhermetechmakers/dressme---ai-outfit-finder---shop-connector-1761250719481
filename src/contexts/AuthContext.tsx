import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCurrentUser, useSignOut } from '@/hooks/useAuth';
import type { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  signOut: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [requiresOnboarding, setRequiresOnboarding] = useState(false);
  
  const { data: user, isLoading: userLoading, refetch } = useCurrentUser();
  const signOutMutation = useSignOut();

  // Check if user requires onboarding
  useEffect(() => {
    if (user && !user.onboardingCompleted) {
      setRequiresOnboarding(true);
    } else {
      setRequiresOnboarding(false);
    }
  }, [user]);

  // Set loading state
  useEffect(() => {
    setIsLoading(userLoading);
  }, [userLoading]);

  const signOut = () => {
    signOutMutation.mutate();
  };

  const refreshUser = () => {
    refetch();
  };

  const value: AuthContextType = {
    user: user || null,
    token: localStorage.getItem('auth_token'),
    isAuthenticated: !!user && !!localStorage.getItem('auth_token'),
    isLoading,
    requiresOnboarding,
    signOut,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
