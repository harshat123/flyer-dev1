import React, { useState } from 'react';
import { X, Crown, Check, Star, Zap, TrendingUp } from 'lucide-react';

interface PremiumSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (plan: 'monthly' | 'yearly') => void;
  reason: 'expired' | 'required' | 'upgrade';
}

const PremiumSubscriptionModal: React.FC<PremiumSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSubscribe,
  reason,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  if (!isOpen) return null;

  const getTitle = () => {
    switch (reason) {
      case 'expired':
        return 'Subscription Expired';
      case 'required':
        return 'Premium Required';
      default:
        return 'Upgrade to Premium';
    }
  };

  const getMessage = () => {
    switch (reason) {
      case 'expired':
        return 'Your premium subscription has expired. Renew to continue posting flyers.';
      case 'required':
        return 'After 6 months, premium subscription is required to continue posting flyers.';
      default:
        return 'Unlock premium features and grow your business faster.';
    }
  };

  const features = [
    'Unlimited flyer postings',
    'Priority placement in search results',
    'Advanced analytics and insights',
    'Premium badge on your listings',
    'Extended flyer duration (60 days)',
    'Multiple business locations',
    'Custom promotional campaigns',
    'Direct customer messaging'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
              <p className="text-gray-600">{getMessage()}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Plan Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div
              onClick={() => setSelectedPlan('monthly')}
              className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPlan === 'monthly'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Monthly</h3>
                <div className="text-3xl font-bold text-orange-600 mb-1">$9.99</div>
                <div className="text-sm text-gray-600">per month</div>
              </div>
              {selectedPlan === 'monthly' && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={() => setSelectedPlan('yearly')}
              className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPlan === 'yearly'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  SAVE 17%
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Yearly</h3>
                <div className="text-3xl font-bold text-orange-600 mb-1">$99.99</div>
                <div className="text-sm text-gray-600">per year</div>
                <div className="text-xs text-green-600 font-medium mt-1">
                  Save $20 annually
                </div>
              </div>
              {selectedPlan === 'yearly' && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features List */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Premium Features</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Premium Success</h4>
            </div>
            <p className="text-sm text-blue-800">
              Premium businesses see an average of <strong>3x more views</strong> and{' '}
              <strong>2x more customer engagement</strong> compared to free listings.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Maybe Later
            </button>
            <button
              onClick={() => onSubscribe(selectedPlan)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center justify-center space-x-2"
            >
              <Zap className="h-4 w-4" />
              <span>
                Subscribe {selectedPlan === 'monthly' ? '$9.99/mo' : '$99.99/yr'}
              </span>
            </button>
          </div>

          <div className="mt-4 text-xs text-gray-500 text-center">
            Cancel anytime. No hidden fees. 30-day money-back guarantee.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscriptionModal;