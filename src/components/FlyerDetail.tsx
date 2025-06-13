import React, { useState } from 'react';
import { ArrowLeft, MapPin, Eye, Heart, Share2, Store, Tag, Clock, Copy, Check, Star, MessageSquare } from 'lucide-react';
import { Flyer, Review } from '../types';
import ReviewsList from './ReviewsList';
import ReviewModal from './ReviewModal';

interface FlyerDetailProps {
  flyer: Flyer;
  onBack: () => void;
  onReact: (flyerId: string) => void;
  onSubmitReview: (flyerId: string, review: Omit<Review, 'id' | 'date' | 'helpful'>) => void;
  onHelpfulClick: (flyerId: string, reviewId: string) => void;
}

const FlyerDetail: React.FC<FlyerDetailProps> = ({ 
  flyer, 
  onBack, 
  onReact, 
  onSubmitReview,
  onHelpfulClick 
}) => {
  const [codeCopied, setCodeCopied] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(flyer.redemptionCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleSubmitReview = (review: Omit<Review, 'id' | 'date' | 'helpful'>) => {
    onSubmitReview(flyer.id, review);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative">
            <img 
              src={flyer.imageUrl} 
              alt={flyer.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            
            <div className="absolute top-4 left-4">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                {flyer.discount}
              </span>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight font-poppins">
                {flyer.title}
              </h1>
            </div>
            
            <div className="flex items-center space-x-3 mb-4">
              <Store className="h-5 w-5 text-purple-500" />
              <span className="text-lg font-semibold text-gray-800">{flyer.businessName}</span>
            </div>

            {/* Rating Section */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                {renderStars(flyer.averageRating)}
                <span className="text-lg font-semibold text-gray-900">
                  {flyer.averageRating.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-600">
                ({flyer.reviews.length} {flyer.reviews.length === 1 ? 'review' : 'reviews'})
              </span>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Write Review</span>
              </button>
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{flyer.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{flyer.location.address}</p>
                    <p className="text-sm text-gray-600">{flyer.location.city}</p>
                    <p className="text-sm text-purple-600 font-medium">{flyer.location.distance} miles away</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Posted on</p>
                    <p className="font-medium text-gray-900">{formatDate(flyer.postedDate)}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{flyer.views} views</span>
                  </div>
                  
                  <button 
                    onClick={() => onReact(flyer.id)}
                    className="flex items-center space-x-2 bg-pink-50 hover:bg-pink-100 text-pink-600 px-3 py-2 rounded-full transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    <span>{flyer.reactions}</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-dashed border-purple-200 mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Tag className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-bold text-purple-900 font-poppins">Redemption Code</h3>
              </div>
              
              <div className="flex items-center justify-between bg-white rounded-lg p-4 border">
                <code className="text-xl font-mono font-bold text-purple-600">
                  {flyer.redemptionCode}
                </code>
                
                <button 
                  onClick={handleCopyCode}
                  className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-lg transition-colors"
                >
                  {codeCopied ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-sm text-purple-700 mt-3">
                Show this code to the store staff to redeem your discount. Code is unique to you.
              </p>
            </div>

            {/* Reviews Section */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 font-poppins">
                Customer Reviews
              </h3>
              <ReviewsList 
                reviews={flyer.reviews} 
                onHelpfulClick={(reviewId) => onHelpfulClick(flyer.id, reviewId)}
              />
            </div>
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        flyerId={flyer.id}
        businessName={flyer.businessName}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
};

export default FlyerDetail;