import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Camera, Sparkles, ShoppingBag, Heart, Star, Upload, Zap, Shield, Users, TrendingUp, CheckCircle, Play, ChevronRight } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const [email, setEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const features = [
    {
      icon: Camera,
      title: "AI-Powered Analysis",
      description: "Upload any outfit photo and our AI will instantly identify and analyze each garment with precision.",
      gradient: "from-blue-500/20 to-purple-500/20",
      iconColor: "text-blue-600"
    },
    {
      icon: ShoppingBag,
      title: "Smart Shopping",
      description: "Find exact matches or similar items from your favorite stores with one click.",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-600"
    },
    {
      icon: Heart,
      title: "Save & Share",
      description: "Save your favorite looks and share them with friends or get inspiration from others.",
      gradient: "from-pink-500/20 to-rose-500/20",
      iconColor: "text-pink-600"
    },
    {
      icon: Sparkles,
      title: "Personalized",
      description: "Get recommendations tailored to your style preferences and budget.",
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-600"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Photo",
      description: "Take or upload a photo of any outfit you love",
      icon: Upload
    },
    {
      number: "02", 
      title: "AI Analysis",
      description: "Our AI identifies each garment and its attributes",
      icon: Zap
    },
    {
      number: "03",
      title: "Find & Buy",
      description: "Browse matches and purchase from your favorite stores",
      icon: ShoppingBag
    }
  ];

  const partners = [
    { name: "Zara", logo: "Z" },
    { name: "H&M", logo: "H&M" },
    { name: "Nike", logo: "N" },
    { name: "Adidas", logo: "A" },
    { name: "Uniqlo", logo: "U" },
    { name: "Gap", logo: "G" }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out DressMe",
      features: [
        "5 outfit analyses per month",
        "Basic store matching",
        "Save up to 10 looks",
        "Community support"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "For fashion enthusiasts",
      features: [
        "Unlimited outfit analyses",
        "Premium store matching",
        "Unlimited saved looks",
        "Priority support",
        "Advanced filters",
        "Export looks"
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "per month",
      description: "For style professionals",
      features: [
        "Everything in Pro",
        "Personal style consultant",
        "Custom store integrations",
        "API access",
        "White-label options",
        "Priority processing"
      ],
      cta: "Go Premium",
      popular: false
    }
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
  };

  const handleDemoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        // Handle demo upload
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      
      {/* Hero Section with Animated Background */}
      <section 
        id="hero" 
        className="relative overflow-hidden pt-20 pb-16 min-h-screen flex items-center"
        aria-label="Hero section with main value proposition"
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
          style={{ y, opacity }}
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center" id="main-content">
            {/* Left Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <motion.div
                  className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Fashion Discovery
                </motion.div>

                <motion.h1 
                  className="text-5xl md:text-7xl font-bold text-foreground leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Find Any Outfit
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Instantly
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-muted-foreground max-w-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Upload a photo of any outfit and discover where to buy each piece. 
                  Powered by AI, powered by style.
                </motion.p>
              </div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                role="group"
                aria-label="Call to action buttons"
              >
                <AnimatedButton 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                  aria-label="Start free trial of DressMe"
                >
                  Try It Free
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </AnimatedButton>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto group"
                  aria-label="Watch product demonstration video"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  Watch Demo
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-8 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                role="group"
                aria-label="Platform statistics"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary" aria-label="Over 10,000">10K+</div>
                  <div className="text-sm text-muted-foreground">Outfits Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary" aria-label="Over 500">500+</div>
                  <div className="text-sm text-muted-foreground">Partner Stores</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary" aria-label="4.9 out of 5">4.9</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Interactive Demo */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden dressme-card group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10" />
                
                {/* Upload Demo Area */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center space-y-6">
                    <motion.div
                      className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 5 }}
                    >
                      <Camera className="h-12 w-12 text-primary" />
                    </motion.div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Upload Your Outfit Photo</h3>
                      <p className="text-muted-foreground">Drag & drop or click to browse</p>
                    </div>

                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleDemoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUploading}
                        aria-label="Upload outfit photo for demo analysis"
                      />
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                        disabled={isUploading}
                        aria-describedby="upload-description"
                      >
                        {isUploading ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              aria-hidden="true"
                            />
                            <span aria-live="polite">Analyzing...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
                            Choose Photo
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-dressme-yellow to-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Star className="h-10 w-10 text-white fill-current" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-accent to-red-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Heart className="h-8 w-8 text-white fill-current" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section with Bento Grid */}
      <section className="py-24 bg-muted/30" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 id="features-heading" className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose DressMe?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We combine cutting-edge AI technology with your personal style to 
              make fashion discovery effortless and fun.
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={cn(
                  "group",
                  index === 0 && "md:col-span-2",
                  index === 3 && "md:col-span-2"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                role="listitem"
              >
                <AnimatedCard className="h-full p-8 relative overflow-hidden group-hover:shadow-dressme-elevated">
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity", feature.gradient)} aria-hidden="true" />
                  
                  <div className="relative z-10">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6", feature.gradient)} aria-hidden="true">
                      <feature.icon className={cn("h-8 w-8", feature.iconColor)} />
                    </div>
                    
                    <h3 className="font-bold text-2xl mb-4 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 id="how-it-works-heading" className="text-4xl md:text-5xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started in just three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12" role="list">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                role="listitem"
              >
                <div className="relative mb-8">
                  <div 
                    className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-lg"
                    aria-label={`Step ${step.number}`}
                  >
                    {step.number}
                  </div>
                  
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-accent to-red-500 rounded-full flex items-center justify-center" aria-hidden="true">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform translate-x-12" aria-hidden="true" />
                  )}
                </div>
                
                <h3 className="font-bold text-2xl mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Partners Section */}
      <section className="py-24 bg-muted/30" aria-labelledby="partners-heading">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 id="partners-heading" className="text-4xl md:text-5xl font-bold mb-6">
              Shop from 500+ Stores
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find your perfect match from the world's leading fashion retailers
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8" role="list">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                role="listitem"
              >
                <AnimatedCard className="h-24 flex items-center justify-center group-hover:shadow-dressme-elevated">
                  <div 
                    className="text-2xl font-bold text-muted-foreground group-hover:text-primary transition-colors"
                    aria-label={`${partner.name} partner store`}
                  >
                    {partner.logo}
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24" aria-labelledby="pricing-heading">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 id="pricing-heading" className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start free and upgrade as you grow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto" role="list">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={cn(
                  "relative",
                  plan.popular && "md:scale-105"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                role="listitem"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-accent to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <AnimatedCard className={cn(
                  "h-full p-8 relative overflow-hidden",
                  plan.popular && "border-2 border-accent shadow-dressme-elevated"
                )}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8" role="list">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center" role="listitem">
                        <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0" aria-hidden="true" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={cn(
                      "w-full",
                      plan.popular 
                        ? "bg-gradient-to-r from-accent to-red-500 hover:from-accent/90 hover:to-red-500/90 text-white" 
                        : "dressme-button-outline"
                    )}
                    size="lg"
                    aria-label={`Choose ${plan.name} plan for ${plan.price} ${plan.period}`}
                  >
                    {plan.cta}
                    <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground" aria-labelledby="newsletter-heading">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 id="newsletter-heading" className="text-4xl md:text-5xl font-bold mb-6">
              Stay in the Loop
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Get the latest fashion trends, AI updates, and exclusive offers delivered to your inbox.
            </p>
            
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto" aria-label="Newsletter subscription">
              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-background/10 border-background/20 text-foreground placeholder:text-foreground/60"
                  required
                  aria-label="Email address for newsletter subscription"
                />
                <Button 
                  type="submit"
                  className="bg-background text-foreground hover:bg-background/90 px-8"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24" aria-labelledby="final-cta-heading">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 id="final-cta-heading" className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your Perfect Outfit?
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-muted-foreground">
              Join thousands of fashion lovers who are already using DressMe to 
              discover their next favorite look.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center" role="group" aria-label="Call to action buttons">
              <AnimatedButton 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                aria-label="Start using DressMe now"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </AnimatedButton>
              <Button variant="outline" size="lg" aria-label="Learn more about DressMe">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
