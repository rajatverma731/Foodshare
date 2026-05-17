import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FOOD_CATEGORIES } from "@/lib/data";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { api } from "@/lib/api";

const DonatePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    quantity: "",
    expiryDate: "",
    location: "",
    image: "",
  });

  const update = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Check if user is logged in before trying to donate
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Please log in",
        description: "You must be signed in to donate food.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      // ✅ Actually call the backend API to create the listing
      const data = await api.createListing(form);

      if (data._id) {
        // Backend returns the created listing with _id if successful
        toast({
          title: "Food Listed!",
          description: "Your donation has been posted successfully.",
        });
        navigate("/listings");
      } else {
        // Show validation errors or other backend errors
        const errorMsg = data.errors
          ? data.errors.map((e: any) => e.msg).join(", ")
          : data.message || "Failed to create listing.";
        toast({ title: "Error", description: errorMsg, variant: "destructive" });
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
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold">Donate Food</h1>
        <p className="mb-8 text-muted-foreground">
          Fill in the details about the food you'd like to donate
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Food Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g. Fresh Vegetables"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="desc">Description *</Label>
                <Textarea
                  id="desc"
                  placeholder="Describe the food items..."
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={4}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Category *</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => update("category", v)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {FOOD_CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="qty">Quantity *</Label>
                  <Input
                    id="qty"
                    placeholder="e.g. 5 kg, 10 servings"
                    value={form.quantity}
                    onChange={(e) => update("quantity", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="exp">Expiry Date *</Label>
                  <Input
                    id="exp"
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) => update("expiryDate", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="loc">Pickup Location *</Label>
                  <Input
                    id="loc"
                    placeholder="Address or landmark"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="img">Image URL (optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="img"
                    placeholder="https://..."
                    value={form.image}
                    onChange={(e) => update("image", e.target.value)}
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* ✅ Button disables and shows loading while submitting */}
              <Button
                type="submit"
                className="w-full gradient-green text-primary-foreground"
                size="lg"
                disabled={loading}
              >
                {loading ? "Posting..." : "Post Donation"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DonatePage;