import { Router } from 'express';
import { BranchController } from '../controllers/branch.controller';

const router = Router();

router.get('/', BranchController.getBranches);

export default router;
