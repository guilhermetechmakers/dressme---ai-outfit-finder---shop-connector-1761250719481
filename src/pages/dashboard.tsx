import { motion } from "motion/react";
import { Camera, Heart, History, Sparkles } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedCard } from "@/components/ui/animated-card";
import { ProductCard } from "@/components/features/product-card";
import { EmailVerificationBanner } from "@/components/auth/AuthForm";
import { useAnalyses } from "@/hooks/useAnalysis";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: analyses, isLoading } = useAnalyses();
  const [dismissedBanner, setDismissedBanner] = useState(false);

  const recentAnalyses = analyses?.slice(0, 3) || [];
  const savedLooks = []; // TODO: Implement saved looks
  const recommendations = []; // TODO: Implement recommendations

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Email Verification Banner */}
        {!dismissedBanner && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EmailVerificationBanner onDismiss={() => setDismissedBanner(true)} />
          </motion.div>
        )}

        {/* Welcome Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">Ready to discover your next favorite outfit?</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <AnimatedButton
            className="h-24 flex-col space-y-2"
            onClick={() => navigate('/upload')}
          >
            <Camera className="h-6 w-6" />
            <span>Upload Photo</span>
          </AnimatedButton>
          
          <AnimatedButton
            variant="outline"
            className="h-24 flex-col space-y-2"
            onClick={() => navigate('/saved')}
          >
            <Heart className="h-6 w-6" />
            <span>Saved Looks</span>
          </AnimatedButton>
          
          <AnimatedButton
            variant="outline"
            className="h-24 flex-col space-y-2"
            onClick={() => navigate('/history')}
          >
            <History className="h-6 w-6" />
            <span>History</span>
          </AnimatedButton>
          
          <AnimatedButton
            variant="outline"
            className="h-24 flex-col space-y-2"
            onClick={() => navigate('/recommendations')}
          >
            <Sparkles className="h-6 w-6" />
            <span>For You</span>
          </AnimatedButton>
        </motion.div>

        {/* Recent Analyses */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recent Analyses</h2>
            <AnimatedButton variant="outline" size="sm">
              View All
            </AnimatedButton>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <AnimatedCard key={i} className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-48 bg-muted rounded-lg" />
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          ) : recentAnalyses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentAnalyses.map((analysis, index) => (
                <AnimatedCard 
                  key={analysis.id} 
                  className="p-0 overflow-hidden cursor-pointer"
                  delay={index}
                  onClick={() => navigate(`/results/${analysis.id}`)}
                >
                  <div className="aspect-square bg-muted relative">
                    <img
                      src={analysis.imageUrl}
                      alt="Analysis"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium">View Results</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">
                      {analysis.detectedItems.length} items detected
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(analysis.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <AnimatedCard className="p-8 text-center">
              <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">No analyses yet</h3>
              <p className="text-muted-foreground mb-4">
                Upload your first outfit photo to get started!
              </p>
              <AnimatedButton onClick={() => navigate('/upload')}>
                Upload Photo
              </AnimatedButton>
            </AnimatedCard>
          )}
        </motion.section>

        {/* Saved Looks */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Saved Looks</h2>
            <AnimatedButton variant="outline" size="sm">
              View All
            </AnimatedButton>
          </div>
          
          {savedLooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {savedLooks.map((look, index) => (
                <AnimatedCard 
                  key={look.id} 
                  className="p-0 overflow-hidden cursor-pointer"
                  delay={index}
                >
                  <div className="aspect-square bg-muted">
                    <img
                      src={look.imageUrl}
                      alt={look.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm truncate">{look.name}</h3>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <AnimatedCard className="p-8 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">No saved looks yet</h3>
              <p className="text-muted-foreground">
                Save your favorite outfit combinations for later!
              </p>
            </AnimatedCard>
          )}
        </motion.section>

        {/* Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <AnimatedButton variant="outline" size="sm">
              View All
            </AnimatedButton>
          </div>
          
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recommendations.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  delay={index}
                />
              ))}
            </div>
          ) : (
            <AnimatedCard className="p-8 text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">No recommendations yet</h3>
              <p className="text-muted-foreground">
                Complete a few analyses to get personalized recommendations!
              </p>
            </AnimatedCard>
          )}
        </motion.section>
      </div>
    </div>
  );
}
