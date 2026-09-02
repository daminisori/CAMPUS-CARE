export type ComplaintStatus = 'pending' | 'in_review' | 'resolved' | 'escalated';

export type CategoryId = 
  | 'equipment'
  | 'power'
  | 'water'
  | 'sanitation'
  | 'housing'
  | 'network'
  | 'security'
  | 'admin';

export interface CategoryInfo {
  id: CategoryId;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
  ticketLabel: string;
  admitLabel: string;
  sampleIssues: string[];
}

export interface TimelineEvent {
  id: string;
  status: ComplaintStatus;
  title: string;
  description: string;
  actor: string;
  actorRole: 'student' | 'staff' | 'admin' | 'system';
  timestamp: string;
}

export interface Comment {
  id: string;
  author: string;
  authorRole: 'student' | 'staff' | 'admin';
  avatar?: string;
  text: string;
  timestamp: string;
  isInternal?: boolean;
}

export interface Complaint {
  id: string; // e.g. TCK-345, CC-8921
  ticketNumber: string; // e.g. "No. 345"
  category: CategoryId;
  title: string;
  description: string;
  status: ComplaintStatus;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  
  // Student metadata
  studentName: string;
  studentRoll: string;
  studentEmail: string;
  branch: string;
  year?: string;
  
  // Location
  block: string;
  roomNo: string;
  campusArea?: string;
  
  // Department handling
  assignedDepartment: string;
  assignedStaff?: string;
  
  // Attachments
  photos: string[];
  
  // Timestamps & Timeline
  createdAt: string;
  updatedAt: string;
  expectedResolution?: string;
  timeline: TimelineEvent[];
  comments: Comment[];
  
  // Custom stamps
  stampNote?: string;
}

export type UserRole = 'student' | 'staff' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department?: string;
  branch?: string;
  room?: string;
  block?: string;
}
