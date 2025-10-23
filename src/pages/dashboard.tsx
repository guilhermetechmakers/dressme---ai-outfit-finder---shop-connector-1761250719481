import { motion } from "motion/react";
import { EmailVerificationBanner } from "@/components/auth/AuthForm";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentUploads } from "@/components/dashboard/RecentUploads";
import { SavedLooks } from "@/components/dashboard/SavedLooks";
import { Recommendations } from "@/components/dashboard/Recommendations";
import { QuickFilters } from "@/components/dashboard/QuickFilters";
import { MobileBottomNav } from "@/components/dashboard/MobileBottomNav";
import { useState } from "react";

export function DashboardPage() {
  const [dismissedBanner, setDismissedBanner] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    priceRange: "all",
    category: "all",
    store: "all",
    tags: [],
  });

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    // Here you would typically trigger a search or filter update
    console.log('Filters changed:', newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* Email Verification Banner */}
        {!dismissedBanner && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EmailVerificationBanner onDismiss={() => setDismissedBanner(true)} />
          </motion.div>
        )}

        {/* Welcome Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-2">Welcome back!</h2>
          <p className="text-lg text-muted-foreground">Ready to discover your next favorite outfit?</p>
        </motion.div>

        {/* Dashboard Stats */}
        <DashboardStats className="mb-12" />

        {/* Quick Filters */}
        <QuickFilters 
          className="mb-8"
          onFiltersChange={handleFiltersChange}
        />

        {/* Quick Actions */}
        <QuickActions className="mb-12" />

        {/* Recent Uploads */}
        <RecentUploads className="mb-12" />

        {/* Saved Looks */}
        <SavedLooks className="mb-12" />

        {/* Recommendations */}
        <Recommendations className="mb-12" />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
