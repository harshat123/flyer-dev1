import React from 'react';
import { MapPin, Navigation, Eye, Heart, Clock, Map } from 'lucide-react';
import { Flyer } from '../types';

interface NearbyFlyersProps {
  flyers: Flyer[];
  userLocation: { lat: number; lng: number } | null;
  onFlyerClick: (flyer: Flyer) => void;
  onReact: (flyerId: string) => void;
}

const NearbyFlyers: React.FC<NearbyFlyersProps> = ({
  flyers,
  userLocation,
  onFlyerClick,
  onReact,
}) => {
  if (!userLocation || flyers.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Group flyers by city for map-like display
  const flyersByCity = flyers.reduce((acc, flyer) => {
    const cityKey = `${flyer.location.city}, ${flyer.location.state}`;
    if (!acc[cityKey]) {
      acc[cityKey] = [];
    }
    acc[cityKey].push(flyer);
    return acc;
  }, {} as Record<string, Flyer[]>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
            <Navigation className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Near You</h2>
            <p className="text-gray-600">Deals within 10 miles • {flyers.length} offers found</p>
          </div>
        </div>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
          <Map className="h-4 w-4" />
          <span className="text-sm font-medium">Map View</span>
        </button>
      </div>

      {/* City-based grouping */}
      <div className="space-y-8">
        {Object.entries(flyersByCity).map(([cityName, cityFlyers]) => (
          <div key={cityName} className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">{cityName}</h3>
              <span className="text-sm text-gray-500">({cityFlyers.length} deals)</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cityFlyers.slice(0, 3).map((flyer) => {
                const daysLeft = getDaysUntilExpiry(flyer.expiryDate);
                const isExpiringSoon = daysLeft <= 3;

                return (
                  <div
                    key={flyer.id}
                    onClick={() => onFlyerClick(flyer)}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100"
                  >
                    <div className="relative">
                      <img
                        src={flyer.imageUrl}
                        alt={flyer.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      <div className="absolute top-2 left-2">
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                          {flyer.discount}
                        </span>
                      </div>

                      <div className="absolute top-2 right-2 flex flex-col space-y-1">
                        <span className="bg-black/60 text-white px-2 py-1 rounded-md text-xs backdrop-blur-sm flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{flyer.location.distance?.toFixed(1)}mi</span>
                        </span>
                        {flyer.isPremium && (
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                            PREMIUM
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2 right-2">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm ${
                            daysLeft <= 0
                              ? 'bg-red-500/90 text-white'
                              : isExpiringSoon
                              ? 'bg-yellow-500/90 text-white'
                              : 'bg-green-500/90 text-white'
                          }`}
                        >
                          {daysLeft <= 0 ? 'Expired' : `${daysLeft}d left`}
                        </span>
                      </div>
                    </div>

                    <div className="p-3">
                      <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1 text-sm">
                        {flyer.title}
                      </h4>

                      <p className="text-xs text-orange-600 mb-2 font-medium">
                        {flyer.businessName}
                      </p>

                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600 line-clamp-1">
                          {flyer.location.address}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{flyer.views}</span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onReact(flyer.id);
                            }}
                            className="flex items-center space-x-1 text-pink-500 hover:text-pink-600 transition-colors"
                          >
                            <Heart className="h-3 w-3" />
                            <span className="text-xs">{flyer.reactions}</span>
                          </button>
                        </div>

                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {formatDate(flyer.postedDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {cityFlyers.length > 3 && (
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                View all {cityFlyers.length - 3} more deals in {cityName} →
              </button>
            )}
          </div>
        ))}
      </div>

      {flyers.length > 9 && (
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
            View All Nearby Deals ({flyers.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default NearbyFlyers;