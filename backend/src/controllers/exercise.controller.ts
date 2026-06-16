import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getExercises = async (req: Request, res: Response): Promise<any> => {
  try {
    const { category, muscleGroup, difficulty, search, page = '1', limit = '20' } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where: any = {};
    if (category) where.category = { contains: category as string, mode: 'insensitive' };
    if (muscleGroup) where.muscleGroup = { contains: muscleGroup as string, mode: 'insensitive' };
    if (difficulty) where.difficulty = { equals: difficulty as string, mode: 'insensitive' };
    if (search) {
      where.name = { contains: search as string, mode: 'insensitive' };
    }

    const exercises = await prisma.exercise.findMany({
      where,
      skip,
      take: parseInt(limit as string),
    });

    const total = await prisma.exercise.count({ where });

    return res.json({
      data: exercises,
      meta: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getExerciseById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const exercise = await prisma.exercise.findUnique({
      where: { id },
    });

    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });

    return res.json(exercise);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
