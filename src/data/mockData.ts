import { Flyer, Category, User, BusinessRegistry, Review } from '../types';

export const categories: Category[] = [
  {
    id: 'groceries',
    name: 'Groceries',
    icon: 'ShoppingCart',
    color: 'from-emerald-500 to-green-600',
    description: 'Fresh Indian groceries & spices'
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    icon: 'UtensilsCrossed',
    color: 'from-orange-500 to-red-500',
    description: 'Authentic Indian dining'
  },
  {
    id: 'events',
    name: 'Events',
    icon: 'Calendar',
    color: 'from-purple-500 to-pink-500',
    description: 'Cultural events & celebrations'
  },
  {
    id: 'markets',
    name: 'Markets',
    icon: 'Store',
    color: 'from-blue-500 to-indigo-500',
    description: 'Local Indian markets'
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'Trophy',
    color: 'from-teal-500 to-cyan-500',
    description: 'Cricket, kabaddi & sports leagues'
  }
];

export const sportsLeagues = [
  { id: 'cricket', name: 'Cricket Leagues', icon: '🏏' },
  { id: 'kabaddi', name: 'Kabaddi Tournaments', icon: '🤼' },
  { id: 'badminton', name: 'Badminton Clubs', icon: '🏸' },
  { id: 'football', name: 'Football Leagues', icon: '⚽' },
  { id: 'volleyball', name: 'Volleyball Teams', icon: '🏐' },
  { id: 'tennis', name: 'Tennis Courts', icon: '🎾' }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Raj Patel',
    email: 'raj@example.com',
    postsCount: 8,
    monthlyPostsCount: 3,
    lastPostMonth: '2024-01',
    location: { 
      lat: 41.8781, 
      lng: -87.6298, 
      city: 'Chicago', 
      state: 'IL',
      zipCode: '60601'
    },
    joinedDate: '2023-06-01',
    businessName: 'Patel Brothers Grocery'
  },
  {
    id: 'user2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    postsCount: 12,
    monthlyPostsCount: 5,
    lastPostMonth: '2024-01',
    location: { 
      lat: 40.7128, 
      lng: -74.0060, 
      city: 'New York', 
      state: 'NY',
      zipCode: '10001'
    },
    joinedDate: '2023-05-15',
    isPremium: true,
    premiumExpiryDate: '2024-12-31',
    businessName: 'Tandoor Palace'
  },
  {
    id: 'user3',
    name: 'Amit Kumar',
    email: 'amit@example.com',
    postsCount: 15,
    monthlyPostsCount: 2,
    lastPostMonth: '2024-01',
    location: { 
      lat: 34.0522, 
      lng: -118.2437, 
      city: 'Los Angeles', 
      state: 'CA',
      zipCode: '90001'
    },
    joinedDate: '2023-01-01',
    businessName: 'Mumbai Nights'
  },
  {
    id: 'admin',
    name: 'Admin User',
    email: 'admin@desifyar.com',
    postsCount: 0,
    monthlyPostsCount: 0,
    lastPostMonth: '2024-01',
    location: { 
      lat: 41.8781, 
      lng: -87.6298, 
      city: 'Chicago', 
      state: 'IL',
      zipCode: '60601'
    },
    joinedDate: '2023-10-01',
    isAdmin: true
  }
];

export const businessRegistry: BusinessRegistry[] = [
  {
    businessName: 'Patel Brothers Grocery',
    userId: 'user1',
    registeredDate: '2023-06-01',
    location: { city: 'Chicago', state: 'IL' }
  },
  {
    businessName: 'Tandoor Palace',
    userId: 'user2',
    registeredDate: '2023-05-15',
    location: { city: 'New York', state: 'NY' }
  },
  {
    businessName: 'Mumbai Nights',
    userId: 'user3',
    registeredDate: '2023-01-01',
    location: { city: 'Los Angeles', state: 'CA' }
  }
];

