import React, { createContext, useContext, useState, useEffect } from 'react';
import { Complaint, ComplaintStatus, UserProfile, UserRole } from '../types';
import { soundFX } from '../utils/audio';

interface ComplaintContextType {
  complaints: Complaint[];
  currentUser: UserProfile;
  activeRole: UserRole;
  currentView: string;
  selectedComplaint: Complaint | null;
  notification: string | null;
  unreadCount: number;
  soundEnabled: boolean;
  
  // Actions
  setCurrentView: (view: string) => void;
  setSelectedComplaint: (complaint: Complaint | null) => void;
  switchRole: (role: UserRole) => void;
  createComplaint: (newComplaint: Omit<Complaint, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'timeline' | 'comments'>) => Complaint;
  updateStatus: (id: string, newStatus: ComplaintStatus, remark?: string) => void;
  assignStaff: (id: string, staffName: string, department: string) => void;
  addComment: (complaintId: string, text: string, isInternal?: boolean) => void;
  toggleSound: () => void;
  resetDemoData: () => void;
  dismissNotification: () => void;
  getComplaintById: (id: string) => Complaint | undefined;
}

const DEFAULT_USERS: Record<UserRole, UserProfile> = {
  student: {
    id: 'usr-std-01',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@campus.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    branch: 'Computer Science & Engineering',
    block: 'Block C (Charaka)',
    room: 'Room 304',
  },
  staff: {
    id: 'usr-stf-02',
    name: 'Rajesh Sharma',
    email: 'rajesh.maint@campus.edu',
    role: 'staff',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    department: 'Campus Maintenance & Electricals',
  },
  admin: {
    id: 'usr-adm-03',
    name: 'Dr. Sunita Rao',
    email: 'dean.studentaffairs@campus.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    department: 'Academic & Student Affairs Office',
  },
};

