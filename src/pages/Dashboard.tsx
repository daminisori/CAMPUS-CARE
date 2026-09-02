import React, { useState } from 'react';
import { ComplaintCard } from '../components/ComplaintCard';
import { useComplaints } from '../context/ComplaintContext';
import { 
  PlusCircle, 
  Ticket, 
  FolderOpen, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface DashboardProps {
  searchQuery: string;
  onSelectComplaint: (id: string) => void;
  onNewComplaint: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  searchQuery,
  onSelectComplaint,
  onNewComplaint,
}) => {
  const { complaints, currentUser } = useComplaints();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'in_review' | 'resolved' | 'escalated'>('all');

  // Filter complaints
  const filteredComplaints = complaints.filter((item) => {
    const matchesTab = activeTab === 'all' || item.status === activeTab;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.block.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query) ||
      item.ticketNumber.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  // Calculate Statistics
  const totalFiled = complaints.length;
  const currentlyOpen = complaints.filter(
    (c) => c.status === 'pending' || c.status === 'in_review' || c.status === 'escalated'
  ).length;
  const resolvedThisMonth = complaints.filter((c) => c.status === 'resolved').length;

  const handleTabChange = (tab: typeof activeTab) => {
    soundFX.playClick();
    setActiveTab(tab);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Get first name
  const firstName = currentUser.name.split(' ')[0] || 'Damini';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* =========================================
          PAGE HEADER: GREETING & PROMINENT CTA
          ========================================= */}
      <div className="bg-paper-50 rounded-3xl p-6 sm:p-8 border-2 border-[#141E1B] shadow-ticket relative overflow-hidden">
        {/* Subtle Watermark Paper Background */}
        <div className="absolute right-4 -bottom-6 text-9xl font-ticket text-navy/5 select-none pointer-events-none">
          TICKET
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
                {getGreeting()}, {firstName}
              </h1>
              <span className="text-xl">👋</span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-ink-muted max-w-xl">
              Track your grievance boarding passes, check real-time resolution SLAs, or lodge a new campus maintenance ticket.
            </p>
          </div>

          {/* PROMINENT + NEW COMPLAINT BUTTON (Aligned Right) */}
          <button
            onClick={() => {
              soundFX.playClick();
              onNewComplaint();
            }}
            className="px-7 py-4 rounded-2xl bg-navy hover:bg-navy-dark text-paper-50 font-ticket text-xl sm:text-2xl tracking-wider uppercase shadow-xl border-2 border-brass flex items-center justify-center gap-3 transition-all duration-200 transform hover:scale-105 active:scale-95 group flex-shrink-0"
          >
            <PlusCircle className="w-6 h-6 text-brass group-hover:rotate-90 transition-transform duration-300" />
            <span>+ NEW COMPLAINT</span>
          </button>
        </div>
      </div>

      {/* =========================================
          STATISTICS: 3 COMPACT METRIC CARDS
          ========================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: TOTAL FILED */}
        <div
          onClick={() => handleTabChange('all')}
          className={`p-5 rounded-2xl bg-paper-50 border-2 transition-all cursor-pointer shadow-sm ${
            activeTab === 'all'
              ? 'border-navy ring-2 ring-navy'
              : 'border-[#141E1B] hover:border-navy hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted">
              TOTAL FILED
            </span>
            <div className="w-8 h-8 rounded-lg bg-navy/10 border border-navy/20 flex items-center justify-center text-navy">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-ticket text-4xl font-bold text-navy">
              {totalFiled}
            </span>
            <span className="text-[11px] font-mono text-ink-faint">
              Boarding tickets
            </span>
          </div>
        </div>

        {/* Metric 2: CURRENTLY OPEN */}
        <div
          onClick={() => handleTabChange('pending')}
          className={`p-5 rounded-2xl bg-paper-50 border-2 transition-all cursor-pointer shadow-sm ${
            activeTab === 'pending' || activeTab === 'in_review'
              ? 'border-[#C97C1F] ring-2 ring-[#C97C1F]'
              : 'border-[#141E1B] hover:border-[#C97C1F] hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C97C1F]">
              CURRENTLY OPEN
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#C97C1F]/10 border border-[#C97C1F]/30 flex items-center justify-center text-[#C97C1F]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-ticket text-4xl font-bold text-[#C97C1F]">
              {currentlyOpen}
            </span>
            <span className="text-[11px] font-mono text-amber-700 font-bold bg-amber-100/80 px-2 py-0.5 rounded">
              Active Triage
            </span>
          </div>
        </div>

        {/* Metric 3: RESOLVED THIS MONTH */}
        <div
          onClick={() => handleTabChange('resolved')}
          className={`p-5 rounded-2xl bg-paper-50 border-2 transition-all cursor-pointer shadow-sm ${
            activeTab === 'resolved'
              ? 'border-[#4C7A4A] ring-2 ring-[#4C7A4A]'
              : 'border-[#141E1B] hover:border-[#4C7A4A] hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4C7A4A]">
              RESOLVED THIS MONTH
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#4C7A4A]/10 border border-[#4C7A4A]/30 flex items-center justify-center text-[#4C7A4A]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-ticket text-4xl font-bold text-[#4C7A4A]">
              {resolvedThisMonth}
            </span>
            <span className="text-[11px] font-mono text-emerald-800 font-bold bg-emerald-100/80 px-2 py-0.5 rounded">
              Verified & Closed
            </span>
          </div>
        </div>
      </div>

      {/* =========================================
          FILTER NAVIGATION TABS
          ALL | PENDING | IN REVIEW | RESOLVED | ESCALATED
          ========================================= */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b-2 border-dashed border-[#141E1B] overflow-x-auto">
        <div className="flex items-center gap-2">
          {(
            [
              { id: 'all', label: 'ALL' },
              { id: 'pending', label: 'PENDING' },
              { id: 'in_review', label: 'IN REVIEW' },
              { id: 'resolved', label: 'RESOLVED' },
              { id: 'escalated', label: 'ESCALATED' },
            ] as const
          ).map((tab) => {
            const isSelected = activeTab === tab.id;
            const count =
              tab.id === 'all'
                ? complaints.length
                : complaints.filter((c) => c.status === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 rounded-xl font-ticket text-base sm:text-lg tracking-wider uppercase transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap border-2 ${
                  isSelected
                    ? 'bg-navy text-paper-50 border-brass shadow-md transform -translate-y-0.5'
                    : 'bg-paper-50 text-ink hover:bg-paper-200 border-[#141E1B]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-xs font-mono px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-brass text-navy font-bold' : 'bg-paper-200 text-ink-muted'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {searchQuery && (
          <div className="text-xs font-mono text-ink-muted hidden md:block whitespace-nowrap">
            Filtering by: <span className="font-bold text-navy">"{searchQuery}"</span>
          </div>
        )}
      </div>

      {/* =========================================
          COMPLAINT LIST (TICKET-STUB COMPLAINTCARDS)
          ========================================= */}
      <div className="space-y-4">
        {filteredComplaints.length === 0 ? (
          /* ILLUSTRATED EMPTY STATE */
          <div className="bg-paper-50 rounded-3xl p-12 text-center border-2 border-dashed border-[#141E1B] shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-paper-200 border-2 border-[#141E1B] flex items-center justify-center text-ink-muted mb-4 transform -rotate-3">
              <FolderOpen className="w-8 h-8 opacity-70" />
            </div>
            <h3 className="font-ticket text-3xl uppercase tracking-wider text-ink">
              NO COMPLAINT TICKETS FOUND
            </h3>
            <p className="text-xs sm:text-sm font-mono text-ink-muted max-w-md mx-auto mt-2 leading-relaxed">
              {searchQuery
                ? `No ticket matching "${searchQuery}" exists in this view. Try adjusting your search query or switching tabs.`
                : `You have no tickets currently under the "${activeTab.toUpperCase()}" status.`}
            </p>

            <button
              onClick={() => {
                soundFX.playClick();
                onNewComplaint();
              }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy text-paper-50 font-ticket text-xl uppercase tracking-wider shadow-md hover:bg-navy-dark border-2 border-brass transition-all transform hover:scale-105"
            >
              <PlusCircle className="w-5 h-5 text-brass" />
              <span>+ FILE A NEW GRIEVANCE NOW</span>
            </button>
          </div>
        ) : (
          filteredComplaints.map((item) => (
            <ComplaintCard
              key={item.id}
              id={item.id}
              ticketNumber={item.ticketNumber}
              title={item.title}
              category={item.category}
              location={`${item.block}, ${item.roomNo}`}
              description={item.description}
              department={item.assignedDepartment}
              priority={item.urgency}
              status={item.status}
              date={new Date(item.createdAt).toLocaleDateString()}
              onSelect={onSelectComplaint}
            />
          ))
        )}
      </div>
    </div>
  );
};