const generateMockReviews = (): Review[] => [
  {
    id: 'review1',
    userId: 'user2',
    userName: 'Priya Sharma',
    rating: 5,
    comment: 'Amazing quality rice! Fresh and authentic. Will definitely buy again.',
    date: '2024-01-10',
    helpful: 8
  },
  {
    id: 'review2',
    userId: 'user3',
    userName: 'Amit Kumar',
    rating: 4,
    comment: 'Good deal, though the store was a bit crowded. Staff was helpful.',
    date: '2024-01-12',
    helpful: 3
  },
  {
    id: 'review3',
    userId: 'user1',
    userName: 'Raj Patel',
    rating: 5,
    comment: 'Excellent service and great prices. Highly recommended!',
    date: '2024-01-14',
    helpful: 12
  }
];

const generateRestaurantReviews = (): Review[] => [
  {
    id: 'review4',
    userId: 'user1',
    userName: 'Raj Patel',
    rating: 5,
    comment: 'Authentic flavors and great ambiance. The free appetizer was delicious!',
    date: '2024-01-15',
    helpful: 15
  },
  {
    id: 'review5',
    userId: 'user3',
    userName: 'Amit Kumar',
    rating: 4,
    comment: 'Good food but service was a bit slow. Overall worth visiting.',
    date: '2024-01-16',
    helpful: 7
  }
];