const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'TCK-345',
    ticketNumber: 'No. 345',
    category: 'water',
    title: 'Water cooler not working in Block C',
    description: 'The primary drinking water cooler on the 2nd floor of Block C is not dispensing cold water and the lower basin drainage pipe is blocked, causing minor water pooling on the floor.',
    status: 'pending',
    urgency: 'high',
    studentName: 'Aarav Mehta',
    studentRoll: '2023CSB1042',
    studentEmail: 'aarav.mehta@campus.edu',
    branch: 'Computer Science & Engineering',
    block: 'Block C (Charaka)',
    roomNo: 'Floor 2 (Near 208)',
    campusArea: 'Hostel Block C',
    assignedDepartment: 'Civil & Plumbing Services',
    photos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'
    ],
    createdAt: '2026-09-01T08:30:00Z',
    updatedAt: '2026-09-01T08:30:00Z',
    expectedResolution: 'Within 24 Hours',
    timeline: [
      {
        id: 'tl-1',
        status: 'pending',
        title: 'Boarding Ticket Issued',
        description: 'Grievance ticket generated and dispatched to Civil & Plumbing Services dispatch queue.',
        actor: 'Aarav Mehta',
        actorRole: 'student',
        timestamp: '2026-09-01T08:30:00Z',
      }
    ],
    comments: [
      {
        id: 'cm-1',
        author: 'Aarav Mehta',
        authorRole: 'student',
        text: 'Students on the 2nd and 3rd floor are currently having to walk down to the ground floor for drinking water. Please prioritize this.',
        timestamp: '2026-09-01T08:35:00Z',
      }
    ],
  },
  {
    id: 'TCK-294',
    ticketNumber: 'No. 294',
    category: 'power',
    title: 'Power Outage & MCB Tripping in Block B Room 204',
    description: 'The circuit breaker in Room 204 keeps tripping whenever study lamps or laptops are plugged in. There is a slight burning smell near the socket board.',
    status: 'in_review',
    urgency: 'urgent',
    studentName: 'Aarav Mehta',
    studentRoll: '2023CSB1042',
    studentEmail: 'aarav.mehta@campus.edu',
    branch: 'Computer Science & Engineering',
    block: 'Block B (Bhaskara)',
    roomNo: 'Room 204',
    assignedDepartment: 'Campus Maintenance & Electricals',
    assignedStaff: 'Rajesh Sharma (Senior Electrician)',
    photos: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    createdAt: '2026-08-31T14:15:00Z',
    updatedAt: '2026-09-01T10:00:00Z',
    expectedResolution: 'Today by 5:00 PM',
    timeline: [
      {
        id: 'tl-21',
        status: 'pending',
        title: 'Ticket Logged',
        description: 'Electrical hazard reported in Block B.',
        actor: 'Aarav Mehta',
        actorRole: 'student',
        timestamp: '2026-08-31T14:15:00Z',
      },
      {
        id: 'tl-22',
        status: 'in_review',
        title: 'Assigned to Electrician Squad',
        description: 'Assigned to Rajesh Sharma. Replacement 16A MCB issued from electrical inventory.',
        actor: 'Rajesh Sharma',
        actorRole: 'staff',
        timestamp: '2026-09-01T10:00:00Z',
      }
    ],
    comments: [
      {
        id: 'cm-21',
        author: 'Rajesh Sharma',
        authorRole: 'staff',
        text: 'Inspected the distribution box. The wire insulation had slight wear. Arriving at Room 204 at 2:00 PM to replace the MCB fuse switch.',
        timestamp: '2026-09-01T10:05:00Z',
      }
    ],
  },
  {
    id: 'TCK-280',
    ticketNumber: 'No. 280',
    category: 'network',
    title: 'Wi-Fi Signal Weak & Disconnecting in CS Lab Floor 3',
    description: 'The ceiling-mounted access point in the 3rd floor CS Lab is dropping packets continuously. Latency is > 800ms making online compiler submissions fail.',
    status: 'resolved',
    urgency: 'medium',
    studentName: 'Priya Nair',
    studentRoll: '2022ITB089',
    studentEmail: 'priya.nair@campus.edu',
    branch: 'Information Technology',
    block: 'Central Library & Labs',
    roomNo: 'CS Lab 301',
    assignedDepartment: 'IT & Campus Network Cell',
    assignedStaff: 'Vikram Verma (Network Admin)',
    photos: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    ],
    createdAt: '2026-08-28T09:20:00Z',
    updatedAt: '2026-08-29T16:45:00Z',
    expectedResolution: 'Resolved',
    timeline: [
      {
        id: 'tl-31',
        status: 'pending',
        title: 'Network Ticket Dispatched',
        description: 'AP signal degradation report received.',
        actor: 'Priya Nair',
        actorRole: 'student',
        timestamp: '2026-08-28T09:20:00Z',
      },
      {
        id: 'tl-32',
        status: 'in_review',
        title: 'Router Diagnostics',
        description: 'Firmware reset and channel reconfiguration initiated on AP-CS-03.',
        actor: 'Vikram Verma',
        actorRole: 'staff',
        timestamp: '2026-08-29T11:00:00Z',
      },
      {
        id: 'tl-33',
        status: 'resolved',
        title: 'Access Point Replaced & Verified',
        description: 'Replaced faulty PoE adapter and switched frequency to 5GHz channel 48. Speed test verified 240 Mbps.',
        actor: 'Vikram Verma',
        actorRole: 'staff',
        timestamp: '2026-08-29T16:45:00Z',
      }
    ],
    comments: [
      {
        id: 'cm-31',
        author: 'Vikram Verma',
        authorRole: 'staff',
        text: 'Issue resolved. Speed and ping tested on 18 simultaneous lab machines.',
        timestamp: '2026-08-29T16:48:00Z',
      },
      {
        id: 'cm-32',
        author: 'Priya Nair',
        authorRole: 'student',
        text: 'Thank you! The speed is very stable now.',
        timestamp: '2026-08-29T17:10:00Z',
      }
    ],
  },
  {
    id: 'TCK-267',
    ticketNumber: 'No. 267',
    category: 'housing',
    title: 'Hot Water Geyser Coil Burnt in Block A 3rd Floor',
    description: 'No hot water available in the 3rd floor wing washroom geyser. Indicator lights are completely off.',
    status: 'escalated',
    urgency: 'high',
    studentName: 'Rohan Gupta',
    studentRoll: '2023MEB041',
    studentEmail: 'rohan.g@campus.edu',
    branch: 'Mechanical Engineering',
    block: 'Block A (Aryabhata)',
    roomNo: 'Floor 3 Common Washroom',
    assignedDepartment: 'Hostel Estate & Housing Management',
    assignedStaff: 'Suresh Patil (Hostel Caretaker)',
    photos: [],
    createdAt: '2026-08-26T07:10:00Z',
    updatedAt: '2026-08-30T11:00:00Z',
    expectedResolution: 'Escalated to Estate Officer',
    timeline: [
      {
        id: 'tl-41',
        status: 'pending',
        title: 'Ticket Submitted',
        description: 'Geyser failure reported.',
        actor: 'Rohan Gupta',
        actorRole: 'student',
        timestamp: '2026-08-26T07:10:00Z',
      },
      {
        id: 'tl-42',
        status: 'in_review',
        title: 'Parts Requested',
        description: 'Replacement 2000W heating element requisition placed.',
        actor: 'Suresh Patil',
        actorRole: 'staff',
        timestamp: '2026-08-27T12:00:00Z',
      },
      {
        id: 'tl-43',
        status: 'escalated',
        title: 'Resolution SLA Overdue - Escalated',
        description: 'Ticket exceeded 72hr resolution window. Automatically flagged to Estate Head.',
        actor: 'System Escalation Bot',
        actorRole: 'system',
        timestamp: '2026-08-30T11:00:00Z',
      }
    ],
    comments: [
      {
        id: 'cm-41',
        author: 'Rohan Gupta',
        authorRole: 'student',
        text: 'It has been 4 days and students are facing difficulty in early morning classes.',
        timestamp: '2026-08-30T09:00:00Z',
      }
    ],
  },
  {
    id: 'TCK-255',
    ticketNumber: 'No. 255',
    category: 'sanitation',
    title: 'Common Room Dustbins Overflowing After College Fest',
    description: 'Post-event food packaging and beverage cans require immediate clearance and floor sanitization in Block C.',
    status: 'resolved',
    urgency: 'medium',
    studentName: 'Aarav Mehta',
    studentRoll: '2023CSB1042',
    studentEmail: 'aarav.mehta@campus.edu',
    branch: 'Computer Science & Engineering',
    block: 'Block C (Charaka)',
    roomNo: 'Ground Floor Common Room',
    assignedDepartment: 'Sanitation & Housekeeping Wing',
    assignedStaff: 'Kavita Devi (Housekeeping Supervisor)',
    photos: [],
    createdAt: '2026-08-24T18:00:00Z',
    updatedAt: '2026-08-25T09:30:00Z',
    expectedResolution: 'Resolved',
    timeline: [
      {
        id: 'tl-51',
        status: 'pending',
        title: 'Sanitation Request Filed',
        description: 'Fest cleanup request logged.',
        actor: 'Aarav Mehta',
        actorRole: 'student',
        timestamp: '2026-08-24T18:00:00Z',
      },
      {
        id: 'tl-52',
        status: 'resolved',
        title: 'Sanitized & Waste Disposed',
        description: 'Deep swept, moped, bins lined with fresh heavy-duty liners.',
        actor: 'Kavita Devi',
        actorRole: 'staff',
        timestamp: '2026-08-25T09:30:00Z',
      }
    ],
    comments: [],
  },
  {
    id: 'TCK-241',
    ticketNumber: 'No. 241',
    category: 'admin',
    title: 'Semester 4 Grade Card Internal Assessment Mismatch',
    description: 'The grade card in student portal shows 14/25 for Database Systems Lab whereas signed laboratory manual had 23/25.',
    status: 'in_review',
    urgency: 'medium',
    studentName: 'Aarav Mehta',
    studentRoll: '2023CSB1042',
    studentEmail: 'aarav.mehta@campus.edu',
    branch: 'Computer Science & Engineering',
    block: 'Academic Complex (North Wing)',
    roomNo: 'Exam Section Counter 4',
    assignedDepartment: 'Academic & Student Affairs Office',
    assignedStaff: 'Dr. Sunita Rao',
    photos: [],
    createdAt: '2026-08-22T11:00:00Z',
    updatedAt: '2026-08-23T15:20:00Z',
    expectedResolution: 'Pending Verification',
    timeline: [
      {
        id: 'tl-61',
        status: 'pending',
        title: 'Discrepancy Lodged',
        description: 'Internal mark review requested.',
        actor: 'Aarav Mehta',
        actorRole: 'student',
        timestamp: '2026-08-22T11:00:00Z',
      },
      {
        id: 'tl-62',
        status: 'in_review',
        title: 'Course Instructor Contacted',
        description: 'Forwarded to Prof. K. Raman for mark register cross-verification.',
        actor: 'Dr. Sunita Rao',
        actorRole: 'admin',
        timestamp: '2026-08-23T15:20:00Z',
      }
    ],
    comments: [],
  }
];

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export const ComplaintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem('campus_care_complaints_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_COMPLAINTS;
      }
    }
    return INITIAL_COMPLAINTS;
  });

  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('campus_care_active_role');
    return (savedRole as UserRole) || 'student';
  });

  const [currentView, setCurrentView] = useState<string>(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (hash === 'login' || hash === 'submit' || hash === 'department' || hash === 'dashboard') {
      return hash;
    }
    return 'dashboard';
  });
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync hash routing
  useEffect(() => {
    window.location.hash = `#/${currentView}`;
  }, [currentView]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash === 'login' || hash === 'submit' || hash === 'department' || hash === 'dashboard') {
        setCurrentView(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('campus_care_complaints_v1', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('campus_care_active_role', activeRole);
  }, [activeRole]);

  const currentUser = DEFAULT_USERS[activeRole];

  const switchRole = (newRole: UserRole) => {
    setActiveRole(newRole);
    soundFX.playClick();
    setNotification(`Switched to ${newRole.toUpperCase()} View: ${DEFAULT_USERS[newRole].name}`);
  };

  const toggleSound = () => {
    const nextState = soundFX.toggleSound();
    setSoundEnabled(nextState);
  };

  const dismissNotification = () => setNotification(null);

  const getComplaintById = (id: string) => {
    return complaints.find(c => c.id === id || c.ticketNumber === id);
  };

  const createComplaint = (
    data: Omit<Complaint, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'timeline' | 'comments'>
  ): Complaint => {
    const randomNum = Math.floor(350 + Math.random() * 600);
    const newId = `TCK-${randomNum}`;
    const nowIso = new Date().toISOString();

    const newTicket: Complaint = {
      ...data,
      id: newId,
      ticketNumber: `No. ${randomNum}`,
      createdAt: nowIso,
      updatedAt: nowIso,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          status: 'pending',
          title: 'Boarding Ticket Issued & Dispatched',
          description: `Grievance registered under ${data.category.toUpperCase()} category for ${data.block}.`,
          actor: data.studentName || currentUser.name,
          actorRole: 'student',
          timestamp: nowIso,
        }
      ],
      comments: [
        {
          id: `cm-${Date.now()}`,
          author: data.studentName || currentUser.name,
          authorRole: 'student',
          text: `Issue lodged from ${data.block}, ${data.roomNo}. Status will be tracked in real-time.`,
          timestamp: nowIso,
        }
      ]
    };

    setComplaints(prev => [newTicket, ...prev]);
    return newTicket;
  };

  const updateStatus = (id: string, newStatus: ComplaintStatus, remark?: string) => {
    const nowIso = new Date().toISOString();
    soundFX.playStampThud();

    setComplaints(prev =>
      prev.map(item => {
        if (item.id === id) {
          const statusLabels: Record<ComplaintStatus, string> = {
            pending: 'Status Reset to Pending',
            in_review: 'Department Picked Up Grievance (In Review)',
            resolved: 'Grievance Resolved & Inspected',
            escalated: 'Ticket Escalated to Higher Authority',
          };

          const newTimelineEvent = {
            id: `tl-${Date.now()}`,
            status: newStatus,
            title: statusLabels[newStatus],
            description: remark || `Official status updated by ${currentUser.name} (${currentUser.department || 'Department Staff'}).`,
            actor: currentUser.name,
            actorRole: currentUser.role as 'student' | 'staff' | 'admin',
            timestamp: nowIso,
          };

          return {
            ...item,
            status: newStatus,
            updatedAt: nowIso,
            timeline: [newTimelineEvent, ...item.timeline],
          };
        }
        return item;
      })
    );

    setNotification(`Ticket ${id} status updated to ${newStatus.toUpperCase()}`);
  };

  const assignStaff = (id: string, staffName: string, department: string) => {
    soundFX.playClick();
    const nowIso = new Date().toISOString();

    setComplaints(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            assignedStaff: staffName,
            assignedDepartment: department,
            updatedAt: nowIso,
            timeline: [
              {
                id: `tl-${Date.now()}`,
                status: item.status,
                title: `Staff Assigned: ${staffName}`,
                description: `Ticket assigned to ${staffName} from ${department}.`,
                actor: currentUser.name,
                actorRole: currentUser.role as 'student' | 'staff' | 'admin',
                timestamp: nowIso,
              },
              ...item.timeline
            ]
          };
        }
        return item;
      })
    );
  };

  const addComment = (complaintId: string, text: string, isInternal: boolean = false) => {
    soundFX.playClick();
    const nowIso = new Date().toISOString();
    const newComment = {
      id: `cm-${Date.now()}`,
      author: currentUser.name,
      authorRole: currentUser.role,
      avatar: currentUser.avatar,
      text,
      timestamp: nowIso,
      isInternal,
    };

    setComplaints(prev =>
      prev.map(item => {
        if (item.id === complaintId) {
          return {
            ...item,
            comments: [...item.comments, newComment],
            updatedAt: nowIso,
          };
        }
        return item;
      })
    );
  };

  const resetDemoData = () => {
    setComplaints(INITIAL_COMPLAINTS);
    soundFX.playStampThud();
    setNotification('Demo complaints and status stamps restored!');
  };

  const unreadCount = complaints.filter(c => c.status === 'pending' || c.status === 'escalated').length;

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        currentUser,
        activeRole,
        currentView,
        selectedComplaint,
        notification,
        unreadCount,
        soundEnabled,
        setCurrentView,
        setSelectedComplaint,
        switchRole,
        createComplaint,
        updateStatus,
        assignStaff,
        addComment,
        toggleSound,
        resetDemoData,
        dismissNotification,
        getComplaintById,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};
