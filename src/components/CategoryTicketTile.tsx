import React from 'react';
import { CategoryId } from '../types';
import { CategoryIllustration } from './illustrations/TicketIllustrations';
import { 
  Wrench, 
  Zap, 
  Droplets, 
  Sparkles, 
  Key, 
  Radio, 
  ShieldAlert, 
  FileText,
  Check
} from 'lucide-react';

interface CategoryTicketTileProps {
  category: CategoryId;
  isSelected: boolean;
  onSelect: (category: CategoryId) => void;
}

const TILE_DATA: Record<CategoryId, {
  title: string;
  leftLabel: string;
  rightLabel: string;
  rightSubLabel?: string;
  leftBg: string;
  leftText: string;
  mainBg: string;
  mainText: string;
  rightBg: string;
  rightText: string;
}> = {
  equipment: {
    title: 'EQUIPMENT FAILURE',
    leftLabel: 'FIXED: BROKEN EQUIP.',
    rightLabel: 'MAINT.',
    rightSubLabel: 'No. 347',
    leftBg: '#E6BE3C',
    leftText: '#141E1B',
    mainBg: '#1C525B',
    mainText: '#FAF9F5',
    rightBg: '#1C525B',
    rightText: '#FAF9F5',
  },
  power: {
    title: 'POWER OUTAGE',
    leftLabel: 'URGENT: ELEC. ISSUES',
    rightLabel: 'ADMIT ONE',
    rightSubLabel: 'No. 346',
    leftBg: '#F5EEDB',
    leftText: '#8E281F',
    mainBg: '#9E231C',
    mainText: '#FAF9F5',
    rightBg: '#F5EEDB',
    rightText: '#141E1B',
  },
  water: {
    title: 'WATER LEAKAGE',
    leftLabel: 'REPORTED: WATER PROB.',
    rightLabel: 'CAMPUS',
    rightSubLabel: 'No. 345',
    leftBg: '#A7D7E8',
    leftText: '#123D4A',
    mainBg: '#EB7556',
    mainText: '#FAF9F5',
    rightBg: '#A7D7E8',
    rightText: '#123D4A',
  },
  sanitation: {
    title: 'SANITATION REQ.',
    leftLabel: 'SCHEDULED: CLEAN',
    rightLabel: 'REQ.',
    rightSubLabel: 'Appétit',
    leftBg: '#DCC2DE',
    leftText: '#4A1D50',
    mainBg: '#BD4C76',
    mainText: '#FAF9F5',
    rightBg: '#DCC2DE',
    rightText: '#4A1D50',
  },
  housing: {
    title: 'STUDENT HOUSING',
    leftLabel: 'ID: HOSTEL PROBLEMS',
    rightLabel: 'DORM LIFE',
    rightSubLabel: 'No. 349',
    leftBg: '#F4A9C0',
    leftText: '#59162C',
    mainBg: '#B692CC',
    mainText: '#FAF9F5',
    rightBg: '#F4A9C0',
    rightText: '#59162C',
  },
  network: {
    title: 'NETWORK DOWN',
    leftLabel: 'STATUS: INTERNET',
    rightLabel: 'ADMIT',
    rightSubLabel: 'No. 350',
    leftBg: '#E8DCBD',
    leftText: '#483C1D',
    mainBg: '#829158',
    mainText: '#FAF9F5',
    rightBg: '#C7A67D',
    rightText: '#3B2610',
  },
  security: {
    title: 'SECURITY REPORT',
    leftLabel: 'ALERT: SEC. CONCERNS',
    rightLabel: 'CAMPUS SEC',
    rightSubLabel: 'No. 351',
    leftBg: '#7D95C7',
    leftText: '#0E1C38',
    mainBg: '#20325A',
    mainText: '#FAF9F5',
    rightBg: '#7D95C7',
    rightText: '#0E1C38',
  },
  admin: {
    title: 'ADMIN COMPLAINT',
    leftLabel: 'SUBMITTED: ACADEMIC',
    rightLabel: 'ADMIT ONE',
    rightSubLabel: 'CG-345',
    leftBg: '#EAB443',
    leftText: '#3A2703',
    mainBg: '#FAF4DC',
    mainText: '#141E1B',
    rightBg: '#EAB443',
    rightText: '#3A2703',
  },
};

