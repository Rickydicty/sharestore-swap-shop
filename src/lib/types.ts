
// Define types for our application
export interface Item {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  condition: "New" | "Like New" | "Good" | "Fair" | "Poor";
  location: string;
  userId: string;
  createdAt: string;
  lookingFor: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Offer {
  id: string;
  itemOfferedId: string;
  itemWantedId: string;
  userOfferingId: string;
  userReceivingId: string;
  status: "pending" | "accepted" | "rejected" | "counter";
  message: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: "offer" | "message" | "system";
  relatedId?: string;
}
