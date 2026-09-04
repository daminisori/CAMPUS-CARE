import { Response, NextFunction } from 'express';
import { ComplaintService } from '../services/complaint.service';
import { AuthenticatedRequest, AppError } from '../types';

export class ComplaintController {
  static async getComplaints(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
      }
      const complaints = await ComplaintService.getComplaints(req.user, req.query);
      res.status(200).json(complaints);
    } catch (error) {
      next(error);
    }
  }

  static async getComplaintById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
      }
      const complaint = await ComplaintService.getComplaintById(req.params.id, req.user);
      res.status(200).json(complaint);
    } catch (error) {
      next(error);
    }
  }

  static async createComplaint(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
      }
      const complaint = await ComplaintService.createComplaint(req.body, req.user);
      res.status(201).json(complaint);
    } catch (error) {
      next(error);
    }
  }

  static async updateComplaint(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
      }
      const complaint = await ComplaintService.updateComplaint(req.params.id, req.body, req.user);
      res.status(200).json(complaint);
    } catch (error) {
      next(error);
    }
  }
}
