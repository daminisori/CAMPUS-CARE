import React from 'react';
import { useComplaints } from '../../context/ComplaintContext';
import { 
  Ticket, 
  PlusCircle, 
  Building2, 
  UserCheck, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Shield,
  GraduationCap,
  Wrench,
  LogIn
} from 'lucide-react';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const {
    activeRole,
    currentUser,
    switchRole,
    currentView,
    setCurrentView,
    soundEnabled,
    toggleSound,
    resetDemoData,
    unreadCount,
  } = useComplaints();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switchRole(e.target.value as UserRole);
  };

  return (
    <header className="sticky top-0 z-40 bg-navy border-b-4 border-brass shadow-md text-paper-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* LOGO & BRANDING */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentView('dashboard')}
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
              <p className="text-[11px] font-mono text-paper-300 tracking-wide hidden md:block">
                OFFICIAL GRIEVANCE & BOARDING DISPATCH LEDGER
              </p>
            </div>
          </div>

          {/* MAIN NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3.5 py-2 rounded-md font-bold transition-colors flex items-center gap-2 ${
                currentView === 'dashboard'
                  ? 'bg-paper-100 text-navy shadow-inner'
                  : 'text-paper-200 hover:text-white hover:bg-navy-light'
              }`}
            >
              <Ticket className="w-4 h-4 text-brass" />
              <span>Complaints</span>
              {unreadCount > 0 && (
                <span className="bg-[#B3452F] text-white text-[10px] font-mono px-1.5 py-0.2 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentView('submit')}
              className={`px-3.5 py-2 rounded-md font-bold transition-colors flex items-center gap-2 ${
                currentView === 'submit'
                  ? 'bg-brass text-navy shadow-inner'
                  : 'text-brass-light hover:bg-brass/20 border border-brass/40'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ New Complaint</span>
            </button>

            <button
              onClick={() => setCurrentView('department')}
              className={`px-3.5 py-2 rounded-md font-bold transition-colors flex items-center gap-2 ${
                currentView === 'department'
                  ? 'bg-paper-100 text-navy shadow-inner'
                  : 'text-paper-200 hover:text-white hover:bg-navy-light'
              }`}
            >
              <Building2 className="w-4 h-4 text-brass" />
              <span>Department Triage</span>
            </button>

            <button
              onClick={() => setCurrentView('login')}
              className={`px-3.5 py-2 rounded-md font-bold transition-colors flex items-center gap-2 ${
                currentView === 'login'
                  ? 'bg-paper-100 text-navy shadow-inner'
                  : 'text-paper-200 hover:text-white hover:bg-navy-light'
              }`}
            >
              <LogIn className="w-4 h-4 text-brass" />
              <span>Login Portal</span>
            </button>
          </nav>

          {/* RIGHT UTILITIES & ROLE SWITCHER */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute stamp/ticket sounds' : 'Enable audio feedback'}
              className="p-2 rounded-lg bg-navy-light/60 hover:bg-navy-light text-paper-300 hover:text-brass border border-navy-light transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-brass" /> : <VolumeX className="w-4 h-4 text-ink-faint" />}
            </button>

            {/* Reset Demo Data */}
            <button
              onClick={resetDemoData}
              title="Reset Ledger with sample tickets"
              className="hidden sm:flex p-2 rounded-lg bg-navy-light/60 hover:bg-navy-light text-paper-300 hover:text-white border border-navy-light transition-colors items-center gap-1.5 text-xs font-mono"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Reset Data</span>
            </button>

            {/* Quick Role Switcher */}
            <div className="flex items-center bg-navy-light/90 border border-brass/50 rounded-lg p-1">
              <div className="hidden sm:flex items-center pl-2 pr-1 text-brass text-xs font-mono">
                {activeRole === 'student' && <GraduationCap className="w-4 h-4 mr-1 text-brass" />}
                {activeRole === 'staff' && <Wrench className="w-4 h-4 mr-1 text-brass" />}
                {activeRole === 'admin' && <Shield className="w-4 h-4 mr-1 text-brass" />}
                <span className="capitalize font-bold text-paper-100">{activeRole}:</span>
              </div>

              <select
                value={activeRole}
                onChange={handleRoleChange}
                className="bg-navy text-xs font-mono text-paper-100 font-bold px-2 py-1 rounded border border-navy-light focus:outline-none focus:border-brass cursor-pointer"
              >
                <option value="student">Student (Aarav)</option>
                <option value="staff">Staff (Rajesh)</option>
                <option value="admin">Dean / Admin (Dr. Sunita)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden items-center justify-between py-2 border-t border-navy-light text-xs font-mono uppercase">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex-1 py-1 text-center font-bold flex items-center justify-center gap-1 ${
              currentView === 'dashboard' ? 'text-brass' : 'text-paper-300'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Complaints</span>
          </button>
          <button
            onClick={() => setCurrentView('submit')}
            className={`flex-1 py-1 text-center font-bold flex items-center justify-center gap-1 ${
              currentView === 'submit' ? 'text-brass' : 'text-paper-300'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Submit</span>
          </button>
          <button
            onClick={() => setCurrentView('department')}
            className={`flex-1 py-1 text-center font-bold flex items-center justify-center gap-1 ${
              currentView === 'department' ? 'text-brass' : 'text-paper-300'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Department</span>
          </button>
          <button
            onClick={() => setCurrentView('login')}
            className={`flex-1 py-1 text-center font-bold flex items-center justify-center gap-1 ${
              currentView === 'login' ? 'text-brass' : 'text-paper-300'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>
        </div>
      </div>
    </header>
  );
};
