import React, { useState } from 'react';
import { MapPin, User, Search, Compass } from 'lucide-react';

interface HeaderProps {
  currentLocation: string;
  onLocationClick: () => void;
  onProfileClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentLocation, onLocationClick, onProfileClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationSearch.trim()) {
      // This would typically integrate with a geocoding service
      alert(`Searching for deals in: ${locationSearch}`);
    }
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold tracking-wide font-poppins">
                <span className="text-yellow-200">Desi</span>
                <span className="text-white">fyar</span>
              </div>
            </div>
            <div className="hidden sm:block text-sm opacity-90 font-medium">
              Discover • Connect • Celebrate
            </div>
          </div>
          
          {/* Location Search */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <form onSubmit={handleLocationSearch} className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              <input
                type="text"
                placeholder="Enter city or ZIP code..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 backdrop-blur-sm"
              />
            </form>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onLocationClick}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">{currentLocation}</span>
            </button>
            
            <button 
              onClick={onProfileClick}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Mobile Location Search */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleLocationSearch} className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
            <input
              type="text"
              placeholder="Enter city or ZIP code..."
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 backdrop-blur-sm"
            />
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;