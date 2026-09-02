import { CategoryId, CategoryInfo } from '../types';

export const CATEGORIES: Record<CategoryId, CategoryInfo> = {
  equipment: {
    id: 'equipment',
    title: 'EQUIPMENT FAILURE',
    subtitle: 'Lab instruments, classroom projectors, fans & appliances',
    iconName: 'Wrench',
    color: '#1B4D5C',
    bgLight: '#E6F0F2',
    borderColor: '#266578',
    textColor: '#133945',
    ticketLabel: 'FIXED: BROKEN EQUIPMENT',
    admitLabel: 'MAINTENANCE',
    sampleIssues: [
      'Projector in Room 204 not turning on',
      'Ceiling fan making screeching noise in Lab 2',
      'Chemistry workbench tap broken',
      'Air conditioning leaking water in Seminar Hall',
    ],
  },
  power: {
    id: 'power',
    title: 'POWER OUTAGE',
    subtitle: 'Short circuits, tube lights, MCB tripping & sockets',
    iconName: 'Zap',
    color: '#8E281F',
    bgLight: '#FBEBEA',
    borderColor: '#B33428',
    textColor: '#691811',
    ticketLabel: 'URGENT: ELECTRICITY ISSUES',
    admitLabel: 'ADMIT ONE',
    sampleIssues: [
      'MCB switch tripping repeatedly in 3rd Floor Wing B',
      'Power outlet burnt and sparking near Desk 14',
      'Complete corridor blackout in Hostel Block D',
      'Tube light flickering continuously in Room 412',
    ],
  },
  water: {
    id: 'water',
    title: 'WATER LEAKAGE',
    subtitle: 'Water coolers, washroom plumbing, taps & tanks',
    iconName: 'Droplets',
    color: '#D4613B',
    bgLight: '#FDF0EC',
    borderColor: '#E67752',
    textColor: '#913617',
    ticketLabel: 'REPORTED: WATER PROBLEMS',
    admitLabel: 'CAMPUS PLUMBING',
    sampleIssues: [
      'Water cooler not working in Block C 2nd floor',
      'Washroom flush valve continuously overflowing',
      'No running water in 4th floor showers since morning',
      'Drinking water purifier filter light is red',
    ],
  },
  sanitation: {
    id: 'sanitation',
    title: 'SANITATION REQUEST',
    subtitle: 'Garbage disposal, deep cleaning & hygiene maintenance',
    iconName: 'Sparkles',
    color: '#843C65',
    bgLight: '#F9EDF4',
    borderColor: '#A85383',
    textColor: '#572040',
    ticketLabel: 'SCHEDULED: CLEANLINESS',
    admitLabel: 'SAN. REQ.',
    sampleIssues: [
      'Common room dustbins overflowing after event',
      'Hostel corridor floor needs wet mopping & sanitization',
      'Mess dining tables require deep wash',
      'Washroom soap dispenser empty and drain clogged',
    ],
  },
  housing: {
    id: 'housing',
    title: 'STUDENT HOUSING',
    subtitle: 'Hostel room cupboards, beds, geysers & doors',
    iconName: 'BedDouble',
    color: '#7B4F8A',
    bgLight: '#F5EDF8',
    borderColor: '#9E68B0',
    textColor: '#4E2B5A',
    ticketLabel: 'STUDENT ID: HOSTEL PROBLEMS',
    admitLabel: 'DORM LIFE',
    sampleIssues: [
      'Geyser not heating water in Room 304 washroom',
      'Hostel room wooden wardrobe door hinge broken',
      'Window mesh torn allowing mosquitoes inside',
      'Study table drawer lock stuck jammed',
    ],
  },
  network: {
    id: 'network',
    title: 'NETWORK DOWN',
    subtitle: 'Campus Wi-Fi, LAN ethernet ports & portal connectivity',
    iconName: 'Wifi',
    color: '#6F8046',
    bgLight: '#F3F6EC',
    borderColor: '#8E9F5E',
    textColor: '#424F25',
    ticketLabel: 'STATUS: INTERNET ISSUES',
    admitLabel: 'ADMIT ISSUES',
    sampleIssues: [
      'Wi-Fi signal weak or dropping constantly in Library 3rd Floor',
      'LAN Ethernet port dead at Workstation 22 in CS Lab',
      'Captive portal login failing with authentication timeout',
      'Hostel Block A router blinking red after thunderstorm',
    ],
  },
  security: {
    id: 'security',
    title: 'SECURITY REPORT',
    subtitle: 'CCTV surveillance, entry gates, lighting & lost access',
    iconName: 'ShieldAlert',
    color: '#24345C',
    bgLight: '#EAEDF7',
    borderColor: '#374F8C',
    textColor: '#14203E',
    ticketLabel: 'ALERT: SECURITY CONCERNS',
    admitLabel: 'SECURITY',
    sampleIssues: [
      'Streetlights dark along South Hostel pathway',
      'Unauthorized vehicle parked blocking emergency exit gate',
      'Hostel biometric entry scanner not reading fingerprint',
      'Lost student RFID identity card near cafeteria',
    ],
  },
  admin: {
    id: 'admin',
    title: 'ADMINISTRATIVE COMPLAINT',
    subtitle: 'Fee receipts, academic records, timetable & ID services',
    iconName: 'FileText',
    color: '#B88220',
    bgLight: '#FCF7EB',
    borderColor: '#DBA137',
    textColor: '#734E0C',
    ticketLabel: 'SUBMITTED: ACADEMIC/ADMIN',
    admitLabel: 'CG-345',
    sampleIssues: [
      'Semester grade card displaying incorrect internal marks',
      'Hostel fee payment receipt not generated after transaction',
      'Elective course registration portal showing mismatch',
      'Library clearance certificate request pending over 5 days',
    ],
  },
};

export const SAMPLE_PHOTOS = [
  {
    name: 'Water Cooler Block C',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    category: 'water'
  },
  {
    name: 'Electrical Fuse Panel',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    category: 'power'
  },
  {
    name: 'Broken Window / Wardrobe',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    category: 'housing'
  },
  {
    name: 'Wi-Fi Router Signal Issue',
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    category: 'network'
  }
];

export const DEPARTMENTS = [
  'Campus Maintenance & Electricals',
  'Civil & Plumbing Services',
  'Hostel Estate & Housing Management',
  'IT & Campus Network Cell',
  'Campus Security & Safety',
  'Sanitation & Housekeeping Wing',
  'Academic & Student Affairs Office',
];

export const HOSTEL_BLOCKS = [
  'Block A (Aryabhata)',
  'Block B (Bhaskara)',
  'Block C (Charaka)',
  'Block D (Dhanvantari)',
  'Block E (Gargi - Girls)',
  'Block F (Maitreyi - Girls)',
  'Academic Complex (North Wing)',
  'Central Library & Labs',
  'Student Activity Center (SAC)',
  'Campus Cafeteria & Mess',
];

export const BRANCHES = [
  'Computer Science & Engineering',
  'Electronics & Communication',
  'Data Science and Artificial Intelligence (DSAI)'
];
