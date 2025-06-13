import React, { useState } from 'react';
import { X, Upload, DollarSign, AlertCircle, Building2 } from 'lucide-react';
import { Category, BusinessRegistry, User } from '../types';
import { checkBusinessNameAvailable } from '../utils/subscription';

interface PostFlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  userPostsCount: number;
  monthlyPostsCount: number;
  onSubmit: (flyerData: any) => void;
  businessNames: BusinessRegistry[];
  currentUser: User;
}

const PostFlyerModal: React.FC<PostFlyerModalProps> = ({ 
  isOpen, 
  onClose, 
  categories, 
  userPostsCount, 
  monthlyPostsCount,
  onSubmit,
  businessNames,
  currentUser
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    businessName: currentUser.businessName || '',
    discount: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    imageUrl: '',
    expiryDate: ''
  });

  const [businessNameError, setBusinessNameError] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const isPremiumPost = monthlyPostsCount >= 5;

  if (!isOpen) return null;

  const handleBusinessNameChange = (businessName: string) => {
    setFormData({ ...formData, businessName });
    
    if (businessName && !checkBusinessNameAvailable(businessName, businessNames, currentUser.id)) {
      setBusinessNameError('This business name is already registered by another user.');
    } else {
      setBusinessNameError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (businessNameError) {
      return;
    }
    
    if (isPremiumPost && !showPayment) {
      setShowPayment(true);
      return;
    }
    
    onSubmit(formData);
    onClose();
    setFormData({
      title: '',
      description: '',
      category: '',
      businessName: currentUser.businessName || '',
      discount: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      imageUrl: '',
      expiryDate: ''
    });
    setShowPayment(false);
    setBusinessNameError('');
  };

  const handlePayment = () => {
    // Simulate payment processing
    alert('Payment successful! Your flyer will be posted.');
    handleSubmit(new Event('submit') as any);
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  // US States for dropdown
  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Post New Flyer</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {showPayment ? (
          <div className="p-6">
            <div className="text-center mb-6">
              <DollarSign className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Post Required</h3>
              <p className="text-gray-600">
                You've used your 5 free posts this month. Premium posts get priority placement and enhanced visibility.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-6 border">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">$5.99</div>
                <div className="text-sm text-orange-700">Per additional flyer</div>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Priority placement in search results</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Enhanced visibility for 30 days</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Detailed analytics and insights</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowPayment(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Edit
              </button>
              <button 
                onClick={handlePayment}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Pay & Post
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {isPremiumPost && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800 font-medium">Premium Post Required</p>
                  <p className="text-sm text-yellow-700">
                    You've reached your monthly free post limit (5 posts). This will be a premium post ($5.99).
                  </p>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => handleBusinessNameChange(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      businessNameError ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Your Business Name"
                  />
                </div>
                {businessNameError && (
                  <p className="text-red-600 text-xs mt-1">{businessNameError}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Business names are unique and cannot be duplicated by other users
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Flyer Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., 50% Off Fresh Vegetables"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Describe your offer in detail..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount/Offer *
                </label>
                <input
                  type="text"
                  required
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., 50% OFF, Buy 1 Get 1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  required
                  min={today}
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Business Location</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="123 Main Street"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Chicago"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select State</option>
                    {usStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    required
                    pattern="[0-9]{5}(-[0-9]{4})?"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="60601"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button 
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={!!businessNameError}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50"
              >
                {isPremiumPost ? 'Continue to Payment' : 'Post Flyer'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostFlyerModal;