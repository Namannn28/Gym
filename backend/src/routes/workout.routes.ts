import { Router } from 'express';
import { logWorkout, getWorkouts } from '../controllers/workout.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);
router.post('/', logWorkout);
router.get('/', getWorkouts);

export default router;
