import { motion } from "motion/react";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AnimatedInputProps extends InputProps {
  label?: string;
  error?: string;
  className?: string;
}

const MotionInput = motion.create(Input);

export function AnimatedInput({ 
  label,
  error,
  className,
  ...props 
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <motion.label 
          className="text-sm font-medium text-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      <MotionInput
        className={cn(
          "dressme-input",
          error && "border-destructive focus:ring-destructive",
          className
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          borderColor: isFocused ? "rgb(var(--ring))" : undefined
        }}
        transition={{ duration: 0.2 }}
        {...props}
      />
      {error && (
        <motion.p 
          className="text-sm text-destructive"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
