"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.createOrUpdateProfile = void 0;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const profileSchema = zod_1.z.object({
    age: zod_1.z.number().int().min(1).max(120).optional(),
    gender: zod_1.z.string().optional(),
    height: zod_1.z.number().min(1).optional(),
    currentWeight: zod_1.z.number().min(1).optional(),
    desiredWeight: zod_1.z.number().min(1).optional(),
    activityLevel: zod_1.z.string().optional(),
    photoUrl: zod_1.z.string().url().optional(),
});
const createOrUpdateProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const parsed = profileSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: 'Validation failed', details: parsed.error.issues });
        }
        const { age, gender, height, currentWeight, desiredWeight, activityLevel, photoUrl } = parsed.data;
        const profile = await prisma_1.prisma.profile.upsert({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.createOrUpdateProfile = createOrUpdateProfile;
const getProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const profile = await prisma_1.prisma.profile.findUnique({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.getProfile = getProfile;
