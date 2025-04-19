
import { Link } from "react-router-dom";
import { Menu, X, Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { notifications } = useStore();

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read && notification.userId === useStore().currentUser.id
  ).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-semibold tracking-tight text-primary">
              Share<span className="text-primary">Store</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/marketplace" className="text-sm font-medium transition-colors hover:text-primary">
            Marketplace
          </Link>
          <Link to="/post-item" className="text-sm font-medium transition-colors hover:text-primary">
            List an Item
          </Link>
          <Link to="/offers" className="text-sm font-medium transition-colors hover:text-primary">
            Offers
          </Link>
          <Link to="/search" className="text-sm font-medium transition-colors hover:text-primary">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/dashboard" className="relative text-sm font-medium transition-colors hover:text-primary">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white">
                {unreadNotifications}
              </Badge>
            )}
          </Link>
          <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            <User className="h-5 w-5" />
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 pb-6 border-b">
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              className="text-base font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/marketplace"
              className="text-base font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              to="/post-item"
              className="text-base font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              List an Item
            </Link>
            <Link
              to="/offers"
              className="text-base font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Offers
            </Link>
            <Link
              to="/search"
              className="text-base font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Search
            </Link>
            <Link
              to="/dashboard"
              className="text-base font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Notifications
              {unreadNotifications > 0 && (
                <Badge className="ml-2 bg-primary text-white">
                  {unreadNotifications}
                </Badge>
              )}
            </Link>
            <Link
              to="/dashboard"
              className="text-base font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
