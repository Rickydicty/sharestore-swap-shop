
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreProvider } from "@/lib/store";

// Pages
import LandingPage from "./pages/landing";
import MarketplacePage from "./pages/marketplace";
import ItemDetailPage from "./pages/item-detail";
import PostItemPage from "./pages/post-item";
import OffersPage from "./pages/offers";
import DashboardPage from "./pages/dashboard";
import SearchPage from "./pages/search";
import NotFoundPage from "./pages/not-found";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <StoreProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/item/:id" element={<ItemDetailPage />} />
              <Route path="/post-item" element={<PostItemPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/*" element={<DashboardPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </StoreProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
