import { Router } from 'express';
import { createOrUpdateProfile, getProfile } from '../controllers/profile.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken); // Protect all profile routes
router.get('/', getProfile);
router.post('/', createOrUpdateProfile);

export default router;
