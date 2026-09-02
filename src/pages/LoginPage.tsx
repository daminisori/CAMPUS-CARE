import React, { useState } from 'react';
import { useComplaints } from '../context/ComplaintContext';
import { Ticket, Shield, GraduationCap, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { switchRole, setCurrentView } = useComplaints();
  const [email, setEmail] = useState('aarav.mehta@campus.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playStampThud();
    switchRole(selectedRole);
    if (selectedRole === 'student') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('department');
    }
  };

  const handleQuickSelect = (role: UserRole, userEmail: string) => {
    soundFX.playClick();
    setSelectedRole(role);
    setEmail(userEmail);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-paper-50 rounded-2xl border-4 border-brass shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-navy p-6 text-center border-b-2 border-brass">
          <div className="w-14 h-14 mx-auto rounded-xl bg-brass text-navy flex items-center justify-center shadow-md mb-3 transform -rotate-3">
            <Ticket className="w-8 h-8 text-navy" />
          </div>
          <h1 className="font-ticket text-3xl tracking-widest text-paper-50 uppercase">
            CAMPUS CARE
          </h1>
          <p className="font-serif italic text-paper-300 text-sm mt-1">
            "File it. Track it. Get it fixed."
          </p>
        </div>

        {/* ROLE SELECTOR CHIPS */}
        <div className="p-6">
          <div className="mb-6">
            <label className="text-[11px] font-mono uppercase font-bold text-ink-muted tracking-wider block mb-2 text-center">
              SELECT SIGN-IN ROLE & PROFILE
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickSelect('student', 'aarav.mehta@campus.edu')}
                className={`p-2.5 rounded-xl border text-center font-mono text-xs transition-all ${
                  selectedRole === 'student'
                    ? 'bg-navy text-paper-50 border-brass shadow-sm font-bold'
                    : 'bg-paper-200/80 text-ink hover:bg-paper-300 border-[#D8D6CD]'
                }`}
              >
                <GraduationCap className="w-4 h-4 mx-auto mb-1 text-brass" />
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickSelect('staff', 'rajesh.maint@campus.edu')}
                className={`p-2.5 rounded-xl border text-center font-mono text-xs transition-all ${
                  selectedRole === 'staff'
                    ? 'bg-navy text-paper-50 border-brass shadow-sm font-bold'
                    : 'bg-paper-200/80 text-ink hover:bg-paper-300 border-[#D8D6CD]'
                }`}
              >
                <Wrench className="w-4 h-4 mx-auto mb-1 text-brass" />
                <span>Staff</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickSelect('admin', 'dean.studentaffairs@campus.edu')}
                className={`p-2.5 rounded-xl border text-center font-mono text-xs transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-navy text-paper-50 border-brass shadow-sm font-bold'
                    : 'bg-paper-200/80 text-ink hover:bg-paper-300 border-[#D8D6CD]'
                }`}
              >
                <Shield className="w-4 h-4 mx-auto mb-1 text-brass" />
                <span>Dean / Admin</span>
              </button>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-mono font-bold text-ink uppercase tracking-wide block mb-1">
                Institutional Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-paper-100 border border-[#D8D6CD] focus:border-brass focus:ring-1 focus:ring-brass text-sm font-mono text-ink"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-mono font-bold text-ink uppercase tracking-wide">
                  Password / Campus PIN
                </label>
                <a href="#forgot" className="text-[11px] font-mono text-brass-dark hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-paper-100 border border-[#D8D6CD] focus:border-brass focus:ring-1 focus:ring-brass text-sm font-mono text-ink"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-navy hover:bg-navy-dark text-paper-50 font-ticket text-lg tracking-widest uppercase shadow-lg border border-brass flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
            >
              <span>Log in to Ledger</span>
              <ArrowRight className="w-5 h-5 text-brass" />
            </button>
          </form>

          {/* FOOTER NOTE */}
          <div className="mt-6 pt-4 border-t border-dashed border-[#D8D6CD] text-center">
            <span className="text-[11px] font-mono text-ink-muted">
              Campus Grievance System • Single Sign-On Enabled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
