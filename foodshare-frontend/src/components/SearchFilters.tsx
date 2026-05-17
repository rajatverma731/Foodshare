import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { FOOD_CATEGORIES } from "@/lib/data";

interface SearchFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
}

const SearchFilters = ({ search, onSearchChange, category, onCategoryChange, status, onStatusChange }: SearchFiltersProps) => (
  <div className="flex flex-col gap-3 sm:flex-row">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search food listings..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9"
      />
    </div>
    <Select value={category} onValueChange={onCategoryChange}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {FOOD_CATEGORIES.map((cat) => (
          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
        ))}
      </SelectContent>
    </Select>
    <Select value={status} onValueChange={onStatusChange}>
      <SelectTrigger className="w-full sm:w-[150px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="available">Available</SelectItem>
        <SelectItem value="claimed">Claimed</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default SearchFilters;
