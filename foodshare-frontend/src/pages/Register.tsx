import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const update = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.role) {
      toast({ title: "Role required", description: "Please select whether you want to donate or receive food.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // ✅ Actually call the backend register API
      const data = await api.register(form);

      if (data.token) {
        // ✅ Save token and user so they're logged in immediately after registering
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast({
          title: "Account Created!",
          description: `Welcome to FoodShare, ${data.user.name}!`,
        });
        navigate("/dashboard");
      } else {
        // Show backend error (e.g. "Email already registered")
        toast({
          title: "Registration Failed",
          description: data.message || "Could not create account.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not connect to server. Is the backend running?",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl gradient-green">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Join FoodShare</CardTitle>
            <CardDescription>Create an account to start sharing food</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <div>
                <Label>I want to</Label>
                <Select value={form.role} onValueChange={(v) => update("role", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="donor">Donate Food</SelectItem>
                    <SelectItem value="recipient">Receive Food</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* ✅ Button shows loading state */}
              <Button
                type="submit"
                className="w-full gradient-green text-primary-foreground"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;