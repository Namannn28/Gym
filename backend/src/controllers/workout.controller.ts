import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const logWorkout = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { date, notes, sets } = req.body;
    // sets is an array of { exerciseId, sets, reps, weight, restTime }

    const workoutLog = await prisma.workoutLog.create({
      data: {
        userId,
        date: date ? new Date(date) : new Date(),
        notes,
        sets: {
          create: sets.map((set: any) => ({
            exerciseId: set.exerciseId,
            sets: set.sets,
            reps: set.reps,
            weight: set.weight,
            restTime: set.restTime,
          })),
        },
      },
      include: {
        sets: true,
      },
    });

    return res.status(201).json(workoutLog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getWorkouts = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const workouts = await prisma.workoutLog.findMany({
      where: { userId },
      include: {
        sets: {
          include: {
            exercise: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });

    return res.json(workouts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
