import React, { useState, useEffect } from 'react';
import { useComplaints } from '../context/ComplaintContext';
import { Complaint, ComplaintStatus } from '../types';
import { CATEGORIES, DEPARTMENTS } from '../constants/categories';
import { StampBadge } from '../components/common/StampBadge';
import { CategoryArtwork } from '../components/common/CategoryArtwork';
import { StatusStepper } from '../components/common/StatusStepper';
import { CommentThread } from '../components/common/CommentThread';
import { ComplaintCard } from '../components/ComplaintCard';
import { soundFX } from '../utils/audio';
import * as api from '../services/api';
import { 
  ChevronRight, 
  Printer, 
  MapPin, 
  Clock, 
  User, 
  Building, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Edit3
} from 'lucide-react';

interface ComplaintDetailsPageProps {
  complaintId: string;
  onBack: () => void;
}

export const ComplaintDetailsPage: React.FC<ComplaintDetailsPageProps> = ({
  complaintId,
  onBack,
}) => {
  const {
    getComplaintById,
    selectedComplaint,
    currentUser,
    updateStatus,
    assignStaff,
    addComment,
    setCurrentView,
  } = useComplaints();

  const [fetchedComplaint, setFetchedComplaint] = useState<Complaint | null>(null);

  const contextComplaint =
    getComplaintById(complaintId) ||
    (selectedComplaint && (selectedComplaint.id === complaintId || selectedComplaint.ticketNumber === complaintId)
      ? selectedComplaint
      : undefined);

  useEffect(() => {
    if (!contextComplaint && complaintId) {
      api.fetchComplaintById(complaintId)
        .then((data) => {
          if (data && (data.id || data.ticketNumber)) {
            setFetchedComplaint(data);
          }
        })
        .catch((err) => {
          console.warn('Direct ticket fetch error:', err);
        });
    }
  }, [complaintId, contextComplaint]);

  const complaint = contextComplaint || fetchedComplaint;

  const [selectedStatus, setSelectedStatus] = useState<ComplaintStatus>(complaint?.status || 'pending');
  const [statusRemark, setStatusRemark] = useState('');
  const [assigneeName, setAssigneeName] = useState(complaint?.assignedStaff || '');
  const [selectedDept, setSelectedDept] = useState(complaint?.assignedDepartment || DEPARTMENTS[0]);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    if (complaint) {
      setSelectedStatus(complaint.status);
      setAssigneeName(complaint.assignedStaff || '');
      setSelectedDept(complaint.assignedDepartment || DEPARTMENTS[0]);
    }
  }, [complaint?.id, complaint?.status, complaint?.assignedStaff, complaint?.assignedDepartment]);

  if (!complaint) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="font-ticket text-3xl uppercase text-ink">Ticket Not Found</h2>
        <p className="text-xs font-mono text-ink-muted mt-2">
          The requested ticket ID does not exist in the ledger.
        </p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2.5 rounded-lg bg-navy text-paper-50 font-mono text-xs font-bold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const cat = CATEGORIES[complaint.category] || CATEGORIES.equipment;
  const isStaffOrAdmin = currentUser.role === 'staff' || currentUser.role === 'admin';

  const handleApplyStatusChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingStatus(true);
    updateStatus(complaint.id, selectedStatus, statusRemark);
    setStatusRemark('');
    setTimeout(() => {
      setIsUpdatingStatus(false);
    }, 600);
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigneeName.trim()) return;
    assignStaff(complaint.id, assigneeName.trim(), selectedDept);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* BREADCRUMB & BACK ACTION */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            soundFX.playClick();
            onBack();
          }}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-navy hover:text-brass transition-colors bg-paper-50 px-3 py-1.5 rounded-lg border border-[#D8D6CD]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Complaints Ledger</span>
        </button>

        <button
          onClick={() => {
            soundFX.playClick();
            window.print();
          }}
          className="inline-flex items-center gap-1.5 text-xs font-mono bg-paper-50 hover:bg-paper-200 text-ink px-3 py-1.5 rounded-lg border border-[#D8D6CD] transition-colors"
        >
          <Printer className="w-4 h-4 text-brass" />
          <span className="hidden sm:inline">Print Boarding Pass</span>
        </button>
      </div>

      {/* Ticket Card */}
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
      <span className="capitalize font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
        Urgency: {complaint.urgency}
      </span>

      {/* LARGE STAMP BADGE */}
      <div className="flex flex-col items-start md:items-end justify-center">
        <div className="stamp-badge-large text-2xl" style={{
          color: complaint.status === 'resolved' ? '#4C7A4A' : complaint.status === 'in_review' ? '#3E6E9E' : complaint.status === 'escalated' ? '#B3452F' : '#C97C1F',
          borderColor: 'currentColor',
        }}>
          {complaint.status === 'in_review' ? 'IN REVIEW' : complaint.status.toUpperCase()}
        </div>
        <span className="text-[10px] font-mono text-ink-faint mt-2 tracking-widest uppercase">
          OFFICIAL LEDGER STAMP
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: SUMMARY CARD & EVIDENCE & COMMENTS */}
        <div className="lg:col-span-7 space-y-6">
          {/* SUMMARY CARD */}
          <div className="bg-paper-50 rounded-2xl p-6 border-2 border-[#D8D6CD] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#D8D6CD] pb-3">
              <div className="flex items-center gap-3">
                <CategoryArtwork category={complaint.category} size="md" />
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-ink-muted block">
                    CATEGORY
                  </span>
                  <span className="font-ticket text-lg uppercase tracking-wide text-ink">
                    {cat.title}
                  </span>
                </div>
              </div>
              <span
                className="text-xs font-ticket tracking-wider uppercase px-2.5 py-1 rounded border font-bold"
                style={{ color: cat.textColor, borderColor: cat.borderColor, backgroundColor: cat.bgLight }}
              >
                {cat.admitLabel}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase text-ink-muted mb-1">
                FULL DESCRIPTION
              </h4>
              <p className="text-xs sm:text-sm font-sans text-ink-light leading-relaxed whitespace-pre-wrap">
                {complaint.description}
              </p>
            </div>

            {/* APPLICANT & ASSIGNEE TILES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 bg-paper-200/70 rounded-xl border border-[#D8D6CD]">
                <div className="flex items-center gap-1.5 text-ink-muted mb-1">
                  <User className="w-3.5 h-3.5 text-brass" />
                  <span className="text-[10px] uppercase font-bold">STUDENT APPLICANT</span>
                </div>
                <div className="font-bold text-ink">{complaint.studentName}</div>
                <div className="text-[11px] text-ink-muted">{complaint.studentRoll} • {complaint.branch}</div>
              </div>

              <div className="p-3 bg-paper-200/70 rounded-xl border border-[#D8D6CD]">
                <div className="flex items-center gap-1.5 text-ink-muted mb-1">
                  <Building className="w-3.5 h-3.5 text-brass" />
                  <span className="text-[10px] uppercase font-bold">ASSIGNED HANDLER</span>
                </div>
                <div className="font-bold text-ink">
                  {complaint.assignedStaff || 'Unassigned (General Queue)'}
                </div>
                <div className="text-[11px] text-ink-muted">{complaint.assignedDepartment}</div>
              </div>
            </div>

            {/* PHOTO EVIDENCE VIEWER */}
            {complaint.photos && complaint.photos.length > 0 && (
              <div className="pt-3 border-t border-[#D8D6CD]">
                <h4 className="text-xs font-mono font-bold uppercase text-ink-muted mb-2">
                  ATTACHED EVIDENCE PHOTOS ({complaint.photos.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {complaint.photos.map((url, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative rounded-xl overflow-hidden border border-[#D8D6CD] hover:border-brass shadow-sm aspect-video block bg-paper-200"
                    >
                      <img
                        src={url}
                        alt={`Evidence ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-mono font-bold">
                        View Full Image ↗
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* COMMENTS & UPDATES THREAD */}
          <div className="bg-paper-50 rounded-2xl p-6 border-2 border-[#D8D6CD] shadow-sm">
            <CommentThread
              comments={complaint.comments}
              currentUser={currentUser}
              onAddComment={(text, isInternal) => addComment(complaint.id, text, isInternal)}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: STATUS TIMELINE STEPPER & STAFF ACTION PANEL */}
        <div className="lg:col-span-5 space-y-6">
          {/* STAFF TRIAGE ACTION PANEL (Visible to staff & admin) */}
          {isStaffOrAdmin && (
            <div className="bg-navy rounded-2xl p-6 border-2 border-brass shadow-xl text-paper-100 space-y-5">
              <div className="flex items-center justify-between border-b border-navy-light pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brass" />
                  <h3 className="font-ticket text-xl uppercase tracking-wider text-brass-light">
                    STAFF ACTION PANEL
                  </h3>
                </div>
                <span className="text-[10px] font-mono uppercase bg-brass/20 text-brass-light px-2 py-0.5 rounded font-bold">
                  {currentUser.role.toUpperCase()} CONSOLE
                </span>
              </div>

              {/* Status Updater with Live Stamp */}
              <form onSubmit={handleApplyStatusChange} className="space-y-3">
                <label className="text-xs font-mono font-bold uppercase text-paper-200 block">
                  Stamp New Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['pending', 'in_review', 'resolved', 'escalated'] as ComplaintStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        setSelectedStatus(st);
                      }}
                      className={`py-2 px-3 rounded-lg font-ticket text-sm uppercase tracking-wider border transition-all ${
                        selectedStatus === st
                          ? 'bg-brass text-navy font-bold border-white shadow-md'
                          : 'bg-navy-light/60 text-paper-200 border-navy-light hover:bg-navy-light'
                      }`}
                    >
                      {st === 'in_review' ? 'IN REVIEW' : st.toUpperCase()}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={statusRemark}
                  onChange={(e) => setStatusRemark(e.target.value)}
                  placeholder="Optional resolution or triage remark..."
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-navy-light text-xs font-mono text-paper-100 placeholder-paper-400 focus:border-brass focus:outline-none"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-brass hover:bg-brass-light text-navy font-ticket text-lg uppercase tracking-wider font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-4 h-4 text-navy" />
                  <span>APPLY OFFICIAL STAMP</span>
                </button>
              </form>

              {/* Staff Re-assignment */}
              <form onSubmit={handleAssignSubmit} className="pt-3 border-t border-navy-light space-y-2.5">
                <label className="text-xs font-mono font-bold uppercase text-paper-200 block">
                  Assign Staff Technician
                </label>
                <input
                  type="text"
                  value={assigneeName}
                  onChange={(e) => setAssigneeName(e.target.value)}
                  placeholder="Technician / Engineer name..."
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-navy-light text-xs font-mono text-paper-100 placeholder-paper-400 focus:border-brass focus:outline-none"
                />

                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-navy-light text-xs font-mono text-paper-100 focus:border-brass focus:outline-none"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-navy-light hover:bg-navy-light/80 text-paper-100 font-mono text-xs font-bold uppercase border border-brass/50 transition-colors"
                >
                  Update Assignment
                </button>
              </form>
            </div>
          )}

          {/* STATUS TIMELINE STEPPER */}
          <div className="bg-paper-50 rounded-2xl p-6 border-2 border-[#D8D6CD] shadow-sm">
            <h3 className="font-ticket text-xl uppercase tracking-wider text-navy mb-4 border-b border-[#D8D6CD] pb-2">
              DISPATCH & RESOLUTION TIMELINE
            </h3>
            <StatusStepper
              timeline={complaint.timeline}
              currentStatus={complaint.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
