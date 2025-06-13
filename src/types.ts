export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Flyer {
  id: string;
  title: string;
  description: string;
  category: 'groceries' | 'restaurants' | 'events' | 'markets' | 'sports';
  businessName: string;
  imageUrl: string;
  discount: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    lat: number;
    lng: number;
    distance?: number;
  };
  views: number;
  reactions: number;
  postedDate: string;
  expiryDate: string;
  redemptionCode: string;
  isActive: boolean;
  userId: string;
  isTrending?: boolean;
  isPremium?: boolean;
  reviews: Review[];
  averageRating: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  postsCount: number;
  monthlyPostsCount: number;
  lastPostMonth: string;
  location: {
    lat: number;
    lng: number;
    city: string;
    state: string;
    zipCode: string;
  };
  joinedDate: string;
  isAdmin?: boolean;
  isPremium?: boolean;
  premiumExpiryDate?: string;
  businessName?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface AdminStats {
  totalUsers: number;
  totalFlyers: number;
  activeFlyers: number;
  monthlyPosts: number;
  topCategories: { category: string; count: number }[];
  premiumUsers: number;
  totalRevenue: number;
}

export interface BusinessRegistry {
  businessName: string;
  userId: string;
  registeredDate: string;
  location: {
    city: string;
    state: string;
  };
}

export interface GeolocationState {
  userLocation: {
    lat: number;
    lng: number;
  } | null;
  isLoading: boolean;
  error: string | null;
}