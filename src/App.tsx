import{auth} from './firebase-config';
import{
    onAuthStateChanged,         createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut,
    User as FirebaseUser,
} from 'firebase/auth';
import React, {useState, useEffect } from 'react';
import{Plus, Map} from 'lucide-react';
import Header from './components/Header';
import CategoryGrid from './components/CategoryGrid';
import FlyerList from './components/FlyerList';
import FlyerDetail from './components/FlyerDetail';
import PostFlyerModal from './components/PostFlyerModal';
import TrendingFlyers from './components/TrendingFlyers';
import NearbyFlyers from './components/NearbyFlyers';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import GeolocationPrompt from './components/GeolocationPrompt';
import PremiumSubscriptionModal from './components/PremiumSubscriptionModal';
import SportsLeaguesModal from './components/SportsLeaguesModal';
import MapView from './components/MapView';
import{categories, mockFlyers, mockUsers,
       businessRegistry} from './data/mockData';
import{Flyer, Category, User, BusinessRegistry, GeolocationState,
       Review} from './types';
import{getCurrentLocation, sortFlyersByDistance} from './utils/geolocation';
import{checkPremiumRequired,
       checkBusinessNameAvailable} from './utils/subscription';

type View = 'home' | 'category' | 'detail' | 'profile' | 'admin';

