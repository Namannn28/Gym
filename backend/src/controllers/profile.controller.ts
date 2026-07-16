import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';
import { z } from 'zod';

const profileSchema = z.object({
  age: z.number().int().min(1).max(120).optional(),
  gender: z.string().optional(),
  height: z.number().min(1).optional(),
  currentWeight: z.number().min(1).optional(),
  desiredWeight: z.number().min(1).optional(),
  activityLevel: z.string().optional(),
  photoUrl: z.string().url().optional(),
});

export const createOrUpdateProfile = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const parsed = profileSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.errors });
    }
    const { age, gender, height, currentWeight, desiredWeight, activityLevel, photoUrl } = parsed.data;

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
