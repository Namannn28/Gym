import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';
import { z } from 'zod';

const cardioSchema = z.object({
  type: z.string().min(1),
  duration: z.number().int().min(1),
  speed: z.number().optional(),
  incline: z.number().optional(),
  calories: z.number().optional(),
  date: z.string().optional(),
});

const waterSchema = z.object({
  amount: z.number().int().min(1),
  date: z.string().optional(),
});

const weightSchema = z.object({
  weight: z.number().min(1),
  date: z.string().optional(),
});

// Cardio
export const logCardio = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const parsed = cardioSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.issues });
    }
    const { type, duration, speed, incline, calories, date } = parsed.data;

    const cardioLog = await prisma.cardioLog.create({
      data: {
        userId,
        type,
        duration,
        speed,
        incline,
        calories,
        date: date ? new Date(date) : new Date(),
      },
    });

    return res.status(201).json(cardioLog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getCardioLogs = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const logs = await prisma.cardioLog.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });

    return res.json(logs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Water
export const logWater = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const parsed = waterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.issues });
    }
    const { amount, date } = parsed.data;

    const waterLog = await prisma.waterLog.create({
      data: {
        userId,
        amount,
        date: date ? new Date(date) : new Date(),
      },
    });

    return res.status(201).json(waterLog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getWaterLogs = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const logs = await prisma.waterLog.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });

    return res.json(logs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Weight
export const logWeight = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const parsed = weightSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.issues });
    }
    const { weight, date } = parsed.data;

    const weightLog = await prisma.weightLog.create({
      data: {
        userId,
        weight,
        date: date ? new Date(date) : new Date(),
      },
    });

    // Also update current weight in profile
    await prisma.profile.updateMany({
      where: { userId },
      data: { currentWeight: weight },
    });

    return res.status(201).json(weightLog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getWeightLogs = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const logs = await prisma.weightLog.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });

    return res.json(logs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
