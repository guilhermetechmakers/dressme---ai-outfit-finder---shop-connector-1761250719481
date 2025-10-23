import { motion } from "motion/react";
import { Camera, Eye, Calendar, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCardSkeleton } from "@/components/ui/loading-skeleton";
import { useNavigate } from "react-router-dom";
import { useAnalyses } from "@/hooks/useAnalysis";
import { formatDistanceToNow } from "date-fns";

interface RecentUploadsProps {
  className?: string;
}

export function RecentUploads({ className }: RecentUploadsProps) {
  const navigate = useNavigate();
  const { data: analyses, isLoading, error } = useAnalyses();

  const recentAnalyses = analyses?.slice(0, 6) || [];

  if (isLoading) {
    return (
      <motion.section 
        className={`space-y-6 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Analyses</h2>
          <Button variant="outline" size="sm" disabled>
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
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
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Analyses</h2>
        </div>
        
        <Card className="p-8 text-center">
          <div className="text-destructive mb-4">
            <Camera className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="font-medium mb-2">Failed to load analyses</h3>
          <p className="text-muted-foreground mb-4">
            There was an error loading your recent analyses. Please try again.
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
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Analyses</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/history')}
        >
          View All
        </Button>
      </div>
      
      {recentAnalyses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentAnalyses.map((analysis, index) => (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card 
                className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
                onClick={() => navigate(`/results/${analysis.id}`)}
              >
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img
                    src={analysis.imageUrl}
                    alt="Analysis"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="text-white font-medium flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Results</span>
                    </motion.div>
                  </div>
                  
                  {/* Confidence badge */}
                  <div className="absolute top-2 right-2">
                    <Badge 
                      variant={analysis.confidence > 0.8 ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {Math.round(analysis.confidence * 100)}%
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">
                      {analysis.detectedItems.length} items detected
                    </h3>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDistanceToNow(new Date(analysis.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {analysis.detectedItems.slice(0, 3).map((item, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        <Tag className="h-2 w-2 mr-1" />
                        {item.type}
                      </Badge>
                    ))}
                    {analysis.detectedItems.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{analysis.detectedItems.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {analysis.occasion && (
                      <span>Occasion: {analysis.occasion}</span>
                    )}
                  </div>
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
            <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No analyses yet</h3>
            <p className="text-muted-foreground mb-6">
              Upload your first outfit photo to get started with AI-powered style analysis!
            </p>
            <Button onClick={() => navigate('/upload')} size="lg">
              <Camera className="h-4 w-4 mr-2" />
              Upload Photo
            </Button>
          </motion.div>
        </Card>
      )}
    </motion.section>
  );
}