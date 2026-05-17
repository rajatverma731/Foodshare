import Layout from "@/components/Layout";
import { useParams, Link } from "react-router-dom";
import { MOCK_LISTINGS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, User, Package, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ListingDetail = () => {
  const { id } = useParams();
  const listing = MOCK_LISTINGS.find((l) => l.id === id);
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  if (!listing) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold">Listing not found</h2>
          <Link to="/listings"><Button className="mt-4" variant="ghost">Back to Listings</Button></Link>
        </div>
      </Layout>
    );
  }

  const handleRequest = () => {
    toast({ title: "Request Sent!", description: "The donor will be notified of your request." });
    setMessage("");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/listings" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Listings
        </Link>

        <div className="mt-4 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <img src={listing.image} alt={listing.title} className="w-full rounded-xl object-cover" style={{ maxHeight: 400 }} />
            <h1 className="mt-6 text-3xl font-bold">{listing.title}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary">{listing.category}</Badge>
              <Badge className={listing.status === "available" ? "bg-primary/10 text-primary" : "bg-muted"}>{listing.status}</Badge>
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed">{listing.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { icon: Package, label: "Quantity", value: listing.quantity },
                { icon: Clock, label: "Expires", value: listing.expiryDate },
                { icon: MapPin, label: "Location", value: listing.location },
                { icon: User, label: "Donor", value: listing.donorName },
              ].map((d) => (
                <div key={d.label} className="flex items-start gap-3 rounded-lg border p-3">
                  <d.icon className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{d.label}</p>
                    <p className="text-sm font-medium">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Request This Food</h3>
                {listing.status !== "available" ? (
                  <p className="text-sm text-muted-foreground">This listing is no longer available.</p>
                ) : (
                  <>
                    <Textarea
                      placeholder="Tell the donor why you need this food and how you'll use it..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="mb-4"
                    />
                    <Button onClick={handleRequest} className="w-full gradient-green text-primary-foreground" disabled={!message.trim()}>
                      Send Request
                    </Button>
                    <p className="mt-3 text-xs text-muted-foreground text-center">
                      The donor will review your request and respond within 24 hours.
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListingDetail;
