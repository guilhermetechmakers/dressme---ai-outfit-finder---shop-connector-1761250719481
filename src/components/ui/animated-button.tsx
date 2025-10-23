import { motion } from "motion/react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "default" | "lg" | "icon";
  children: React.ReactNode;
  className?: string;
}

const MotionButton = motion.create(Button);

export function AnimatedButton({ 
  children, 
  className, 
  variant = "primary",
  size = "default",
  ...props 
}: AnimatedButtonProps) {
  const baseClasses = "transition-all duration-200 font-medium";
  
  const variantClasses = {
    primary: "dressme-button-primary",
    secondary: "dressme-button-secondary", 
    outline: "dressme-button-outline",
    ghost: "hover:bg-muted",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    default: "h-10 px-4 py-2",
    lg: "h-12 px-8 text-lg",
    icon: "h-10 w-10",
  };

  return (
    <MotionButton
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </MotionButton>
  );
}
