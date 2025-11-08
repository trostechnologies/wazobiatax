import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ComplianceScore from "@/components/ComplianceScore";
import BottomNav from "@/components/BottomNav";
import { FileText, CreditCard, BookOpen, Bell, Crown } from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate("/auth");
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      if (!data.business_name || !data.tin) {
        navigate("/onboarding");
        return;
      }

      setProfile(data);
    } catch (error: any) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <img src={logo} alt="wazobiatax.ng" className="h-16 mx-auto animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const quickActions = [
    { icon: FileText, label: "File Return", path: "/file", color: "text-primary" },
    { icon: CreditCard, label: "Pay Tax", path: "/pay", color: "text-success" },
    { icon: BookOpen, label: "Log Transaction", path: "/ledger", color: "text-warning" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background pb-20 md:pb-8">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="wazobiatax.ng" className="h-10" />
              <div>
                <h1 className="font-bold text-lg">wazobiatax.ng</h1>
                <p className="text-xs text-muted-foreground">{profile?.business_name}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome back!</h2>
            <p className="text-muted-foreground">{profile?.full_name}</p>
          </div>
          {!profile?.is_premium && (
            <Badge variant="outline" className="gap-1">
              <Crown className="w-3 h-3" />
              Free Plan
            </Badge>
          )}
        </div>

        <ComplianceScore score={profile?.compliance_score || 0} />

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your tax obligations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.path}
                    onClick={() => navigate(action.path)}
                    className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent hover:border-primary transition-all"
                  >
                    <div className={cn("p-3 rounded-full bg-primary/10", action.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-center">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
              <div>
                <p className="font-medium">Monthly VAT Return</p>
                <p className="text-sm text-muted-foreground">Due in 5 days</p>
              </div>
              <Badge variant="outline" className="border-warning text-warning">
                Pending
              </Badge>
            </div>
          </CardContent>
        </Card>

        {!profile?.is_premium && (
          <Card className="bg-gradient-to-br from-primary/10 to-success/10 border-primary">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                <CardTitle>Upgrade to Premium</CardTitle>
              </div>
              <CardDescription>
                Unlock advanced features for just ₦500/month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span> Multi-business support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span> Advanced analytics
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span> Priority alerts
                </li>
              </ul>
              <Button className="w-full">Upgrade Now</Button>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default Dashboard;