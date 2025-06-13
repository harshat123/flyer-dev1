import React, { useState } from 'react';
import { MapPin, X, Navigation } from 'lucide-react';

interface GeolocationPromptProps {
  onLocationGranted: (location: { lat: number; lng: number }) => void;
  onLocationDenied: () => void;
  onClose: () => void;
}

const GeolocationPrompt: React.FC<GeolocationPromptProps> = ({
  onLocationGranted,
  onLocationDenied,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnableLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        });
      });

      onLocationGranted({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } catch (err: any) {
      let errorMessage = 'Unable to get your location. ';
      
      switch (err.code) {
        case err.PERMISSION_DENIED:
          errorMessage += 'Location access was denied.';
          break;
        case err.POSITION_UNAVAILABLE:
          errorMessage += 'Location information is unavailable.';
          break;
        case err.TIMEOUT:
          errorMessage += 'Location request timed out.';
          break;
        default:
          errorMessage += 'An unknown error occurred.';
          break;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Enable Location</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Find Deals Near You
          </h3>
          <p className="text-gray-600 text-sm">
            Allow location access to discover amazing deals and offers from Indian businesses in your area.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleEnableLocation}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Getting Location...</span>
              </>
            ) : (
              <>
                <Navigation className="h-4 w-4" />
                <span>Enable Location</span>
              </>
            )}
          </button>

          <button
            onClick={onLocationDenied}
            className="w-full py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Skip for now
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          Your location is only used to show nearby deals and is not stored or shared.
        </div>
      </div>
    </div>
  );
};

export default GeolocationPrompt;