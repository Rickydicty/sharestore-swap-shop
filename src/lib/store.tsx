
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Item, Offer, User, Notification } from './types';
import { 
  items as initialItems, 
  offers as initialOffers, 
  notifications as initialNotifications,
  users as initialUsers
} from './mockData';

type StoreContextType = {
  // Current user (for demo purposes)
  currentUser: User;
  
  // Data
  items: Item[];
  offers: Offer[];
  notifications: Notification[];
  users: User[];
  
  // Actions
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'userId'>) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  removeItem: (id: string) => void;
  
  makeOffer: (offer: Omit<Offer, 'id' | 'createdAt' | 'status'>) => void;
  updateOfferStatus: (id: string, status: Offer['status']) => void;
  
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
};

// For demo purposes, we'll set the current user to the first user
const currentUser = initialUsers[0];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState(initialItems);
  const [offers, setOffers] = useState(initialOffers);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [users] = useState(initialUsers);

  // Actions
  const addItem = (item: Omit<Item, 'id' | 'createdAt' | 'userId'>) => {
    const newItem: Item = {
      ...item,
      id: `i${items.length + 1}`,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(items.map((item) => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const makeOffer = (offer: Omit<Offer, 'id' | 'createdAt' | 'status'>) => {
    const newOffer: Offer = {
      ...offer,
      id: `o${offers.length + 1}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    
    // Create a notification for the receiving user
    const newNotification: Notification = {
      id: `n${notifications.length + 1}`,
      userId: offer.userReceivingId,
      message: `${users.find(u => u.id === offer.userOfferingId)?.name} offered to trade for your item`,
      read: false,
      createdAt: new Date().toISOString(),
      type: 'offer',
      relatedId: newOffer.id,
    };
    
    setOffers([...offers, newOffer]);
    setNotifications([...notifications, newNotification]);
  };

  const updateOfferStatus = (id: string, status: Offer['status']) => {
    const updatedOffers = offers.map((offer) => 
      offer.id === id ? { ...offer, status } : offer
    );
    
    // Create a notification for the user who made the offer
    const offer = offers.find(o => o.id === id);
    if (!offer) {
      setOffers(updatedOffers);
      return;
    }
    
    const message = status === 'accepted' 
      ? `Your offer has been accepted!` 
      : status === 'rejected' 
      ? `Your offer has been rejected.` 
      : `You received a counter offer.`;
    
    const newNotification: Notification = {
      id: `n${notifications.length + 1}`,
      userId: offer.userOfferingId,
      message,
      read: false,
      createdAt: new Date().toISOString(),
      type: 'offer',
      relatedId: id,
    };
    
    setOffers(updatedOffers);
    setNotifications([...notifications, newNotification]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(notifications.map((notification) => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map((notification) => 
      notification.userId === currentUser.id 
        ? { ...notification, read: true } 
        : notification
    ));
  };

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        items,
        offers,
        notifications,
        users,
        addItem,
        updateItem,
        removeItem,
        makeOffer,
        updateOfferStatus,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
