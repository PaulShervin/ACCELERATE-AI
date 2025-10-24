import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Send, Download, Copy, Clock, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface QueryResult {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
  patientId: string;
}

// Mock patient database for validation
const VALID_PATIENTS = {
  "001": {
    name: "Sarah Johnson",
    age: 45,
    gender: "Female",
    bloodType: "O+",
    conditions: ["Hypertension (Controlled)", "Type 2 Diabetes Mellitus"],
    vitals: {
      bp: "128/82 mmHg",
      heartRate: "72 bpm",
      glucose: "110 mg/dL (Fasting)",
      spo2: "98%"
    },
    medications: [
      "Metformin 500mg - Twice daily",
      "Lisinopril 10mg - Once daily",
      "Atorvastatin 20mg - Once daily"
    ],
    labs: {
      hba1c: "6.5% (Well controlled)",
      ldl: "95 mg/dL (Optimal)",
      creatinine: "0.9 mg/dL (Normal)"
    }
  },
  "002": {
    name: "Michael Chen",
    age: 62,
    gender: "Male",
    bloodType: "A+",
    conditions: ["Coronary Artery Disease", "Hyperlipidemia"],
    vitals: {
      bp: "135/88 mmHg",
      heartRate: "68 bpm",
      glucose: "95 mg/dL",
      spo2: "97%"
    },
    medications: [
      "Aspirin 81mg - Once daily",
      "Metoprolol 50mg - Twice daily",
      "Rosuvastatin 10mg - Once daily"
    ],
    labs: {
      hba1c: "5.8% (Normal)",
      ldl: "88 mg/dL (Optimal)",
      creatinine: "1.1 mg/dL (Normal)"
    }
  },
  "003": {
    name: "Emily Rodriguez",
    age: 38,
    gender: "Female",
    bloodType: "B+",
    conditions: ["Asthma", "Seasonal Allergies"],
    vitals: {
      bp: "118/76 mmHg",
      heartRate: "74 bpm",
      glucose: "88 mg/dL",
      spo2: "99%"
    },
    medications: [
      "Albuterol Inhaler - As needed",
      "Fluticasone 110mcg - Twice daily",
      "Loratadine 10mg - Once daily"
    ],
    labs: {
      hba1c: "5.2% (Normal)",
      ldl: "102 mg/dL (Near Optimal)",
      creatinine: "0.8 mg/dL (Normal)"
    }
  }
};

const extractPatientId = (query: string): string | null => {
  // Extract patient ID from various query formats
  const patterns = [
    /patient\s+id[:\s-]+(\d{3})/i,
    /patient[:\s-]+(\d{3})/i,
    /id[:\s-]+(\d{3})/i,
    /\b(\d{3})\b/
  ];
  
  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<QueryResult | null>(null);
  const [recentQueries, setRecentQueries] = useState<QueryResult[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);

    try {
      // Extract patient ID from query
      const patientId = extractPatientId(query);
      
      if (!patientId) {
        toast({
          title: "Invalid Query",
          description: "Please provide a valid patient ID (e.g., 001, 002, 003)",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Validate patient ID exists in database
      const patientData = VALID_PATIENTS[patientId as keyof typeof VALID_PATIENTS];
      
      if (!patientData) {
        toast({
          title: "Patient Not Found",
          description: `No patient found with ID: ${patientId}. Please verify the patient ID and try again.`,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // TODO: Replace with actual API call to backend
      // const response = await fetch('/api/ask', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({ query, patientId })
      // });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate authenticated response with validated patient data
      const mockResponse: QueryResult = {
        id: `query_${Date.now()}`,
        query: query,
        patientId: patientId,
        response: `**Patient Overview - ID: ${patientId}**

**Patient Name:** ${patientData.name}

**Demographics:**
- Age: ${patientData.age} years
- Gender: ${patientData.gender}
- Blood Type: ${patientData.bloodType}

**Current Conditions:**
${patientData.conditions.map(c => `- ${c}`).join('\n')}

**Recent Vitals:**
- BP: ${patientData.vitals.bp}
- Heart Rate: ${patientData.vitals.heartRate}
- Blood Glucose: ${patientData.vitals.glucose}
- SpO2: ${patientData.vitals.spo2}

**Current Medications:**
${patientData.medications.map(m => `- ${m}`).join('\n')}

**Recent Lab Results:**
- HbA1c: ${patientData.labs.hba1c}
- LDL Cholesterol: ${patientData.labs.ldl}
- Creatinine: ${patientData.labs.creatinine}

**Clinical Notes:**
Patient shows good medication adherence. Continue current treatment plan with regular monitoring.

**Follow-up:**
Next appointment scheduled in 3 months for routine check-up and lab work.`,
        timestamp: new Date(),
      };

      setCurrentResult(mockResponse);
      setRecentQueries([mockResponse, ...recentQueries.slice(0, 4)]);
      setQuery("");

      toast({
        title: "Patient data retrieved",
        description: `Successfully loaded records for ${patientData.name}`,
      });
    } catch (error) {
      toast({
        title: "Query failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (currentResult) {
      navigator.clipboard.writeText(currentResult.response);
      toast({
        title: "Copied to clipboard",
        description: "Report copied successfully",
      });
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download initiated",
      description: "PDF report will be downloaded shortly",
    });
    // TODO: Implement PDF download
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-[hsl(var(--medical-blue-light))]/20">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name} 👋
          </h1>
          <p className="text-muted-foreground">
            Ask me anything about your patients and get AI-powered insights
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Query Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>AI Query</CardTitle>
                <CardDescription>
                  Enter patient ID to access medical records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4 border-medical-blue/30 bg-medical-blue/5">
                  <AlertCircle className="h-4 w-4 text-medical-blue" />
                  <AlertDescription className="text-sm">
                    <strong>Available Patient IDs:</strong> 001 (Sarah Johnson), 002 (Michael Chen), 003 (Emily Rodriguez)
                  </AlertDescription>
                </Alert>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Textarea
                    placeholder='Example: "Show me patient 001" or "Get records for patient ID 002"'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <Button
                    type="submit"
                    variant="medical"
                    className="w-full sm:w-auto gap-2"
                    disabled={isLoading || !query.trim()}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Request Patient Data
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results Display */}
            {currentResult && (
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                  <div>
                      <CardTitle>Patient Medical Record</CardTitle>
                      <CardDescription className="mt-1">
                        Patient ID: <span className="font-semibold text-medical-blue">{currentResult.patientId}</span>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {currentResult.response}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Queries Today</span>
                  <span className="text-2xl font-bold text-primary">
                    {recentQueries.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Response</span>
                  <span className="text-2xl font-bold text-primary">1.2s</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Queries */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Queries
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentQueries.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No recent queries yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentQueries.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setCurrentResult(item)}
                        className="w-full text-left p-3 rounded-lg hover:bg-secondary/50 transition-colors border"
                      >
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">
                              {item.query}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
