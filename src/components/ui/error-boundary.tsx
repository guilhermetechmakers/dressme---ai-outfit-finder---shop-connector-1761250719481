import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const navigate = useNavigate();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    // Simulate retry delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    resetError();
    setIsRetrying(false);
  };

  const handleGoHome = () => {
    navigate('/dashboard');
    resetError();
  };

  return (
    <motion.div
      className="min-h-[400px] flex items-center justify-center p-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-destructive" />
          </motion.div>
          
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-6">
            We encountered an unexpected error. Please try again or go back to the dashboard.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer text-sm font-medium mb-2">
                Error Details (Development)
              </summary>
              <pre className="text-xs bg-muted p-3 rounded overflow-auto">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleRetry} 
              disabled={isRetrying}
              className="flex-1"
            >
              {isRetrying ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleGoHome}
              className="flex-1"
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean; error: Error | null }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

// Hook for error boundary reset
export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null);

  const resetError = () => setError(null);

  const captureError = (error: Error) => {
    setError(error);
  };

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
}

// Error fallback for specific components
export function ComponentErrorFallback({ 
  error, 
  resetError, 
  title = "Failed to load",
  description = "There was an error loading this content."
}: ErrorFallbackProps & { 
  title?: string; 
  description?: string; 
}) {
  return (
    <motion.div
      className="p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-destructive" />
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button onClick={resetError} size="sm">
        <RefreshCw className="h-4 w-4 mr-2" />
        Try Again
      </Button>
    </motion.div>
  );
}