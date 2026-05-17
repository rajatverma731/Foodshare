export interface FoodListing {
  id: string;
  title: string;
  description: string;
  category: string;
  quantity: string;
  expiryDate: string;
  location: string;
  image: string;
  donorName: string;
  donorId: string;
  status: "available" | "claimed" | "expired";
  createdAt: string;
}

export interface DonationRequest {
  id: string;
  listingId: string;
  listingTitle: string;
  requesterId: string;
  requesterName: string;
  donorId: string;
  donorName: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "donor" | "recipient" | "admin";
  avatar?: string;
}

export const FOOD_CATEGORIES = [
  "Fruits & Vegetables",
  "Dairy Products",
  "Baked Goods",
  "Cooked Meals",
  "Canned Food",
  "Beverages",
  "Snacks",
  "Other",
] as const;

export const MOCK_LISTINGS: FoodListing[] = [
  {
    id: "1",
    title: "Fresh Organic Vegetables",
    description: "Assorted organic vegetables including carrots, tomatoes, and spinach. Harvested yesterday from our garden.",
    category: "Fruits & Vegetables",
    quantity: "5 kg",
    expiryDate: "2026-04-15",
    location: "Downtown Community Center",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
    donorName: "Green Farm Co.",
    donorId: "u1",
    status: "available",
    createdAt: "2026-04-10",
  },
  {
    id: "2",
    title: "Homemade Bread Loaves",
    description: "Freshly baked whole wheat bread loaves. Made with natural ingredients, no preservatives.",
    category: "Baked Goods",
    quantity: "10 loaves",
    expiryDate: "2026-04-13",
    location: "Baker Street Kitchen",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    donorName: "Maria's Bakery",
    donorId: "u2",
    status: "available",
    createdAt: "2026-04-10",
  },
  {
    id: "3",
    title: "Cooked Pasta & Sauce",
    description: "Large batch of spaghetti with tomato basil sauce. Prepared for an event, surplus available.",
    category: "Cooked Meals",
    quantity: "20 servings",
    expiryDate: "2026-04-12",
    location: "Italian Bistro",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    donorName: "Chef Antonio",
    donorId: "u3",
    status: "available",
    createdAt: "2026-04-09",
  },
  {
    id: "4",
    title: "Canned Soup Collection",
    description: "Variety of canned soups - chicken noodle, tomato, and minestrone. Well within expiry dates.",
    category: "Canned Food",
    quantity: "15 cans",
    expiryDate: "2027-01-01",
    location: "Warehouse District",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    donorName: "FoodBank Plus",
    donorId: "u4",
    status: "available",
    createdAt: "2026-04-08",
  },
  {
    id: "5",
    title: "Fresh Dairy Products",
    description: "Milk, yogurt, and cheese from a local dairy farm. Refrigerated and fresh.",
    category: "Dairy Products",
    quantity: "8 items",
    expiryDate: "2026-04-14",
    location: "Sunny Farms Outlet",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=300&fit=crop",
    donorName: "Sunny Farms",
    donorId: "u5",
    status: "claimed",
    createdAt: "2026-04-07",
  },
  {
    id: "6",
    title: "Fruit Juice Boxes",
    description: "Apple and orange juice boxes, perfect for kids. 24-pack, sealed and fresh.",
    category: "Beverages",
    quantity: "24 boxes",
    expiryDate: "2026-06-01",
    location: "Central Market",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
    donorName: "Juice Haven",
    donorId: "u1",
    status: "available",
    createdAt: "2026-04-06",
  },
];

export const MOCK_REQUESTS: DonationRequest[] = [
  {
    id: "r1",
    listingId: "1",
    listingTitle: "Fresh Organic Vegetables",
    requesterId: "u6",
    requesterName: "Community Kitchen",
    donorId: "u1",
    donorName: "Green Farm Co.",
    message: "We would love to use these vegetables for our community dinner program.",
    status: "pending",
    createdAt: "2026-04-10",
  },
  {
    id: "r2",
    listingId: "2",
    listingTitle: "Homemade Bread Loaves",
    requesterId: "u7",
    requesterName: "Shelter Home",
    donorId: "u2",
    donorName: "Maria's Bakery",
    message: "Our shelter residents would greatly appreciate fresh bread.",
    status: "approved",
    createdAt: "2026-04-10",
  },
];
