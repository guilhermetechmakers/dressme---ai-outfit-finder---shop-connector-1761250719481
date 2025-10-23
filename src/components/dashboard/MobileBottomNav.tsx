import { motion } from "motion/react";
import { Home, Camera, Heart, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";

interface MobileBottomNavProps {
  className?: string;
}

export function MobileBottomNav({ className }: MobileBottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'dashboard',
      icon: Home,
      label: 'Home',
      path: '/dashboard',
      badge: null,
    },
    {
      id: 'upload',
      icon: Camera,
      label: 'Upload',
      path: '/upload',
      badge: null,
    },
    {
      id: 'saved',
      icon: Heart,
      label: 'Saved',
      path: '/saved-looks',
      badge: 3, // This would come from state/API
    },
    {
      id: 'search',
      icon: Search,
      label: 'Search',
      path: '/search',
      badge: null,
    },
    {
      id: 'profile',
      icon: User,
      label: 'Profile',
      path: '/profile',
      badge: null,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav 
      className={`fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t md:hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center space-y-1 h-16 w-16 p-2 relative ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => navigate(item.path)}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {item.badge && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center text-xs p-0"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
                {active && (
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
}