import { Link } from "react-router-dom";
import { ArrowRight, RefreshCcw, Truck, CheckSquare, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundAnimation } from "@/components/background-animation";
import { DarkBackgroundAnimation } from "@/components/dark-background-animation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { categories } from "@/lib/mockData";
import { useTheme } from "@/components/theme-provider";

export default function LandingPage() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col">
      {theme === 'light' ? <BackgroundAnimation /> : <DarkBackgroundAnimation />}
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Trade What You Have.<br />
              Get What You Need.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              ShareStore connects you with people to exchange goods without money.
              Sustainable, simple, and community-driven.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="dark:bg-red-800 dark:text-white dark:hover:bg-red-700 font-semibold">
                <Link to="/post-item">
                  List an Item <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold">
                <Link to="/marketplace">
                  Explore Items
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Categories Preview */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Browse Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.slice(0, 10).map((category) => (
                <Link
                  key={category}
                  to={`/marketplace?category=${encodeURIComponent(category)}`}
                  className="aspect-square flex items-center justify-center bg-background rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] border"
                >
                  <span className="font-medium">{category}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              Our platform makes exchanging items simple and straightforward
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <RefreshCcw className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">List Your Item</h3>
                <p className="text-muted-foreground">
                  Upload photos and details about items you want to exchange
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Find What You Want</h3>
                <p className="text-muted-foreground">
                  Browse through items that other people have listed
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Make an Offer</h3>
                <p className="text-muted-foreground">
                  Propose an exchange with one of your items
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Complete the Trade</h3>
                <p className="text-muted-foreground">
                  Arrange the exchange details and enjoy your new item
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-background p-6 rounded-lg shadow border">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-muted"></div>
                    <div>
                      <p className="font-medium">User {i + 1}</p>
                      <p className="text-sm text-muted-foreground">Location {i + 1}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "ShareStore has completely changed how I think about getting rid of things I no longer need. Instead of throwing them away, I can find someone who values them and get something I want in return."
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Trading?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto opacity-90">
              Join our community of traders and start exchanging items today.
            </p>
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link to="/post-item">
                List Your First Item
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
