
import { Router } from 'express';
import * as dashboardController from '../controllers/dashboard.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/summary', dashboardController.getSummary);
router.get('/stats', dashboardController.getStats);

export default router;
