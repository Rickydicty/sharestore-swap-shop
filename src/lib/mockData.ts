
import { Item, Offer, User, Notification } from "./types";

// Mock users
export const users: User[] = [
  {
    id: "u1",
    name: "Abdul Rauf",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    email: "abdul@example.com",
  },
  {
    id: "u2",
    name: "Mehmood Shar",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    email: "mehmood@example.com",
  },
  {
    id: "u3",
    name: "Samira Ahmed",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    email: "samira@example.com",
  },
];

// Categories
export const categories = [
  "Electronics",
  "Furniture",
  "Clothing",
  "Books",
  "Sports",
  "Home & Garden",
  "Toys & Games",
  "Automotive",
  "Collectibles",
  "Other",
];

// Mock items
export const items: Item[] = [
  {
    id: "i1",
    title: "MacBook Pro 2022",
    description: "Barely used MacBook Pro 2022 model with M2 chip, 16GB RAM, and 512GB SSD. Comes with original packaging and charger.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1626&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
    category: "Electronics",
    condition: "Like New",
    location: "Karachi, Pakistan",
    userId: "u1",
    createdAt: "2023-09-15T10:30:00Z",
    lookingFor: "High-end gaming PC or professional camera equipment",
  },
  {
    id: "i2",
    title: "Sony A7III Camera",
    description: "Professional mirrorless camera with 24MP full-frame sensor. Includes 28-70mm kit lens, 2 batteries, and camera bag.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1164&q=80",
    ],
    category: "Electronics",
    condition: "Good",
    location: "Lahore, Pakistan",
    userId: "u2",
    createdAt: "2023-09-12T14:20:00Z",
    lookingFor: "MacBook Pro or gaming laptop",
  },
  {
    id: "i3",
    title: "Vintage Leather Couch",
    description: "Beautiful vintage leather couch in excellent condition. Brown color, comfortable and adds character to any living room.",
    images: [
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
    category: "Furniture",
    condition: "Good",
    location: "Islamabad, Pakistan",
    userId: "u3",
    createdAt: "2023-09-10T09:15:00Z",
    lookingFor: "Dining table set or outdoor furniture",
  },
  {
    id: "i4",
    title: "Mountain Bike - Trek X-Caliber 8",
    description: "Trek X-Caliber 8 mountain bike, size medium. Excellent condition with recent tune-up. Perfect for trails and everyday riding.",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
    category: "Sports",
    condition: "Good",
    location: "Karachi, Pakistan",
    userId: "u1",
    createdAt: "2023-09-05T16:45:00Z",
    lookingFor: "Road bike or high-end smartphone",
  },
  {
    id: "i5",
    title: "iPhone 13 Pro",
    description: "Apple iPhone 13 Pro, 256GB, Sierra Blue. Excellent condition, battery health at 92%. Comes with original box and accessories.",
    images: [
      "https://images.unsplash.com/photo-1632661674596-618e322e0d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
    category: "Electronics",
    condition: "Like New",
    location: "Lahore, Pakistan",
    userId: "u2",
    createdAt: "2023-09-03T11:30:00Z",
    lookingFor: "MacBook Air or iPad Pro with accessories",
  },
  {
    id: "i6",
    title: "Modern Coffee Table",
    description: "Sleek, modern coffee table with glass top and metal frame. Minimalist design that fits any living room.",
    images: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    ],
    category: "Furniture",
    condition: "Like New",
    location: "Islamabad, Pakistan",
    userId: "u3",
    createdAt: "2023-09-01T13:20:00Z",
    lookingFor: "Bookshelf or small desk",
  },
  {
    id: "i7",
    title: "Collection of Classic Novels",
    description: "Collection of 20 classic novels including works by Dickens, Austen, Tolstoy, and more. All hardcover and in excellent condition.",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    ],
    category: "Books",
    condition: "Good",
    location: "Karachi, Pakistan",
    userId: "u1",
    createdAt: "2023-08-28T15:10:00Z",
    lookingFor: "Modern fiction collection or art books",
  },
  {
    id: "i8",
    title: "PlayStation 5",
    description: "Sony PlayStation 5 disc edition, like new. Includes 2 controllers, charging dock, and 3 games (Spider-Man, God of War, Horizon).",
    images: [
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1627&q=80",
    ],
    category: "Electronics",
    condition: "Like New",
    location: "Lahore, Pakistan",
    userId: "u2",
    createdAt: "2023-08-25T10:45:00Z",
    lookingFor: "Gaming PC or high-end laptop",
  },
];

