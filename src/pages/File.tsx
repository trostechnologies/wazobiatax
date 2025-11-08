import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calculator, Receipt } from "lucide-react";

const File = () => {
  const returnTypes = [
    {
      icon: Receipt,
      title: "VAT Return",
      description: "File your 7.5% VAT on services",
      dueDate: "Due in 5 days",
      color: "text-primary",
    },
    {
      icon: Calculator,
      title: "Income Tax Return",
      description: "Annual income tax filing",
      dueDate: "Due in 30 days",
      color: "text-success",
    },
    {
      icon: FileText,
      title: "WHT Report",
      description: "Withholding tax declaration",
      dueDate: "Due in 15 days",
      color: "text-warning",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">File Tax Returns</h1>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>What would you like to file?</CardTitle>
            <CardDescription>
              Select a return type to begin filing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {returnTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("p-3 rounded-full bg-primary/10", type.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">{type.title}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                      <p className="text-xs text-warning mt-1">{type.dueDate}</p>
                    </div>
                  </div>
                  <Button>Start</Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default File;