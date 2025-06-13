import React from 'react';
import { X, Trophy, Users, Calendar, MapPin } from 'lucide-react';
import { sportsLeagues } from '../data/mockData';

interface SportsLeaguesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeagueSelect: (leagueId: string) => void;
}

const SportsLeaguesModal: React.FC<SportsLeaguesModalProps> = ({
  isOpen,
  onClose,
  onLeagueSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sports & Leagues</h2>
              <p className="text-gray-600">Find sports activities and leagues in your area</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sportsLeagues.map((league) => (
              <button
                key={league.id}
                onClick={() => {
                  onLeagueSelect(league.id);
                  onClose();
                }}
                className="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{league.icon}</span>
                  <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700">
                    {league.name}
                  </h3>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Teams & Individual Players</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Regular Tournaments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Multiple Locations</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <h4 className="font-semibold text-emerald-900 mb-2">Join the Community</h4>
            <p className="text-sm text-emerald-800">
              Connect with fellow sports enthusiasts, join leagues, and participate in tournaments. 
              All skill levels welcome!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsLeaguesModal;