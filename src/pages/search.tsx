
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { ItemCard } from "@/components/item-card";
import { getItemsBySearchTerm } from "@/lib/mockData";
import { Item } from "@/lib/types";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<Item[]>([]);
  
  useEffect(() => {
    if (searchTerm) {
      setResults(getItemsBySearchTerm(searchTerm));
    } else {
      setResults([]);
    }
  }, [searchTerm]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Search</h1>
          
          <SearchBar 
            className="max-w-2xl mx-auto mb-12"
            defaultValue={searchTerm}
            onSearch={setSearchTerm}
          />
          
          {searchTerm ? (
            <div>
              <h2 className="text-xl font-semibold mb-6">
                {results.length === 0
                  ? `No results for "${searchTerm}"`
                  : `${results.length} results for "${searchTerm}"`}
              </h2>
              
              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {results.map(item => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-4">
                    We couldn't find any items matching your search.
                  </p>
                  <p className="text-muted-foreground">
                    Try using different keywords or browse our marketplace.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg mb-4">
                Search for items you'd like to exchange
              </p>
              <p className="text-muted-foreground">
                Enter keywords related to what you're looking for
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
