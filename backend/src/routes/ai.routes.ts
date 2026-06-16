import { Router } from 'express';
import { chatWithCoach, getChatHistory } from '../controllers/ai.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);
router.post('/chat', chatWithCoach);
router.get('/history', getChatHistory);

export default router;
