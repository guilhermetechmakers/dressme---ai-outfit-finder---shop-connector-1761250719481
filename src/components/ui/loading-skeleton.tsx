import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "default" | "card" | "text" | "avatar" | "button";
  animate?: boolean;
}

export function LoadingSkeleton({ 
  className, 
  variant = "default", 
  animate = true 
}: LoadingSkeletonProps) {
  const baseClasses = "bg-muted rounded";
  
  const variantClasses = {
    default: "h-4 w-full",
    card: "h-48 w-full",
    text: "h-4 w-3/4",
    avatar: "h-10 w-10 rounded-full",
    button: "h-10 w-24 rounded-lg",
  };

  const content = animate ? (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  ) : (
    <div className={cn(baseClasses, variantClasses[variant], className)} />
  );

  return content;
}

// Pre-built skeleton components for common use cases
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 p-6", className)}>
      <LoadingSkeleton variant="card" className="h-48" />
      <div className="space-y-2">
        <LoadingSkeleton variant="text" className="h-4 w-3/4" />
        <LoadingSkeleton variant="text" className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3 p-3", className)}>
      <LoadingSkeleton variant="card" className="h-48" />
      <div className="space-y-2">
        <LoadingSkeleton variant="text" className="h-4 w-3/4" />
        <LoadingSkeleton variant="text" className="h-3 w-1/2" />
        <div className="flex justify-between items-center">
          <LoadingSkeleton variant="text" className="h-4 w-16" />
          <LoadingSkeleton variant="text" className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}

export function StatsSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 p-6", className)}>
      <div className="flex items-center justify-between">
        <LoadingSkeleton variant="text" className="h-4 w-32" />
        <LoadingSkeleton variant="avatar" className="h-4 w-4" />
      </div>
      <div className="space-y-2">
        <LoadingSkeleton variant="text" className="h-8 w-16" />
        <div className="flex items-center space-x-2">
          <LoadingSkeleton variant="button" className="h-5 w-12" />
          <LoadingSkeleton variant="text" className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton({ 
  count = 3, 
  className 
}: { 
  count?: number; 
  className?: string; 
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <LoadingSkeleton variant="avatar" />
          <div className="space-y-2 flex-1">
            <LoadingSkeleton variant="text" className="h-4 w-3/4" />
            <LoadingSkeleton variant="text" className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}