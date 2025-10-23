import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { TopBar } from "@/components/layout/top-bar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { LandingPage } from "@/pages/landing";
import { DashboardPage } from "@/pages/dashboard";
import { UploadPage } from "@/pages/upload";
import { AnalysisPage } from "@/pages/analysis";
import { ResultsPage } from "@/pages/results";
import { SavedLooksPage } from "@/pages/saved-looks";
import { ProfilePage } from "@/pages/profile";
import { LoginPage } from "@/pages/auth/login";
import { SignupPage } from "@/pages/auth/signup";
import { ForgotPasswordPage } from "@/pages/auth/forgot-password";
import { ResetPasswordPage } from "@/pages/auth/reset-password";
import { EmailVerificationPage } from "@/pages/auth/email-verification";
import { AuthCallbackPage } from "@/pages/auth/callback";
import { OnboardingPage } from "@/pages/onboarding";
import { NotFoundPage } from "@/pages/not-found";

// React Query client with optimal defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <TopBar />
            
            <main className="pb-16">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/email-verification" element={<EmailVerificationPage />} />
                <Route path="/auth/callback/:provider" element={<AuthCallbackPage />} />
                
                {/* Onboarding Route */}
                <Route 
                  path="/onboarding" 
                  element={
                    <ProtectedRoute requireOnboarding={true}>
                      <OnboardingPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Protected Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/upload" 
                  element={
                    <ProtectedRoute>
                      <UploadPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/analysis/:id" 
                  element={
                    <ProtectedRoute>
                      <AnalysisPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/results/:id" 
                  element={
                    <ProtectedRoute>
                      <ResultsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/saved" 
                  element={
                    <ProtectedRoute>
                      <SavedLooksPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            
            <BottomNav />
            <Toaster position="top-center" />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
