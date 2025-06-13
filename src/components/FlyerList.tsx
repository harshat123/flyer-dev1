import React from 'react';
import { ArrowLeft, Filter, SortAsc } from 'lucide-react';
import { Flyer, Category } from '../types';
import FlyerCard from './FlyerCard';

interface FlyerListProps {
  category: Category;
  flyers: Flyer[];
  onBack: () => void;
  onFlyerClick: (flyer: Flyer) => void;
  onReact: (flyerId: string) => void;
}

const FlyerList: React.FC<FlyerListProps> = ({ 
  category, 
  flyers, 
  onBack, 
  onFlyerClick, 
  onReact 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              
              <div>
                <h1 className="text-xl font-bold text-gray-900">{category.name}</h1>
                <p className="text-sm text-gray-600">{flyers.length} offers available</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filter</span>
              </button>
              
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <SortAsc className="h-4 w-4" />
                <span className="text-sm">Sort</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flyers.map((flyer) => (
            <FlyerCard
              key={flyer.id}
              flyer={flyer}
              onFlyerClick={onFlyerClick}
              onReact={onReact}
            />
          ))}
        </div>
        
        {flyers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No flyers found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later for new offers.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlyerList;