import { Router } from 'express';
import { DepartmentController } from '../controllers/department.controller';

const router = Router();

router.get('/', DepartmentController.getDepartments);

export default router;
