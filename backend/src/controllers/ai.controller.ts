import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

export const chatWithCoach = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { message } = req.body;

    // Save user message
    await prisma.aIChat.create({
      data: {
        userId,
        message,
        isUser: true,
      },
    });

    // In a real RAG scenario, we would use pgvector here to query the `Exercise` table
    // For simplicity in this free-tier setup, we pass standard context
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are an expert fitness coach for a gym management app.
      The user asks: "${message}"
      Provide a concise, motivating, and actionable fitness/nutrition response.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Save AI message
    const aiMessage = await prisma.aIChat.create({
      data: {
        userId,
        message: responseText,
        isUser: false,
      },
    });

    return res.json({ response: aiMessage.message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error from AI service. Please check API key.' });
  }
};

export const getChatHistory = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const history = await prisma.aIChat.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

    return res.json(history);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