function App() {
  const[currentView, setCurrentView] = useState<View>('home');
  const[selectedCategory, setSelectedCategory] =
      useState<Category | null>(null);
  const[selectedFlyer, setSelectedFlyer] = useState<Flyer | null>(null);
  const[flyers, setFlyers] = useState<Flyer[]>(mockFlyers);
  const[users, setUsers] = useState<User[]>(mockUsers);
  const[businessNames, setBusinessNames] =
      useState<BusinessRegistry[]>(businessRegistry);
  const[currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const[isPostModalOpen, setIsPostModalOpen] = useState(false);
  const[isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const[isSportsModalOpen, setIsSportsModalOpen] = useState(false);
  const[isMapViewOpen, setIsMapViewOpen] = useState(false);
  const[premiumModalReason, setPremiumModalReason] =
      useState<'expired' | 'required' | 'upgrade'>('required');
  const[showGeolocationPrompt, setShowGeolocationPrompt] = useState(true);
  const[currentLocation, setCurrentLocation] = useState('Chicago, IL');
  const[geolocation, setGeolocation] = useState<GeolocationState>({
    userLocation : null,
    isLoading : false,
    error : null,
  });

  // Initialize geolocation on app start
  useEffect(() =>
                 {
                   const initializeLocation = async() => {
                     try {
                       const location = await getCurrentLocation();
                       setGeolocation({
                         userLocation : location,
                         isLoading : false,
                         error : null,
                       });
                       setShowGeolocationPrompt(false);
                       setCurrentLocation(`${location.lat.toFixed(2)},
                                          $ { location.lng.toFixed(2) }`);
                     } catch (error) {
                       setGeolocation({
                         userLocation : null,
                         isLoading : false,
                         error : 'Location access denied',
                       });
                     }
                   };

                   if (!localStorage.getItem('geolocation-prompted')) {
                     initializeLocation();
                   } else {
                     setShowGeolocationPrompt(false);
                   }
                 },
            []);

  // Sort flyers by distance when user location is available
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const sortedFlyers =
      geolocation.userLocation
          ? sortFlyersByDistance(flyers, geolocation.userLocation.lat,
                                 geolocation.userLocation.lng)
          : flyers;

  const nearbyFlyers =
      geolocation.userLocation
          ? sortedFlyers.filter(flyer => (flyer.location.distance || 0) <= 10)
          : [];

  // Simulate view tracking
  useEffect(
      () =>
           {
             if (selectedFlyer) {
               setFlyers(
                   prev =
                       > prev.map(flyer => flyer.id ==
                                  = selectedFlyer.id
                                        ? {... flyer, views : flyer.views + 1}
                                        : flyer));
             }
           },
      [selectedFlyer]);
  useEffect(() =>
                 {
                   const unsubscribe = onAuthStateChanged(
                       auth, (user) => {
                         setFirebaseUser(user);
                         if (user) {
                           // Optionally map user to currentUser in your system
                           const matchedUser =
                               mockUsers.find(u => u.email == = user.email);
                           if (matchedUser) {
                             setCurrentUser(matchedUser);
                           }
                         }
                       });

                   return () => unsubscribe();
                 },
            []);
  const handleSignup = async() => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signed up successfully");
    } catch (err : any) {
      alert(err.message);
    }
  };

  const handleLogin = async() => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in");
    } catch (err : any) {
      alert(err.message);
    }
  };

  const handleLogout = async() => {
    await signOut(auth);
    alert("Logged out");
  };

  const handleLocationGranted = (location
                                 : {
                                   lat:
                                     number;
                                   lng:
                                     number
                                 }) => {
    setGeolocation({
      userLocation : location,
      isLoading : false,
      error : null,
    });
    setShowGeolocationPrompt(false);
    localStorage.setItem('geolocation-prompted', 'true');
    setCurrentLocation(`${location.lat.toFixed(2)},
                       $ { location.lng.toFixed(2) }`);
  };

  const handleLocationDenied = () => {
    setShowGeolocationPrompt(false);
    localStorage.setItem('geolocation-prompted', 'true');
  };

  const handleCategorySelect = (categoryId : string) => {
    const category = categories.find(c => c.id == = categoryId);
    if (category) {
      if (category.id == = 'sports') {
        setIsSportsModalOpen(true);
        return;
      }
      setSelectedCategory(category);
      setCurrentView('category');
    }
  };

  const handleSportsLeagueSelect = (leagueId : string) => {
    const sportsCategory = categories.find(c => c.id == = 'sports');
    if (sportsCategory) {
      setSelectedCategory(sportsCategory);
      setCurrentView('category');
    }
  };

  const handleFlyerClick = (flyer : Flyer) => {
    setSelectedFlyer(flyer);
    setCurrentView('detail');
  };

  const handleReact = (flyerId : string) => {
    setFlyers(
        prev =
            > prev.map(flyer => flyer.id ==
                       = flyerId ? {... flyer, reactions : flyer.reactions + 1}
                                 : flyer));
  };

  const handleSubmitReview = (flyerId
                              : string, reviewData
                              : Omit<Review, 'id' | 'date' | 'helpful'>) => {
    const newReview : Review = {
      ... reviewData,
      id : `review_${Date.now()}`,
      date : new Date().toISOString().split('T')[0],
      helpful : 0,
    };

    setFlyers(prev => prev.map(flyer => {
      if (flyer.id == = flyerId) {
        const updatedReviews = [... flyer.reviews, newReview ];
        const averageRating =
            updatedReviews.reduce((sum, review) => sum + review.rating, 0) /
            updatedReviews.length;
        return {
          ... flyer,
          reviews : updatedReviews,
          averageRating : Math.round(averageRating * 10) / 10,
        };
      }
      return flyer;
    }));

    // Update selected flyer if it's the one being reviewed
    if (selectedFlyer?.id === flyerId) {
      setSelectedFlyer(prev => {
        if (!prev) return null;
        const updatedReviews = [... prev.reviews, newReview ];
        const averageRating =
            updatedReviews.reduce((sum, review) => sum + review.rating, 0) /
            updatedReviews.length;
        return {
          ... prev,
          reviews : updatedReviews,
          averageRating : Math.round(averageRating * 10) / 10,
        };
      });
    }
  };

  const handleHelpfulClick = (flyerId : string, reviewId : string) => {
    setFlyers(prev => prev.map(flyer => {
      if (flyer.id == = flyerId) {
        return {
          ... flyer,
          reviews : flyer.reviews.map(
              review => review.id ==
              = reviewId ? {... review, helpful : review.helpful + 1} : review),
        };
      }
      return flyer;
    }));

    // Update selected flyer if it's the one being reviewed
    if (selectedFlyer?.id === flyerId) {
      setSelectedFlyer(prev => {
        if (!prev) return null;
        return {
          ... prev,
          reviews : prev.reviews.map(
              review => review.id ==
              = reviewId ? {... review, helpful : review.helpful + 1} : review),
        };
      });
    }
  };

  const handlePostFlyer = (flyerData : any) => {
    const premiumRequired = checkPremiumRequired(currentUser);
    if (premiumRequired) {
      setPremiumModalReason('required');
      setIsPremiumModalOpen(true);
      return;
    }

    if (!checkBusinessNameAvailable(flyerData.businessName, businessNames,
                                    currentUser.id)) {
      alert(
          'This business name is already registered by another user. Please choose a different name.');
      return;
    }

    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthlyCount = currentUser.lastPostMonth ==
        = currentMonth ? currentUser.monthlyPostsCount : 0;

    const newFlyer : Flyer = {
      id : Date.now().toString(),
      title : flyerData.title,
      description : flyerData.description,
      category : flyerData.category as any,
      businessName : flyerData.businessName,
      imageUrl : flyerData.imageUrl ||
          'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
      discount : flyerData.discount,
      location : {
        address : flyerData.address,
        city : flyerData.city,
        state : flyerData.state || 'IL',
        zipCode : flyerData.zipCode || '60601',
        lat : 41.8781 + (Math.random() - 0.5) * 0.1,
        lng : -87.6298 + (Math.random() - 0.5) * 0.1,
        distance : Math.round(Math.random() * 5 * 10) / 10
      },
      views : 0,
      reactions : 0,
      postedDate : new Date().toISOString().split('T')[0],
      expiryDate : flyerData.expiryDate,
      redemptionCode : `CODE${
          Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      isActive : true,
      userId : currentUser.id,
      isPremium : currentUser.isPremium,
      reviews : [],
      averageRating : 0
    };

    setFlyers(prev => [ newFlyer, ... prev ]);

    if (!businessNames.find(b => b.businessName == = flyerData.businessName)) {
      const newBusiness : BusinessRegistry = {
        businessName : flyerData.businessName,
        userId : currentUser.id,
        registeredDate : new Date().toISOString().split('T')[0],
        location : {city : flyerData.city, state : flyerData.state || 'IL'}
      };
      setBusinessNames(prev => [... prev, newBusiness ]);
    }

    setCurrentUser(prev => ({
                            ... prev,
                            postsCount : prev.postsCount + 1,
                            monthlyPostsCount : monthlyCount + 1,
                            lastPostMonth : currentMonth,
                            businessName : flyerData.businessName
                          }));

    setUsers(prev => prev.map(user => user.id == = currentUser.id ? {
      ... user,
      postsCount : user.postsCount + 1,
      monthlyPostsCount : monthlyCount + 1,
      lastPostMonth : currentMonth,
      businessName : flyerData.businessName
    }
                                                                    : user));
  };

  const handlePremiumSubscribe = (plan : 'monthly' | 'yearly') => {
    const expiryDate = new Date();
    if (plan == = 'monthly') {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }

    setCurrentUser(
        prev => ({
                 ... prev,
                 isPremium : true,
                 premiumExpiryDate : expiryDate.toISOString().split('T')[0]
               }));

    setUsers(prev => prev.map(user => user.id == = currentUser.id ? {
      ... user,
      isPremium : true,
      premiumExpiryDate : expiryDate.toISOString().split('T')[0]
    }
                                                                    : user));

    setIsPremiumModalOpen(false);
    alert(`Premium subscription activated !You can now post unlimited flyers.`);
  };

  const handleProfileClick = () => {
    if (currentUser.isAdmin) {
      setCurrentView('admin');
    } else {
      setCurrentView('profile');
    }
  };

  const filteredFlyers = selectedCategory
                             ? sortedFlyers.filter(flyer => flyer.category ==
                                                   = selectedCategory.id)
                             : sortedFlyers;

  const userFlyers = flyers.filter(flyer => flyer.userId == = currentUser.id);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyPostsCount = currentUser.lastPostMonth ==
      = currentMonth ? currentUser.monthlyPostsCount : 0;

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Header 
        currentLocation={currentLocation}
        onLocationClick={() => setShowGeolocationPrompt(true)}
        onProfileClick={handleProfileClick}
      />
      
      {currentView === 'home' && (
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-6 px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-poppins">
              Discover Amazing Deals in Your 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500"> Desi Community</span>
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Find exclusive offers, cultural events, and authentic products from Indian businesses near you
            </p>
          </div>
          
          <CategoryGrid 
            categories={categories}
            onCategorySelect={handleCategorySelect}
          />

          {/* Map View Button */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <div className="flex justify-center">
              <button
                onClick={() => setIsMapViewOpen(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium shadow-lg"
              >
                <Map className="h-5 w-5" />
                <span>View on Map</span>
              </button>
            </div>
          </div>

          <NearbyFlyers
            flyers={nearbyFlyers}
            userLocation={geolocation.userLocation}
            onFlyerClick={handleFlyerClick}
            onReact={handleReact}
          />
          
          <TrendingFlyers 
            flyers={sortedFlyers}
            onFlyerClick={handleFlyerClick}
            onReact={handleReact}
          />
          
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">
              Want to promote your business? Share your offers with the community!
            </p>
            <button 
              onClick={() => setIsPostModalOpen(true)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>Post Your Flyer</span>
            </button>
          </div>
        </div>
      )}
      
      {
    currentView ==
        = 'category' && selectedCategory &&
          (<FlyerList category = {selectedCategory} flyers =
                {filteredFlyers} onBack = {() => setCurrentView(
                                                      'home')} onFlyerClick = {
                    handleFlyerClick} onReact = {handleReact} />)}
      
      {
    currentView == = 'detail' && selectedFlyer &&
                     (<FlyerDetail flyer = {selectedFlyer} onBack =
                           {() => setCurrentView('category')} onReact =
                               {handleReact} onSubmitReview =
                                   {handleSubmitReview} onHelpfulClick =
                                       {handleHelpfulClick} />)}

      {
    currentView ==
        = 'profile' &&
          (<UserProfile user = {currentUser} userFlyers = {userFlyers} onBack =
                {() => setCurrentView(
                            'home')} onFlyerClick = {handleFlyerClick} />)}

      {currentView === 'admin' && currentUser.isAdmin && (
        <AdminDashboard
          users={users}
          flyers={flyers}
          onBack={() => setCurrentView('home')}
          onFlyerClick={handleFlyerClick}
        />
      )}
      
      <PostFlyerModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        categories={categories}
        userPostsCount={currentUser.postsCount}
        monthlyPostsCount={monthlyPostsCount}
        onSubmit={handlePostFlyer}
        businessNames={businessNames}
        currentUser={currentUser}
      />

      <PremiumSubscriptionModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        onSubscribe={handlePremiumSubscribe}
        reason={premiumModalReason}
      />

      <SportsLeaguesModal
        isOpen={isSportsModalOpen}
        onClose={() => setIsSportsModalOpen(false)}
        onLeagueSelect={handleSportsLeagueSelect}
      />

      <MapView
        isOpen={isMapViewOpen}
        onClose={() => setIsMapViewOpen(false)}
        flyers={nearbyFlyers.length > 0 ? nearbyFlyers : sortedFlyers.slice(0, 10)}
        userLocation={geolocation.userLocation}
        onFlyerClick={handleFlyerClick}
      />

      {showGeolocationPrompt && (
        <GeolocationPrompt
          onLocationGranted={handleLocationGranted}
          onLocationDenied={handleLocationDenied}
          onClose={() => setShowGeolocationPrompt(false)}
        />
      )}
      
      {/* Floating Action Button for mobile */}
      <button 
        onClick={() => setIsPostModalOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-opacity md:hidden"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}

export default App;
