import prisma from '../config/db';
import { AuthUser } from '../types';

export class StatsService {
  static async getStats(user: AuthUser) {
    const whereClause: any = {};

    if (user.role === 'student') {
      whereClause.OR = [
        { studentEmail: user.email },
        { userId: user.id },
      ];
    } else if (user.role === 'staff' && user.department) {
      whereClause.department = user.department;
    }

    const complaints = await prisma.complaint.findMany({
      where: whereClause,
      select: {
        status: true,
        category: true,
        priority: true,
      },
    });

    const byStatus: Record<string, number> = {
      pending: 0,
      in_review: 0,
      resolved: 0,
      escalated: 0,
    };

    const byCategory: Record<string, number> = {
      equipment: 0,
      power: 0,
      water: 0,
      sanitation: 0,
      housing: 0,
      network: 0,
      security: 0,
      admin: 0,
    };

    const byPriority: Record<string, number> = {
      low: 0,
      medium: 0,
      high: 0,
      urgent: 0,
    };

    for (const c of complaints) {
      if (byStatus[c.status] !== undefined) {
        byStatus[c.status]++;
      }
      if (byCategory[c.category] !== undefined) {
        byCategory[c.category]++;
      }
      if (byPriority[c.priority] !== undefined) {
        byPriority[c.priority]++;
      }
    }

    return {
      total: complaints.length,
      byStatus,
      byCategory,
      byPriority,
    };
  }
}
