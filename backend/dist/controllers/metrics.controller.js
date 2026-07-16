"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeightLogs = exports.logWeight = exports.getWaterLogs = exports.logWater = exports.getCardioLogs = exports.logCardio = void 0;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const cardioSchema = zod_1.z.object({
    type: zod_1.z.string().min(1),
    duration: zod_1.z.number().int().min(1),
    speed: zod_1.z.number().optional(),
    incline: zod_1.z.number().optional(),
    calories: zod_1.z.number().optional(),
    date: zod_1.z.string().optional(),
});
const waterSchema = zod_1.z.object({
    amount: zod_1.z.number().int().min(1),
    date: zod_1.z.string().optional(),
});
const weightSchema = zod_1.z.object({
    weight: zod_1.z.number().min(1),
    date: zod_1.z.string().optional(),
});
// Cardio
const logCardio = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const parsed = cardioSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: 'Validation failed', details: parsed.error.issues });
        }
        const { type, duration, speed, incline, calories, date } = parsed.data;
        const cardioLog = await prisma_1.prisma.cardioLog.create({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.logCardio = logCardio;
const getCardioLogs = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const logs = await prisma_1.prisma.cardioLog.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
        });
        return res.json(logs);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.getCardioLogs = getCardioLogs;
// Water
const logWater = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const parsed = waterSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: 'Validation failed', details: parsed.error.issues });
        }
        const { amount, date } = parsed.data;
        const waterLog = await prisma_1.prisma.waterLog.create({
            data: {
                userId,
                amount,
                date: date ? new Date(date) : new Date(),
            },
        });
        return res.status(201).json(waterLog);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.logWater = logWater;
const getWaterLogs = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const logs = await prisma_1.prisma.waterLog.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
        });
        return res.json(logs);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.getWaterLogs = getWaterLogs;
// Weight
const logWeight = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const parsed = weightSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: 'Validation failed', details: parsed.error.issues });
        }
        const { weight, date } = parsed.data;
        const weightLog = await prisma_1.prisma.weightLog.create({
            data: {
                userId,
                weight,
                date: date ? new Date(date) : new Date(),
            },
        });
        // Also update current weight in profile
        await prisma_1.prisma.profile.updateMany({
            where: { userId },
            data: { currentWeight: weight },
        });
        return res.status(201).json(weightLog);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.logWeight = logWeight;
const getWeightLogs = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const logs = await prisma_1.prisma.weightLog.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
        });
        return res.json(logs);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.getWeightLogs = getWeightLogs;