// Mock offers
export const offers: Offer[] = [
  {
    id: "o1",
    itemOfferedId: "i2",
    itemWantedId: "i1",
    userOfferingId: "u2",
    userReceivingId: "u1",
    status: "pending",
    message: "I'd love to trade my Sony camera for your MacBook. Let me know if you're interested!",
    createdAt: "2023-09-16T09:30:00Z",
  },
  {
    id: "o2",
    itemOfferedId: "i8",
    itemWantedId: "i5",
    userOfferingId: "u2",
    userReceivingId: "u2",
    status: "accepted",
    message: "Would you consider trading your iPhone for my PS5? I can include an extra controller.",
    createdAt: "2023-09-14T16:20:00Z",
  },
  {
    id: "o3",
    itemOfferedId: "i4",
    itemWantedId: "i3",
    userOfferingId: "u1",
    userReceivingId: "u3",
    status: "rejected",
    message: "I'm interested in your leather couch. Would you trade for my mountain bike?",
    createdAt: "2023-09-12T11:15:00Z",
  },
  {
    id: "o4",
    itemOfferedId: "i7",
    itemWantedId: "i6",
    userOfferingId: "u1",
    userReceivingId: "u3",
    status: "counter",
    message: "Would you trade your coffee table for my book collection?",
    createdAt: "2023-09-10T14:40:00Z",
  },
];

// Mock notifications
export const notifications: Notification[] = [
  {
    id: "n1",
    userId: "u1",
    message: "Mehmood Shar offered to trade their Sony A7III Camera for your MacBook Pro 2022",
    read: false,
    createdAt: "2023-09-16T09:30:00Z",
    type: "offer",
    relatedId: "o1",
  },
  {
    id: "n2",
    userId: "u2",
    message: "Your offer for the iPhone 13 Pro has been accepted!",
    read: true,
    createdAt: "2023-09-14T16:25:00Z",
    type: "offer",
    relatedId: "o2",
  },
  {
    id: "n3",
    userId: "u3",
    message: "Abdul Rauf offered to trade their Mountain Bike for your Vintage Leather Couch",
    read: false,
    createdAt: "2023-09-12T11:15:00Z",
    type: "offer",
    relatedId: "o3",
  },
  {
    id: "n4",
    userId: "u1",
    message: "Welcome to ShareStore! Start by listing an item you'd like to exchange.",
    read: true,
    createdAt: "2023-09-01T10:00:00Z",
    type: "system",
  },
];

// Helper function to get user by ID
export const getUserById = (id: string) => {
  return users.find(user => user.id === id);
};

// Helper function to get item by ID
export const getItemById = (id: string) => {
  return items.find(item => item.id === id);
};

// Helper function to get offers for a user
export const getOffersForUser = (userId: string) => {
  return offers.filter(offer => 
    offer.userOfferingId === userId || offer.userReceivingId === userId
  );
};

// Helper function to get notifications for a user
export const getNotificationsForUser = (userId: string) => {
  return notifications.filter(notification => notification.userId === userId);
};

// Helper function to get items by category
export const getItemsByCategory = (category: string) => {
  if (category === "All") {
    return items;
  }
  return items.filter(item => item.category === category);
};

// Helper function to get items by search term
export const getItemsBySearchTerm = (searchTerm: string) => {
  if (!searchTerm) {
    return items;
  }
  const term = searchTerm.toLowerCase();
  return items.filter(item => 
    item.title.toLowerCase().includes(term) || 
    item.description.toLowerCase().includes(term) || 
    item.category.toLowerCase().includes(term) || 
    item.location.toLowerCase().includes(term)
  );
};
