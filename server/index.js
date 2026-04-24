import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(cors());
app.use(express.json());

// ── System prompt: Qantas Frequent Flyer expert ──────────────────────────────
const SYSTEM_PROMPT = `You are a friendly, expert advisor for the Qantas Frequent Flyer program.
You help members understand how to earn more points across their selected "Ways to Earn" — 
such as Qantas Hotels, BP Rewards, Accor Live Limitless, shopping portals, credit cards, and partner airlines.
Keep answers concise (2-4 sentences max), practical, and encouraging.
If you don't know a specific detail, say so and direct them to qantas.com/frequent-flyer.
Never make up point values or offer details — stick to general strategies.`;

app.post('/api/chat', async (req, res) => {
    const { question, wteName, history, systemPrompt } = req.body;

    if (!question || typeof question !== 'string') {
        return res.status(400).json({ error: 'Missing question' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const activeSystemPrompt = systemPrompt || SYSTEM_PROMPT;
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: activeSystemPrompt,
        });

        let text = '';
        if (history && Array.isArray(history)) {
            // Re-map history to Gemini's expected format ({role: "user" | "model", parts: [{text: ""}]})
            const formattedHistory = history.map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }));
            const chat = model.startChat({ history: formattedHistory });
            const result = await chat.sendMessage(question);
            text = result.response.text();
        } else {
            const context = wteName
                ? `The member is currently looking at improving their earn rate on "${wteName}". `
                : '';
            const result = await model.generateContent(context + question);
            text = result.response.text();
        }

        res.json({ answer: text });
    } catch (err) {
        console.error('Gemini error:', err);
        res.status(500).json({ error: 'Failed to get response from Gemini' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
