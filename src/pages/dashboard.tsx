
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DashboardSidebar, MobileDashboardNav } from "@/components/dashboard-sidebar";
import { useStore } from "@/lib/store";
import { ItemCard } from "@/components/item-card";

export default function DashboardPage() {
  const { items, currentUser } = useStore();
  
  // Get user's listings
  const userItems = items.filter(item => item.userId === currentUser.id);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex">
        <DashboardSidebar />
        
        <div className="flex-1 p-6">
          <MobileDashboardNav />
          
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            
            <div className="grid gap-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">My Listings</h2>
                {userItems.length === 0 ? (
                  <div className="bg-muted p-6 rounded-lg text-center">
                    <p className="mb-4">You haven't listed any items yet.</p>
                    <p className="text-sm text-muted-foreground">
                      Start listing items to exchange them with others.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {userItems.map(item => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
