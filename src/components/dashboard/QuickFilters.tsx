import { motion } from "motion/react";
import { Filter, X, Search, DollarSign, Tag, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useState } from "react";

interface QuickFiltersProps {
  className?: string;
  onFiltersChange?: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  priceRange: string;
  category: string;
  store: string;
  tags: string[];
}

const PRICE_RANGES = [
  { value: "all", label: "All Prices" },
  { value: "0-50", label: "Under $50" },
  { value: "50-100", label: "$50 - $100" },
  { value: "100-200", label: "$100 - $200" },
  { value: "200-500", label: "$200 - $500" },
  { value: "500+", label: "$500+" },
];

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "tops", label: "Tops" },
  { value: "bottoms", label: "Bottoms" },
  { value: "dresses", label: "Dresses" },
  { value: "shoes", label: "Shoes" },
  { value: "accessories", label: "Accessories" },
  { value: "outerwear", label: "Outerwear" },
];

const STORES = [
  { value: "all", label: "All Stores" },
  { value: "zara", label: "Zara" },
  { value: "h&m", label: "H&M" },
  { value: "uniqlo", label: "Uniqlo" },
  { value: "asos", label: "ASOS" },
  { value: "nordstrom", label: "Nordstrom" },
];

const POPULAR_TAGS = [
  "casual", "formal", "work", "party", "date", "vacation", 
  "summer", "winter", "trendy", "classic", "vintage", "minimalist"
];

export function QuickFilters({ className, onFiltersChange }: QuickFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priceRange: "all",
    category: "all",
    store: "all",
    tags: [],
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    updateFilter("tags", newTags);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      priceRange: "all",
      category: "all",
      store: "all",
      tags: [],
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = filters.search || 
    filters.priceRange !== "all" || 
    filters.category !== "all" || 
    filters.store !== "all" || 
    filters.tags.length > 0;

  return (
    <motion.div 
      className={`space-y-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Search and Toggle */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products, brands, styles..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1">
              {filters.tags.length + 
               (filters.priceRange !== "all" ? 1 : 0) + 
               (filters.category !== "all" ? 1 : 0) + 
               (filters.store !== "all" ? 1 : 0)}
            </Badge>
          )}
        </Button>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="space-y-4 pt-4 border-t">
          {/* Filter Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Price Range
              </label>
              <Select value={filters.priceRange} onValueChange={(value) => updateFilter("priceRange", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRICE_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Category
              </label>
              <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Store className="h-4 w-4 mr-2" />
                Store
              </label>
              <Select value={filters.store} onValueChange={(value) => updateFilter("store", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STORES.map((store) => (
                    <SelectItem key={store.value} value={store.value}>
                      {store.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Popular Tags</label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TAGS.map((tag) => (
                <Button
                  key={tag}
                  variant={filters.tags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTag(tag)}
                  className="text-xs"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Active Filters</label>
              <div className="flex flex-wrap gap-2">
                {filters.search && (
                  <Badge variant="secondary" className="flex items-center">
                    Search: {filters.search}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => updateFilter("search", "")}
                    />
                  </Badge>
                )}
                {filters.priceRange !== "all" && (
                  <Badge variant="secondary" className="flex items-center">
                    Price: {PRICE_RANGES.find(r => r.value === filters.priceRange)?.label}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => updateFilter("priceRange", "all")}
                    />
                  </Badge>
                )}
                {filters.category !== "all" && (
                  <Badge variant="secondary" className="flex items-center">
                    Category: {CATEGORIES.find(c => c.value === filters.category)?.label}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => updateFilter("category", "all")}
                    />
                  </Badge>
                )}
                {filters.store !== "all" && (
                  <Badge variant="secondary" className="flex items-center">
                    Store: {STORES.find(s => s.value === filters.store)?.label}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => updateFilter("store", "all")}
                    />
                  </Badge>
                )}
                {filters.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center">
                    {tag}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => toggleTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}