"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkouts = exports.logWorkout = void 0;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const logWorkoutSchema = zod_1.z.object({
    date: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
    sets: zod_1.z.array(zod_1.z.object({
        exerciseId: zod_1.z.string(),
        sets: zod_1.z.number().int().min(1),
        reps: zod_1.z.number().int().min(1),
        weight: zod_1.z.number().min(0),
        restTime: zod_1.z.number().int().min(0).optional(),
    })).min(1),
});
const logWorkout = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const parsed = logWorkoutSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: 'Validation failed', details: parsed.error.issues });
        }
        const { date, notes, sets } = parsed.data;
        // sets is an array of { exerciseId, sets, reps, weight, restTime }
        const workoutLog = await prisma_1.prisma.workoutLog.create({
            data: {
                userId,
                date: date ? new Date(date) : new Date(),
                notes,
                sets: {
                    create: sets.map((set) => ({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.logWorkout = logWorkout;
const getWorkouts = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const workouts = await prisma_1.prisma.workoutLog.findMany({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.getWorkouts = getWorkouts;
