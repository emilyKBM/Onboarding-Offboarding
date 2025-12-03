
import React from 'react';
import { OnboardingUnit, TaskStatus } from '../types';
import { LOCATIONS } from '../constants';
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TransitionsTableProps {
  units: OnboardingUnit[];
}

export const TransitionsTable: React.FC<TransitionsTableProps> = ({ units }) => {
  const navigate = useNavigate();

  const getOtaStatus = (unit: OnboardingUnit, otaId: string) => {
    const task = unit.sections.find(s => s.id === 'go-live')?.tasks.find(t => t.id === otaId);
    if (!task) return 'na';
    if (task.status === TaskStatus.COMPLETED) return 'live';
    if (task.value === 'Pending') return 'pending';
    if (task.value === 'No' || task.status === TaskStatus.NA) return 'off';
    return 'off';
  };

  const Checkbox = ({ status }: { status: string }) => {
    if (status === 'live') {
      return (
        <div className="flex justify-center">
           <div className="w-4 h-4 border border-black bg-white flex items-center justify-center">
              <Check size={14} strokeWidth={4} className="text-black" />
           </div>
        </div>
      );
    }
    // Empty box for pending/off to look like the screenshot
    return (
      <div className="flex justify-center">
         <div className="w-4 h-4 border border-black bg-white"></div>
      </div>
    );
  };

  const renderUnitRow = (unit: OnboardingUnit) => {
    return (
      <tr 
        key={unit.id} 
        className="hover:bg-yellow-50 cursor-pointer text-xs"
        onClick={() => navigate(`/unit/${unit.id}`)}
      >
        {/* Unit Code */}
        <td className="border border-gray-400 p-1 px-2 font-bold bg-yellow-200 text-black sticky left-0 z-10">
          {unit.unitCode}
        </td>
        
        {/* Live Status (derived from progress) */}
        <td className="border border-gray-400 p-1 text-center font-bold">
           {unit.status === 'Live' ? 'YES' : ''}
        </td>

        {/* OTA Columns */}
        <td className="border border-gray-400 p-1"><Checkbox status={getOtaStatus(unit, 'airbnb')} /></td>
        <td className="border border-gray-400 p-1"><Checkbox status={getOtaStatus(unit, 'booking')} /></td>
        <td className="border border-gray-400 p-1"><Checkbox status={getOtaStatus(unit, 'expedia')} /></td>
        <td className="border border-gray-400 p-1"><Checkbox status={getOtaStatus(unit, 'marriott')} /></td>
        <td className="border border-gray-400 p-1"><Checkbox status={getOtaStatus(unit, 'vrbo')} /></td>
        <td className="border border-gray-400 p-1 text-center">{getOtaStatus(unit, 'vrbo') === 'live' ? 'Done' : ''}</td>
        
        {/* Transition Details */}
        <td className="border border-gray-400 p-1 text-center font-bold">
           {unit.transitionDetails?.transferType === 'Out' ? 'OUT' : 'IN'}
        </td>

        <td className="border border-gray-400 p-1 px-2">{unit.ownerName}</td>
        <td className="border border-gray-400 p-1 px-2 text-center">{unit.transitionDetails?.salesRep}</td>
        <td className="border border-gray-400 p-1 px-2 text-center">{unit.transitionDetails?.transferType}</td>
        <td className="border border-gray-400 p-1 px-2 text-center font-bold">{unit.transitionDetails?.effectiveDate}</td>
        <td className="border border-gray-400 p-1 px-2 text-center">{unit.transitionDetails?.inspectionStatus || 'N/A'}</td>
        <td className="border border-gray-400 p-1 px-2 text-center">{unit.transitionDetails?.contingencies || 'N/A'}</td>
        <td className="border border-gray-400 p-1 px-2">{unit.transitionDetails?.priorPM || 'N/A'}</td>
        <td className="border border-gray-400 p-1 px-2">KBM</td> {/* Assuming New PM is always KBM */}
        <td className="border border-gray-400 p-1 px-2 min-w-[200px]">
           {unit.transitionDetails?.notes}
        </td>
      </tr>
    );
  };

  return (
    <div className="h-full overflow-auto bg-white text-xs">
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          {/* Header Row */}
          <tr className="bg-gray-200 text-black font-bold text-center uppercase">
             <th className="border border-gray-400 p-1 min-w-[80px] sticky left-0 bg-gray-200 z-20">UNIT</th>
             <th className="border border-gray-400 p-1 w-12">LIVE</th>
             <th className="border border-gray-400 p-1 w-8">Airbnb</th>
             <th className="border border-gray-400 p-1 w-8">Booking</th>
             <th className="border border-gray-400 p-1 w-8">Expedia</th>
             <th className="border border-gray-400 p-1 w-8">Marriott</th>
             <th className="border border-gray-400 p-1 w-8">VRBO</th>
             <th className="border border-gray-400 p-1 w-16">Done?</th>
             <th className="border border-gray-400 p-1 w-12">In/Out</th>
             <th className="border border-gray-400 p-1 min-w-[150px]">NEW OWNER</th>
             <th className="border border-gray-400 p-1 w-16">SALES REP</th>
             <th className="border border-gray-400 p-1 w-24">TYPE</th>
             <th className="border border-gray-400 p-1 w-24">EFFECTIVE DATE</th>
             <th className="border border-gray-400 p-1 w-16">INSP.</th>
             <th className="border border-gray-400 p-1 w-16">CONT.</th>
             <th className="border border-gray-400 p-1 min-w-[100px]">PRIOR PROPERTY MGMT</th>
             <th className="border border-gray-400 p-1 w-12">New PM</th>
             <th className="border border-gray-400 p-1 min-w-[200px]">NOTES</th>
          </tr>
        </thead>
        <tbody>
          {LOCATIONS.map(location => {
            const locUnits = units.filter(u => u.location === location);
            if (locUnits.length === 0) return null;

            return (
              <React.Fragment key={location}>
                {/* Location Header */}
                <tr className="bg-indigo-100">
                  <td colSpan={18} className="border border-gray-400 p-1 px-2 font-bold text-sm text-left">
                    {location}
                  </td>
                </tr>
                {/* Sub-header for Live on OTAs (Matches screenshot) */}
                 <tr className="bg-gray-50 text-[10px] text-gray-500">
                  <td className="border border-gray-400 sticky left-0 bg-gray-50"></td>
                  <td className="border border-gray-400"></td>
                  <td colSpan={6} className="border border-gray-400 text-center italic">Live on OTAs</td>
                  <td colSpan={10} className="border border-gray-400"></td>
                </tr>
                {locUnits.map(renderUnitRow)}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
