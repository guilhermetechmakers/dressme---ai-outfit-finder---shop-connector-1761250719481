import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { onboardingSchema, type OnboardingFormData } from '@/lib/validations/auth';
import { cn } from '@/lib/utils';

// Onboarding steps
const steps = [
  {
    id: 'stores',
    title: 'Choose your stores',
    description: 'Select the stores you shop at most frequently',
    component: 'StoreSelection',
  },
  {
    id: 'style',
    title: 'Style preferences',
    description: 'Tell us about your fashion style',
    component: 'StylePreferences',
  },
  {
    id: 'budget',
    title: 'Budget range',
    description: 'Set your preferred spending range',
    component: 'BudgetRange',
  },
  {
    id: 'sizes',
    title: 'Size profile',
    description: 'Help us find the right fit for you',
    component: 'SizeProfile',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Choose how you want to stay updated',
    component: 'NotificationPreferences',
  },
];

// Store options
const storeOptions = [
  { id: 'nordstrom', name: 'Nordstrom', logo: '🛍️' },
  { id: 'macys', name: "Macy's", logo: '🏬' },
  { id: 'bloomingdales', name: 'Bloomingdale\'s', logo: '🌸' },
  { id: 'saks', name: 'Saks Fifth Avenue', logo: '💎' },
  { id: 'neiman', name: 'Neiman Marcus', logo: '✨' },
  { id: 'barneys', name: 'Barneys New York', logo: '🎩' },
  { id: 'netaporter', name: 'Net-A-Porter', logo: '🌐' },
  { id: 'ssense', name: 'SSENSE', logo: '🖤' },
  { id: 'farfetch', name: 'Farfetch', logo: '🌍' },
  { id: 'shopbop', name: 'Shopbop', logo: '🛒' },
  { id: 'revolve', name: 'Revolve', logo: '🔄' },
  { id: 'asos', name: 'ASOS', logo: '👗' },
  { id: 'zara', name: 'Zara', logo: '⚡' },
  { id: 'h&m', name: 'H&M', logo: '🏷️' },
  { id: 'uniqlo', name: 'Uniqlo', logo: '🇯🇵' },
];

// Style preferences
const styleOptions = [
  { id: 'casual', name: 'Casual', description: 'Comfortable everyday wear' },
  { id: 'business', name: 'Business', description: 'Professional and polished' },
  { id: 'formal', name: 'Formal', description: 'Elegant evening wear' },
  { id: 'streetwear', name: 'Streetwear', description: 'Urban and trendy' },
  { id: 'bohemian', name: 'Bohemian', description: 'Free-spirited and artistic' },
  { id: 'minimalist', name: 'Minimalist', description: 'Clean and simple' },
  { id: 'vintage', name: 'Vintage', description: 'Retro and classic' },
  { id: 'sporty', name: 'Sporty', description: 'Athletic and active' },
  { id: 'romantic', name: 'Romantic', description: 'Feminine and delicate' },
  { id: 'edgy', name: 'Edgy', description: 'Bold and daring' },
  { id: 'preppy', name: 'Preppy', description: 'Classic and collegiate' },
  { id: 'gothic', name: 'Gothic', description: 'Dark and dramatic' },
  { id: 'eclectic', name: 'Eclectic', description: 'Mix of different styles' },
  { id: 'sustainable', name: 'Sustainable', description: 'Eco-friendly fashion' },
  { id: 'luxury', name: 'Luxury', description: 'High-end and exclusive' },
];

// Size options
const sizeOptions = {
  tops: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20'],
  bottoms: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '28', '30', '32', '34', '36', '38', '40', '42'],
  shoes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
};

export function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      preferredStores: [],
      stylePreferences: [],
      budgetRange: { min: 0, max: 1000 },
      sizeProfile: {
        gender: 'unisex',
        sizes: {},
      },
      notifications: {
        email: true,
        push: true,
        marketing: false,
      },
    },
  });

  const watchedValues = watch();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Submit onboarding data to API
      console.log('Onboarding data:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Welcome to DressMe!
              </h1>
              <p className="text-muted-foreground">
                Let's personalize your experience
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Step Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {steps[currentStep].description}
              </p>
            </div>

            {/* Step Content */}
            <div className="dressme-card p-8">
              {currentStep === 0 && (
                <StoreSelectionStep
                  stores={storeOptions}
                  selectedStores={watchedValues.preferredStores || []}
                  onStoreToggle={(storeId) => {
                    const current = getValues('preferredStores') || [];
                    const updated = current.includes(storeId)
                      ? current.filter(id => id !== storeId)
                      : [...current, storeId];
                    setValue('preferredStores', updated);
                  }}
                />
              )}

              {currentStep === 1 && (
                <StylePreferencesStep
                  styles={styleOptions}
                  selectedStyles={watchedValues.stylePreferences || []}
                  onStyleToggle={(styleId) => {
                    const current = getValues('stylePreferences') || [];
                    const updated = current.includes(styleId)
                      ? current.filter(id => id !== styleId)
                      : [...current, styleId];
                    setValue('stylePreferences', updated);
                  }}
                />
              )}

              {currentStep === 2 && (
                <BudgetRangeStep
                  budget={watchedValues.budgetRange || { min: 0, max: 1000 }}
                  onBudgetChange={(budget) => setValue('budgetRange', budget)}
                />
              )}

              {currentStep === 3 && (
                <SizeProfileStep
                  sizeProfile={watchedValues.sizeProfile || { gender: 'unisex', sizes: {} }}
                  onSizeProfileChange={(profile) => setValue('sizeProfile', profile)}
                  sizeOptions={sizeOptions}
                />
              )}

              {currentStep === 4 && (
                <NotificationPreferencesStep
                  notifications={watchedValues.notifications || { email: true, push: true, marketing: false }}
                  onNotificationChange={(notifications) => setValue('notifications', notifications)}
                />
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Completing setup...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Complete setup</span>
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Store Selection Component
function StoreSelectionStep({ stores, selectedStores, onStoreToggle }: {
  stores: Array<{ id: string; name: string; logo: string }>;
  selectedStores: string[];
  onStoreToggle: (storeId: string) => void;
}) {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-center">
        Select all the stores you shop at regularly. We'll prioritize these when finding matches.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stores.map((store) => (
          <motion.button
            key={store.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStoreToggle(store.id)}
            className={cn(
              'p-4 rounded-lg border-2 transition-all duration-200 text-left',
              selectedStores.includes(store.id)
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border hover:border-primary/50'
            )}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{store.logo}</span>
              <span className="font-medium">{store.name}</span>
            </div>
            {selectedStores.includes(store.id) && (
              <Check className="w-5 h-5 text-primary mt-2" />
            )}
          </motion.button>
        ))}
      </div>
      
      {selectedStores.length === 0 && (
        <p className="text-sm text-destructive text-center">
          Please select at least one store
        </p>
      )}
    </div>
  );
}

