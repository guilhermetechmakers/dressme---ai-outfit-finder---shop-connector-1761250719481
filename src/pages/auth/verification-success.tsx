import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthForm } from '@/components/auth/AuthForm';

export function VerificationSuccessPage() {
  return (
    <AuthForm
      title="Email verified!"
      subtitle="Your account is now fully activated"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative mx-auto w-24 h-24"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-success/10 rounded-full animate-pulse" />
          <div className="relative w-full h-full bg-gradient-to-br from-success/30 to-success/20 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-accent animate-bounce" />
          </motion.div>
        </motion.div>
        
        {/* Success Message */}
        <div className="space-y-4">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-foreground"
          >
            Verification Complete!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-md mx-auto"
          >
            Your email has been successfully verified. You now have full access to all DressMe features.
          </motion.p>
        </div>

        {/* Features Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-muted/30 to-muted/10 border-border/50">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg text-foreground">What's Next?</CardTitle>
              <CardDescription>
                Complete your profile to get personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>Upload outfit photos for AI analysis</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>Connect your favorite stores</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>Save and share your favorite looks</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col space-y-4"
        >
          <Link to="/onboarding">
            <Button 
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg group"
              size="lg"
            >
              Complete Your Profile
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button 
              variant="outline" 
              className="w-full h-14 text-base font-medium border-2 hover:bg-muted/50" 
              size="lg"
            >
              Go to Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-4"
        >
          <p className="text-xs text-muted-foreground">
            You can always update your preferences in your profile settings
          </p>
        </motion.div>
      </motion.div>
    </AuthForm>
  );
}
