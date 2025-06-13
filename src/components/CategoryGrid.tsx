import React from 'react';
import { ShoppingCart, UtensilsCrossed, Calendar, Store, Trophy } from 'lucide-react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
}

const iconMap = {
  ShoppingCart,
  UtensilsCrossed,
  Calendar,
  Store,
  Trophy
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategorySelect }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-5 gap-2 md:gap-4">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap];
          
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className="group relative overflow-hidden rounded-2xl p-3 md:p-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10 flex flex-col items-center space-y-1 md:space-y-2">
                <div className="p-1.5 md:p-2 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                  <IconComponent className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                
                <div className="text-center">
                  <h3 className="font-semibold text-xs md:text-sm font-poppins">{category.name}</h3>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;