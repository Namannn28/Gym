"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatHistory = exports.chatWithCoach = void 0;
const prisma_1 = require("../lib/prisma");
const generative_ai_1 = require("@google/generative-ai");
const zod_1 = require("zod");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
const chatSchema = zod_1.z.object({
    message: zod_1.z.string().min(1),
});
const chatWithCoach = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const parsed = chatSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: 'Validation failed', details: parsed.error.issues });
        }
        const { message } = parsed.data;
        // Save user message
        await prisma_1.prisma.aIChat.create({
            data: {
                userId,
                message,
                isUser: true,
            },
        });
        // Fetch recent history
        const history = await prisma_1.prisma.aIChat.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 10,
        });
        // Reverse to chronological
        const recentHistory = history.reverse();
        const formattedHistory = recentHistory.map(msg => `${msg.isUser ? 'User' : 'Coach'}: ${msg.message}`).join('\n');
        // In a real RAG scenario, we would use pgvector here to query the `Exercise` table
        // For simplicity in this free-tier setup, we pass standard context
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `
      You are an expert fitness coach for a gym management app.
      Here is the recent conversation history:
      ${formattedHistory}
      
      The user just said: "${message}"
      Provide a concise, motivating, and actionable fitness/nutrition response.
    `;
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        // Save AI message
        const aiMessage = await prisma_1.prisma.aIChat.create({
            data: {
                userId,
                message: responseText,
                isUser: false,
            },
        });
        return res.json({ response: aiMessage.message });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error from AI service. Please check API key.' });
    }
};
exports.chatWithCoach = chatWithCoach;
const getChatHistory = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const history = await prisma_1.prisma.aIChat.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' },
        });
        return res.json(history);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.getChatHistory = getChatHistory;
