import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AuthForm } from '@/components/auth/AuthForm';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { useSignIn } from '@/hooks/useAuth';
import { signInSchema, type SignInFormData } from '@/lib/validations/auth';
import { SocialAuthService } from '@/lib/social-auth';
import { cn } from '@/lib/utils';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const signInMutation = useSignIn();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signInMutation.mutateAsync(data);
      navigate(from, { replace: true });
    } catch (error: any) {
      if (error.status === 401) {
        setError('root', {
          type: 'manual',
          message: 'Invalid email or password. Please try again.',
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
      title="Welcome back"
      subtitle="Sign in to your account to continue"
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
              placeholder="Enter your password"
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              {...register('rememberMe')}
            />
            <Label
              htmlFor="rememberMe"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </Label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </Link>
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
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign in'
            )}
          </Button>
        </motion.div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthForm>
  );
}
