import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';
import { z } from 'zod';

const logWorkoutSchema = z.object({
  date: z.string().optional(),
  notes: z.string().optional(),
  sets: z.array(z.object({
    exerciseId: z.string(),
    sets: z.number().int().min(1),
    reps: z.number().int().min(1),
    weight: z.number().min(0),
    restTime: z.number().int().min(0).optional(),
  })).min(1),
});

export const logWorkout = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const parsed = logWorkoutSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.errors });
    }

    const { date, notes, sets } = parsed.data;
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
