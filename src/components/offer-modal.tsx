
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Item } from "@/lib/types";
import { useStore } from "@/lib/store";

interface OfferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemWanted: Item;
}

export function OfferModal({ open, onOpenChange, itemWanted }: OfferModalProps) {
  const { items, makeOffer, currentUser } = useStore();
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  
  // Filter items that belong to the current user and exclude the wanted item
  const myItems = items.filter(item => 
    item.userId === currentUser.id && item.id !== itemWanted.id
  );
  
  const handleSubmit = () => {
    if (!selectedItemId) return;
    
    makeOffer({
      itemOfferedId: selectedItemId,
      itemWantedId: itemWanted.id,
      userOfferingId: currentUser.id,
      userReceivingId: itemWanted.userId,
      message,
    });
    
    // Reset form and close modal
    setSelectedItemId("");
    setMessage("");
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] animate-enter">
        <DialogHeader>
          <DialogTitle>Make an Offer</DialogTitle>
          <DialogDescription>
            Offer one of your items in exchange for "{itemWanted.title}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="item" className="text-sm font-medium">
              Select an item to offer
            </label>
            <Select value={selectedItemId} onValueChange={setSelectedItemId}>
              <SelectTrigger id="item">
                <SelectValue placeholder="Select one of your items" />
              </SelectTrigger>
              <SelectContent>
                {myItems.length === 0 ? (
                  <SelectItem value="none" disabled>
                    You don't have any items to offer
                  </SelectItem>
                ) : (
                  myItems.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message (optional)
            </label>
            <Textarea
              id="message"
              placeholder="Add a personal message to your offer..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedItemId}
            className="bg-primary text-white hover-glow"
          >
            Send Offer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
