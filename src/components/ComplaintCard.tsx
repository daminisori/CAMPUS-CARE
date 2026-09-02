import React from 'react';
import { ComplaintItem } from '../data/mockComplaints';
import { CategoryIllustration } from './illustrations/TicketIllustrations';
import { StampBadge } from './common/StampBadge';
import { 
  Wrench, 
  Zap, 
  Droplets, 
  Sparkles, 
  BedDouble, 
  Radio, 
  ShieldAlert, 
  FileText,
  Key,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';

export interface ComplaintCardProps {
  id: string;
  title: string;
  category: ComplaintItem['category'];
  location: string;
  description: string;
  department: string;
  priority: ComplaintItem['priority'];
  status: ComplaintItem['status'];
  date: string;
  ticketNumber?: string;
  onSelect?: (id: string) => void;
}

// 8 Distinct Authentic Color Palettes matching the reference image
const TICKET_STYLES: Record<ComplaintItem['category'], {
  leftBg: string;
  leftBorder: string;
  leftText: string;
  mainBg: string;
  mainBorder: string;
  mainText: string;
  subText: string;
  rightBg: string;
  rightBorder: string;
  rightText: string;
  leftLabel: string;
  leftSubLabel?: string;
  rightLabel: string;
  rightSubLabel?: string;
  categoryTitle: string;
}> = {
  equipment: {
    leftBg: '#E6BE3C',
    leftBorder: '#C99E22',
    leftText: '#141E1B',
    mainBg: '#1C525B',
    mainBorder: '#11363D',
    mainText: '#FAF9F5',
    subText: '#A5C4CB',
    rightBg: '#1C525B',
    rightBorder: '#11363D',
    rightText: '#FAF9F5',
    leftLabel: 'FIXED: BROKEN EQUIPMENT',
    rightLabel: 'MAINTENANCE',
    rightSubLabel: 'No. 347',
    categoryTitle: 'EQUIPMENT FAILURE',
  },
  power: {
    leftBg: '#F5EEDB',
    leftBorder: '#D8CAB0',
    leftText: '#8E281F',
    mainBg: '#9E231C',
    mainBorder: '#6C140F',
    mainText: '#FAF9F5',
    subText: '#F3B5B1',
    rightBg: '#F5EEDB',
    rightBorder: '#D8CAB0',
    rightText: '#141E1B',
    leftLabel: 'URGENT: ELECTRICITY ISSUES',
    leftSubLabel: 'risk',
    rightLabel: 'ADMIT ONE',
    rightSubLabel: 'No. 346',
    categoryTitle: 'POWER OUTAGE',
  },
  water: {
    leftBg: '#A7D7E8',
    leftBorder: '#7FB8CB',
    leftText: '#123D4A',
    mainBg: '#EB7556',
    mainBorder: '#B85034',
    mainText: '#FAF9F5',
    subText: '#FCE0D8',
    rightBg: '#A7D7E8',
    rightBorder: '#7FB8CB',
    rightText: '#123D4A',
    leftLabel: 'REPORTED: WATER PROBLEMS',
    rightLabel: 'CAMPUS CARE',
    rightSubLabel: 'No. 345',
    categoryTitle: 'WATER LEAKAGE',
  },
  sanitation: {
    leftBg: '#DCC2DE',
    leftBorder: '#B998BD',
    leftText: '#4A1D50',
    mainBg: '#BD4C76',
    mainBorder: '#8A2A4E',
    mainText: '#FAF9F5',
    subText: '#F6CFDE',
    rightBg: '#DCC2DE',
    rightBorder: '#B998BD',
    rightText: '#4A1D50',
    leftLabel: 'SCHEDULED: CLEANLINESS',
    rightLabel: 'REQ.',
    rightSubLabel: 'Bon Appétit',
    categoryTitle: 'SANITATION REQUEST',
  },
  housing: {
    leftBg: '#F4A9C0',
    leftBorder: '#D6829D',
    leftText: '#59162C',
    mainBg: '#B692CC',
    mainBorder: '#835F99',
    mainText: '#FAF9F5',
    subText: '#EADBFA',
    rightBg: '#F4A9C0',
    rightBorder: '#D6829D',
    rightText: '#59162C',
    leftLabel: 'STUDENT ID: HOSTEL PROBLEMS',
    leftSubLabel: 'ADMIT ONE',
    rightLabel: 'DORM LIFE',
    rightSubLabel: 'No. 349',
    categoryTitle: 'STUDENT HOUSING',
  },
  network: {
    leftBg: '#E8DCBD',
    leftBorder: '#C7B78F',
    leftText: '#483C1D',
    mainBg: '#829158',
    mainBorder: '#566333',
    mainText: '#FAF9F5',
    subText: '#DEE6CD',
    rightBg: '#C7A67D',
    rightBorder: '#A17D54',
    rightText: '#3B2610',
    leftLabel: 'STATUS: INTERNET ISSUES',
    rightLabel: 'ADMIT ISSUES',
    rightSubLabel: 'No. 350',
    categoryTitle: 'NETWORK DOWN',
  },
  security: {
    leftBg: '#7D95C7',
    leftBorder: '#5970A1',
    leftText: '#0E1C38',
    mainBg: '#20325A',
    mainBorder: '#121F3B',
    mainText: '#FAF9F5',
    subText: '#A8BEEA',
    rightBg: '#7D95C7',
    rightBorder: '#5970A1',
    rightText: '#0E1C38',
    leftLabel: 'ALERT: SECURITY CONCERNS',
    rightLabel: 'CAMPUS SEC',
    rightSubLabel: 'No. 351',
    categoryTitle: 'SECURITY REPORT',
  },
  admin: {
    leftBg: '#EAB443',
    leftBorder: '#C49125',
    leftText: '#3A2703',
    mainBg: '#FAF4DC',
    mainBorder: '#D9CFA6',
    mainText: '#141E1B',
    subText: '#5A533D',
    rightBg: '#EAB443',
    rightBorder: '#C49125',
    rightText: '#3A2703',
    leftLabel: 'SUBMITTED: ACADEMIC/ADMIN PROBLEMS',
    rightLabel: 'ADMIT ONE',
    rightSubLabel: 'CG-345',
    categoryTitle: 'ADMINISTRATIVE COMPLAINT',
  },
};

export const ComplaintCard: React.FC<ComplaintCardProps> = ({
  id,
  title,
  category,
  location,
  description,
  department,
  priority,
  status,
  date,
  ticketNumber,
  onSelect,
}) => {
  const style = TICKET_STYLES[category] || TICKET_STYLES.equipment;

  const renderLeftIcon = () => {
    switch (category) {
      case 'equipment':
        return <Wrench className="w-5 h-5 text-[#141E1B]" />;
      case 'power':
        return <Zap className="w-5 h-5 text-[#8E281F]" />;
      case 'water':
        return <Droplets className="w-5 h-5 text-[#123D4A]" />;
      case 'sanitation':
        return <Sparkles className="w-5 h-5 text-[#4A1D50]" />;
      case 'housing':
        return <Key className="w-5 h-5 text-[#59162C]" />;
      case 'network':
        return <Radio className="w-5 h-5 text-[#483C1D]" />;
      case 'security':
        return <ShieldAlert className="w-5 h-5 text-[#0E1C38]" />;
      case 'admin':
        return <FileText className="w-5 h-5 text-[#3A2703]" />;
    }
  };

  return (
    <div
      onClick={() => onSelect?.(id)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:rotate-[0.3deg] shadow-ticket hover:shadow-ticket-hover border-2"
      style={{
        borderColor: '#141E1B',
        backgroundColor: style.mainBg,
      }}
    >
      {/* AUTHENTIC SEMICIRCULAR PERFORATION NOTCHES ON SIDES AND STUB DIVIDERS */}
      {/* Left-edge Notch */}
      <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-paper-100 border-2 border-[#141E1B] z-30 pointer-events-none hidden sm:block" />
      {/* Right-edge Notch */}
      <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-paper-100 border-2 border-[#141E1B] z-30 pointer-events-none hidden sm:block" />

      {/* Internal Perforation Top & Bottom Notches */}
      <div className="absolute top-0 left-24 sm:left-32 -mt-3 w-6 h-6 rounded-full bg-paper-100 border-2 border-[#141E1B] z-30 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-0 left-24 sm:left-32 -mb-3 w-6 h-6 rounded-full bg-paper-100 border-2 border-[#141E1B] z-30 pointer-events-none hidden sm:block" />

      <div className="absolute top-0 right-28 sm:right-36 -mt-3 w-6 h-6 rounded-full bg-paper-100 border-2 border-[#141E1B] z-30 pointer-events-none hidden md:block" />
      <div className="absolute bottom-0 right-28 sm:right-36 -mb-3 w-6 h-6 rounded-full bg-paper-100 border-2 border-[#141E1B] z-30 pointer-events-none hidden md:block" />

      {/* MAIN 3-COLUMN TICKET GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-12 min-h-[170px]">
        {/* =========================================
            SECTION 1: LEFT STUB
            ========================================= */}
        <div
          className="sm:col-span-3 lg:col-span-2 p-3 sm:p-4 flex sm:flex-col items-center justify-between sm:justify-center text-center relative border-b sm:border-b-0 sm:border-r-2 border-dashed"
          style={{
            backgroundColor: style.leftBg,
            borderColor: '#141E1B',
            color: style.leftText,
          }}
        >
          {/* Category Icon in circle badge */}
          <div className="w-9 h-9 rounded-full bg-white/50 border-2 border-[#141E1B] flex items-center justify-center shadow-inner sm:mb-2 flex-shrink-0">
            {renderLeftIcon()}
          </div>

          {/* Vertical / Rotated Rotated Text */}
          <div className="my-1 sm:my-auto">
            <span className="font-ticket text-xs sm:text-[11px] lg:text-xs tracking-wider uppercase font-bold block sm:writing-mode-vertical leading-tight">
              {style.leftLabel}
            </span>
          </div>

          {/* Bottom small sublabel */}
          {style.leftSubLabel && (
            <div className="mt-1">
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest px-1.5 py-0.5 rounded border border-[#141E1B] bg-white/40">
                {style.leftSubLabel}
              </span>
            </div>
          )}
        </div>

        {/* =========================================
            SECTION 2: MAIN TICKET BODY
            ========================================= */}
        <div
          className="sm:col-span-6 lg:col-span-7 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden"
          style={{
            backgroundColor: style.mainBg,
            color: style.mainText,
          }}
        >
          {/* Header Row */}
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-ticket text-2xl sm:text-3xl lg:text-4xl tracking-wide uppercase leading-none drop-shadow-sm">
                {style.categoryTitle}
              </h3>
              <div className="sm:hidden">
                <StampBadge status={status} size="sm" />
              </div>
            </div>

            {/* Concise Information Rows (Location & Issue) */}
            <div className="mt-2.5 space-y-1 max-w-sm">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                <span className="opacity-80 uppercase tracking-wide">LOCATION:</span>
                <span className="underline decoration-dotted underline-offset-2">{location}</span>
              </div>
              <div className="text-xs font-sans font-medium line-clamp-2 leading-snug" style={{ color: style.subText }}>
                <span className="font-mono font-bold uppercase tracking-wide opacity-80 mr-1">ISSUE:</span>
                {title || description}
              </div>
            </div>
          </div>

          {/* Editorial SVG Illustration placed on right half of main body */}
          <div className="absolute right-2 bottom-1 sm:bottom-2 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
            <CategoryIllustration category={category} className="w-28 h-24 sm:w-36 sm:h-28" />
          </div>

          {/* Date & Priority Tags */}
          <div className="flex items-center gap-2 pt-3 text-[11px] font-mono relative z-10">
            <span className="inline-flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded border border-white/20">
              <Clock className="w-3 h-3" />
              {date}
            </span>
            {priority === 'urgent' && (
              <span className="bg-red-500 text-white font-bold px-2 py-0.5 rounded uppercase tracking-wider text-[10px] border border-[#141E1B]">
                URGENT RISK
              </span>
            )}
          </div>
        </div>

        {/* =========================================
            SECTION 3: RIGHT STUB
            ========================================= */}
        <div
          className="sm:col-span-3 lg:col-span-3 p-3 sm:p-4 flex sm:flex-col items-center justify-between sm:justify-center text-center border-t sm:border-t-0 sm:border-l-2 border-dashed relative"
          style={{
            backgroundColor: style.rightBg,
            borderColor: '#141E1B',
            color: style.rightText,
          }}
        >
          {/* Top Label & Admit Text */}
          <div className="hidden sm:block">
            <span className="font-ticket text-base lg:text-lg tracking-widest uppercase font-bold block">
              {style.rightLabel}
            </span>
            {style.rightSubLabel && (
              <div className="flex items-center justify-center gap-1 mt-0.5 text-xs font-mono font-bold">
                <Key className="w-3 h-3" />
                <span>{style.rightSubLabel}</span>
              </div>
            )}
          </div>

          {/* Rotated Rubber Ink Stamp Badge */}
          <div className="my-1 sm:my-2">
            <StampBadge status={status} size="md" />
          </div>

          {/* Ticket Serial / Barcode Details */}
          <div className="flex flex-col items-center">
            <div className="barcode-strip my-1 hidden sm:block opacity-60 group-hover:opacity-90 transition-opacity w-20" />
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
              {id}
            </span>
          </div>

          {/* View Details Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(id);
            }}
            className="sm:mt-2 inline-flex items-center gap-1 text-xs font-ticket tracking-wider uppercase font-bold hover:underline"
          >
            <span>VIEW TICKET</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
