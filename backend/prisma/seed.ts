import { PrismaClient, UserRole, ComplaintStatus, Priority, Category, ActorRole, NotificationType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Campus Care database...');

  // 1. Seed Departments
  const departments = [
    'Campus Maintenance & Electricals',
    'Civil & Plumbing Services',
    'Hostel Estate & Housing Management',
    'IT & Campus Network Cell',
    'Campus Security & Safety',
    'Sanitation & Housekeeping Wing',
    'Academic & Student Affairs Office',
  ];

  for (const deptName of departments) {
    await prisma.department.upsert({
      where: { name: deptName },
      update: {},
      create: { name: deptName },
    });
  }
  console.log(`Seeded ${departments.length} departments.`);

  // 2. Seed Branches
  const branches = [
    'Computer Science & Engineering',
    'Electronics & Communication',
    'Data Science and Artificial Intelligence (DSAI)',
  ];

  for (const branchName of branches) {
    await prisma.branch.upsert({
      where: { name: branchName },
      update: {},
      create: { name: branchName },
    });
  }
  console.log(`Seeded ${branches.length} branches.`);

  // 3. Seed Users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const usersData = [
    {
      id: 'usr-std-01',
      name: 'Aarav Mehta',
      email: 'aarav.mehta@campus.edu',
      password: hashedPassword,
      role: UserRole.student,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      branch: 'Computer Science & Engineering',
      block: 'Block C (Charaka)',
      room: 'Room 304',
      roll: '2023CSB1042',
    },
    {
      id: 'usr-std-02',
      name: 'Damini Sori',
      email: 'damini.sori@campus.edu',
      password: hashedPassword,
      role: UserRole.student,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      branch: 'Computer Science & Engineering',
      block: 'Block C (Charaka)',
      room: 'Room 304',
      roll: '2024CSB1042',
    },
    {
      id: 'usr-std-03',
      name: 'Priya Nair',
      email: 'priya.nair@campus.edu',
      password: hashedPassword,
      role: UserRole.student,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      branch: 'Computer Science & Engineering',
      block: 'Central Library & Labs',
      room: 'CS Lab 301',
      roll: '2022ITB089',
    },
    {
      id: 'usr-std-04',
      name: 'Rohan Gupta',
      email: 'rohan.g@campus.edu',
      password: hashedPassword,
      role: UserRole.student,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      branch: 'Electronics & Communication',
      block: 'Block A (Aryabhata)',
      room: 'Floor 3 Common Washroom',
      roll: '2023MEB041',
    },
    {
      id: 'usr-stf-01',
      name: 'Rajesh Sharma',
      email: 'rajesh.maint@campus.edu',
      password: hashedPassword,
      role: UserRole.staff,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      department: 'Campus Maintenance & Electricals',
    },
    {
      id: 'usr-stf-02',
      name: 'Vikram Verma',
      email: 'vikram.net@campus.edu',
      password: hashedPassword,
      role: UserRole.staff,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      department: 'IT & Campus Network Cell',
    },
    {
      id: 'usr-stf-03',
      name: 'Suresh Patil',
      email: 'suresh.estate@campus.edu',
      password: hashedPassword,
      role: UserRole.staff,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      department: 'Hostel Estate & Housing Management',
    },
    {
      id: 'usr-stf-04',
      name: 'Kavita Devi',
      email: 'kavita.housekeeping@campus.edu',
      password: hashedPassword,
      role: UserRole.staff,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      department: 'Sanitation & Housekeeping Wing',
    },
    {
      id: 'usr-adm-01',
      name: 'Dr. Sunita Rao',
      email: 'dean.studentaffairs@campus.edu',
      password: hashedPassword,
      role: UserRole.admin,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      department: 'Academic & Student Affairs Office',
    },
  ];

  for (const userData of usersData) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: userData,
      create: userData,
    });
  }
  console.log(`Seeded ${usersData.length} users.`);

  // 4. Seed Complaints with Timelines & Comments
  const complaintsData = [
    {
      id: 'TCK-345',
      ticketNumber: 'No. 345',
      category: Category.water,
      title: 'Water cooler not working in Block C',
      description: 'The primary drinking water cooler on the 2nd floor of Block C is not dispensing cold water and the lower basin drainage pipe is blocked, causing minor water pooling on the floor.',
      location: 'Block C (Charaka), Floor 2 (Near 208)',
      block: 'Block C (Charaka)',
      roomNo: 'Floor 2 (Near 208)',
      department: 'Civil & Plumbing Services',
      priority: Priority.high,
      status: ComplaintStatus.pending,
      urgency: 'high',
      expectedResolution: 'Within 24 Hours',
      photos: ['https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'],
      studentName: 'Aarav Mehta',
      studentRoll: '2023CSB1042',
      studentEmail: 'aarav.mehta@campus.edu',
      branch: 'Computer Science & Engineering',
      assignedStaff: undefined,
      userId: 'usr-std-01',
      timeline: [
        {
          id: 'tl-1',
          status: ComplaintStatus.pending,
          title: 'Boarding Ticket Issued',
          description: 'Grievance ticket generated and dispatched to Civil & Plumbing Services dispatch queue.',
          actor: 'Aarav Mehta',
          actorRole: ActorRole.student,
          timestamp: new Date('2026-09-01T08:30:00Z'),
        }
      ],
      comments: [
        {
          id: 'cm-1',
          author: 'Aarav Mehta',
          authorRole: UserRole.student,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          text: 'Students on the 2nd and 3rd floor are currently having to walk down to the ground floor for drinking water. Please prioritize this.',
          timestamp: new Date('2026-09-01T08:35:00Z'),
          isInternal: false,
        }
      ]
    },
    {
      id: 'TCK-294',
      ticketNumber: 'No. 294',
      category: Category.power,
      title: 'Power Outage & MCB Tripping in Block B Room 204',
      description: 'The circuit breaker in Room 204 keeps tripping whenever study lamps or laptops are plugged in. There is a slight burning smell near the socket board.',
      location: 'Block B (Bhaskara), Room 204',
      block: 'Block B (Bhaskara)',
      roomNo: 'Room 204',
      department: 'Campus Maintenance & Electricals',
      priority: Priority.urgent,
      status: ComplaintStatus.in_review,
      urgency: 'urgent',
      expectedResolution: 'Today by 5:00 PM',
      photos: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'],
      studentName: 'Aarav Mehta',
      studentRoll: '2023CSB1042',
      studentEmail: 'aarav.mehta@campus.edu',
      branch: 'Computer Science & Engineering',
      assignedStaff: 'Rajesh Sharma',
      userId: 'usr-std-01',
      timeline: [
        {
          id: 'tl-21',
          status: ComplaintStatus.pending,
          title: 'Ticket Logged',
          description: 'Electrical hazard reported in Block B.',
          actor: 'Aarav Mehta',
          actorRole: ActorRole.student,
          timestamp: new Date('2026-08-31T14:15:00Z'),
        },
        {
          id: 'tl-22',
          status: ComplaintStatus.in_review,
          title: 'Assigned to Electrician Squad',
          description: 'Assigned to Rajesh Sharma. Replacement 16A MCB issued from electrical inventory.',
          actor: 'Rajesh Sharma',
          actorRole: ActorRole.staff,
          timestamp: new Date('2026-09-01T10:00:00Z'),
        }
      ],
      comments: [
        {
          id: 'cm-21',
          author: 'Rajesh Sharma',
          authorRole: UserRole.staff,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          text: 'Inspected the distribution box. The wire insulation had slight wear. Arriving at Room 204 at 2:00 PM to replace the MCB fuse switch.',
          timestamp: new Date('2026-09-01T10:05:00Z'),
          isInternal: false,
        }
      ]
    },
    {
      id: 'TCK-280',
      ticketNumber: 'No. 280',
      category: Category.network,
      title: 'Wi-Fi Signal Weak & Disconnecting in CS Lab Floor 3',
      description: 'The ceiling-mounted access point in the 3rd floor CS Lab is dropping packets continuously. Latency is > 800ms making online compiler submissions fail.',
      location: 'Central Library & Labs, CS Lab 301',
      block: 'Central Library & Labs',
      roomNo: 'CS Lab 301',
      department: 'IT & Campus Network Cell',
      priority: Priority.medium,
      status: ComplaintStatus.resolved,
      urgency: 'medium',
      expectedResolution: 'Resolved',
      photos: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'],
      studentName: 'Priya Nair',
      studentRoll: '2022ITB089',
      studentEmail: 'priya.nair@campus.edu',
      branch: 'Computer Science & Engineering',
      assignedStaff: 'Vikram Verma',
      userId: 'usr-std-03',
      timeline: [
        {
          id: 'tl-31',
          status: ComplaintStatus.pending,
          title: 'Network Ticket Dispatched',
          description: 'AP signal degradation report received.',
          actor: 'Priya Nair',
          actorRole: ActorRole.student,
          timestamp: new Date('2026-08-28T09:20:00Z'),
        },
        {
          id: 'tl-32',
          status: ComplaintStatus.in_review,
          title: 'Router Diagnostics',
          description: 'Firmware reset and channel reconfiguration initiated on AP-CS-03.',
          actor: 'Vikram Verma',
          actorRole: ActorRole.staff,
          timestamp: new Date('2026-08-29T11:00:00Z'),
        },
        {
          id: 'tl-33',
          status: ComplaintStatus.resolved,
          title: 'Access Point Replaced & Verified',
          description: 'Replaced faulty PoE adapter and switched frequency to 5GHz channel 48. Speed test verified 240 Mbps.',
          actor: 'Vikram Verma',
          actorRole: ActorRole.staff,
          timestamp: new Date('2026-08-29T16:45:00Z'),
        }
      ],
      comments: [
        {
          id: 'cm-31',
          author: 'Vikram Verma',
          authorRole: UserRole.staff,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
          text: 'Issue resolved. Speed and ping tested on 18 simultaneous lab machines.',
          timestamp: new Date('2026-08-29T16:48:00Z'),
          isInternal: false,
        },
        {
          id: 'cm-32',
          author: 'Priya Nair',
          authorRole: UserRole.student,
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
          text: 'Thank you! The speed is very stable now.',
          timestamp: new Date('2026-08-29T17:10:00Z'),
          isInternal: false,
        }
      ]
    },
    {
      id: 'TCK-267',
      ticketNumber: 'No. 267',
      category: Category.housing,
      title: 'Hot Water Geyser Coil Burnt in Block A 3rd Floor',
      description: 'No hot water available in the 3rd floor wing washroom geyser. Indicator lights are completely off.',
      location: 'Block A (Aryabhata), Floor 3 Common Washroom',
      block: 'Block A (Aryabhata)',
      roomNo: 'Floor 3 Common Washroom',
      department: 'Hostel Estate & Housing Management',
      priority: Priority.high,
      status: ComplaintStatus.escalated,
      urgency: 'high',
      expectedResolution: 'Escalated to Estate Officer',
      photos: [],
      studentName: 'Rohan Gupta',
      studentRoll: '2023MEB041',
      studentEmail: 'rohan.g@campus.edu',
      branch: 'Electronics & Communication',
      assignedStaff: 'Suresh Patil',
      userId: 'usr-std-04',
      timeline: [
        {
          id: 'tl-41',
          status: ComplaintStatus.pending,
          title: 'Ticket Submitted',
          description: 'Geyser failure reported.',
          actor: 'Rohan Gupta',
          actorRole: ActorRole.student,
          timestamp: new Date('2026-08-26T07:10:00Z'),
        },
        {
          id: 'tl-42',
          status: ComplaintStatus.in_review,
          title: 'Parts Requested',
          description: 'Replacement 2000W heating element requisition placed.',
          actor: 'Suresh Patil',
          actorRole: ActorRole.staff,
          timestamp: new Date('2026-08-27T12:00:00Z'),
        },
        {
          id: 'tl-43',
          status: ComplaintStatus.escalated,
          title: 'Resolution SLA Overdue - Escalated',
          description: 'Ticket exceeded 72hr resolution window. Automatically flagged to Estate Head.',
          actor: 'System Escalation Bot',
          actorRole: ActorRole.system,
          timestamp: new Date('2026-08-30T11:00:00Z'),
        }
      ],
      comments: [
        {
          id: 'cm-41',
          author: 'Rohan Gupta',
          authorRole: UserRole.student,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
          text: 'It has been 4 days and students are facing difficulty in early morning classes.',
          timestamp: new Date('2026-08-30T09:00:00Z'),
          isInternal: false,
        }
      ]
    },
    {
      id: 'TCK-255',
      ticketNumber: 'No. 255',
      category: Category.sanitation,
      title: 'Common Room Dustbins Overflowing After College Fest',
      description: 'Post-event food packaging and beverage cans require immediate clearance and floor sanitization in Block C.',
      location: 'Block C (Charaka), Ground Floor Common Room',
      block: 'Block C (Charaka)',
      roomNo: 'Ground Floor Common Room',
      department: 'Sanitation & Housekeeping Wing',
      priority: Priority.medium,
      status: ComplaintStatus.resolved,
      urgency: 'medium',
      expectedResolution: 'Resolved',
      photos: [],
      studentName: 'Aarav Mehta',
      studentRoll: '2023CSB1042',
      studentEmail: 'aarav.mehta@campus.edu',
      branch: 'Computer Science & Engineering',
      assignedStaff: 'Kavita Devi',
      userId: 'usr-std-01',
      timeline: [
        {
          id: 'tl-51',
          status: ComplaintStatus.pending,
          title: 'Sanitation Request Filed',
          description: 'Fest cleanup request logged.',
          actor: 'Aarav Mehta',
          actorRole: ActorRole.student,
          timestamp: new Date('2026-08-24T18:00:00Z'),
        },
        {
          id: 'tl-52',
          status: ComplaintStatus.resolved,
          title: 'Sanitized & Waste Disposed',
          description: 'Deep swept, moped, bins lined with fresh heavy-duty liners.',
          actor: 'Kavita Devi',
          actorRole: ActorRole.staff,
          timestamp: new Date('2026-08-25T09:30:00Z'),
        }
      ],
      comments: []
    },
    {
      id: 'TCK-241',
      ticketNumber: 'No. 241',
      category: Category.admin,
      title: 'Semester 4 Grade Card Internal Assessment Mismatch',
      description: 'The grade card in student portal shows 14/25 for Database Systems Lab whereas signed laboratory manual had 23/25.',
      location: 'Academic Complex (North Wing), Exam Section Counter 4',
      block: 'Academic Complex (North Wing)',
      roomNo: 'Exam Section Counter 4',
      department: 'Academic & Student Affairs Office',
      priority: Priority.medium,
      status: ComplaintStatus.in_review,
      urgency: 'medium',
      expectedResolution: 'Pending Verification',
      photos: [],
      studentName: 'Aarav Mehta',
      studentRoll: '2023CSB1042',
      studentEmail: 'aarav.mehta@campus.edu',
      branch: 'Computer Science & Engineering',
      assignedStaff: 'Dr. Sunita Rao',
      userId: 'usr-std-01',
      timeline: [
        {
          id: 'tl-61',
          status: ComplaintStatus.pending,
          title: 'Discrepancy Lodged',
          description: 'Internal mark review requested.',
          actor: 'Aarav Mehta',
          actorRole: ActorRole.student,
          timestamp: new Date('2026-08-22T11:00:00Z'),
        },
        {
          id: 'tl-62',
          status: ComplaintStatus.in_review,
          title: 'Course Instructor Contacted',
          description: 'Forwarded to Prof. K. Raman for mark register cross-verification.',
          actor: 'Dr. Sunita Rao',
          actorRole: ActorRole.admin,
          timestamp: new Date('2026-08-23T15:20:00Z'),
        }
      ],
      comments: []
    }
  ];

  for (const c of complaintsData) {
    const { timeline, comments, ...complaintFields } = c;
    await prisma.complaint.upsert({
      where: { id: complaintFields.id },
      update: complaintFields,
      create: complaintFields,
    });

    // Seed timeline events
    for (const tl of timeline) {
      await prisma.timelineEvent.upsert({
        where: { id: tl.id },
        update: tl,
        create: {
          ...tl,
          complaintId: complaintFields.id,
        },
      });
    }

    // Seed comments
    for (const cm of comments) {
      await prisma.comment.upsert({
        where: { id: cm.id },
        update: cm,
        create: {
          ...cm,
          complaintId: complaintFields.id,
        },
      });
    }
  }
  console.log(`Seeded ${complaintsData.length} complaints with timeline and comments.`);

  // 5. Seed Notifications
  const notificationsData = [
    {
      id: 'notif-1',
      message: 'Water Leakage in Block C: Pending Triage Dispatch',
      type: NotificationType.warning,
      createdAt: new Date('2026-09-01T08:35:00Z'),
    },
    {
      id: 'notif-2',
      message: 'Power Outage & MCB Tripping: Electrician Assigned',
      type: NotificationType.info,
      createdAt: new Date('2026-09-01T10:00:00Z'),
    },
    {
      id: 'notif-3',
      message: 'Hot Water Geyser SLA Overdue: Escalated to Estate Head',
      type: NotificationType.error,
      createdAt: new Date('2026-08-30T11:00:00Z'),
    },
  ];

  for (const notif of notificationsData) {
    await prisma.notification.upsert({
      where: { id: notif.id },
      update: notif,
      create: notif,
    });
  }
  console.log(`Seeded ${notificationsData.length} notifications.`);

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