// Style Preferences Component
function StylePreferencesStep({ styles, selectedStyles, onStyleToggle }: {
  styles: Array<{ id: string; name: string; description: string }>;
  selectedStyles: string[];
  onStyleToggle: (styleId: string) => void;
}) {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-center">
        Choose the styles that best describe your fashion preferences. You can select multiple.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {styles.map((style) => (
          <motion.button
            key={style.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStyleToggle(style.id)}
            className={cn(
              'p-4 rounded-lg border-2 transition-all duration-200 text-left',
              selectedStyles.includes(style.id)
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border hover:border-primary/50'
            )}
          >
            <div className="space-y-1">
              <h3 className="font-medium">{style.name}</h3>
              <p className="text-sm text-muted-foreground">{style.description}</p>
            </div>
            {selectedStyles.includes(style.id) && (
              <Check className="w-5 h-5 text-primary mt-2" />
            )}
          </motion.button>
        ))}
      </div>
      
      {selectedStyles.length === 0 && (
        <p className="text-sm text-destructive text-center">
          Please select at least one style preference
        </p>
      )}
    </div>
  );
}

// Budget Range Component
function BudgetRangeStep({ budget, onBudgetChange }: {
  budget: { min: number; max: number };
  onBudgetChange: (budget: { min: number; max: number }) => void;
}) {
  return (
    <div className="space-y-8">
      <p className="text-muted-foreground text-center">
        Set your preferred spending range for individual items. This helps us find products within your budget.
      </p>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Minimum price: ${budget.min}
            </label>
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={budget.min}
              onChange={(e) => onBudgetChange({ ...budget, min: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Maximum price: ${budget.max}
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              step="50"
              value={budget.max}
              onChange={(e) => onBudgetChange({ ...budget, max: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        
        <div className="p-4 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            Your budget range: <span className="font-medium text-foreground">${budget.min} - ${budget.max}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// Size Profile Component
function SizeProfileStep({ sizeProfile, onSizeProfileChange, sizeOptions }: {
  sizeProfile: { gender: string; sizes: Record<string, string> };
  onSizeProfileChange: (profile: { gender: string; sizes: Record<string, string> }) => void;
  sizeOptions: Record<string, string[]>;
}) {
  return (
    <div className="space-y-8">
      <p className="text-muted-foreground text-center">
        Help us find the right fit by sharing your size information.
      </p>
      
      <div className="space-y-6">
        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">Gender preference</label>
          <div className="grid grid-cols-3 gap-4">
            {['male', 'female', 'unisex'].map((gender) => (
              <motion.button
                key={gender}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSizeProfileChange({ ...sizeProfile, gender })}
                className={cn(
                  'p-4 rounded-lg border-2 transition-all duration-200 text-center capitalize',
                  sizeProfile.gender === gender
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50'
                )}
              >
                {gender}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Size Selection */}
        <div className="space-y-4">
          {Object.entries(sizeOptions).map(([category, sizes]) => (
            <div key={category}>
              <label className="block text-sm font-medium mb-2 capitalize">
                {category} size (optional)
              </label>
              <select
                value={sizeProfile.sizes[category] || ''}
                onChange={(e) => onSizeProfileChange({
                  ...sizeProfile,
                  sizes: { ...sizeProfile.sizes, [category]: e.target.value }
                })}
                className="w-full p-3 border border-border rounded-lg bg-background"
              >
                <option value="">Select size</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Notification Preferences Component
function NotificationPreferencesStep({ notifications, onNotificationChange }: {
  notifications: { email: boolean; push: boolean; marketing: boolean };
  onNotificationChange: (notifications: { email: boolean; push: boolean; marketing: boolean }) => void;
}) {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-center">
        Choose how you'd like to receive updates from DressMe.
      </p>
      
      <div className="space-y-4">
        {[
          { key: 'email', label: 'Email notifications', description: 'Analysis results, order updates, and important account information' },
          { key: 'push', label: 'Push notifications', description: 'Real-time updates on your phone or browser' },
          { key: 'marketing', label: 'Marketing emails', description: 'Style tips, new features, and exclusive offers' },
        ].map(({ key, label, description }) => (
          <div key={key} className="flex items-start space-x-3 p-4 border border-border rounded-lg">
            <input
              type="checkbox"
              checked={notifications[key as keyof typeof notifications]}
              onChange={(e) => onNotificationChange({
                ...notifications,
                [key]: e.target.checked
              })}
              className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground">{label}</label>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
