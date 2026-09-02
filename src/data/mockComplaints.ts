export interface ComplaintItem {
  id: string;
  ticketNumber: string;
  title: string;
  category: 
    | 'equipment'
    | 'power'
    | 'water'
    | 'sanitation'
    | 'housing'
    | 'network'
    | 'security'
    | 'admin';
  location: string;
  block: string;
  roomNo: string;
  description: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_review' | 'resolved' | 'escalated';
  date: string;
  studentName: string;
  studentRoll?: string;
  studentBranch?: string;
  photos?: string[];
  assignedStaff?: string;
}

export const MOCK_COMPLAINTS: ComplaintItem[] = [
  {
    id: 'TCK-345',
    ticketNumber: 'No. 345',
    category: 'water',
    title: 'Water Leakage in Block C',
    location: 'Floor 3, Block C',
    block: 'Block C (Charaka)',
    roomNo: 'Floor 3 Washroom',
    description: 'The drinking water pipe near Room 304 has cracked and water is continuously overflowing into the corridor. Pressure in the lower taps is completely dropped.',
    department: 'Civil & Plumbing Services',
    priority: 'high',
    status: 'pending',
    date: '2026-09-02',
    studentName: 'Damini Sori',
    studentRoll: '2024CSB1042',
    studentBranch: 'Computer Science & Engineering',
    photos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'TCK-346',
    ticketNumber: 'No. 346',
    category: 'power',
    title: 'Power Outage & Short Circuit',
    location: 'Room 204, Block B',
    block: 'Block B (Bhaskara)',
    roomNo: 'Room 204',
    description: 'Main MCB switch is tripping repeatedly whenever laptops or fans are plugged in. Sparks observed near socket board.',
    department: 'Campus Maintenance & Electricals',
    priority: 'urgent',
    status: 'in_review',
    date: '2026-09-01',
    studentName: 'Damini Sori',
    studentRoll: '2024CSB1042',
    studentBranch: 'Computer Science & Engineering',
    assignedStaff: 'Rajesh Sharma (Electrician)',
    photos: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'TCK-347',
    ticketNumber: 'No. 347',
    category: 'equipment',
    title: 'Equipment Failure in Lab 2',
    location: 'Computer Lab 2, Tech Park',
    block: 'Academic Complex',
    roomNo: 'Lab 2 Workstation 14',
    description: 'Classroom projector HDMI port is shattered and ceiling mount fan has a loose bearing causing heavy vibration.',
    department: 'Campus Maintenance & Electricals',
    priority: 'medium',
    status: 'resolved',
    date: '2026-08-30',
    studentName: 'Aarav Mehta',
    studentRoll: '2023CSB1020',
    studentBranch: 'Computer Science & Engineering',
    assignedStaff: 'Vikram Singh'
  },
  {
    id: 'TCK-348',
    ticketNumber: 'No. 348',
    category: 'sanitation',
    title: 'Sanitation Request - Common Room',
    location: 'Common Room, Block C',
    block: 'Block C (Charaka)',
    roomNo: 'Ground Floor Common Area',
    description: 'Post-event dustbins overflowing with discarded meal packaging. Needs deep floor sanitation and fresh liners.',
    department: 'Sanitation & Housekeeping Wing',
    priority: 'medium',
    status: 'resolved',
    date: '2026-08-29',
    studentName: 'Damini Sori',
    studentRoll: '2024CSB1042',
    studentBranch: 'Computer Science & Engineering',
    assignedStaff: 'Kavita Devi (Supervisor)'
  },
  {
    id: 'TCK-349',
    ticketNumber: 'No. 349',
    category: 'housing',
    title: 'Student Housing - No Hot Water',
    location: 'Floor 2, Hostel Block A',
    block: 'Block A (Aryabhata)',
    roomNo: 'Room 218 & Common Bath',
    description: 'Geyser heating element failed. Also the wardrobe door hinge in room 218 has detached from the frame.',
    department: 'Hostel Estate & Housing Management',
    priority: 'high',
    status: 'escalated',
    date: '2026-08-28',
    studentName: 'Rohan Gupta',
    studentRoll: '2023MEB041',
    studentBranch: 'Mechanical Engineering',
    assignedStaff: 'Suresh Patil'
  },
  {
    id: 'TCK-350',
    ticketNumber: 'No. 350',
    category: 'network',
    title: 'Network Down - Signal Weak',
    location: 'Library 3rd Floor',
    block: 'Central Library & Labs',
    roomNo: 'Floor 3 Reading Hall',
    description: 'Wi-Fi access point dropping packets every 2 minutes. Unable to access institutional repository and research portal.',
    department: 'IT & Campus Network Cell',
    priority: 'medium',
    status: 'in_review',
    date: '2026-08-27',
    studentName: 'Priya Nair',
    studentRoll: '2022ITB089',
    studentBranch: 'Information Technology',
    assignedStaff: 'Amit Verma'
  },
  {
    id: 'TCK-351',
    ticketNumber: 'No. 351',
    category: 'security',
    title: 'Security Report - Gate Sensor Fault',
    location: 'South Hostel Gate & Pathway',
    block: 'Campus South Perimeter',
    roomNo: 'Main Gate Booth 2',
    description: 'Biometric smart-card scanner failing intermittently after rain, causing students to be stuck during night curfew check-in.',
    department: 'Campus Security & Safety',
    priority: 'high',
    status: 'pending',
    date: '2026-08-26',
    studentName: 'Damini Sori',
    studentRoll: '2024CSB1042',
    studentBranch: 'Computer Science & Engineering'
  },
  {
    id: 'TCK-352',
    ticketNumber: 'CG-345',
    category: 'admin',
    title: 'Administrative Complaint - Grade Discrepancy',
    location: 'Academic Section Counter 4',
    block: 'Administrative Complex',
    roomNo: 'Exam Branch Counter 4',
    description: 'Mid-term lab evaluation grades recorded as absent despite physical submission of signed report.',
    department: 'Academic & Student Affairs Office',
    priority: 'medium',
    status: 'in_review',
    date: '2026-08-25',
    studentName: 'Damini Sori',
    studentRoll: '2024CSB1042',
    studentBranch: 'Computer Science & Engineering',
    assignedStaff: 'Dr. Sunita Rao'
  }
];
