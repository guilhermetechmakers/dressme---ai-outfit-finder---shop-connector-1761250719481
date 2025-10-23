import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, CheckCircle, Clock, ArrowLeft, RefreshCw, Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AuthForm } from '@/components/auth/AuthForm';
import { useEmailVerification, useResendVerification, useEmailVerificationStatus } from '@/hooks/useAuth';
import { emailVerificationSchema, resendVerificationSchema, type EmailVerificationFormData, type ResendVerificationFormData } from '@/lib/validations/auth';
import { cn } from '@/lib/utils';

export function EmailVerificationPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [showResendForm, setShowResendForm] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const emailVerificationMutation = useEmailVerification();
  const resendVerificationMutation = useResendVerification();
  const { data: verificationStatus, isLoading: statusLoading } = useEmailVerificationStatus(verificationEmail);

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

  // Update cooldown from verification status
  useEffect(() => {
    if (verificationStatus?.resendCooldown) {
      setResendCooldown(verificationStatus.resendCooldown);
    }
  }, [verificationStatus]);

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

  const resendForm = useForm<ResendVerificationFormData>({
    resolver: zodResolver(resendVerificationSchema),
    defaultValues: {
      email: verificationEmail,
    },
  });

  const onSubmit = async (data: EmailVerificationFormData) => {
    try {
      await emailVerificationMutation.mutateAsync({
        token: data.token,
        email: verificationEmail,
      });
      // Redirect to success page instead of showing inline success
      navigate('/verification-success', { replace: true });
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
    if (verificationEmail) {
      try {
        await resendVerificationMutation.mutateAsync({ email: verificationEmail });
        setResendCooldown(60); // 60 second cooldown
      } catch (error) {
        console.error('Resend verification error:', error);
      }
    } else {
      setShowResendForm(true);
    }
  };

  const onResendFormSubmit = async (data: ResendVerificationFormData) => {
    try {
      await resendVerificationMutation.mutateAsync(data);
      setVerificationEmail(data.email);
      setShowResendForm(false);
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
          className="text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-gradient-to-br from-success/20 to-success/10 rounded-full flex items-center justify-center shadow-lg"
          >
            <CheckCircle className="w-10 h-10 text-success" />
          </motion.div>
          
          <div className="space-y-3">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-foreground"
            >
              Verification complete!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg"
            >
              Your email has been successfully verified. You can now access all features of DressMe.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col space-y-4"
          >
            <Link to="/onboarding">
              <Button className="w-full h-12 text-base font-medium" size="lg">
                Complete your profile
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="w-full h-12 text-base font-medium" size="lg">
                Go to dashboard
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </AuthForm>
    );
  }

  return (
    <AuthForm
      title="Verify your email"
      subtitle="We've sent a verification code to your email"
    >
      <div className="space-y-8">
        {/* Email Display */}
        {verificationEmail && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border border-border/50 text-center"
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-foreground">Verification Required</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Verification code sent to{' '}
              <span className="font-semibold text-foreground">{verificationEmail}</span>
            </p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Error Message */}
          {errors.root && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg flex items-center space-x-2"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errors.root.message}</span>
            </motion.div>
          )}

          {/* Verification Code Field */}
          <div className="space-y-3">
            <Label htmlFor="token" className="text-base font-semibold text-foreground">
              Enter verification code
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="token"
                type="text"
                placeholder="Enter 6-digit code"
                className={cn(
                  'pl-12 h-14 text-center text-xl tracking-[0.2em] font-mono',
                  'border-2 focus:border-accent focus:ring-2 focus:ring-accent/20',
                  errors.token && 'border-destructive focus:border-destructive focus:ring-destructive/20'
                )}
                {...register('token')}
                maxLength={6}
              />
            </div>
            {errors.token && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive flex items-center space-x-1"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{errors.token.message}</span>
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-2"
          >
            <Button
              type="submit"
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify Email'
              )}
            </Button>
          </motion.div>
        </form>

        {/* Resend Section */}
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground font-medium">
                Didn't receive the code?
              </span>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Check your spam folder or request a new verification code
            </p>
            
            {!showResendForm ? (
              <Button
                variant="outline"
                onClick={handleResendVerification}
                disabled={resendCooldown > 0 || resendVerificationMutation.isPending}
                className="w-full h-12 font-medium"
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
            ) : (
              <Card className="p-6">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-lg">Resend Verification</CardTitle>
                  <CardDescription>
                    Enter your email address to receive a new verification code
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <form onSubmit={resendForm.handleSubmit(onResendFormSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resend-email" className="text-sm font-medium">
                        Email address
                      </Label>
                      <Input
                        id="resend-email"
                        type="email"
                        placeholder="Enter your email"
                        className="h-12"
                        {...resendForm.register('email')}
                      />
                      {resendForm.formState.errors.email && (
                        <p className="text-sm text-destructive">
                          {resendForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowResendForm(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={resendForm.formState.isSubmitting}
                        className="flex-1"
                      >
                        {resendForm.formState.isSubmitting ? 'Sending...' : 'Send Code'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center pt-4">
          <Link
            to="/login"
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthForm>
  );
}
