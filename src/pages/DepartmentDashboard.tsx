import React, { useState } from 'react';
import { useComplaints } from '../context/ComplaintContext';
import { Complaint, ComplaintStatus, CategoryId } from '../types';
import { CATEGORIES, DEPARTMENTS } from '../constants/categories';
import { StampBadge } from '../components/common/StampBadge';
import { CategoryArtwork } from '../components/common/CategoryArtwork';
import { soundFX } from '../utils/audio';
import { 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Search, 
  Filter, 
  ArrowUpDown, 
  UserPlus, 
  Edit3,
  BarChart3,
  PieChart,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface DepartmentDashboardProps {
  onSelectComplaint: (complaint: Complaint) => void;
}

export const DepartmentDashboard: React.FC<DepartmentDashboardProps> = ({ onSelectComplaint }) => {
  const {
    complaints,
    currentUser,
    updateStatus,
    assignStaff,
    setCurrentView,
  } = useComplaints();

  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<ComplaintStatus>('in_review');

  // Filter complaints
  const filtered = complaints.filter((item) => {
    const matchesDept = selectedDeptFilter === 'all' || item.assignedDepartment === selectedDeptFilter;
    const matchesStatus = selectedStatusFilter === 'all' || item.status === selectedStatusFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.block.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDept && matchesStatus && matchesSearch;
  });

  // Analytics Metrics
  const totalAssigned = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === 'pending').length;
  const inReviewCount = complaints.filter((c) => c.status === 'in_review').length;
  const resolvedCount = complaints.filter((c) => c.status === 'resolved').length;
  const escalatedCount = complaints.filter((c) => c.status === 'escalated').length;

  // Category counts
  const categoryCounts: Record<CategoryId, number> = {
    equipment: complaints.filter(c => c.category === 'equipment').length,
    power: complaints.filter(c => c.category === 'power').length,
    water: complaints.filter(c => c.category === 'water').length,
    sanitation: complaints.filter(c => c.category === 'sanitation').length,
    housing: complaints.filter(c => c.category === 'housing').length,
    network: complaints.filter(c => c.category === 'network').length,
    security: complaints.filter(c => c.category === 'security').length,
    admin: complaints.filter(c => c.category === 'admin').length,
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedTickets(filtered.map(c => c.id));
    } else {
      setSelectedTickets([]);
    }
  };

  const handleToggleTicket = (id: string) => {
    soundFX.playClick();
    setSelectedTickets(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleApplyBulkStatus = () => {
    if (selectedTickets.length === 0) return;
    soundFX.playStampThud();
    selectedTickets.forEach(id => {
      updateStatus(id, bulkStatus, `Batch triage update applied by ${currentUser.name}`);
    });
    setSelectedTickets([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HEADER WITH DEPARTMENT IDENTITY */}
      <div className="bg-navy rounded-2xl p-6 sm:p-8 border-2 border-brass text-paper-100 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-brass" />
            <span className="text-xs font-mono uppercase tracking-widest text-brass-light font-bold">
              ESTATE & GRIEVANCE TRIAGE SYSTEM
            </span>
          </div>
          <h1 className="font-ticket text-3xl sm:text-4xl uppercase tracking-wider text-paper-50">
            {currentUser.department || 'CAMPUS MAINTENANCE & OPERATIONS'}
          </h1>
          <p className="text-xs font-mono text-paper-300">
            Operator: {currentUser.name} ({currentUser.role.toUpperCase()}) • Live SLA Monitoring
          </p>
        </div>

        <div className="flex items-center gap-3">
          <StampBadge label="TRIAGE ACTIVE" size="md" />
        </div>
      </div>

      {/* 4 METRIC CARDS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-paper-50 p-5 rounded-xl border-2 border-[#D8D6CD] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-ink-muted">TOTAL ACTIVE</span>
            <Layers className="w-4 h-4 text-navy" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-ticket text-3xl font-bold text-navy">{totalAssigned}</span>
            <span className="text-[11px] font-mono text-ink-faint">In ledger</span>
          </div>
        </div>

        <div className="bg-paper-50 p-5 rounded-xl border-2 border-[#D8D6CD] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-amber-700">AVG RESOLUTION</span>
            <Clock className="w-4 h-4 text-amber-700" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-ticket text-3xl font-bold text-amber-800">18.4 hrs</span>
            <span className="text-[11px] font-mono text-emerald-700 font-bold">↓ 14% Faster</span>
          </div>
        </div>

        <div className="bg-paper-50 p-5 rounded-xl border-2 border-[#D8D6CD] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-red-700">ESCALATED SLA</span>
            <ShieldAlert className="w-4 h-4 text-red-700" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-ticket text-3xl font-bold text-red-700">{escalatedCount}</span>
            <StampBadge status="escalated" size="sm" />
          </div>
        </div>

        <div className="bg-paper-50 p-5 rounded-xl border-2 border-[#D8D6CD] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-emerald-700">RESOLVED (WEEK)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-ticket text-3xl font-bold text-emerald-700">{resolvedCount}</span>
            <StampBadge status="resolved" size="sm" />
          </div>
        </div>
      </div>

      {/* ANALYTICS VISUAL BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown Bars */}
        <div className="lg:col-span-8 bg-paper-50 p-6 rounded-2xl border-2 border-[#D8D6CD] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#D8D6CD] pb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-brass" />
              <h3 className="font-ticket text-lg uppercase tracking-wider text-navy">
                Grievance Volume by Category
              </h3>
            </div>
            <span className="text-[11px] font-mono text-ink-muted">8 Campus Sectors</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {Object.values(CATEGORIES).map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const percent = totalAssigned > 0 ? Math.round((count / totalAssigned) * 100) : 0;

              return (
                <div
                  key={cat.id}
                  className="p-2.5 rounded-xl bg-paper-100 border border-[#D8D6CD] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    <CategoryArtwork category={cat.id} size="sm" />
                    <div>
                      <span className="font-ticket text-xs uppercase tracking-wide text-ink block">
                        {cat.title}
                      </span>
                      <span className="text-[10px] font-mono text-ink-muted">
                        {count} tickets logged
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-navy">{percent}%</span>
                    <div className="w-16 h-1.5 bg-paper-300 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: cat.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Distribution Visual */}
        <div className="lg:col-span-4 bg-paper-50 p-6 rounded-2xl border-2 border-[#D8D6CD] shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-[#D8D6CD] pb-2 mb-3">
              <PieChart className="w-4 h-4 text-brass" />
              <h3 className="font-ticket text-lg uppercase tracking-wider text-navy">
                Resolution Health
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#C97C1F] font-bold">Pending Triage</span>
                  <span className="font-bold">{pendingCount} ({Math.round((pendingCount/totalAssigned)*100 || 0)}%)</span>
                </div>
                <div className="h-2 bg-paper-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C97C1F]" style={{ width: `${(pendingCount/totalAssigned)*100 || 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#3E6E9E] font-bold">In Progress & Review</span>
                  <span className="font-bold">{inReviewCount} ({Math.round((inReviewCount/totalAssigned)*100 || 0)}%)</span>
                </div>
                <div className="h-2 bg-paper-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3E6E9E]" style={{ width: `${(inReviewCount/totalAssigned)*100 || 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#4C7A4A] font-bold">Resolved & Closed</span>
                  <span className="font-bold">{resolvedCount} ({Math.round((resolvedCount/totalAssigned)*100 || 0)}%)</span>
                </div>
                <div className="h-2 bg-paper-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4C7A4A]" style={{ width: `${(resolvedCount/totalAssigned)*100 || 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#B3452F] font-bold">Escalated Overdue</span>
                  <span className="font-bold">{escalatedCount} ({Math.round((escalatedCount/totalAssigned)*100 || 0)}%)</span>
                </div>
                <div className="h-2 bg-paper-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#B3452F]" style={{ width: `${(escalatedCount/totalAssigned)*100 || 0}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-navy/5 rounded-xl border border-navy/10 text-[11px] font-mono text-ink-muted">
            ⚡ Average response time across campus is currently within the target 24h SLA.
          </div>
        </div>
      </div>

      {/* DENSE SORTABLE TRIAGE QUEUE */}
      <div className="bg-paper-50 rounded-2xl border-2 border-[#D8D6CD] shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 sm:p-6 border-b border-[#D8D6CD] space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-ticket text-2xl uppercase tracking-wider text-navy">
                TRIAGE DISPATCH QUEUE ({filtered.length})
              </h3>
              <p className="text-xs font-mono text-ink-muted">
                Inspect tickets, stamp statuses, and reassign maintenance squads in real time.
              </p>
            </div>

            {/* Bulk Action Controls */}
            {selectedTickets.length > 0 && (
              <div className="flex items-center gap-2 p-2 bg-navy text-paper-50 rounded-xl border border-brass">
                <span className="text-xs font-mono font-bold px-2">
                  {selectedTickets.length} Selected:
                </span>
                <select
                  value={bulkStatus}
                  onChange={(e) => setBulkStatus(e.target.value as ComplaintStatus)}
                  className="bg-navy-dark text-xs font-mono px-2 py-1 rounded border border-navy-light text-paper-100"
                >
                  <option value="pending">Pending</option>
                  <option value="in_review">In Review</option>
                  <option value="resolved">Resolved</option>
                  <option value="escalated">Escalated</option>
                </select>
                <button
                  onClick={handleApplyBulkStatus}
                  className="px-3 py-1 rounded bg-brass text-navy font-mono text-xs font-bold uppercase hover:bg-brass-light transition-colors"
                >
                  Stamp All
                </button>
              </div>
            )}
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search serial, student, title, hostel..."
                className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-lg bg-paper-100 border border-[#D8D6CD] text-ink focus:border-brass focus:outline-none"
              />
            </div>

            <select
              value={selectedDeptFilter}
              onChange={(e) => setSelectedDeptFilter(e.target.value)}
              className="px-3 py-2 text-xs font-mono rounded-lg bg-paper-100 border border-[#D8D6CD] text-ink focus:border-brass"
            >
              <option value="all">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs font-mono rounded-lg bg-paper-100 border border-[#D8D6CD] text-ink focus:border-brass"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_review">In Review</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#D8D6CD] bg-paper-200/80 text-[11px] font-mono font-bold uppercase text-ink-muted">
                <th className="p-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={filtered.length > 0 && selectedTickets.length === filtered.length}
                    className="rounded text-navy focus:ring-brass"
                  />
                </th>
                <th className="p-3.5">Ticket Serial</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Problem / Location</th>
                <th className="p-3.5">Applicant</th>
                <th className="p-3.5">Handler / Dept</th>
                <th className="p-3.5 text-center">Status Stamp</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8D6CD] text-xs font-mono">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-ink-muted">
                    No tickets matching current triage criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const cat = CATEGORIES[item.category] || CATEGORIES.equipment;
                  const isChecked = selectedTickets.includes(item.id);

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-paper-200/50 transition-colors ${
                        isChecked ? 'bg-brass/5' : ''
                      }`}
                    >
                      <td className="p-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleTicket(item.id)}
                          className="rounded text-navy focus:ring-brass"
                        />
                      </td>

                      <td className="p-3.5 font-bold text-navy whitespace-nowrap">
                        <div>{item.id}</div>
                        <div className="text-[10px] text-ink-muted">{item.ticketNumber}</div>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <CategoryArtwork category={item.category} size="sm" />
                          <span className="font-ticket uppercase text-ink">{cat.title}</span>
                        </div>
                      </td>

                      <td className="p-3.5 max-w-xs">
                        <div className="font-bold text-ink truncate font-sans text-xs">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-ink-muted truncate">
                          {item.block} • {item.roomNo}
                        </div>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <div className="text-ink font-bold">{item.studentName}</div>
                        <div className="text-[10px] text-ink-muted">{item.studentRoll}</div>
                      </td>

                      <td className="p-3.5 max-w-[180px]">
                        <div className="font-bold text-navy truncate">
                          {item.assignedStaff || 'Unassigned'}
                        </div>
                        <div className="text-[10px] text-ink-muted truncate">
                          {item.assignedDepartment}
                        </div>
                      </td>

                      <td className="p-3.5 text-center whitespace-nowrap">
                        <StampBadge status={item.status} size="sm" />
                      </td>

                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              soundFX.playClick();
                              onSelectComplaint(item);
                            }}
                            className="px-2.5 py-1 rounded bg-navy hover:bg-navy-dark text-paper-50 font-bold text-[11px] uppercase transition-colors"
                          >
                            Triage
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
