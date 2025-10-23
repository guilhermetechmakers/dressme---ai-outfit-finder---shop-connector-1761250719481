import { motion } from "motion/react";
import { Loader2, CheckCircle } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Progress } from "@/components/ui/progress";

export function AnalysisPage() {
  const progress = 65; // Mock progress
  const currentStep = "matching"; // Mock current step

  const steps = [
    { id: "detection", label: "Detecting Items", completed: true },
    { id: "matching", label: "Finding Matches", completed: false, current: true },
    { id: "results", label: "Preparing Results", completed: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">Analyzing Your Outfit</h1>
          <p className="text-muted-foreground mb-8">
            Our AI is working hard to identify each garment and find the best matches for you
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <AnimatedCard className="p-8">
            <div className="space-y-8">
              {/* Progress Bar */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      {step.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : step.current ? (
                        <Loader2 className="h-6 w-6 text-primary animate-spin" />
                      ) : (
                        <div className="h-6 w-6 rounded-full border-2 border-muted" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${step.current ? 'text-primary' : step.completed ? 'text-green-500' : 'text-muted-foreground'}`}>
                        {step.label}
                      </p>
                      {step.current && (
                        <p className="text-sm text-muted-foreground">
                          This may take a few moments...
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Estimated Time */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Estimated time remaining: <span className="font-medium">2-3 minutes</span>
                </p>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}
