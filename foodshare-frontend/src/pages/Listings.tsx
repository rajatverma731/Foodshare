import Layout from "@/components/Layout";
import FoodCard from "@/components/FoodCard";
import SearchFilters from "@/components/SearchFilters";
import { MOCK_LISTINGS } from "@/lib/data";
import { useState, useMemo } from "react";

const Listings = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return MOCK_LISTINGS.filter((l) => {
      const matchSearch =
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.description.toLowerCase().includes(search.toLowerCase()) ||
        l.location.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || l.category === category;
      const matchStatus = status === "all" || l.status === status;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [search, category, status]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Food Listings</h1>
          <p className="text-muted-foreground">Browse available food donations near you</p>
        </div>

        <div className="mb-6">
          <SearchFilters
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            status={status}
            onStatusChange={setStatus}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No listings found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((listing) => (
              <FoodCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Showing {filtered.length} of {MOCK_LISTINGS.length} listings
        </div>
      </div>
    </Layout>
  );
};

export default Listings;
