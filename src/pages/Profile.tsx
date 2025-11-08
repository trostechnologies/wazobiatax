import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building2, LogOut, Crown } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Profile</h1>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Account Information</CardTitle>
              {profile?.is_premium && (
                <Crown className="w-5 h-5 text-primary" />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{profile?.full_name}</p>
                <p className="text-sm text-muted-foreground">{profile?.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="font-medium">{profile?.business_name}</p>
                <p className="text-sm text-muted-foreground">{profile?.business_type}</p>
                {profile?.tin && (
                  <p className="text-xs text-muted-foreground">TIN: {profile.tin}</p>
                )}
              </div>
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
                Get advanced features for ₦500/month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Upgrade Now</Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="pt-6">
            <Button
              variant="destructive"
              onClick={handleSignOut}
              className="w-full gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;