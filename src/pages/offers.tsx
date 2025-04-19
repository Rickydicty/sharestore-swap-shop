
import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { getItemById, getUserById } from "@/lib/mockData";

export default function OffersPage() {
  const { offers, currentUser, updateOfferStatus } = useStore();
  
  // Get received and sent offers
  const receivedOffers = offers.filter(offer => 
    getItemById(offer.itemWantedId)?.userId === currentUser.id
  );
  
  const sentOffers = offers.filter(offer => 
    offer.userOfferingId === currentUser.id
  );
  
  // Handle offer actions
  const handleAcceptOffer = (offerId: string) => {
    updateOfferStatus(offerId, "accepted");
  };
  
  const handleRejectOffer = (offerId: string) => {
    updateOfferStatus(offerId, "rejected");
  };
  
  const handleCounterOffer = (offerId: string) => {
    updateOfferStatus(offerId, "counter");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Offers</h1>
          
          <Tabs defaultValue="received">
            <TabsList className="mb-6">
              <TabsTrigger value="received">
                Received Offers
                {receivedOffers.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {receivedOffers.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="sent">
                Sent Offers
                {sentOffers.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {sentOffers.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="received">
              {receivedOffers.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No offers received</h3>
                  <p className="text-muted-foreground">
                    When someone offers to trade for one of your items, it will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {receivedOffers.map(offer => {
                    const itemOffered = getItemById(offer.itemOfferedId);
                    const itemWanted = getItemById(offer.itemWantedId);
                    const userOffering = getUserById(offer.userOfferingId);
                    
                    if (!itemOffered || !itemWanted || !userOffering) return null;
                    
                    return (
                      <Card key={offer.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/2">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                  <img
                                    src={userOffering.avatar}
                                    alt={userOffering.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{userOffering.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(offer.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="bg-muted p-4 rounded-lg mb-4">
                                <p className="mb-2 font-medium">Message:</p>
                                <p className="text-muted-foreground">
                                  {offer.message || "No message provided"}
                                </p>
                              </div>
                              
                              <div className="flex justify-between gap-2">
                                <Button 
                                  variant="outline" 
                                  className="w-full"
                                  onClick={() => handleRejectOffer(offer.id)}
                                  disabled={offer.status !== "pending"}
                                >
                                  Reject
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="w-full"
                                  onClick={() => handleCounterOffer(offer.id)}
                                  disabled={offer.status !== "pending"}
                                >
                                  Counter
                                </Button>
                                <Button 
                                  className="w-full bg-primary text-white hover-glow"
                                  onClick={() => handleAcceptOffer(offer.id)}
                                  disabled={offer.status !== "pending"}
                                >
                                  Accept
                                </Button>
                              </div>
                            </div>
                            
                            <div className="md:w-1/2 flex flex-col sm:flex-row md:flex-col gap-4">
                              <div className="flex-1 border rounded-lg overflow-hidden">
                                <div className="aspect-video bg-muted p-2 flex items-center justify-center">
                                  <img
                                    src={itemOffered.images[0]}
                                    alt={itemOffered.title}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                                <div className="p-3">
                                  <div className="flex justify-between items-start gap-2">
                                    <h3 className="font-medium line-clamp-1">{itemOffered.title}</h3>
                                    <Badge variant="outline">{itemOffered.condition}</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                    {itemOffered.description}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-center text-muted-foreground">
                                for
                              </div>
                              
                              <div className="flex-1 border rounded-lg overflow-hidden">
                                <div className="aspect-video bg-muted p-2 flex items-center justify-center">
                                  <img
                                    src={itemWanted.images[0]}
                                    alt={itemWanted.title}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                                <div className="p-3">
                                  <div className="flex justify-between items-start gap-2">
                                    <h3 className="font-medium line-clamp-1">{itemWanted.title}</h3>
                                    <Badge variant="outline">{itemWanted.condition}</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                    {itemWanted.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {offer.status !== "pending" && (
                            <div className="mt-4 border-t pt-3">
                              <Badge variant={
                                offer.status === "accepted" ? "secondary" : 
                                offer.status === "rejected" ? "destructive" : 
                                "secondary"
                              }>
                                {offer.status === "accepted" ? "Accepted" : 
                                 offer.status === "rejected" ? "Rejected" : 
                                 "Counter Offered"}
                              </Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="sent">
              {sentOffers.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No offers sent</h3>
                  <p className="text-muted-foreground">
                    When you offer to trade for someone's item, it will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {sentOffers.map(offer => {
                    const itemOffered = getItemById(offer.itemOfferedId);
                    const itemWanted = getItemById(offer.itemWantedId);
                    const userReceiving = getUserById(offer.userReceivingId);
                    
                    if (!itemOffered || !itemWanted || !userReceiving) return null;
                    
                    return (
                      <Card key={offer.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/2">
                              <div className="flex items-center gap-3 mb-4">
                                <p className="font-medium">Offered to:</p>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full overflow-hidden">
                                    <img
                                      src={userReceiving.avatar}
                                      alt={userReceiving.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <span>{userReceiving.name}</span>
                                </div>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-4">
                                {new Date(offer.createdAt).toLocaleDateString()}
                              </p>
                              
                              {offer.message && (
                                <div className="bg-muted p-4 rounded-lg mb-4">
                                  <p className="mb-2 font-medium">Your message:</p>
                                  <p className="text-muted-foreground">{offer.message}</p>
                                </div>
                              )}
                              
                              <div className="mt-4">
                                <Badge variant={
                                  offer.status === "accepted" ? "secondary" : 
                                  offer.status === "rejected" ? "destructive" : 
                                  offer.status === "counter" ? "secondary" :
                                  "outline"
                                }>
                                  {offer.status === "accepted" ? "Accepted" : 
                                   offer.status === "rejected" ? "Rejected" : 
                                   offer.status === "counter" ? "Counter Offered" :
                                   "Pending"}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="md:w-1/2 flex flex-col sm:flex-row md:flex-col gap-4">
                              <div className="flex-1 border rounded-lg overflow-hidden">
                                <div className="aspect-video bg-muted p-2 flex items-center justify-center">
                                  <img
                                    src={itemOffered.images[0]}
                                    alt={itemOffered.title}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                                <div className="p-3">
                                  <div className="flex justify-between items-start gap-2">
                                    <h3 className="font-medium line-clamp-1">{itemOffered.title}</h3>
                                    <Badge variant="outline">{itemOffered.condition}</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                    {itemOffered.description}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-center text-muted-foreground">
                                for
                              </div>
                              
                              <div className="flex-1 border rounded-lg overflow-hidden">
                                <div className="aspect-video bg-muted p-2 flex items-center justify-center">
                                  <img
                                    src={itemWanted.images[0]}
                                    alt={itemWanted.title}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                                <div className="p-3">
                                  <div className="flex justify-between items-start gap-2">
                                    <h3 className="font-medium line-clamp-1">{itemWanted.title}</h3>
                                    <Badge variant="outline">{itemWanted.condition}</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                    {itemWanted.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
