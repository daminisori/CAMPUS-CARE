import React from 'react';
import { Complaint } from '../../types';
import { CATEGORIES } from '../../constants/categories';
import { StampBadge } from './StampBadge';
import { CategoryArtwork } from './CategoryArtwork';
import { MapPin, Clock, ArrowRight, User, Image as ImageIcon } from 'lucide-react';

interface TicketStubProps {
  complaint: Complaint;
  onSelect?: (complaint: Complaint) => void;
  compact?: boolean;
}

export const TicketStub: React.FC<TicketStubProps> = ({
  complaint,
  onSelect,
  compact = false,
}) => {
  const cat = CATEGORIES[complaint.category] || CATEGORIES.equipment;
  const isUrgent = complaint.urgency === 'urgent' || complaint.urgency === 'high';

  const formattedDate = new Date(complaint.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      onClick={() => onSelect?.(complaint)}
      className={`
        ticket-card rounded-xl overflow-hidden cursor-pointer group
        transition-all duration-300 relative border-2 border-[#D8D6CD]
        hover:border-navy hover:shadow-ticket-hover
        ${isUrgent ? 'ring-1 ring-red-300' : ''}
      `}
      style={{
        backgroundColor: '#FCFAF7',
      }}
    >
      {/* Top and bottom scalloped notch cutouts for stub perforation effect */}
      <div className="absolute top-0 bottom-0 left-20 md:left-28 hidden sm:flex flex-col justify-between -mt-3.5 -mb-3.5 pointer-events-none z-20">
        <div className="w-7 h-7 rounded-full bg-paper-100 border-2 border-[#D8D6CD]" />
        <div className="w-7 h-7 rounded-full bg-paper-100 border-2 border-[#D8D6CD]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 min-h-[140px]">
        {/* LEFT STUB: Category Header & Icon */}
        <div
          className="sm:col-span-3 p-4 flex sm:flex-col items-center justify-between sm:justify-center text-center relative border-b sm:border-b-0 sm:border-r border-dashed border-[#D8D6CD]"
          style={{
            backgroundColor: cat.bgLight,
            borderColor: cat.borderColor,
          }}
        >
          <div className="flex sm:flex-col items-center gap-2">
            <CategoryArtwork category={complaint.category} />
            <div className="text-left sm:text-center mt-1">
              <span
                className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase block"
                style={{ color: cat.textColor }}
              >
                {cat.ticketLabel}
              </span>
              <span className="text-[10px] font-mono text-ink-muted hidden sm:block">
                {complaint.ticketNumber}
              </span>
            </div>
          </div>

          <div className="sm:mt-2">
            <span
              className="text-[10px] font-ticket tracking-wider uppercase px-2 py-0.5 rounded border border-current font-bold"
              style={{ color: cat.textColor, borderColor: cat.borderColor }}
            >
              {cat.admitLabel}
            </span>
          </div>
        </div>

        {/* MIDDLE SECTION: Complaint Details & Status */}
        <div className="sm:col-span-6 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h3 className="font-ticket text-xl sm:text-2xl tracking-wide uppercase text-ink group-hover:text-navy transition-colors">
                {cat.title}
              </h3>
              <div className="sm:hidden">
                <StampBadge status={complaint.status} size="sm" />
              </div>
            </div>

            <p className="text-sm font-medium text-ink-light line-clamp-2 mb-3 leading-snug">
              {complaint.title}
            </p>
          </div>

          {/* Location & Meta Chips */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1 font-mono font-medium text-ink bg-paper-200 px-2 py-0.5 rounded border border-[#D8D6CD]">
              <MapPin className="w-3.5 h-3.5 text-brass" />
              {complaint.block} • {complaint.roomNo}
            </span>

            <span className="inline-flex items-center gap-1 font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-ink-faint" />
              {formattedDate}
            </span>

            {complaint.photos && complaint.photos.length > 0 && (
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-navy font-bold bg-navy/10 px-1.5 py-0.5 rounded">
                <ImageIcon className="w-3 h-3" />
                {complaint.photos.length} {complaint.photos.length === 1 ? 'photo' : 'photos'}
              </span>
            )}
          </div>
        </div>

        {/* RIGHT STUB: Stamp Badge, Barcode & Action */}
        <div className="sm:col-span-3 p-4 bg-[#F7F5EE] flex sm:flex-col items-center justify-between sm:justify-center text-center border-t sm:border-t-0 sm:border-l border-dashed border-[#D8D6CD] relative">
          <div className="hidden sm:block mb-2">
            <StampBadge status={complaint.status} size="md" />
          </div>

          <div className="flex flex-col items-center sm:w-full">
            <div className="barcode-strip my-1 hidden sm:block opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="text-[10px] font-mono text-ink-faint tracking-widest uppercase">
              ID: {complaint.id}
            </div>
          </div>

          <button
            className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-brass transition-colors sm:mt-2 bg-paper-100 sm:bg-transparent px-3 py-1.5 sm:px-0 sm:py-0 rounded border sm:border-0 border-[#D8D6CD]"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(complaint);
            }}
          >
            <span>View Ticket</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
