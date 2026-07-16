"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExerciseById = exports.getExercises = void 0;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const querySchema = zod_1.z.object({
    category: zod_1.z.string().optional(),
    muscleGroup: zod_1.z.string().optional(),
    difficulty: zod_1.z.string().optional(),
    search: zod_1.z.string().optional(),
    page: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
});
const getExercises = async (req, res) => {
    try {
        const parsed = querySchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ error: 'Validation failed', details: parsed.error.issues });
        }
        const { category, muscleGroup, difficulty, search, page = '1', limit = '20' } = parsed.data;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const where = {};
        if (category)
            where.category = { contains: category, mode: 'insensitive' };
        if (muscleGroup)
            where.muscleGroup = { contains: muscleGroup, mode: 'insensitive' };
        if (difficulty)
            where.difficulty = { equals: difficulty, mode: 'insensitive' };
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        const exercises = await prisma_1.prisma.exercise.findMany({
            where,
            skip,
            take: parseInt(limit),
        });
        const total = await prisma_1.prisma.exercise.count({ where });
        return res.json({
            data: exercises,
            meta: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit)),
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.getExercises = getExercises;
const getExerciseById = async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await prisma_1.prisma.exercise.findUnique({
            where: { id: id },
        });
        if (!exercise)
            return res.status(404).json({ error: 'Exercise not found' });
        return res.json(exercise);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.getExerciseById = getExerciseById;
