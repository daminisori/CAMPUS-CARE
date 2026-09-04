import { Router } from 'express';
import { ComplaintController } from '../controllers/complaint.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  createComplaintSchema,
  updateComplaintSchema,
  complaintQuerySchema,
} from '../validators/complaint.schema';

const router = Router();

router.get(
  '/',
  authenticate,
  validate(complaintQuerySchema),
  ComplaintController.getComplaints
);

router.get(
  '/:id',
  authenticate,
  ComplaintController.getComplaintById
);

router.post(
  '/',
  authenticate,
  validate(createComplaintSchema),
  ComplaintController.createComplaint
);

router.patch(
  '/:id',
  authenticate,
  validate(updateComplaintSchema),
  ComplaintController.updateComplaint
);

export default router;
