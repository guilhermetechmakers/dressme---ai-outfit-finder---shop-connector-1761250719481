import { motion } from "motion/react";
import { Camera, Heart, ShoppingBag, TrendingUp, Star, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsSkeleton } from "@/components/ui/loading-skeleton";
import { useAnalyses } from "@/hooks/useAnalysis";
import { useDashboardSavedLooks } from "@/hooks/useSavedLooks";

interface DashboardStatsProps {
  className?: string;
}

export function DashboardStats({ className }: DashboardStatsProps) {
  const { data: analyses } = useAnalyses();
  const { data: savedLooks } = useDashboardSavedLooks();

  const stats = [
    {
      title: "Total Analyses",
      value: analyses?.length || 0,
      icon: Camera,
      change: "+12%",
      changeType: "positive" as const,
      description: "Outfits analyzed this month"
    },
    {
      title: "Saved Looks",
      value: savedLooks?.length || 0,
      icon: Heart,
      change: "+8%",
      changeType: "positive" as const,
      description: "Favorite combinations saved"
    },
    {
      title: "Items Purchased",
      value: 24,
      icon: ShoppingBag,
      change: "+15%",
      changeType: "positive" as const,
      description: "Products bought through DressMe"
    },
    {
      title: "Money Saved",
      value: "$342",
      icon: DollarSign,
      change: "+23%",
      changeType: "positive" as const,
      description: "Savings from price comparisons"
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: Star,
      change: "+0.2",
      changeType: "positive" as const,
      description: "User satisfaction score"
    },
    {
      title: "Trending Style",
      value: "Minimalist",
      icon: TrendingUp,
      change: "↑",
      changeType: "neutral" as const,
      description: "Your current style preference"
    }
  ];

  return (
    <motion.section 
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Style Journey</h2>
        <Badge variant="outline" className="text-sm">
          Last 30 days
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -2 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={
                        stat.changeType === "positive" ? "default" : 
                        stat.changeType === "negative" ? "destructive" : "secondary"
                      }
                      className="text-xs"
                    >
                      {stat.change}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {stat.description}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}