import React, { useState } from 'react';
import { useComplaints } from '../../context/ComplaintContext';
import { 
  Ticket, 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Sparkles,
  ChevronDown,
  Building2,
  PlusCircle
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface NavbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onNavigate?: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery = '',
  onSearchChange,
  onNavigate,
}) => {
  const {
    currentUser,
    activeRole,
    switchRole,
    currentView,
    setCurrentView,
    soundEnabled,
    toggleSound,
    resetDemoData,
    unreadCount,
  } = useComplaints();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleNav = (view: string) => {
    soundFX.playClick();
    if (onNavigate) {
      onNavigate(view);
    } else {
      setCurrentView(view);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-navy border-b-4 border-brass shadow-md text-paper-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* LEFT: WORDMARK / LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
            onClick={() => handleNav('dashboard')}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-brass text-navy flex items-center justify-center font-ticket font-bold text-xl shadow-inner border border-brass-light transform group-hover:rotate-3 transition-transform">
              <Ticket className="w-6 h-6 text-navy" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-ticket text-xl sm:text-2xl tracking-wider text-paper-50 group-hover:text-brass transition-colors">
                  CAMPUS CARE
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase bg-brass/20 text-brass-light border border-brass/40 px-1.5 py-0.5 rounded font-bold">
                  EST. 2026
                </span>
              </div>
              <p className="text-[10px] font-mono text-paper-300 tracking-wide hidden md:block">
                STUDENT GRIEVANCE & DISPATCH SYSTEM
              </p>
            </div>
          </div>

          {/* CENTER: SEARCH BAR */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-paper-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search complaint tickets, blocks, issues..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-navy-dark/80 border border-navy-light focus:border-brass focus:ring-1 focus:ring-brass text-xs font-mono text-paper-100 placeholder-paper-400 focus:outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          {/* RIGHT: NOTIFICATIONS & PROFILE AVATAR */}
          <div className="flex items-center gap-3">
            {/* Quick Submit CTA (Desktop) */}
            <button
              onClick={() => handleNav('submit')}
              className={`hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-lg font-ticket text-sm tracking-wider uppercase font-bold transition-all shadow-md ${
                currentView === 'submit'
                  ? 'bg-brass text-navy'
                  : 'bg-brass/20 hover:bg-brass text-brass hover:text-navy border border-brass/50'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ New Complaint</span>
            </button>

            {/* Department Console CTA */}
            <button
              onClick={() => handleNav('department')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs font-bold uppercase transition-all ${
                currentView === 'department'
                  ? 'bg-paper-100 text-navy'
                  : 'text-paper-300 hover:text-white hover:bg-navy-light'
              }`}
            >
              <Building2 className="w-4 h-4 text-brass" />
              <span className="hidden xl:inline">Triage</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsNotificationsOpen(!isNotificationsOpen);
                }}
                className="p-2.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-paper-300 hover:text-brass border border-navy-light transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-paper-50 text-ink rounded-xl border-2 border-brass shadow-2xl p-4 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-[#D8D6CD]">
                    <span className="font-ticket text-sm tracking-wider uppercase text-navy font-bold">
                      Campus Dispatch Alerts
                    </span>
                    <span className="text-[10px] font-mono text-ink-muted">
                      {unreadCount} pending
                    </span>
                  </div>
                  <div className="mt-2 space-y-2 text-xs font-mono">
                    <div className="p-2 rounded bg-paper-200/70 border border-[#D8D6CD]">
                      <div className="font-bold text-navy">Water Leakage in Block C</div>
                      <div className="text-[10px] text-ink-muted">Status: Pending Triage Dispatch</div>
                    </div>
                    <div className="p-2 rounded bg-paper-200/70 border border-[#D8D6CD]">
                      <div className="font-bold text-navy">Power Outage & MCB Tripping</div>
                      <div className="text-[10px] text-emerald-700">Status: Electrician Assigned</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar with Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                }}
                className="flex items-center gap-2 p-1 pl-2 rounded-xl bg-navy-light/80 hover:bg-navy-light border border-brass/40 transition-colors cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-lg object-cover border border-brass"
                />
                <span className="text-xs font-mono font-bold text-paper-100 hidden sm:inline max-w-[90px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-brass mr-1" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-paper-50 text-ink rounded-2xl border-2 border-brass shadow-2xl p-4 z-50 animate-fadeIn">
                  <div className="flex items-center gap-3 pb-3 border-b border-[#D8D6CD]">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-xl object-cover border border-brass"
                    />
                    <div>
                      <div className="font-bold text-sm text-ink font-serif">
                        {currentUser.name}
                      </div>
                      <div className="text-[11px] font-mono text-ink-muted">
                        {currentUser.email}
                      </div>
                      <div className="text-[10px] font-mono uppercase bg-brass/10 text-brass-dark font-bold px-1.5 py-0.2 rounded border border-brass/30 inline-block mt-0.5">
                        Role: {activeRole}
                      </div>
                    </div>
                  </div>

                  <div className="py-2 space-y-1 text-xs font-mono">
                    <div className="px-2 py-1 text-[10px] uppercase font-bold text-ink-muted">
                      Switch Role Account
                    </div>
                    <button
                      onClick={() => {
                        switchRole('student');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded hover:bg-paper-200 transition-colors flex items-center justify-between"
                    >
                      <span>🎓 Student (Damini / Aarav)</span>
                      {activeRole === 'student' && <span className="text-navy font-bold">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        switchRole('staff');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded hover:bg-paper-200 transition-colors flex items-center justify-between"
                    >
                      <span>🔧 Staff (Rajesh Sharma)</span>
                      {activeRole === 'staff' && <span className="text-navy font-bold">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        switchRole('admin');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded hover:bg-paper-200 transition-colors flex items-center justify-between"
                    >
                      <span>🛡️ Dean / Admin (Dr. Sunita)</span>
                      {activeRole === 'admin' && <span className="text-navy font-bold">✓</span>}
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#D8D6CD] flex items-center justify-between">
                    <button
                      onClick={toggleSound}
                      className="text-xs font-mono text-ink-muted hover:text-ink flex items-center gap-1.5"
                    >
                      {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-brass" /> : <VolumeX className="w-3.5 h-3.5 text-ink-faint" />}
                      <span>{soundEnabled ? 'Audio On' : 'Muted'}</span>
                    </button>

                    <button
                      onClick={() => {
                        handleNav('login');
                        setIsProfileMenuOpen(false);
                      }}
                      className="text-xs font-mono text-red-700 hover:underline flex items-center gap-1 font-bold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-paper-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search complaint tickets..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-navy-dark border border-navy-light text-xs font-mono text-paper-100 placeholder-paper-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
