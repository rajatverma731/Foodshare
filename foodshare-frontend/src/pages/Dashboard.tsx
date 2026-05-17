import Layout from "@/components/Layout";
import StatCard from "@/components/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Heart, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

const Dashboard = ( ) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  
  const [stats, setStats] = useState({ myListings: 0, totalDonated: 0, pendingRequests: 0, completed: 0 });
  const [myListings, setMyListings] = useState<any[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<any[]>([]);
  const [sentRequests, setSentRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

 
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    // ✅ Redirect to login if not authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      toast({ title: "Please log in", description: "You must be signed in to view the dashboard.", variant: "destructive" });
      navigate("/login");
      return;
    }
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // ✅ Fetch all real data from backend in parallel
      const [statsData, listingsData, incomingData, sentData] = await Promise.all([
        api.getUserStats(),
        api.getMyListings(),
        api.getIncomingRequests(),
        api.getSentRequests(),
      ]);

      setStats(statsData);
      setMyListings(Array.isArray(listingsData) ? listingsData : []);
      setIncomingRequests(Array.isArray(incomingData) ? incomingData : []);
      setSentRequests(Array.isArray(sentData) ? sentData : []);
    } catch (err) {
      toast({ title: "Error loading dashboard", description: "Could not fetch your data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Actually approve or reject a request via API
  const handleAction = async (requestId: string, status: "approved" | "rejected", requesterName: string) => {
    try {
      await api.updateRequest(requestId, { status });
      toast({ title: `Request ${status}`, description: `${requesterName}'s request has been ${status}.` });
      // Refresh data after action
      fetchAllData();
    } catch (err) {
      toast({ title: "Error", description: "Could not update request.", variant: "destructive" });
    }
  };

  // ✅ Delete a listing via API
  const handleDelete = async (listingId: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await api.deleteListing(listingId);
      toast({ title: "Deleted", description: `"${title}" has been removed.` });
      fetchAllData();
    } catch (err) {
      toast({ title: "Error", description: "Could not delete listing.", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground text-lg">Loading dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
        <p className="mb-8 text-muted-foreground">
          Welcome back, <span className="font-semibold text-foreground">{user.name}</span>!
          You are a <span className="font-semibold text-primary capitalize">{user.role}</span>.
        </p>

        {/* ✅ Real stats from backend */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Package} label="My Listings" value={String(stats.myListings)} />
          <StatCard icon={Heart} label="Total Donated" value={String(stats.totalDonated)} />
          <StatCard icon={Clock} label="Pending Requests" value={String(stats.pendingRequests)} />
          <StatCard icon={CheckCircle} label="Completed" value={String(stats.completed)} />
        </div>

        <Tabs defaultValue="listings">
          <TabsList className="mb-6">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="requests">Incoming Requests</TabsTrigger>
            <TabsTrigger value="sent">My Requests</TabsTrigger>
          </TabsList>

          {/* ✅ My Listings tab — real data */}
          <TabsContent value="listings">
            {myListings.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  <p>You haven't posted any listings yet.</p>
                  <Button variant="link" className="text-primary mt-2" onClick={() => navigate("/donate")}>
                    Donate Food
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {myListings.map((l) => (
                  <Card key={l._id}>
                    <CardContent className="flex items-center gap-4 p-4">
                      {l.image && (
                        <img src={l.image} alt={l.title} className="h-16 w-16 rounded-lg object-cover" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold">{l.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {l.quantity} · {l.location}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expires: {new Date(l.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={l.status === "available" ? "bg-primary/10 text-primary" : "bg-muted"}>
                        {l.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(l._id, l.title)}
                      >
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ✅ Incoming Requests tab — real data */}
          <TabsContent value="requests">
            {incomingRequests.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  <p>No incoming requests yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {incomingRequests.map((r) => (
                  <Card key={r._id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{r.requesterName}</h4>
                          <p className="text-sm text-muted-foreground">wants: {r.listingTitle}</p>
                          <p className="mt-1 text-sm">{r.message}</p>
                        </div>
                        <Badge
                          className={
                            r.status === "pending"
                              ? "bg-accent/20 text-accent-foreground"
                              : r.status === "approved"
                              ? "bg-primary/10 text-primary"
                              : "bg-destructive/10 text-destructive"
                          }
                        >
                          {r.status}
                        </Badge>
                      </div>
                      {r.status === "pending" && (
                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            className="gradient-green text-primary-foreground"
                            onClick={() => handleAction(r._id, "approved", r.requesterName)}
                          >
                            <CheckCircle className="mr-1 h-3.5 w-3.5" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAction(r._id, "rejected", r.requesterName)}
                          >
                            <XCircle className="mr-1 h-3.5 w-3.5" /> Decline
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ✅ Sent Requests tab — real data */}
          <TabsContent value="sent">
            {sentRequests.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  <p>You haven't sent any requests yet.</p>
                  <Button variant="link" className="text-primary mt-2" onClick={() => navigate("/listings")}>
                    Browse Listings
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {sentRequests.map((r) => (
                  <Card key={r._id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{r.listingTitle || r.listing?.title}</h4>
                          <p className="text-sm text-muted-foreground">Donor: {r.donorName}</p>
                          <p className="mt-1 text-sm">{r.message}</p>
                        </div>
                        <Badge
                          className={
                            r.status === "pending"
                              ? "bg-accent/20 text-accent-foreground"
                              : r.status === "approved"
                              ? "bg-primary/10 text-primary"
                              : "bg-destructive/10 text-destructive"
                          }
                        >
                          {r.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;