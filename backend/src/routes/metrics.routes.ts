import { Router } from 'express';
import { logCardio, getCardioLogs, logWater, getWaterLogs, logWeight, getWeightLogs } from '../controllers/metrics.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.post('/cardio', logCardio);
router.get('/cardio', getCardioLogs);

router.post('/water', logWater);
router.get('/water', getWaterLogs);

router.post('/weight', logWeight);
router.get('/weight', getWeightLogs);

export default router;
