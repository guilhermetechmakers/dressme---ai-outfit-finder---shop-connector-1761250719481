import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SocialAuthService, isSocialAuthCallback } from '@/lib/social-auth';
import { useSignIn } from '@/hooks/useAuth';

export function AuthCallbackPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { provider } = useParams<{ provider: string }>();
  const signInMutation = useSignIn();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const callback = isSocialAuthCallback();
        
        if (!callback || !provider) {
          throw new Error('Invalid callback URL');
        }

        if (callback.provider !== provider) {
          throw new Error('Provider mismatch');
        }

        // Exchange code for tokens
        const { token, idToken } = await SocialAuthService.handleCallback(
          provider as 'google' | 'apple' | 'facebook',
          callback.code
        );

        // Sign in with social auth
        await signInMutation.mutateAsync({
          provider: provider as 'google' | 'apple' | 'facebook',
          token,
          idToken,
        });

        setStatus('success');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 2000);

      } catch (error: any) {
        console.error('Auth callback error:', error);
        setErrorMessage(error.message || 'Authentication failed');
        setStatus('error');
      }
    };

    handleCallback();
  }, [provider, navigate, signInMutation]);

  const handleRetry = () => {
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-6"
      >
        <div className="dressme-card p-8">
          {status === 'loading' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
              <h2 className="text-xl font-semibold">Completing sign in...</h2>
              <p className="text-muted-foreground">
                Please wait while we complete your {provider} authentication.
              </p>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-xl font-semibold">Sign in successful!</h2>
              <p className="text-muted-foreground">
                You've been successfully signed in with {provider}. Redirecting to dashboard...
              </p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
              <h2 className="text-xl font-semibold">Sign in failed</h2>
              <p className="text-muted-foreground">
                {errorMessage || 'Something went wrong during authentication.'}
              </p>
              <div className="flex flex-col space-y-2">
                <Button onClick={handleRetry} className="w-full">
                  Try again
                </Button>
                <Button variant="outline" onClick={handleGoHome} className="w-full">
                  Go to home
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
