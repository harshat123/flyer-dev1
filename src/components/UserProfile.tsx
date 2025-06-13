import React from 'react';
import { ArrowLeft, User, MapPin, Calendar, FileText, TrendingUp, Award } from 'lucide-react';
import { User as UserType, Flyer } from '../types';

interface UserProfileProps {
  user: UserType;
  userFlyers: Flyer[];
  onBack: () => void;
  onFlyerClick: (flyer: Flyer) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, userFlyers, onBack, onFlyerClick }) => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const remainingPosts = Math.max(0, 5 - (user.lastPostMonth === currentMonth ? user.monthlyPostsCount : 0));
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const activeFlyers = userFlyers.filter(flyer => flyer.isActive);
  const totalViews = userFlyers.reduce((sum, flyer) => sum + flyer.views, 0);
  const totalReactions = userFlyers.reduce((sum, flyer) => sum + flyer.reactions, 0);

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
            <h1 className="text-xl font-bold text-gray-900">Profile</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{user.location.city}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{user.postsCount}</div>
              <div className="text-sm text-blue-700">Total Posts</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{totalViews}</div>
              <div className="text-sm text-green-700">Total Views</div>
            </div>
            
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <Award className="h-6 w-6 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-600">{totalReactions}</div>
              <div className="text-sm text-pink-700">Total Reactions</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{remainingPosts}</div>
              <div className="text-sm text-orange-700">Posts Left</div>
            </div>
          </div>

          {/* Monthly Limit Info */}
          <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <h3 className="font-semibold text-orange-900">Monthly Posting Limit</h3>
                <p className="text-sm text-orange-700">
                  You have {remainingPosts} free posts remaining this month. 
                  {remainingPosts === 0 && " Additional posts cost $5.99 each."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Member since {formatDate(user.joinedDate)}</span>
          </div>
        </div>

        {/* User's Flyers */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">My Flyers</h3>
          
          {activeFlyers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeFlyers.map((flyer) => (
                <div
                  key={flyer.id}
                  onClick={() => onFlyerClick(flyer)}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={flyer.imageUrl}
                      alt={flyer.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 line-clamp-1">{flyer.title}</h4>
                      <p className="text-sm text-orange-600 mb-1">{flyer.businessName}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{flyer.views} views</span>
                        <span>{flyer.reactions} reactions</span>
                        <span>{formatDate(flyer.postedDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No active flyers yet</p>
              <p className="text-sm text-gray-500">Start posting to see your flyers here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;