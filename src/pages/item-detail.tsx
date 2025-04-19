
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  MapPin, 
  Tag, 
  Shield, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  User
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OfferModal } from "@/components/offer-modal";
import { useStore } from "@/lib/store";
import { Item } from "@/lib/types";
import { getItemById, getUserById } from "@/lib/mockData";

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useStore();
  
  const [item, setItem] = useState<Item | null>(null);
  const [seller, setSeller] = useState<{ name: string; avatar: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  
  // Fetch item details
  useEffect(() => {
    if (!id) return;
    
    const fetchedItem = getItemById(id);
    if (!fetchedItem) {
      navigate("/404");
      return;
    }
    
    setItem(fetchedItem);
    
    const user = getUserById(fetchedItem.userId);
    if (user) {
      setSeller({
        name: user.name,
        avatar: user.avatar,
      });
    }
  }, [id, navigate]);
  
  if (!item) {
    return <div className="container mx-auto py-20 text-center">Loading...</div>;
  }
  
  const isCurrentUserItem = item.userId === currentUser.id;
  
  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto">
          <div className="mb-6">
            <Link to="/marketplace" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border">
                <img
                  src={item.images[currentImage]}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                
                {item.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/80"
                      onClick={handlePrevImage}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/80"
                      onClick={handleNextImage}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
              </div>
              
              {item.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {item.images.map((img, i) => (
                    <button
                      key={i}
                      className={`relative w-20 aspect-square rounded-md overflow-hidden border ${
                        currentImage === i ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setCurrentImage(i)}
                    >
                      <img
                        src={img}
                        alt={`${item.title} - thumbnail ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between">
                  <h1 className="text-3xl font-bold">{item.title}</h1>
                  <Badge>{item.condition}</Badge>
                </div>
                
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{item.location}</span>
                  
                  <Separator orientation="vertical" className="h-4" />
                  
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {item.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Category</h3>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{item.category}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Looking for</h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p>{item.lookingFor}</p>
                </div>
              </div>
              
              {seller && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Listed by</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={seller.avatar}
                        alt={seller.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{seller.name}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {isCurrentUserItem ? (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-5 w-5 text-primary" />
                    <p className="font-medium">This is your item</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You can manage your listings from your dashboard.
                  </p>
                </div>
              ) : (
                <Button 
                  className="w-full bg-primary text-white hover-glow"
                  onClick={() => setIsModalOpen(true)}
                >
                  Make an Offer
                </Button>
              )}
              
              <div className="bg-muted/30 p-4 rounded-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  ShareStore recommends meeting in public places for exchanges. Never share personal financial information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Offer Modal */}
      {item && !isCurrentUserItem && (
        <OfferModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          itemWanted={item}
        />
      )}
    </div>
  );
}
