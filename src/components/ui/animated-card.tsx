import { motion } from "motion/react";
import { Card, type CardProps } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

const MotionCard = motion.create(Card);

export function AnimatedCard({ 
  children, 
  className, 
  hover = true,
  delay = 0,
  ...props 
}: AnimatedCardProps) {
  return (
    <MotionCard
      className={cn(
        "dressme-card",
        hover && "hover:shadow-dressme-card-hover hover:-translate-y-1",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: delay * 0.1,
        ease: "easeOut"
      }}
      whileHover={hover ? { 
        y: -4,
        transition: { duration: 0.2 }
      } : undefined}
      {...props}
    >
      {children}
    </MotionCard>
  );
}
