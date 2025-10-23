import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthForm } from '@/components/auth/AuthForm';
import { usePasswordResetRequest } from '@/hooks/useAuth';
import { passwordResetRequestSchema, type PasswordResetRequestFormData } from '@/lib/validations/auth';
import { cn } from '@/lib/utils';

export function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState('');
  
  const passwordResetMutation = usePasswordResetRequest();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<PasswordResetRequestFormData>({
    resolver: zodResolver(passwordResetRequestSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: PasswordResetRequestFormData) => {
    try {
      await passwordResetMutation.mutateAsync(data);
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (error: any) {
      if (error.status === 404) {
        setError('email', {
          type: 'manual',
          message: 'No account found with this email address.',
        });
      } else {
        setError('root', {
          type: 'manual',
          message: error.message || 'An error occurred. Please try again.',
        });
      }
    }
  };

  if (isSubmitted) {
    return (
      <AuthForm
        title="Check your email"
        subtitle="We've sent password reset instructions"
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
            <h3 className="text-lg font-semibold">Reset link sent!</h3>
            <p className="text-muted-foreground">
              We've sent password reset instructions to{' '}
              <span className="font-medium text-foreground">{submittedEmail}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Didn't receive the email?</strong> Check your spam folder or{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary hover:text-primary/80 underline"
                >
                  try again
                </button>
              </p>
            </div>

            <div className="flex flex-col space-y-3">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to sign in
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </AuthForm>
    );
  }

  return (
    <AuthForm
      title="Forgot your password?"
      subtitle="No worries, we'll send you reset instructions"
    >
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

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className={cn(
                'pl-10 h-12',
                errors.email && 'border-destructive focus-visible:ring-destructive'
              )}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.email.message}
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
                <span>Sending...</span>
              </div>
            ) : (
              'Send reset instructions'
            )}
          </Button>
        </motion.div>

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
      </form>
    </AuthForm>
  );
}
