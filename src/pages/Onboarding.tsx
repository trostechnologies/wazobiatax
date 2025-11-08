import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { CheckCircle2 } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    annualTurnover: "",
    tin: "",
    bvn: "",
  });

  const businessTypes = [
    "Betting Agent",
    "Retail Shop",
    "Restaurant",
    "Services",
    "Trading",
    "Other",
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const turnover = parseFloat(formData.annualTurnover.replace(/,/g, ""));
      const complianceScore = formData.tin ? 50 : 20;

      const { error } = await supabase
        .from("profiles")
        .update({
          business_name: formData.businessName,
          business_type: formData.businessType,
          annual_turnover: turnover,
          tin: formData.tin,
          bvn: formData.bvn,
          compliance_score: complianceScore,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profile completed successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-success/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <img src={logo} alt="wazobiatax.ng" className="h-16 mx-auto" />
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Step {step} of 3 - Let's set up your business details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  placeholder="Your business name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => setStep(2)}
                className="w-full"
                disabled={!formData.businessName || !formData.businessType}
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="annualTurnover">Annual Turnover (₦) *</Label>
                <Input
                  id="annualTurnover"
                  type="number"
                  placeholder="10000000"
                  value={formData.annualTurnover}
                  onChange={(e) => setFormData({ ...formData, annualTurnover: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Businesses below ₦100M qualify for simplified tax filing
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tin">Tax Identification Number (TIN)</Label>
                <Input
                  id="tin"
                  placeholder="12345678-0001"
                  value={formData.tin}
                  onChange={(e) => setFormData({ ...formData, tin: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Don't have a TIN? We'll help you get one
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1"
                  disabled={!formData.annualTurnover}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bvn">Bank Verification Number (BVN)</Label>
                <Input
                  id="bvn"
                  placeholder="22222222222"
                  maxLength={11}
                  value={formData.bvn}
                  onChange={(e) => setFormData({ ...formData, bvn: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  For verification purposes (optional)
                </p>
              </div>

              <div className="bg-success/10 border border-success/20 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle2 className="w-5 h-5" />
                  <p className="font-medium">Setup Complete!</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  You're ready to start managing your tax compliance.
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1" disabled={loading}>
                  {loading ? "Saving..." : "Get Started"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;