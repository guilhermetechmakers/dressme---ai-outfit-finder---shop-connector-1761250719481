import { motion } from "motion/react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedCard } from "@/components/ui/animated-card";
import { useState } from "react";

export function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">Upload Outfit Photo</h1>
          <p className="text-muted-foreground mb-8">
            Upload a photo of any outfit and our AI will analyze it for you
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {!selectedFile ? (
            <AnimatedCard className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="h-12 w-12 text-primary" />
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Choose a photo</h2>
                  <p className="text-muted-foreground mb-6">
                    Upload a clear photo of an outfit you'd like to analyze
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <AnimatedButton asChild size="lg" className="w-full">
                      <span>
                        <Upload className="h-5 w-5 mr-2" />
                        Select Photo
                      </span>
                    </AnimatedButton>
                  </label>
                  
                  <p className="text-sm text-muted-foreground">
                    Supported formats: JPG, PNG, WebP (Max 10MB)
                  </p>
                </div>
              </div>
            </AnimatedCard>
          ) : (
            <AnimatedCard className="p-6">
              <div className="space-y-6">
                <div className="relative">
                  <img
                    src={previewUrl!}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    onClick={handleRemoveFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Ready to analyze?</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI will identify each garment and find similar items for you
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <AnimatedButton className="flex-1">
                      <Camera className="h-4 w-4 mr-2" />
                      Analyze Outfit
                    </AnimatedButton>
                    <AnimatedButton variant="outline" onClick={handleRemoveFile}>
                      Choose Different Photo
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          )}
        </div>
      </div>
    </div>
  );
}
