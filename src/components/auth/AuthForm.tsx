import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEmailVerificationStatus, useResendVerification } from '@/hooks/useAuth';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface AuthFormProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export function AuthForm({ children, title, subtitle, className }: AuthFormProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "w-full max-w-md space-y-8",
          className
        )}
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl font-bold text-foreground"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-2 text-muted-foreground"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="dressme-card p-8"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

interface EmailVerificationBannerProps {
  onDismiss?: () => void;
  showDismiss?: boolean;
}

export function EmailVerificationBanner({ onDismiss, showDismiss = true }: EmailVerificationBannerProps) {
  const { user } = useAuth();
  const { data: verificationStatus, isLoading } = useEmailVerificationStatus(user?.email);
  const resendVerificationMutation = useResendVerification();

  // Don't show banner if user is verified or loading
  if (isLoading || !user || user.isEmailVerified) {
    return null;
  }

  const handleResendVerification = async () => {
    if (user.email) {
      try {
        await resendVerificationMutation.mutateAsync({ email: user.email });
      } catch (error) {
        console.error('Failed to resend verification:', error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <Alert className="border-accent/20 bg-gradient-to-r from-accent/5 to-accent/10">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Mail className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <AlertDescription className="text-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-foreground mb-1">
                    Verify your email address
                  </p>
                  <p className="text-muted-foreground">
                    Please check your inbox and click the verification link to activate your account.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sent to: <span className="font-medium">{user.email}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResendVerification}
                    disabled={resendVerificationMutation.isPending}
                    className="text-xs h-8 px-3"
                  >
                    {resendVerificationMutation.isPending ? 'Sending...' : 'Resend'}
                  </Button>
                  {showDismiss && onDismiss && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onDismiss}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </motion.div>
  );
}

export function EmailVerificationStatus() {
  const { user } = useAuth();
  const { data: verificationStatus, isLoading } = useEmailVerificationStatus(user?.email);

  if (isLoading || !user) {
    return null;
  }

  if (user.isEmailVerified) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center space-x-2 text-success"
      >
        <CheckCircle className="h-4 w-4" />
        <span className="text-sm font-medium">Email verified</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center space-x-2 text-accent"
    >
      <AlertCircle className="h-4 w-4" />
      <span className="text-sm font-medium">Email not verified</span>
      <Link 
        to="/email-verification" 
        className="text-xs underline hover:no-underline"
      >
        Verify now
      </Link>
    </motion.div>
  );
}
