import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

// Cardio
export const logCardio = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { type, duration, speed, incline, calories, date } = req.body;

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

    const { amount, date } = req.body;

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

    const { weight, date } = req.body;

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
