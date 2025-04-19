
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ 
  className = "", 
  placeholder = "Search for items...", 
  defaultValue = "",
  onSearch
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(query);
    } else {
      // If no onSearch callback, navigate to search page
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  
  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pr-16 pl-10"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute inset-y-0 right-9 h-full px-2"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute inset-y-0 right-0 h-full px-2"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
