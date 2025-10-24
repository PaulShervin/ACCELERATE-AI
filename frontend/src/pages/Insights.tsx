import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";

const Insights = () => {
  const stats = [
    {
      title: "Total Patients",
      value: "1,248",
      change: "+12.5%",
      icon: Users,
      color: "text-[hsl(var(--medical-blue))]",
    },
    {
      title: "Active Cases",
      value: "342",
      change: "+8.2%",
      icon: Activity,
      color: "text-[hsl(var(--success-green))]",
    },
    {
      title: "Critical Status",
      value: "23",
      change: "-3.1%",
      icon: TrendingUp,
      color: "text-[hsl(var(--warning-amber))]",
    },
    {
      title: "Avg Recovery Time",
      value: "14.2 days",
      change: "-5.4%",
      icon: BarChart3,
      color: "text-[hsl(var(--info-cyan))]",
    },
  ];

  const topConditions = [
    { name: "Hypertension", count: 285, percentage: 23 },
    { name: "Type 2 Diabetes", count: 198, percentage: 16 },
    { name: "Asthma", count: 156, percentage: 13 },
    { name: "COPD", count: 134, percentage: 11 },
    { name: "Anxiety Disorder", count: 112, percentage: 9 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-[hsl(var(--medical-blue-light))]/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Insights</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and trends across your patient population
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.change.startsWith("+") ? "text-[hsl(var(--success-green))]" : "text-destructive"}`}>
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Conditions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Top Medical Conditions</CardTitle>
              <CardDescription>Most common diagnoses in your practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topConditions.map((condition, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{condition.name}</span>
                      <span className="text-muted-foreground">
                        {condition.count} patients ({condition.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[hsl(var(--medical-blue))] to-[hsl(var(--info-cyan))]"
                        style={{ width: `${condition.percentage * 4}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Age Distribution */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Patient Demographics</CardTitle>
              <CardDescription>Age distribution across patient base</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { range: "0-18", count: 145, percentage: 12 },
                  { range: "19-35", count: 298, percentage: 24 },
                  { range: "36-50", count: 387, percentage: 31 },
                  { range: "51-65", count: 289, percentage: 23 },
                  { range: "65+", count: 129, percentage: 10 },
                ].map((age, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{age.range} years</span>
                      <span className="text-muted-foreground">
                        {age.count} patients ({age.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[hsl(var(--success-green))] to-[hsl(var(--medical-blue))]"
                        style={{ width: `${age.percentage * 4}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Treatment Success Rate */}
          <Card className="shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle>Treatment Success Rates</CardTitle>
              <CardDescription>Recovery outcomes by condition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { condition: "Hypertension", rate: 87, patients: 285 },
                  { condition: "Type 2 Diabetes", rate: 82, patients: 198 },
                  { condition: "Asthma", rate: 91, patients: 156 },
                  { condition: "COPD", rate: 78, patients: 134 },
                  { condition: "Anxiety", rate: 85, patients: 112 },
                  { condition: "Other Conditions", rate: 84, patients: 363 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2 bg-gradient-to-br from-card to-secondary/20"
                  >
                    <div className="text-3xl font-bold text-primary mb-1">{item.rate}%</div>
                    <div className="text-sm font-medium mb-1">{item.condition}</div>
                    <div className="text-xs text-muted-foreground">{item.patients} patients</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Insights;
