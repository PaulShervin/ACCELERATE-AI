import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, FileText, Filter } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  lastVisit: string;
  status: "stable" | "monitoring" | "critical";
}

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock patient data
  const mockPatients: Patient[] = [
    {
      id: "001",
      name: "Sarah Johnson",
      age: 45,
      gender: "Female",
      condition: "Diabetes Type 2",
      lastVisit: "2024-10-20",
      status: "stable",
    },
    {
      id: "002",
      name: "Michael Chen",
      age: 62,
      gender: "Male",
      condition: "Hypertension",
      lastVisit: "2024-10-22",
      status: "monitoring",
    },
    {
      id: "003",
      name: "Emily Rodriguez",
      age: 38,
      gender: "Female",
      condition: "Asthma",
      lastVisit: "2024-10-19",
      status: "stable",
    },
    {
      id: "004",
      name: "David Kim",
      age: 71,
      gender: "Male",
      condition: "COPD",
      lastVisit: "2024-10-23",
      status: "critical",
    },
    {
      id: "005",
      name: "Lisa Anderson",
      age: 29,
      gender: "Female",
      condition: "Anxiety Disorder",
      lastVisit: "2024-10-21",
      status: "stable",
    },
  ];

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.includes(searchQuery) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Patient["status"]) => {
    switch (status) {
      case "stable":
        return "text-[hsl(var(--success-green))] bg-[hsl(var(--success-green))]/10";
      case "monitoring":
        return "text-[hsl(var(--warning-amber))] bg-[hsl(var(--warning-amber))]/10";
      case "critical":
        return "text-destructive bg-destructive/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-[hsl(var(--medical-blue-light))]/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Patient Directory</h1>
          <p className="text-muted-foreground">
            Access and manage all patient records
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>All Patients</CardTitle>
                <CardDescription>
                  {filteredPatients.length} patients found
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No patients found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPatients.map((patient) => (
                      <TableRow key={patient.id} className="hover:bg-secondary/50">
                        <TableCell className="font-medium">{patient.id}</TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.condition}</TableCell>
                        <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                              patient.status
                            )}`}
                          >
                            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <FileText className="h-4 w-4" />
                            View Report
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Patients;
