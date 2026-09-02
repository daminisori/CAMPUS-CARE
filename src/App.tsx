import React, { useState } from 'react';
import { ComplaintProvider, useComplaints } from './context/ComplaintContext';
import { Navbar } from './components/layout/Navbar';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { SubmitComplaintPage } from './pages/SubmitComplaintPage';
import { ComplaintDetailsPage } from './pages/ComplaintDetailsPage';
import { DepartmentDashboard } from './pages/DepartmentDashboard';
import { TicketDispenserModal } from './components/common/TicketDispenserModal';
import { Complaint } from './types';
import { X, CheckCircle } from 'lucide-react';

const MainApp: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    selectedComplaint,
    setSelectedComplaint,
    getComplaintById,
    notification,
    dismissNotification,
  } = useComplaints();

  const [searchQuery, setSearchQuery] = useState('');
  const [dispensedTicket, setDispensedTicket] = useState<Complaint | null>(null);
  const [isDispenserOpen, setIsDispenserOpen] = useState(false);

  const handleSelectComplaintById = (id: string) => {
    const complaint = getComplaintById(id);
    if (complaint) {
      setSelectedComplaint(complaint);
      setCurrentView('details');
    }
  };

  const handleSelectComplaintObj = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setCurrentView('details');
  };

  const handleTicketGenerated = (newTicket: Complaint) => {
    setDispensedTicket(newTicket);
    setIsDispenserOpen(true);
  };

  const handleViewDispensedDetails = (complaint: Complaint) => {
    setIsDispenserOpen(false);
    setSelectedComplaint(complaint);
    setCurrentView('details');
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper-100 text-ink selection:bg-brass selection:text-navy">
      {/* GLOBAL TOAST NOTIFICATION */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy text-paper-50 px-4 py-3 rounded-2xl shadow-2xl border-2 border-brass flex items-center gap-3 animate-slideUp">
          <CheckCircle className="w-5 h-5 text-brass flex-shrink-0" />
          <span className="text-xs font-mono font-semibold">{notification}</span>
          <button
            onClick={dismissNotification}
            className="p-1 hover:bg-navy-light rounded text-paper-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* NAVBAR */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={(view) => setCurrentView(view)}
      />

      {/* MAIN VIEWPORT */}
      <main className="flex-1">
        {currentView === 'login' && <LoginPage />}

        {currentView === 'dashboard' && (
          <Dashboard
            searchQuery={searchQuery}
            onSelectComplaint={handleSelectComplaintById}
            onNewComplaint={() => setCurrentView('submit')}
          />
        )}

        {currentView === 'submit' && (
          <SubmitComplaintPage onTicketGenerated={handleTicketGenerated} />
        )}

        {currentView === 'department' && (
          <DepartmentDashboard onSelectComplaint={handleSelectComplaintObj} />
        )}

        {currentView === 'details' && selectedComplaint && (
          <ComplaintDetailsPage
            complaintId={selectedComplaint.id}
            onBack={() => setCurrentView('dashboard')}
          />
        )}
      </main>

      {/* MECHANICAL BOARDING TICKET DISPENSER MODAL */}
      <TicketDispenserModal
        complaint={dispensedTicket}
        isOpen={isDispenserOpen}
        onClose={() => setIsDispenserOpen(false)}
        onViewDetails={handleViewDispensedDetails}
      />

      {/* VINTAGE LEDGER FOOTER */}
      <footer className="bg-paper-200/90 border-t-2 border-[#D8D6CD] py-6 text-center text-xs font-mono text-ink-muted no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2026 Campus Care Grievance Redressal Cell • Administrative Dispatch
          </span>
          <span className="font-ticket text-sm tracking-wider uppercase text-navy font-bold">
            ADMIT ONE • RETRO ILLUSTRATED TICKET STUB LEDGER
          </span>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <ComplaintProvider>
      <MainApp />
    </ComplaintProvider>
  );
}

export default App;
