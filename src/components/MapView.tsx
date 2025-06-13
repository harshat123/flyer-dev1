import React, { useState } from 'react';
import { X, MapPin, Navigation, Filter, Star } from 'lucide-react';
import { Flyer } from '../types';

interface MapViewProps {
  isOpen: boolean;
  onClose: () => void;
  flyers: Flyer[];
  userLocation: { lat: number; lng: number } | null;
  onFlyerClick: (flyer: Flyer) => void;
}

const MapView: React.FC<MapViewProps> = ({
  isOpen,
  onClose,
  flyers,
  userLocation,
  onFlyerClick,
}) => {
  const [selectedFlyer, setSelectedFlyer] = useState<Flyer | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  if (!isOpen) return null;

  const filteredFlyers = filterCategory === 'all' 
    ? flyers 
    : flyers.filter(flyer => flyer.category === filterCategory);

  const categories = ['all', 'groceries', 'restaurants', 'events', 'markets', 'sports'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600 to-pink-500 text-white">
          <div className="flex items-center space-x-3">
            <MapPin className="h-6 w-6" />
            <h2 className="text-xl font-bold font-poppins">Map View</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex h-full">
          {/* Map Area */}
          <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Simulated Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Interactive Map</h3>
                <p className="text-gray-600">Map integration would show flyers as pins</p>
              </div>
            </div>

            {/* User Location Indicator */}
            {userLocation && (
              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center space-x-2">
                <Navigation className="h-4 w-4" />
                <span className="text-sm font-medium">Your Location</span>
              </div>
            )}

            {/* Category Filter */}
            <div className="absolute top-4 right-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="groceries">Groceries</option>
                <option value="restaurants">Restaurants</option>
                <option value="events">Events</option>
                <option value="markets">Markets</option>
                <option value="sports">Sports</option>
              </select>
            </div>

            {/* Flyer Pins Simulation */}
            <div className="absolute inset-0 pointer-events-none">
              {filteredFlyers.slice(0, 8).map((flyer, index) => (
                <div
                  key={flyer.id}
                  className={`absolute w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer pointer-events-auto transform hover:scale-110 transition-transform ${
                    selectedFlyer?.id === flyer.id ? 'ring-4 ring-yellow-400' : ''
                  }`}
                  style={{
                    left: `${20 + (index % 4) * 20}%`,
                    top: `${30 + Math.floor(index / 4) * 25}%`,
                  }}
                  onClick={() => setSelectedFlyer(flyer)}
                >
                  {index + 1}
                </div>
              ))}
            </div>

            {/* Selected Flyer Popup */}
            {selectedFlyer && (
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-4 max-w-sm">
                <div className="flex items-start space-x-3">
                  <img
                    src={selectedFlyer.imageUrl}
                    alt={selectedFlyer.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 line-clamp-1">
                      {selectedFlyer.title}
                    </h4>
                    <p className="text-sm text-purple-600 mb-1">
                      {selectedFlyer.businessName}
                    </p>
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">
                        {selectedFlyer.averageRating.toFixed(1)} ({selectedFlyer.reviews.length} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">
                        {selectedFlyer.discount}
                      </span>
                      <button
                        onClick={() => onFlyerClick(selectedFlyer)}
                        className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full hover:opacity-90 transition-opacity"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l bg-gray-50 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Nearby Deals ({filteredFlyers.length})
              </h3>
              
              <div className="space-y-3">
                {filteredFlyers.map((flyer) => (
                  <div
                    key={flyer.id}
                    onClick={() => setSelectedFlyer(flyer)}
                    className={`p-3 bg-white rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      selectedFlyer?.id === flyer.id ? 'ring-2 ring-purple-500' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={flyer.imageUrl}
                        alt={flyer.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                          {flyer.title}
                        </h4>
                        <p className="text-xs text-purple-600 mb-1">
                          {flyer.businessName}
                        </p>
                        <div className="flex items-center space-x-2 mb-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs text-gray-600">
                            {flyer.averageRating.toFixed(1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {flyer.location.distance?.toFixed(1)}mi
                          </span>
                        </div>
                        <span className="text-xs font-medium text-green-600">
                          {flyer.discount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;