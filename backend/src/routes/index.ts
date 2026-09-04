import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import complaintRoutes from './complaint.routes';
import departmentRoutes from './department.routes';
import branchRoutes from './branch.routes';
import statsRoutes from './stats.routes';
import notificationRoutes from './notification.routes';
import uploadRoutes from './upload.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/complaints', complaintRoutes);
router.use('/departments', departmentRoutes);
router.use('/branches', branchRoutes);
router.use('/dashboard', statsRoutes);
router.use('/notifications', notificationRoutes);
router.use('/uploads', uploadRoutes);

export default router;
