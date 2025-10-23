import { motion } from "motion/react";
import { Heart, Eye, ShoppingBag, Share2, MoreHorizontal, DollarSign, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCardSkeleton } from "@/components/ui/loading-skeleton";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useDashboardSavedLooks, useDeleteSavedLook } from "@/hooks/useSavedLooks";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface SavedLooksProps {
  className?: string;
}

export function SavedLooks({ className }: SavedLooksProps) {
  const navigate = useNavigate();
  const { data: savedLooks, isLoading, error } = useDashboardSavedLooks();
  const deleteLookMutation = useDeleteSavedLook();

  const handleDeleteLook = async (lookId: string, lookName: string) => {
    try {
      await deleteLookMutation.mutateAsync(lookId);
      toast.success(`"${lookName}" deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete saved look");
    }
  };

  const handleShareLook = (lookId: string) => {
    const shareUrl = `${window.location.origin}/shared-look/${lookId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied to clipboard");
  };

  if (isLoading) {
    return (
      <motion.section 
        className={`space-y-6 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Saved Looks</h2>
          <Button variant="outline" size="sm" disabled>
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
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
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Saved Looks</h2>
        </div>
        
        <Card className="p-8 text-center">
          <div className="text-destructive mb-4">
            <Heart className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="font-medium mb-2">Failed to load saved looks</h3>
          <p className="text-muted-foreground mb-4">
            There was an error loading your saved looks. Please try again.
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
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Saved Looks</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/saved-looks')}
        >
          View All
        </Button>
      </div>
      
      {savedLooks && savedLooks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {savedLooks.map((look, index) => (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300">
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img
                    src={look.imageUrl}
                    alt={look.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="text-white font-medium flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Look</span>
                    </motion.div>
                  </div>
                  
                  {/* Availability badge */}
                  <div className="absolute top-2 right-2">
                    <Badge 
                      variant={
                        look.total.availability === 'full' ? 'default' : 
                        look.total.availability === 'partial' ? 'secondary' : 'destructive'
                      }
                      className="text-xs"
                    >
                      {look.total.availability === 'full' ? 'Available' : 
                       look.total.availability === 'partial' ? 'Partial' : 'Unavailable'}
                    </Badge>
                  </div>

                  {/* Action menu */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => navigate(`/saved-looks/${look.id}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShareLook(look.id)}>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteLook(look.id, look.name)}
                          className="text-destructive"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm mb-1 truncate">{look.name}</h3>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <Store className="h-3 w-3 mr-1" />
                      {look.total.storeCount} stores
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {look.total.currency} {look.total.estimatedPrice.toFixed(0)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {look.total.itemCount} items
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(look.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  
                  {look.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {look.tags.slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {look.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{look.tags.length - 2}
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
            <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No saved looks yet</h3>
            <p className="text-muted-foreground mb-6">
              Save your favorite outfit combinations for easy access and sharing!
            </p>
            <Button onClick={() => navigate('/upload')} size="lg">
              <Heart className="h-4 w-4 mr-2" />
              Create Your First Look
            </Button>
          </motion.div>
        </Card>
      )}
    </motion.section>
  );
}