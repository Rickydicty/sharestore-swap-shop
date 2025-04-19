
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ItemCard } from "@/components/item-card";
import { SearchBar } from "@/components/search-bar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { categories, getItemsByCategory, getItemsBySearchTerm } from "@/lib/mockData";
import { Item } from "@/lib/types";

export default function MarketplacePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<Item[]>([]);
  const [category, setCategory] = useState<string>(searchParams.get("category") || "All");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("q") || "");
  
  // Filter and sort items
  useEffect(() => {
    // Apply category filter
    let filteredItems = getItemsByCategory(category === "All" ? "" : category);
    
    // Apply search filter if exists
    if (searchQuery) {
      filteredItems = getItemsBySearchTerm(searchQuery);
    }
    
    // Apply sorting
    const sortedItems = [...filteredItems].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // For "most wanted", we're just randomizing for the demo
      return Math.random() - 0.5;
    });
    
    setItems(sortedItems);
    
    // Update URL params
    const newParams = new URLSearchParams();
    if (category !== "All") newParams.set("category", category);
    if (searchQuery) newParams.set("q", searchQuery);
    setSearchParams(newParams);
  }, [category, sortBy, searchQuery, setSearchParams]);
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Marketplace</h1>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="md:flex-1">
              <SearchBar 
                onSearch={handleSearch} 
                defaultValue={searchQuery}
              />
            </div>
            
            <div className="flex gap-2 md:w-auto w-full">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="md:w-[180px] w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="md:w-[150px] w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="wanted">Most Wanted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Results */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                {searchQuery 
                  ? `No items match "${searchQuery}" in ${category === "All" ? "any category" : `the ${category} category`}` 
                  : `No items found in ${category === "All" ? "any category" : `the ${category} category`}`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
