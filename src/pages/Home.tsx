import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Brain, Shield, Zap, TrendingUp, Users } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get intelligent patient summaries and clinical insights powered by advanced AI",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "HIPAA-compliant infrastructure with enterprise-grade security",
    },
    {
      icon: Zap,
      title: "Real-Time Analysis",
      description: "Instant patient data analysis and trend detection",
    },
    {
      icon: TrendingUp,
      title: "Trend Visualization",
      description: "Interactive charts and graphs for patient health trends",
    },
    {
      icon: Users,
      title: "Patient Directory",
      description: "Centralized access to all patient records and histories",
    },
    {
      icon: Activity,
      title: "Clinical Decision Support",
      description: "Evidence-based recommendations to support your clinical decisions",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-[hsl(var(--medical-blue-light))] to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
              <Activity className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">AI-Driven Healthcare Assistant</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Empowering Doctors with{" "}
              <span className="bg-gradient-to-r from-[hsl(var(--medical-blue))] to-[hsl(var(--info-cyan))] bg-clip-text text-transparent">
                Intelligent Healthcare
              </span>
            </h1>
            
            <p className="mb-10 text-xl text-muted-foreground md:text-2xl">
              Transform patient care with AI-powered summaries, real-time insights, 
              and comprehensive clinical decision support.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/login">
                <Button variant="medical" size="lg" className="w-full sm:w-auto gap-2">
                  <Activity className="h-5 w-5" />
                  Start Now
                </Button>
              </Link>
              <Link to="/help">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Active Doctors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500K+</div>
                <div className="text-sm text-muted-foreground">Patients Analyzed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 md:text-4xl">
              Everything You Need for Modern Healthcare
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive tools designed specifically for healthcare professionals
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--medical-blue))] to-[hsl(var(--info-cyan))] text-white shadow-md group-hover:shadow-lg transition-shadow">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden p-12 text-center bg-gradient-to-br from-card to-[hsl(var(--medical-blue-light))] border-2">
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ready to Transform Your Practice?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join thousands of doctors using DoctorAI for better patient outcomes
              </p>
              <Link to="/login">
                <Button variant="medical" size="lg" className="gap-2">
                  <Activity className="h-5 w-5" />
                  Get Started Today
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
