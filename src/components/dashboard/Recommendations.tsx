import { motion } from "motion/react";
import { Sparkles, Star, ShoppingBag, Heart, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCardSkeleton } from "@/components/ui/loading-skeleton";
import { useNavigate } from "react-router-dom";
import { useDashboardRecommendations } from "@/hooks/useRecommendations";
import { ProductCard } from "@/components/features/product-card";

interface RecommendationsProps {
  className?: string;
}

export function Recommendations({ className }: RecommendationsProps) {
  const navigate = useNavigate();
  const { data: recommendations, isLoading, error } = useDashboardRecommendations();

  if (isLoading) {
    return (
      <motion.section 
        className={`space-y-6 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <Button variant="outline" size="sm" disabled>
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section 
        className={`space-y-6 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
        </div>
        
        <Card className="p-8 text-center">
          <div className="text-destructive mb-4">
            <Sparkles className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="font-medium mb-2">Failed to load recommendations</h3>
          <p className="text-muted-foreground mb-4">
            There was an error loading your personalized recommendations. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Card>
      </motion.section>
    );
  }

  return (
    <motion.section 
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recommended for You</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/recommendations')}
        >
          View All
        </Button>
      </div>
      
      {recommendations && recommendations.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recommendations.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300">
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="text-white font-medium flex items-center space-x-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View Product</span>
                    </motion.div>
                  </div>
                  
                  {/* Rating badge */}
                  {product.rating && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="text-xs flex items-center">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {product.rating.toFixed(1)}
                      </Badge>
                    </div>
                  )}

                  {/* Sale badge */}
                  {product.isOnSale && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="destructive" className="text-xs">
                        Sale
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm mb-1 truncate">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2 truncate">{product.brand}</p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-sm">
                        {product.currency} {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          {product.currency} {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.isOnSale && (
                      <Badge variant="outline" className="text-xs">
                        {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% off
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{product.store}</span>
                    <span className="flex items-center">
                      <ShoppingBag className="h-3 w-3 mr-1" />
                      {product.availability === 'in_stock' ? 'In Stock' : 'Limited'}
                    </span>
                  </div>
                  
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.tags.slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {product.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No recommendations yet</h3>
            <p className="text-muted-foreground mb-6">
              Complete a few outfit analyses to get personalized product recommendations!
            </p>
            <Button onClick={() => navigate('/upload')} size="lg">
              <Sparkles className="h-4 w-4 mr-2" />
              Start Analyzing
            </Button>
          </motion.div>
        </Card>
      )}
    </motion.section>
  );
}