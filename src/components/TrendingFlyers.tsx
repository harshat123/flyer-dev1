import React from 'react';
import { TrendingUp, MapPin, Eye, Heart, Calendar, Clock } from 'lucide-react';
import { Flyer } from '../types';

interface TrendingFlyersProps {
  flyers: Flyer[];
  onFlyerClick: (flyer: Flyer) => void;
  onReact: (flyerId: string) => void;
}

const TrendingFlyers: React.FC<TrendingFlyersProps> = ({ flyers, onFlyerClick, onReact }) => {
  const trendingFlyers = flyers.filter(flyer => flyer.isTrending).slice(0, 3);

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

  if (trendingFlyers.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trending Near You</h2>
          <p className="text-gray-600">Popular offers in your area</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingFlyers.map((flyer) => {
          const daysLeft = getDaysUntilExpiry(flyer.expiryDate);
          const isExpiringSoon = daysLeft <= 3;

          return (
            <div
              key={flyer.id}
              onClick={() => onFlyerClick(flyer)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group relative"
            >
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>TRENDING</span>
                </span>
              </div>

              <div className="relative">
                <img
                  src={flyer.imageUrl}
                  alt={flyer.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-3 right-3">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {flyer.discount}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3">
                  <span className="bg-black/50 text-white px-2 py-1 rounded-lg text-xs backdrop-blur-sm">
                    {flyer.location.distance}mi
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                  {flyer.title}
                </h3>

                <p className="text-sm font-medium text-orange-600 mb-2">
                  {flyer.businessName}
                </p>

                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600 line-clamp-1">{flyer.location.address}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{flyer.views}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onReact(flyer.id);
                      }}
                      className="flex items-center space-x-1 text-pink-500 hover:text-pink-600 transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{flyer.reactions}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-xs text-gray-600">{formatDate(flyer.postedDate)}</span>
                  </div>

                  <div className={`flex items-center space-x-1 ${isExpiringSoon ? 'text-red-600' : 'text-gray-600'}`}>
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-medium">
                      {daysLeft > 0 ? `${daysLeft}d left` : 'Expired'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingFlyers;