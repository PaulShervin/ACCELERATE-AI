import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Mail, MessageCircle, Github, FileQuestion } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Help = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours",
    });
    setIsSubmitting(false);
  };

  const faqs = [
    {
      question: "How do I query patient information?",
      answer: "Navigate to the Dashboard and use the AI Query panel. Enter the patient ID or ask a specific question about the patient's condition.",
    },
    {
      question: "Is my patient data secure?",
      answer: "Yes, all data is encrypted and complies with HIPAA standards. We use enterprise-grade security measures including JWT authentication and secure session management.",
    },
    {
      question: "How long does a session last?",
      answer: "For security, sessions automatically expire after 15 minutes of inactivity. You'll need to log in again to continue.",
    },
    {
      question: "Can I download patient reports?",
      answer: "Yes, you can download reports as PDF files from the Dashboard after generating an AI analysis.",
    },
    {
      question: "How accurate is the AI analysis?",
      answer: "Our AI is trained on extensive medical datasets and provides highly accurate summaries. However, always verify critical information and use your professional judgment.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-[hsl(var(--medical-blue-light))]/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
          <p className="text-muted-foreground">
            Find answers to your questions or get in touch with our team
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Quick Links */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Comprehensive user guides and tutorials</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Docs
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Get instant help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <Github className="h-8 w-8 text-primary mb-2" />
              <CardTitle>GitHub</CardTitle>
              <CardDescription>Report issues or contribute to the project</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Visit GitHub
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* FAQs */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileQuestion className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-semibold text-sm">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                  {index < faqs.length - 1 && <div className="border-t pt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Support
              </CardTitle>
              <CardDescription>
                Send us a message and we'll respond within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Dr. John Smith" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@hospital.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue or question..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="medical"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>

              <div className="mt-6 p-4 rounded-lg bg-[hsl(var(--medical-blue-light))] text-sm">
                <p className="font-medium mb-1">Emergency Support</p>
                <p className="text-muted-foreground">
                  For critical issues, call: +1 (800) 555-0123
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
