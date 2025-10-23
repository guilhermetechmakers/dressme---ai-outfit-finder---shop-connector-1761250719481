import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Eye, EyeOff, Mail, Lock, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AuthForm } from '@/components/auth/AuthForm';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { useSignUp } from '@/hooks/useAuth';
import { signUpSchema, type SignUpFormData } from '@/lib/validations/auth';
import { SocialAuthService } from '@/lib/social-auth';
import { cn } from '@/lib/utils';

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  
  const navigate = useNavigate();
  const signUpMutation = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      acceptTerms: false,
      marketingOptIn: false,
    },
  });

  const password = watch('password');

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

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signUpMutation.mutateAsync(data);
      navigate('/email-verification', { 
        state: { email: data.email } 
      });
    } catch (error: any) {
      if (error.status === 409) {
        setError('email', {
          type: 'manual',
          message: 'An account with this email already exists.',
        });
      } else {
        setError('root', {
          type: 'manual',
          message: error.message || 'An error occurred. Please try again.',
        });
      }
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'apple' | 'facebook') => {
    setIsSocialLoading(true);
    try {
      if (!SocialAuthService.isAvailable(provider)) {
        alert(`${provider} authentication is not configured. Please use email/password instead.`);
        return;
      }

      switch (provider) {
        case 'google':
          await SocialAuthService.initiateGoogleAuth();
          break;
        case 'apple':
          await SocialAuthService.initiateAppleAuth();
          break;
        case 'facebook':
          await SocialAuthService.initiateFacebookAuth();
          break;
      }
    } catch (error) {
      console.error('Social auth error:', error);
      alert(`Failed to initiate ${provider} authentication. Please try again.`);
    } finally {
      setIsSocialLoading(false);
    }
  };

  return (
    <AuthForm
      title="Create your account"
      subtitle="Join DressMe and discover your perfect style"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Social Auth Buttons */}
        <div className="space-y-4">
          <SocialAuthButtons
            onGoogleClick={() => handleSocialAuth('google')}
            onAppleClick={() => handleSocialAuth('apple')}
            onFacebookClick={() => handleSocialAuth('facebook')}
            isLoading={isSocialLoading}
            disabled={isSubmitting}
          />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
        </div>

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

        {/* Full Name Field */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium">
            Full name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className={cn(
                'pl-10 h-12',
                errors.fullName && 'border-destructive focus-visible:ring-destructive'
              )}
              {...register('fullName')}
            />
          </div>
          {errors.fullName && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.fullName.message}
            </motion.p>
          )}
        </div>

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
              placeholder="Enter your email"
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

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              className={cn(
                'pl-10 pr-10 h-12',
                errors.password && 'border-destructive focus-visible:ring-destructive'
              )}
              {...register('password')}
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
          
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.password.message}
            </motion.p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
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

        {/* Terms and Marketing Opt-in */}
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="acceptTerms"
              {...register('acceptTerms')}
              className="mt-1"
            />
            <Label
              htmlFor="acceptTerms"
              className="text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{' '}
              <Link
                to="/terms"
                className="text-primary hover:text-primary/80 underline"
                target="_blank"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy"
                className="text-primary hover:text-primary/80 underline"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Label>
          </div>
          {errors.acceptTerms && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.acceptTerms.message}
            </motion.p>
          )}

          <div className="flex items-start space-x-2">
            <Checkbox
              id="marketingOptIn"
              {...register('marketingOptIn')}
              className="mt-1"
            />
            <Label
              htmlFor="marketingOptIn"
              className="text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I'd like to receive style tips and exclusive offers via email
            </Label>
          </div>
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
                <span>Creating account...</span>
              </div>
            ) : (
              'Create account'
            )}
          </Button>
        </motion.div>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthForm>
  );
}
