import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface ComplianceScoreProps {
  score: number;
}

const ComplianceScore = ({ score }: ComplianceScoreProps) => {
  const getScoreColor = () => {
    if (score >= 80) return "success";
    if (score >= 50) return "warning";
    return "destructive";
  };

  const getScoreIcon = () => {
    if (score >= 80) return <CheckCircle2 className="w-5 h-5 text-success" />;
    if (score >= 50) return <AlertCircle className="w-5 h-5 text-warning" />;
    return <XCircle className="w-5 h-5 text-destructive" />;
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 50) return "Needs Attention";
    return "Critical";
  };

  return (
    <Card className="bg-gradient-to-br from-card to-primary/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Compliance Score</CardTitle>
          <Badge variant="outline" className={cn("border-2", {
            "border-success text-success": score >= 80,
            "border-warning text-warning": score >= 50 && score < 80,
            "border-destructive text-destructive": score < 50,
          })}>
            {getScoreLabel()}
          </Badge>
        </div>
        <CardDescription>Your current tax compliance status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-primary">{score}%</div>
            {getScoreIcon()}
          </div>
          <Progress value={score} className="h-3" />
          <p className="text-sm text-muted-foreground">
            {score >= 80
              ? "Great job! Keep up the good work."
              : score >= 50
              ? "Complete pending tasks to improve your score."
              : "Urgent action required to avoid penalties."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default ComplianceScore;