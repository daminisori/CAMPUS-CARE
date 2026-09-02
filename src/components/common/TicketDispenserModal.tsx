import React, { useEffect, useState } from 'react';
import { Complaint } from '../../types';
import { ComplaintCard } from '../ComplaintCard';
import { soundFX } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Printer, 
  ArrowRight, 
  X,
  Volume2
} from 'lucide-react';

interface TicketDispenserModalProps {
  complaint: Complaint | null;
  isOpen: boolean;
  onClose: () => void;
  onViewDetails: (complaint: Complaint) => void;
}

export const TicketDispenserModal: React.FC<TicketDispenserModalProps> = ({
  complaint,
  isOpen,
  onClose,
  onViewDetails,
}) => {
  const [animationStep, setAnimationStep] = useState<number>(0);

  useEffect(() => {
    if (isOpen && complaint) {
      setAnimationStep(1); // Dispensing & paper tear
      soundFX.playTicketDispense();

      const timer1 = setTimeout(() => {
        setAnimationStep(2); // Stamp slam!
        soundFX.playStampThud();
        soundFX.playSuccessChime();

        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#C08A2E', '#1F2A44', '#C97C1F', '#4C7A4A', '#EB7556', '#9E231C'],
          });
        } catch {
          // ignore
        }
      }, 700);

      const timer2 = setTimeout(() => {
        setAnimationStep(3); // Ready
      }, 1100);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setAnimationStep(0);
    }
  }, [isOpen, complaint]);

  if (!isOpen || !complaint) return null;

  const handlePrint = () => {
    soundFX.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-paper-50 rounded-3xl shadow-2xl border-4 border-brass overflow-hidden my-8">
        {/* MECHANICAL DISPENSER HEADER */}
        <div className="bg-navy p-5 text-paper-100 border-b-4 border-brass flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <span className="font-ticket text-xl sm:text-2xl tracking-wider text-brass-light block leading-none">
                CAMPUS BOARDING TICKET DISPENSER
              </span>
              <span className="text-xs font-mono text-paper-300">
                SERIAL: {complaint.id} • STATUS: PERFORATED & STAMPED
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-navy-light text-paper-300 hover:text-white hover:bg-navy-dark transition-colors border border-navy-light"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* DISPENSER PAPER SLOT GRAPHIC */}
        <div className="bg-ink h-4 mx-8 rounded-b-lg shadow-inner border-x-2 border-b-2 border-[#555]" />

        {/* TICKET STUB BOARDING PASS */}
        <div className="p-6 sm:p-8">
          <div
            className={`
              transition-all duration-700 transform
              ${animationStep >= 1 ? 'translate-y-0 opacity-100' : '-translate-y-14 opacity-0'}
              ${animationStep >= 2 ? 'rubber-stamp-animation' : ''}
            `}
          >
            <ComplaintCard
              id={complaint.id}
              ticketNumber={complaint.ticketNumber}
              title={complaint.title}
              category={complaint.category}
              location={`${complaint.block}, ${complaint.roomNo}`}
              description={complaint.description}
              department={complaint.assignedDepartment}
              priority={complaint.urgency}
              status={complaint.status}
              date={new Date(complaint.createdAt).toLocaleDateString()}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-dashed border-[#141E1B]">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handlePrint}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-paper-200 hover:bg-paper-300 text-ink font-ticket text-lg uppercase tracking-wider border-2 border-[#141E1B] transition-all transform active:scale-95"
              >
                <Printer className="w-5 h-5 text-navy" />
                <span>Print Paper Stub</span>
              </button>
            </div>

            <button
              onClick={() => {
                soundFX.playClick();
                onViewDetails(complaint);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-navy hover:bg-navy-dark text-paper-100 font-ticket text-xl uppercase tracking-widest shadow-xl border-2 border-brass transition-all transform hover:scale-105 active:scale-95 group"
            >
              <span>Track Real-time Resolution</span>
              <ArrowRight className="w-5 h-5 text-brass group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
