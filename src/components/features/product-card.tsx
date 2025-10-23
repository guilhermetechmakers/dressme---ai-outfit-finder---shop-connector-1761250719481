import { motion } from "motion/react";
import { Heart, ShoppingCart, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  className?: string;
}

export function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleFavorite, 
  onViewDetails,
  className 
}: ProductCardProps) {
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = isOnSale 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <motion.div
      className={cn("group", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden dressme-card">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={primaryImage?.url}
            alt={primaryImage?.alt || product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Sale Badge */}
          {isOnSale && (
            <Badge 
              variant="destructive" 
              className="absolute top-2 left-2"
            >
              -{discountPercentage}%
            </Badge>
          )}
          
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
            onClick={() => onToggleFavorite?.(product)}
          >
            <Heart className="h-4 w-4" />
          </Button>
          
          {/* Quick Actions Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <Button
              size="sm"
              onClick={() => onAddToCart?.(product)}
              className="bg-primary hover:bg-primary/90"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewDetails?.(product)}
              className="bg-background/80 hover:bg-background"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <CardContent className="p-4">
          {/* Store Logo */}
          <div className="flex items-center space-x-2 mb-2">
            <img
              src={product.store.logo}
              alt={product.store.name}
              className="h-4 w-4 object-contain"
            />
            <span className="text-xs text-muted-foreground">{product.store.name}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Brand */}
          <p className="text-xs text-muted-foreground mb-2">{product.brand}</p>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.store.rating)
                      ? "text-dressme-yellow fill-current"
                      : "text-muted-foreground"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.store.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg">
              {formatPrice(product.price, product.currency)}
            </span>
            {isOnSale && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice!, product.currency)}
              </span>
            )}
          </div>

          {/* Availability */}
          <div className="mt-2">
            {product.availability.inStock ? (
              <span className="text-xs text-green-600 font-medium">
                In Stock
              </span>
            ) : (
              <span className="text-xs text-red-600 font-medium">
                Out of Stock
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={() => onAddToCart?.(product)}
            disabled={!product.availability.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