export const mockFlyers: Flyer[] = [
  {
    id: '1',
    title: '50% Off Fresh Basmati Rice',
    description: 'Premium quality aged Basmati rice from Punjab. Limited time offer on 10kg bags.',
    category: 'groceries',
    businessName: 'Patel Brothers Grocery',
    imageUrl: 'https://images.pexels.com/photos/4110008/pexels-photo-4110008.jpeg?auto=compress&cs=tinysrgb&w=500',
    discount: '50% OFF',
    location: {
      address: '123 Devon Ave',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      lat: 41.8781,
      lng: -87.6298,
      distance: 0.8
    },
    views: 245,
    reactions: 32,
    postedDate: '2024-01-15',
    expiryDate: '2024-02-15',
    redemptionCode: 'BASMATI50',
    isActive: true,
    userId: 'user1',
    isTrending: true,
    reviews: generateMockReviews(),
    averageRating: 4.7
  },
  {
    id: '2',
    title: 'Grand Opening Special - Free Appetizer',
    description: 'Celebrate our grand opening with authentic North Indian cuisine. Free appetizer with any entrée.',
    category: 'restaurants',
    businessName: 'Tandoor Palace',
    imageUrl: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=500',
    discount: 'Free Appetizer',
    location: {
      address: '456 Oak Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      lat: 40.7128,
      lng: -74.0060,
      distance: 1.2
    },
    views: 412,
    reactions: 67,
    postedDate: '2024-01-14',
    expiryDate: '2024-02-14',
    redemptionCode: 'GRAND2024',
    isActive: true,
    userId: 'user2',
    isTrending: true,
    isPremium: true,
    reviews: generateRestaurantReviews(),
    averageRating: 4.5
  },
  {
    id: '3',
    title: 'Holi Celebration 2024',
    description: 'Join us for the biggest Holi celebration in the city! Colors, music, and traditional sweets.',
    category: 'events',
    businessName: 'Indian Cultural Center',
    imageUrl: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=500',
    discount: 'Free Entry',
    location: {
      address: '789 Cultural Way',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60602',
      lat: 41.8781,
      lng: -87.6298,
      distance: 2.1
    },
    views: 1028,
    reactions: 156,
    postedDate: '2024-01-12',
    expiryDate: '2024-03-15',
    redemptionCode: 'HOLI2024',
    isActive: true,
    userId: 'user1',
    isTrending: true,
    reviews: [],
    averageRating: 0
  },
  {
    id: '4',
    title: 'Weekend Vegetable Market',
    description: 'Fresh Indian vegetables and herbs every weekend. Best prices in the area!',
    category: 'markets',
    businessName: 'Little India Market',
    imageUrl: 'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=500',
    discount: '20% OFF',
    location: {
      address: '321 Market Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      lat: 34.0522,
      lng: -118.2437,
      distance: 1.5
    },
    views: 189,
    reactions: 28,
    postedDate: '2024-01-13',
    expiryDate: '2024-02-28',
    redemptionCode: 'VEGGIES20',
    isActive: true,
    userId: 'user3',
    reviews: [
      {
        id: 'review6',
        userId: 'user1',
        userName: 'Raj Patel',
        rating: 4,
        comment: 'Fresh vegetables at great prices. Will visit again next weekend.',
        date: '2024-01-14',
        helpful: 5
      }
    ],
    averageRating: 4.0
  },
  {
    id: '5',
    title: 'Premium Saffron - Special Price',
    description: 'Authentic Kashmiri saffron at unbeatable prices. Perfect for your special dishes.',
    category: 'groceries',
    businessName: 'Spice Bazaar',
    imageUrl: 'https://images.pexels.com/photos/4198889/pexels-photo-4198889.jpeg?auto=compress&cs=tinysrgb&w=500',
    discount: '30% OFF',
    location: {
      address: '567 Spice Lane',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60603',
      lat: 41.8781,
      lng: -87.6298,
      distance: 0.6
    },
    views: 324,
    reactions: 45,
    postedDate: '2024-01-11',
    expiryDate: '2024-02-11',
    redemptionCode: 'SAFFRON30',
    isActive: true,
    userId: 'user1',
    reviews: [],
    averageRating: 0
  },
  {
    id: '6',
    title: 'Bollywood Night Every Friday',
    description: 'Dance to the latest Bollywood hits with live DJ. Special dinner menu available.',
    category: 'restaurants',
    businessName: 'Mumbai Nights',
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=500',
    discount: '25% OFF Dinner',
    location: {
      address: '890 Entertainment Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90002',
      lat: 34.0522,
      lng: -118.2437,
      distance: 1.8
    },
    views: 567,
    reactions: 89,
    postedDate: '2024-01-10',
    expiryDate: '2024-03-10',
    redemptionCode: 'BOLLY25',
    isActive: true,
    userId: 'user3',
    reviews: [
      {
        id: 'review7',
        userId: 'user2',
        userName: 'Priya Sharma',
        rating: 5,
        comment: 'Amazing atmosphere and great music! Food was delicious too.',
        date: '2024-01-13',
        helpful: 9
      }
    ],
    averageRating: 5.0
  },
  {
    id: '7',
    title: 'Cricket League Registration Open',
    description: 'Join the Chicago Desi Cricket League! All skill levels welcome. Equipment provided.',
    category: 'sports',
    businessName: 'Desi Cricket Academy',
    imageUrl: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=500',
    discount: '50% OFF Registration',
    location: {
      address: '234 Sports Complex',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60604',
      lat: 41.8781,
      lng: -87.6298,
      distance: 1.3
    },
    views: 156,
    reactions: 23,
    postedDate: '2024-01-16',
    expiryDate: '2024-02-16',
    redemptionCode: 'CRICKET50',
    isActive: true,
    userId: 'user1',
    reviews: [],
    averageRating: 0
  },
  {
    id: '8',
    title: 'Kabaddi Tournament - Team Registration',
    description: 'Annual Kabaddi championship with cash prizes. Form your team and compete!',
    category: 'sports',
    businessName: 'Sports Junction',
    imageUrl: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=500',
    discount: 'Free Entry',
    location: {
      address: '567 Equipment St',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      lat: 40.7128,
      lng: -74.0060,
      distance: 2.0
    },
    views: 89,
    reactions: 12,
    postedDate: '2024-01-17',
    expiryDate: '2024-02-17',
    redemptionCode: 'KABADDI2024',
    isActive: true,
    userId: 'user2',
    reviews: [],
    averageRating: 0
  }
];