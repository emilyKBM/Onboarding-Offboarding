
import React from 'react';
import { OnboardingUnit } from '../types';
import { ArrowRight, Home, Clock, MapPin, CalendarCheck } from 'lucide-react';

interface UnitCardProps {
  unit: OnboardingUnit;
  onClick: () => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({ unit, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-100 text-green-800 border-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'New': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Stalled': return 'bg-red-100 text-red-800 border-red-200';
      case 'For Sale': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isForSale = unit.status === 'For Sale';
  const isOffboarding = unit.transitionDetails?.transferType === 'Out';
  const isLive = unit.status === 'Live' && !isOffboarding;

  // Extract live date if available
  const liveDate = isLive 
    ? unit.sections.find(s => s.id === 'sales-info')?.tasks.find(t => t.id === 'live-date')?.value 
    : null;

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all cursor-pointer group ${isForSale ? 'border-yellow-200' : isOffboarding ? 'border-red-200' : isLive ? 'border-green-200' : 'border-gray-200'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isForSale ? 'bg-yellow-50 text-yellow-600' : isOffboarding ? 'bg-red-50 text-red-600' : isLive ? 'bg-green-50 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
            <Home size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{unit.unitCode}</h3>
            <p className="text-sm text-gray-500">{unit.ownerName}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(unit.status)}`}>
          {unit.status}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
           <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{unit.location}</span>
           </div>
           {liveDate && (
             <div className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-100">
               <CalendarCheck size={12} />
               <span>Live since: {liveDate}</span>
             </div>
           )}
        </div>

        {!isForSale && !isLive && (
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{isOffboarding ? 'Offboarding Progress' : 'Onboarding Progress'}</span>
              <span className="font-semibold">{unit.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${isOffboarding ? 'bg-red-500' : 'bg-indigo-600'}`} 
                style={{ width: `${unit.progress}%` }}
              />
            </div>
          </div>
        )}
        
        {isForSale && unit.transitionDetails?.notes && (
           <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded-md border border-yellow-100">
             <span className="font-semibold text-yellow-700">Note:</span> {unit.transitionDetails.notes}
           </div>
        )}

        <div className="flex justify-between items-center pt-2 border-t border-gray-50">
          <div className="flex gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>Updated 2h ago</span>
            </div>
          </div>
          <div className={`${isOffboarding ? 'text-red-500' : isForSale ? 'text-yellow-600' : isLive ? 'text-green-600' : 'text-indigo-600'} group-hover:translate-x-1 transition-transform`}>
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
