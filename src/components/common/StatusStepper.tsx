import React from 'react';
import { TimelineEvent, ComplaintStatus } from '../../types';
import { CheckCircle2, Clock, AlertCircle, ShieldAlert, User, Building } from 'lucide-react';
import { StampBadge } from './StampBadge';

interface StatusStepperProps {
  timeline: TimelineEvent[];
  currentStatus: ComplaintStatus;
}

export const StatusStepper: React.FC<StatusStepperProps> = ({ timeline, currentStatus }) => {
  const steps: { status: ComplaintStatus; label: string; sub: string }[] = [
    { status: 'pending', label: '1. GRIEVANCE FILED', sub: 'Boarding ticket logged & queued' },
    { status: 'in_review', label: '2. IN TRIAGE & REVIEW', sub: 'Assigned to maintenance squad' },
    { status: 'resolved', label: '3. RESOLVED & VERIFIED', sub: 'Work inspected and closed' },
  ];

  const getStepState = (stepStatus: ComplaintStatus) => {
    if (currentStatus === 'escalated') {
      return stepStatus === 'pending' ? 'completed' : stepStatus === 'in_review' ? 'active' : 'upcoming';
    }
    if (currentStatus === 'resolved') {
      return 'completed';
    }
    if (currentStatus === 'in_review') {
      return stepStatus === 'pending' ? 'completed' : stepStatus === 'in_review' ? 'active' : 'upcoming';
    }
    // pending
    return stepStatus === 'pending' ? 'active' : 'upcoming';
  };

  return (
    <div className="space-y-6">
      {/* HORIZONTAL STEPPER OVERVIEW */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 p-4 rounded-xl bg-paper-200/70 border border-[#D8D6CD]">
        {steps.map((step) => {
          const state = getStepState(step.status);
          const isCurrent = currentStatus === step.status;

          return (
            <div
              key={step.status}
              className={`p-3 rounded-lg text-center transition-all border ${
                isCurrent
                  ? 'bg-paper-50 border-brass shadow-sm'
                  : state === 'completed'
                  ? 'bg-emerald-50/60 border-emerald-300'
                  : 'bg-transparent border-transparent opacity-60'
              }`}
            >
              <div className="flex justify-center mb-1">
                {state === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : isCurrent ? (
                  <Clock className="w-5 h-5 text-brass animate-pulse" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-ink-muted my-0.5" />
                )}
              </div>
              <span className="font-ticket text-xs sm:text-sm tracking-wide block uppercase text-ink">
                {step.label}
              </span>
              <span className="text-[10px] font-mono text-ink-muted hidden sm:block">
                {step.sub}
              </span>
            </div>
          );
        })}
      </div>

      {currentStatus === 'escalated' && (
        <div className="p-3 bg-red-50 border-2 border-dashed border-[#B3452F] rounded-lg flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-[#B3452F] flex-shrink-0" />
          <div className="text-xs font-mono text-[#B3452F]">
            <span className="font-bold uppercase tracking-wider block">ATTENTION: TICKET ESCALATED</span>
            Resolution SLA exceeded standard response window. Flagged to Estate Head.
          </div>
        </div>
      )}

      {/* DETAILED TIMELINE LOG */}
      <div className="relative pl-6 border-l-2 border-dashed border-[#D8D6CD] space-y-6 mt-6">
        {timeline.map((event) => {
          const formattedTime = new Date(event.timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div key={event.id} className="relative group">
              {/* Bullet Node */}
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-paper-100 border-2 border-brass flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-navy" />
              </div>

              <div className="bg-paper-50 p-3.5 rounded-xl border border-[#D8D6CD] hover:border-brass transition-colors shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="font-ticket text-sm uppercase tracking-wide text-navy">
                    {event.title}
                  </span>
                  <span className="text-[11px] font-mono text-ink-faint">
                    {formattedTime}
                  </span>
                </div>

                <p className="text-xs text-ink-light leading-relaxed">
                  {event.description}
                </p>

                <div className="mt-2 pt-2 border-t border-paper-300/60 flex items-center justify-between text-[11px] font-mono text-ink-muted">
                  <span className="flex items-center gap-1.5">
                    {event.actorRole === 'staff' ? (
                      <Building className="w-3.5 h-3.5 text-brass" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-ink-muted" />
                    )}
                    <span>{event.actor}</span>
                    <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-paper-200 border border-[#D8D6CD]">
                      {event.actorRole}
                    </span>
                  </span>

                  <StampBadge status={event.status} size="sm" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
