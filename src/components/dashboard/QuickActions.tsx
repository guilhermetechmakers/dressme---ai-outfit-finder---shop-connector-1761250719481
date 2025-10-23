import { motion } from "motion/react";
import { Camera, Heart, History, Sparkles, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface QuickActionsProps {
  className?: string;
}

export function QuickActions({ className }: QuickActionsProps) {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'upload',
      icon: Camera,
      label: 'Upload Photo',
      description: 'Analyze outfit',
      onClick: () => navigate('/upload'),
      variant: 'default' as const,
      className: 'bg-primary text-primary-foreground hover:bg-primary/90',
    },
    {
      id: 'saved',
      icon: Heart,
      label: 'Saved Looks',
      description: 'Your favorites',
      onClick: () => navigate('/saved-looks'),
      variant: 'outline' as const,
    },
    {
      id: 'history',
      icon: History,
      label: 'History',
      description: 'Past analyses',
      onClick: () => navigate('/history'),
      variant: 'outline' as const,
    },
    {
      id: 'recommendations',
      icon: Sparkles,
      label: 'For You',
      description: 'Personalized picks',
      onClick: () => navigate('/recommendations'),
      variant: 'outline' as const,
    },
    {
      id: 'search',
      icon: Search,
      label: 'Search',
      description: 'Find products',
      onClick: () => navigate('/search'),
      variant: 'outline' as const,
    },
    {
      id: 'filters',
      icon: Filter,
      label: 'Filters',
      description: 'Refine results',
      onClick: () => navigate('/filters'),
      variant: 'outline' as const,
    },
  ];

  return (
    <motion.div 
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={action.variant}
              className={`h-24 flex-col space-y-2 p-4 transition-all duration-200 hover:shadow-lg ${action.className || ''}`}
              onClick={action.onClick}
            >
              <Icon className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium text-sm">{action.label}</div>
                <div className="text-xs opacity-70">{action.description}</div>
              </div>
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}