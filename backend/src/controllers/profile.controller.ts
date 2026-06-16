import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const createOrUpdateProfile = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { age, gender, height, currentWeight, desiredWeight, activityLevel, photoUrl } = req.body;

    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        age,
        gender,
        height,
        currentWeight,
        desiredWeight,
        activityLevel,
        photoUrl,
      },
      create: {
        userId,
        age,
        gender,
        height,
        currentWeight,
        desiredWeight,
        activityLevel,
        photoUrl,
      },
    });

    return res.json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            username: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
