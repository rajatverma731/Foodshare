import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { FoodListing } from "@/lib/data";
import { Link } from "react-router-dom";

interface FoodCardProps {
  listing: FoodListing;
}

const FoodCard = ({ listing }: FoodCardProps) => {
  const statusColors = {
    available: "bg-primary/10 text-primary border-primary/20",
    claimed: "bg-accent/10 text-accent-foreground border-accent/20",
    expired: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <Card className="group overflow-hidden border transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className={`absolute right-3 top-3 ${statusColors[listing.status]}`}>
          {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
        </Badge>
        <Badge variant="secondary" className="absolute left-3 top-3">
          {listing.category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-1 text-lg font-semibold line-clamp-1">{listing.title}</h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>{listing.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>Expires: {listing.expiryDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            by {listing.donorName}
          </span>
          <Link to={`/listings/${listing.id}`}>
            <Button size="sm" variant="ghost" className="text-primary">
              View <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
