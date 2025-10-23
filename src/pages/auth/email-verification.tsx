import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, CheckCircle, Clock, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthForm } from '@/components/auth/AuthForm';
import { useEmailVerification, useResendVerification } from '@/hooks/useAuth';
import { emailVerificationSchema, type EmailVerificationFormData } from '@/lib/validations/auth';
import { cn } from '@/lib/utils';

export function EmailVerificationPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [verificationEmail, setVerificationEmail] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const emailVerificationMutation = useEmailVerification();
  const resendVerificationMutation = useResendVerification();

  // Get email from location state or URL params
  useEffect(() => {
    const email = location.state?.email || new URLSearchParams(location.search).get('email');
    if (email) {
      setVerificationEmail(email);
    }
  }, [location]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EmailVerificationFormData>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      token: '',
    },
  });

  const onSubmit = async (data: EmailVerificationFormData) => {
    try {
      await emailVerificationMutation.mutateAsync(data);
      setIsVerified(true);
    } catch (error: any) {
      if (error.status === 400) {
        setError('token', {
          type: 'manual',
          message: 'Invalid or expired verification code. Please try again.',
        });
      } else {
        setError('root', {
          type: 'manual',
          message: error.message || 'An error occurred. Please try again.',
        });
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerificationMutation.mutateAsync();
      setResendCooldown(60); // 60 second cooldown
    } catch (error) {
      console.error('Resend verification error:', error);
    }
  };

  if (isVerified) {
    return (
      <AuthForm
        title="Email verified!"
        subtitle="Your account is now active"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Verification complete!</h3>
            <p className="text-muted-foreground">
              Your email has been successfully verified. You can now access all features of DressMe.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <Link to="/onboarding">
              <Button className="w-full">
                Complete your profile
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="w-full">
                Go to dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      </AuthForm>
    );
  }

  return (
    <AuthForm
      title="Verify your email"
      subtitle="We've sent a verification code to your email"
    >
      <div className="space-y-6">
        {/* Email Display */}
        {verificationEmail && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-muted/50 rounded-lg text-center"
          >
            <p className="text-sm text-muted-foreground">
              Verification code sent to{' '}
              <span className="font-medium text-foreground">{verificationEmail}</span>
            </p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Error Message */}
          {errors.root && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg"
            >
              {errors.root.message}
            </motion.div>
          )}

          {/* Verification Code Field */}
          <div className="space-y-2">
            <Label htmlFor="token" className="text-sm font-medium">
              Verification code
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="token"
                type="text"
                placeholder="Enter verification code"
                className={cn(
                  'pl-10 h-12 text-center text-lg tracking-widest',
                  errors.token && 'border-destructive focus-visible:ring-destructive'
                )}
                {...register('token')}
                maxLength={6}
              />
            </div>
            {errors.token && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive"
              >
                {errors.token.message}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify email'
              )}
            </Button>
          </motion.div>
        </form>

        {/* Resend Section */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Didn't receive the code?
              </span>
            </div>
          </div>

          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Check your spam folder or request a new code
            </p>
            
            <Button
              variant="outline"
              onClick={handleResendVerification}
              disabled={resendCooldown > 0 || resendVerificationMutation.isPending}
              className="w-full"
            >
              {resendVerificationMutation.isPending ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : resendCooldown > 0 ? (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Resend in {resendCooldown}s</span>
                </div>
              ) : (
                'Resend verification code'
              )}
            </Button>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthForm>
  );
}
