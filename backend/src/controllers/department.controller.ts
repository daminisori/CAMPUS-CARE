import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';

export class DepartmentController {
  static async getDepartments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const departments = await prisma.department.findMany({
        orderBy: { name: 'asc' },
      });
      res.status(200).json(departments.map((d) => d.name));
    } catch (error) {
      next(error);
    }
  }
}
