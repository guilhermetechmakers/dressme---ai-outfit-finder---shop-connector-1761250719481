import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthForm } from '@/components/auth/AuthForm';
import { usePasswordResetConfirm } from '@/hooks/useAuth';
import { passwordResetConfirmSchema, type PasswordResetConfirmFormData } from '@/lib/validations/auth';
import { cn } from '@/lib/utils';

export function ResetPasswordPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const passwordResetMutation = usePasswordResetConfirm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<PasswordResetConfirmFormData>({
    resolver: zodResolver(passwordResetConfirmSchema),
    defaultValues: {
      token: token || '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const password = watch('newPassword');

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password || '');
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  const onSubmit = async (data: PasswordResetConfirmFormData) => {
    try {
      await passwordResetMutation.mutateAsync(data);
      setIsSuccess(true);
    } catch (error: any) {
      if (error.status === 400) {
        setError('root', {
          type: 'manual',
          message: 'Invalid or expired reset token. Please request a new password reset.',
        });
      } else {
        setError('root', {
          type: 'manual',
          message: error.message || 'An error occurred. Please try again.',
        });
      }
    }
  };

  if (!token) {
    return (
      <AuthForm
        title="Invalid reset link"
        subtitle="This password reset link is invalid or has expired"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Link to="/forgot-password">
              <Button className="w-full">
                Request new reset link
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to sign in
              </Button>
            </Link>
          </div>
        </motion.div>
      </AuthForm>
    );
  }

  if (isSuccess) {
    return (
      <AuthForm
        title="Password reset successful"
        subtitle="Your password has been updated"
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
            <h3 className="text-lg font-semibold">Password updated!</h3>
            <p className="text-muted-foreground">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <Link to="/login">
              <Button className="w-full">
                Sign in with new password
              </Button>
            </Link>
          </div>
        </motion.div>
      </AuthForm>
    );
  }

  return (
    <AuthForm
      title="Set new password"
      subtitle="Choose a strong password for your account"
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

        {/* New Password Field */}
        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-sm font-medium">
            New password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="newPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your new password"
              className={cn(
                'pl-10 pr-10 h-12',
                errors.newPassword && 'border-destructive focus-visible:ring-destructive'
              )}
              {...register('newPassword')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {password && (
            <div className="space-y-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={cn(
                      'h-1 flex-1 rounded-full',
                      level <= passwordStrength
                        ? strengthColors[passwordStrength - 1] || 'bg-gray-300'
                        : 'bg-gray-300'
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Password strength: {strengthLabels[passwordStrength - 1] || 'Very Weak'}
              </p>
            </div>
          )}
          
          {errors.newPassword && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.newPassword.message}
            </motion.p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm new password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your new password"
              className={cn(
                'pl-10 pr-10 h-12',
                errors.confirmPassword && 'border-destructive focus-visible:ring-destructive'
              )}
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.confirmPassword.message}
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
                <span>Updating password...</span>
              </div>
            ) : (
              'Update password'
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
