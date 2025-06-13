import React, { useState } from 'react';
import { Star, ThumbsUp, User, MoreHorizontal } from 'lucide-react';
import { Review } from '../types';

interface ReviewsListProps {
  reviews: Review[];
  onHelpfulClick: (reviewId: string) => void;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews, onHelpfulClick }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <Star className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
        <p className="text-gray-600">Be the first to review this business!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayedReviews.map((review) => (
        <div key={review.id} className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{review.userName}</h4>
                  <div className="flex items-center space-x-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              
              {review.comment && (
                <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
              )}
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onHelpfulClick(review.id)}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
        >
          {showAll ? 'Show Less' : `Show All ${reviews.length} Reviews`}
        </button>
      )}
    </div>
  );
};

export default ReviewsList;