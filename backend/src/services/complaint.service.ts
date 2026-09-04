import prisma from '../config/db';
import { AuthUser, AppError } from '../types';
import { ComplaintStatus, Priority, Category, ActorRole, UserRole } from '@prisma/client';

const DEPT_MAP: Record<string, string> = {
  equipment: 'Campus Maintenance & Electricals',
  power: 'Campus Maintenance & Electricals',
  water: 'Civil & Plumbing Services',
  sanitation: 'Sanitation & Housekeeping Wing',
  housing: 'Hostel Estate & Housing Management',
  network: 'IT & Campus Network Cell',
  security: 'Campus Security & Safety',
  admin: 'Academic & Student Affairs Office',
};

const STATUS_LABELS: Record<ComplaintStatus, string> = {
  pending: 'Status Reset to Pending',
  in_review: 'Department Picked Up Grievance (In Review)',
  resolved: 'Grievance Resolved & Inspected',
  escalated: 'Ticket Escalated to Higher Authority',
};

export class ComplaintService {
  private static formatComplaint(item: any) {
    return {
      id: item.id,
      ticketNumber: item.ticketNumber,
      category: item.category,
      title: item.title,
      description: item.description,
      location: item.location || `${item.block}, ${item.roomNo}`,
      block: item.block,
      roomNo: item.roomNo,
      campusArea: item.block,
      department: item.department,
      assignedDepartment: item.department,
      priority: item.priority,
      urgency: item.urgency || item.priority,
      status: item.status,
      expectedResolution: item.expectedResolution || 'Within 48 Hours',
      photos: item.photos || [],
      studentName: item.studentName,
      studentRoll: item.studentRoll || '',
      studentEmail: item.studentEmail || '',
      branch: item.branch || '',
      assignedStaff: item.assignedStaff || undefined,
      createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
      updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt,
      timeline: (item.timeline || []).map((tl: any) => ({
        id: tl.id,
        status: tl.status,
        title: tl.title,
        description: tl.description,
        actor: tl.actor,
        actorRole: tl.actorRole,
        timestamp: tl.timestamp instanceof Date ? tl.timestamp.toISOString() : tl.timestamp,
      })),
      comments: (item.comments || []).map((cm: any) => ({
        id: cm.id,
        author: cm.author,
        authorRole: cm.authorRole,
        avatar: cm.avatar || undefined,
        text: cm.text,
        isInternal: cm.isInternal || false,
        timestamp: cm.timestamp instanceof Date ? cm.timestamp.toISOString() : cm.timestamp,
      })),
    };
  }

  static async getComplaints(user: AuthUser, query: any) {
    const whereClause: any = {};

    // RBAC:
    if (user.role === 'student') {
      whereClause.OR = [
        { studentEmail: user.email },
        { userId: user.id },
      ];
    } else if (user.role === 'staff') {
      if (user.department) {
        whereClause.department = user.department;
      }
    }
    // Admin sees all by default

    // Additional query filters:
    if (query.status && query.status !== 'all') {
      whereClause.status = query.status as ComplaintStatus;
    }
    if (query.department && query.department !== 'all') {
      whereClause.department = query.department;
    }
    if (query.category && query.category !== 'all') {
      whereClause.category = query.category as Category;
    }

    const complaints = await prisma.complaint.findMany({
      where: whereClause,
      include: {
        timeline: { orderBy: { timestamp: 'desc' } },
        comments: { orderBy: { timestamp: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return complaints.map(this.formatComplaint);
  }

  static async getComplaintById(id: string, user: AuthUser) {
    const complaint = await prisma.complaint.findFirst({
      where: {
        OR: [{ id }, { ticketNumber: id }],
      },
      include: {
        timeline: { orderBy: { timestamp: 'desc' } },
        comments: { orderBy: { timestamp: 'asc' } },
      },
    });

    if (!complaint) {
      throw new AppError(`Complaint '${id}' not found.`, 404, 'NOT_FOUND');
    }

    // RBAC check:
    if (user.role === 'student') {
      const isOwn =
        complaint.studentEmail?.toLowerCase() === user.email.toLowerCase() ||
        complaint.userId === user.id;
      if (!isOwn) {
        throw new AppError('Forbidden. You do not have permission to view this complaint.', 403, 'FORBIDDEN');
      }
    } else if (user.role === 'staff') {
      if (user.department && complaint.department !== user.department) {
        throw new AppError(
          `Forbidden. This complaint belongs to '${complaint.department}', not your department '${user.department}'.`,
          403,
          'FORBIDDEN'
        );
      }
    }

    return this.formatComplaint(complaint);
  }

  static async createComplaint(data: any, user: AuthUser) {
    const category = data.category as Category;
    const department = data.department || data.assignedDepartment || DEPT_MAP[category] || 'Campus Maintenance & Electricals';
    const priority = (data.priority || data.urgency || 'medium') as Priority;
    const urgency = data.urgency || data.priority || 'medium';

    // Generate unique ID and ticket number (or use provided ones)
    let ticketId = data.id;
    let ticketNumber = data.ticketNumber;

    if (ticketId) {
      const existing = await prisma.complaint.findUnique({ where: { id: ticketId } });
      if (existing) {
        ticketId = undefined;
        ticketNumber = undefined;
      }
    }

    if (!ticketId) {
      let randomNum = Math.floor(350 + Math.random() * 650);
      ticketId = `TCK-${randomNum}`;
      ticketNumber = `No. ${randomNum}`;

      // Verify uniqueness
      const existing = await prisma.complaint.findUnique({ where: { id: ticketId } });
      if (existing) {
        randomNum = Math.floor(1000 + Math.random() * 9000);
        ticketId = `TCK-${randomNum}`;
        ticketNumber = `No. ${randomNum}`;
      }
    }

    if (!ticketNumber) {
      ticketNumber = ticketId.replace('TCK-', 'No. ');
    }

    const studentName = data.studentName || user.name;
    const studentEmail = data.studentEmail || user.email;
    const studentRoll = data.studentRoll || user.roll || '2024CSB1042';
    const branch = data.branch || user.branch || 'Computer Science & Engineering';
    const location = data.location || `${data.block}, ${data.roomNo}`;

    const newComplaint = await prisma.complaint.create({
      data: {
        id: ticketId,
        ticketNumber,
        category,
        title: data.title,
        description: data.description,
        location,
        block: data.block,
        roomNo: data.roomNo,
        department,
        priority,
        status: ComplaintStatus.pending,
        urgency,
        expectedResolution: 'Within 24-48 Hours',
        photos: data.photos || [],
        studentName,
        studentRoll,
        studentEmail,
        branch,
        userId: user.id,
        timeline: {
          create: [
            {
              id: `tl-${Date.now()}`,
              status: ComplaintStatus.pending,
              title: 'Boarding Ticket Issued & Dispatched',
              description: `Grievance registered under ${category.toUpperCase()} category for ${data.block}.`,
              actor: studentName,
              actorRole: ActorRole.student,
              timestamp: new Date(),
            },
          ],
        },
        comments: {
          create: [
            {
              id: `cm-${Date.now()}`,
              author: studentName,
              authorRole: UserRole.student,
              avatar: user.avatar,
              text: `Issue lodged from ${data.block}, ${data.roomNo}. Status will be tracked in real-time.`,
              timestamp: new Date(),
              isInternal: false,
            },
          ],
        },
      },
      include: {
        timeline: { orderBy: { timestamp: 'desc' } },
        comments: { orderBy: { timestamp: 'asc' } },
      },
    });

    return this.formatComplaint(newComplaint);
  }

  static async updateComplaint(id: string, payload: any, user: AuthUser) {
    const complaint = await prisma.complaint.findFirst({
      where: {
        OR: [{ id }, { ticketNumber: id }],
      },
    });

    if (!complaint) {
      throw new AppError(`Complaint '${id}' not found.`, 404, 'NOT_FOUND');
    }

    const isStudent = user.role === 'student';
    const isStaffOrAdmin = user.role === 'staff' || user.role === 'admin';

    // Students can only add comments to their own complaint
    if (isStudent) {
      const isOwn =
        complaint.studentEmail?.toLowerCase() === user.email.toLowerCase() ||
        complaint.userId === user.id;
      if (!isOwn) {
        throw new AppError('Forbidden. You cannot update another student\'s complaint.', 403, 'FORBIDDEN');
      }

      if (payload.status || payload.assignedStaff) {
        throw new AppError('Forbidden. Students cannot update ticket status or assign staff.', 403, 'FORBIDDEN');
      }
    }

    // Staff cannot update complaints outside their department
    if (user.role === 'staff' && user.department && complaint.department !== user.department) {
      throw new AppError('Forbidden. Staff can only update complaints within their department.', 403, 'FORBIDDEN');
    }

    const updates: any = {};

    // 1. Status Update
    if (payload.status && isStaffOrAdmin) {
      const newStatus = payload.status as ComplaintStatus;
      updates.status = newStatus;

      await prisma.timelineEvent.create({
        data: {
          complaintId: complaint.id,
          status: newStatus,
          title: STATUS_LABELS[newStatus] || `Status updated to ${newStatus}`,
          description:
            payload.remark ||
            `Official status updated by ${user.name} (${user.department || user.role.toUpperCase()}).`,
          actor: user.name,
          actorRole: user.role as ActorRole,
          timestamp: new Date(),
        },
      });
    }

    // 2. Staff Assignment
    if (payload.assignedStaff && isStaffOrAdmin) {
      updates.assignedStaff = payload.assignedStaff;
      if (payload.department || payload.assignedDepartment) {
        updates.department = payload.department || payload.assignedDepartment;
      }

      await prisma.timelineEvent.create({
        data: {
          complaintId: complaint.id,
          status: updates.status || complaint.status,
          title: `Staff Assigned: ${payload.assignedStaff}`,
          description: `Ticket assigned to ${payload.assignedStaff} from ${updates.department || complaint.department}.`,
          actor: user.name,
          actorRole: user.role as ActorRole,
          timestamp: new Date(),
        },
      });
    }

    // 3. Comment Addition
    if (payload.comment) {
      await prisma.comment.create({
        data: {
          complaintId: complaint.id,
          author: payload.comment.author || user.name,
          authorRole: (payload.comment.authorRole || user.role) as UserRole,
          avatar: payload.comment.avatar || user.avatar,
          text: payload.comment.text,
          isInternal: isStaffOrAdmin ? Boolean(payload.comment.isInternal) : false,
          timestamp: new Date(),
        },
      });
    }

    // Apply complaint updates if any
    const updated = await prisma.complaint.update({
      where: { id: complaint.id },
      data: {
        ...updates,
        updatedAt: new Date(),
      },
      include: {
        timeline: { orderBy: { timestamp: 'desc' } },
        comments: { orderBy: { timestamp: 'asc' } },
      },
    });

    return this.formatComplaint(updated);
  }
}