export const CategoryTicketTile: React.FC<CategoryTicketTileProps> = ({
  category,
  isSelected,
  onSelect,
}) => {
  const data = TILE_DATA[category];

  const renderIcon = () => {
    switch (category) {
      case 'equipment':
        return <Wrench className="w-3.5 h-3.5 text-[#141E1B]" />;
      case 'power':
        return <Zap className="w-3.5 h-3.5 text-[#8E281F]" />;
      case 'water':
        return <Droplets className="w-3.5 h-3.5 text-[#123D4A]" />;
      case 'sanitation':
        return <Sparkles className="w-3.5 h-3.5 text-[#4A1D50]" />;
      case 'housing':
        return <Key className="w-3.5 h-3.5 text-[#59162C]" />;
      case 'network':
        return <Radio className="w-3.5 h-3.5 text-[#483C1D]" />;
      case 'security':
        return <ShieldAlert className="w-3.5 h-3.5 text-[#0E1C38]" />;
      case 'admin':
        return <FileText className="w-3.5 h-3.5 text-[#3A2703]" />;
    }
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(category)}
      className={`
        w-full text-left rounded-xl overflow-hidden cursor-pointer transition-all duration-200 relative border-2 flex flex-col justify-between group
        ${
          isSelected
            ? 'ring-4 ring-brass border-[#141E1B] shadow-2xl scale-[1.03] z-10'
            : 'border-[#141E1B] hover:shadow-md hover:-translate-y-0.5 opacity-90 hover:opacity-100'
        }
      `}
      style={{
        backgroundColor: data.mainBg,
      }}
    >
      {/* Semicircular Perforations */}
      <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 rounded-full bg-paper-100 border-2 border-[#141E1B] z-20 pointer-events-none" />
      <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 rounded-full bg-paper-100 border-2 border-[#141E1B] z-20 pointer-events-none" />

      {/* Selected Indicator Stamp */}
      {isSelected && (
        <div className="absolute top-1 right-1 z-30 bg-brass text-navy p-1 rounded-full border border-[#141E1B] shadow">
          <Check className="w-3 h-3 stroke-[3]" />
        </div>
      )}

      {/* MINI HORIZONTAL 3-PART TICKET LAYOUT */}
      <div className="grid grid-cols-12 w-full min-h-[90px]">
        {/* Left Mini Stub */}
        <div
          className="col-span-3 p-1.5 flex flex-col items-center justify-between text-center border-r border-dashed border-[#141E1B]"
          style={{
            backgroundColor: data.leftBg,
            color: data.leftText,
          }}
        >
          <div className="w-6 h-6 rounded-full bg-white/60 border border-[#141E1B] flex items-center justify-center shadow-inner">
            {renderIcon()}
          </div>
          <span className="text-[8px] font-ticket uppercase font-bold tracking-wider leading-none mt-1 line-clamp-2">
            {data.leftLabel}
          </span>
        </div>

        {/* Main Body */}
        <div
          className="col-span-6 p-2 flex flex-col justify-between relative overflow-hidden"
          style={{
            backgroundColor: data.mainBg,
            color: data.mainText,
          }}
        >
          <div>
            <span className="font-ticket text-xs sm:text-sm tracking-wide uppercase font-bold leading-tight block">
              {data.title}
            </span>
          </div>

          <div className="absolute right-0 bottom-0 pointer-events-none opacity-85 group-hover:scale-110 transition-transform">
            <CategoryIllustration category={category} className="w-14 h-12" />
          </div>
        </div>

        {/* Right Mini Stub */}
        <div
          className="col-span-3 p-1 flex flex-col items-center justify-center text-center border-l border-dashed border-[#141E1B]"
          style={{
            backgroundColor: data.rightBg,
            color: data.rightText,
          }}
        >
          <span className="font-ticket text-[9px] uppercase font-bold tracking-wider leading-none">
            {data.rightLabel}
          </span>
          {data.rightSubLabel && (
            <span className="text-[7px] font-mono font-bold uppercase tracking-widest opacity-80 mt-0.5">
              {data.rightSubLabel}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};
