import { z } from 'zod';

export const createComplaintSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    ticketNumber: z.string().optional(),
    category: z.enum(
      ['equipment', 'power', 'water', 'sanitation', 'housing', 'network', 'security', 'admin'],
      { errorMap: () => ({ message: 'Invalid complaint category' }) }
    ),
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(5, 'Description must be at least 5 characters'),
    location: z.string().optional(),
    block: z.string().min(1, 'Block is required'),
    roomNo: z.string().min(1, 'Room number is required'),
    department: z.string().optional(),
    assignedDepartment: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    urgency: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    photos: z.array(z.string()).optional(),
    studentName: z.string().optional(),
    studentRoll: z.string().optional(),
    studentEmail: z.string().optional(),
    branch: z.string().optional(),
    campusArea: z.string().optional(),
  }),
});

export const updateComplaintSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Complaint ID parameter is required'),
  }),
  body: z.object({
    status: z.enum(['pending', 'in_review', 'resolved', 'escalated']).optional(),
    assignedStaff: z.string().optional(),
    department: z.string().optional(),
    assignedDepartment: z.string().optional(),
    remark: z.string().optional(),
    comment: z
      .object({
        author: z.string().optional(),
        authorRole: z.enum(['student', 'staff', 'admin']).optional(),
        avatar: z.string().optional(),
        text: z.string().min(1, 'Comment text cannot be empty'),
        isInternal: z.boolean().optional(),
      })
      .optional(),
  }),
});

export const complaintQuerySchema = z.object({
  query: z.object({
    role: z.string().optional(),
    status: z.string().optional(),
    department: z.string().optional(),
  }),
});
