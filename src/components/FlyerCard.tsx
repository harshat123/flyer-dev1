import React from 'react';
import { MapPin, Eye, Heart, Calendar, Tag, Store, Clock, Star } from 'lucide-react';
import { Flyer } from '../types';

interface FlyerCardProps {
  flyer: Flyer;
  onFlyerClick: (flyer: Flyer) => void;
  onReact: (flyerId: string) => void;
}

const FlyerCard: React.FC<FlyerCardProps> = ({ flyer, onFlyerClick, onReact }) => {
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

  const daysLeft = getDaysUntilExpiry(flyer.expiryDate);
  const isExpiringSoon = daysLeft <= 3;
  const isExpired = daysLeft <= 0;

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      onClick={() => onFlyerClick(flyer)}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      <div className="relative">
        <img 
          src={flyer.imageUrl} 
          alt={flyer.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {flyer.discount}
          </span>
        </div>
        
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <span className="bg-black/50 text-white px-2 py-1 rounded-lg text-xs backdrop-blur-sm">
            {flyer.location.distance}mi
          </span>
          {flyer.isTrending && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
              TRENDING
            </span>
          )}
        </div>

        {/* Expiry indicator */}
        <div className="absolute bottom-3 right-3">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm ${
            isExpired 
              ? 'bg-red-500/90 text-white' 
              : isExpiringSoon 
                ? 'bg-yellow-500/90 text-white' 
                : 'bg-green-500/90 text-white'
          }`}>
            {isExpired ? 'Expired' : `${daysLeft}d left`}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg text-gray-900 leading-tight flex-1 font-poppins">
            {flyer.title}
          </h3>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <Store className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-medium text-gray-700">{flyer.businessName}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          {renderStars(flyer.averageRating)}
          <span className="text-sm text-gray-600">
            {flyer.averageRating.toFixed(1)} ({flyer.reviews.length})
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{flyer.description}</p>
        
        <div className="flex items-center space-x-2 mb-3">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{flyer.location.address}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
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
          
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{formatDate(flyer.postedDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyerCard;