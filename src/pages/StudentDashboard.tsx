import React, { useState } from 'react';
import { useComplaints } from '../context/ComplaintContext';
import { TicketStub } from '../components/common/TicketStub';
import { StampBadge } from '../components/common/StampBadge';
import { Complaint, ComplaintStatus } from '../types';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Ticket, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  FolderOpen,
  Building,
  User
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface StudentDashboardProps {
  onSelectComplaint: (complaint: Complaint) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onSelectComplaint }) => {
  const { complaints, currentUser, setCurrentView } = useComplaints();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter complaints
  const filteredComplaints = complaints.filter((item) => {
    const matchesTab = activeTab === 'all' || item.status === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.block.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const totalCount = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === 'pending').length;
  const inReviewCount = complaints.filter((c) => c.status === 'in_review').length;
  const resolvedCount = complaints.filter((c) => c.status === 'resolved').length;
  const escalatedCount = complaints.filter((c) => c.status === 'escalated').length;

  const handleTabChange = (tab: string) => {
    soundFX.playClick();
    setActiveTab(tab);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* GREETING & PAGE HERO BANNER */}
      <div className="bg-paper-50 rounded-2xl p-6 sm:p-8 border-2 border-[#D8D6CD] shadow-sm relative overflow-hidden">
        {/* Background watermark deco */}
        <div className="absolute right-4 -bottom-6 text-9xl font-ticket text-navy/5 select-none pointer-events-none">
          STAMP
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-brass shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
                  Welcome, {currentUser.name}
                </h1>
              </div>
              <p className="text-xs sm:text-sm font-mono text-ink-muted mt-1 flex flex-wrap items-center gap-2">
                {currentUser.role === 'student' ? (
                  <>
                    <span>{currentUser.branch || 'CSE Department'}</span>
                    <span>•</span>
                    <span className="text-navy font-bold">{currentUser.block}</span>
                    <span>•</span>
                    <span>{currentUser.room}</span>
                  </>
                ) : (
                  <>
                    <span className="text-navy font-bold">{currentUser.department || 'Faculty & Administration'}</span>
                    <span>•</span>
                    <span>{currentUser.role === 'admin' ? 'Dean / Administrative Office' : 'Staff & Maintenance Division'}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* CENTRE / PRIMARY ACTION BUTTON */}
          <button
            onClick={() => {
              soundFX.playClick();
              setCurrentView('submit');
            }}
            className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-navy hover:bg-navy-dark text-paper-50 font-ticket text-xl tracking-wider uppercase shadow-xl border-2 border-brass flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95 group"
          >
            <PlusCircle className="w-6 h-6 text-brass group-hover:rotate-90 transition-transform duration-300" />
            <span>+ FILE NEW COMPLAINT</span>
          </button>
        </div>
      </div>

      {/* STAT STRIP - 4 METRIC CARDS WITH VINTAGE LEDGER DECO */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Filed */}
        <div
          onClick={() => handleTabChange('all')}
          className={`p-5 rounded-xl bg-paper-50 border-2 transition-all cursor-pointer ${
            activeTab === 'all' ? 'border-navy shadow-md ring-1 ring-navy' : 'border-[#D8D6CD] hover:border-navy'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-ink-muted">TOTAL TICKETS</span>
            <Ticket className="w-5 h-5 text-navy" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-ticket text-3xl sm:text-4xl font-bold text-navy">
              {totalCount}
            </span>
            <span className="text-[11px] font-mono text-ink-faint">Logged on campus</span>
          </div>
        </div>

        {/* Card 2: Pending */}
        <div
          onClick={() => handleTabChange('pending')}
          className={`p-5 rounded-xl bg-paper-50 border-2 transition-all cursor-pointer ${
            activeTab === 'pending' ? 'border-[#C97C1F] shadow-md ring-1 ring-[#C97C1F]' : 'border-[#D8D6CD] hover:border-[#C97C1F]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-[#C97C1F]">AWAITING TRIAGE</span>
            <Clock className="w-5 h-5 text-[#C97C1F]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-ticket text-3xl sm:text-4xl font-bold text-[#C97C1F]">
              {pendingCount}
            </span>
            <StampBadge status="pending" size="sm" />
          </div>
        </div>

        {/* Card 3: In Review */}
        <div
          onClick={() => handleTabChange('in_review')}
          className={`p-5 rounded-xl bg-paper-50 border-2 transition-all cursor-pointer ${
            activeTab === 'in_review' ? 'border-[#3E6E9E] shadow-md ring-1 ring-[#3E6E9E]' : 'border-[#D8D6CD] hover:border-[#3E6E9E]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-[#3E6E9E]">IN PROGRESS</span>
            <Building className="w-5 h-5 text-[#3E6E9E]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-ticket text-3xl sm:text-4xl font-bold text-[#3E6E9E]">
              {inReviewCount}
            </span>
            <StampBadge status="in_review" size="sm" />
          </div>
        </div>

        {/* Card 4: Resolved */}
        <div
          onClick={() => handleTabChange('resolved')}
          className={`p-5 rounded-xl bg-paper-50 border-2 transition-all cursor-pointer ${
            activeTab === 'resolved' ? 'border-[#4C7A4A] shadow-md ring-1 ring-[#4C7A4A]' : 'border-[#D8D6CD] hover:border-[#4C7A4A]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-[#4C7A4A]">RESOLVED</span>
            <CheckCircle2 className="w-5 h-5 text-[#4C7A4A]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-ticket text-3xl sm:text-4xl font-bold text-[#4C7A4A]">
              {resolvedCount}
            </span>
            <StampBadge status="resolved" size="sm" />
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b-2 border-dashed border-[#D8D6CD]">
        {/* TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 font-mono text-xs">
          {[
            { id: 'all', label: `ALL (${totalCount})` },
            { id: 'pending', label: `PENDING (${pendingCount})` },
            { id: 'in_review', label: `IN REVIEW (${inReviewCount})` },
            { id: 'resolved', label: `RESOLVED (${resolvedCount})` },
            { id: 'escalated', label: `ESCALATED (${escalatedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-3.5 py-2 rounded-lg font-bold uppercase whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-navy text-paper-50 shadow-sm border border-brass'
                  : 'bg-paper-200/80 text-ink-muted hover:bg-paper-300 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SEARCH INPUT */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search block, issue, ID..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-paper-50 border border-[#D8D6CD] text-xs font-mono text-ink focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-ink-faint hover:text-ink"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* TICKET STUB LIST */}
      <div className="space-y-4">
        {filteredComplaints.length === 0 ? (
          /* HONEST EMPTY STATE */
          <div className="bg-paper-50 rounded-2xl p-12 text-center border-2 border-dashed border-[#D8D6CD]">
            <FolderOpen className="w-12 h-12 mx-auto text-ink-muted mb-3 opacity-60" />
            <h3 className="font-ticket text-2xl uppercase tracking-wider text-ink">
              NO GRIEVANCE TICKETS FOUND
            </h3>
            <p className="text-xs font-mono text-ink-muted max-w-md mx-auto mt-2 leading-relaxed">
              {searchQuery
                ? `No ticket matches your search "${searchQuery}". Try clearing filters.`
                : `There are currently no complaints filed under the "${activeTab.toUpperCase()}" status.`}
            </p>
            <button
              onClick={() => {
                soundFX.playClick();
                setCurrentView('submit');
              }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy text-paper-50 font-ticket text-lg uppercase tracking-wider shadow-md hover:bg-navy-dark border border-brass transition-all"
            >
              <PlusCircle className="w-5 h-5 text-brass" />
              <span>+ FILE A GRIEVANCE NOW</span>
            </button>
          </div>
        ) : (
          filteredComplaints.map((item) => (
            <TicketStub
              key={item.id}
              complaint={item}
              onSelect={onSelectComplaint}
            />
          ))
        )}
      </div>
    </div>
  );
};
