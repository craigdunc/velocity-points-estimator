import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are a friendly, expert advisor for the Qantas Frequent Flyer program.
You help members understand how to earn more points across their selected "Ways to Earn" — 
such as Qantas Hotels, BP Rewards, Accor Live Limitless, shopping portals, credit cards, and partner airlines.
Keep answers concise (2-4 sentences max), practical, and encouraging.
If you don't know a specific detail, say so and direct them to qantas.com/frequent-flyer.
Never make up point values or offer details — stick to general strategies.`;

export default async function handler(req, res) {
    // CORS — allow your GitHub Pages domain
    res.setHeader('Access-Control-Allow-Origin', 'https://craigdunc.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { question, wteName } = req.body;
    if (!question) return res.status(400).json({ error: 'Missing question' });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash',
            systemInstruction: SYSTEM_PROMPT,
        });

        const context = wteName ? `The member is looking at "${wteName}". ` : '';
        const result = await model.generateContent(context + question);
        res.json({ answer: result.response.text() });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get response' });
    }
}
