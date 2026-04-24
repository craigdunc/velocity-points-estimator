import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
console.log('Using API Key:', apiKey.substring(0, 10));

// We need to fetch from the REST API to list models because the SDK does not support listModels easily yet.
try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    fs.writeFileSync('test-gemini.log', JSON.stringify(data, null, 2));
} catch (e) {
    fs.writeFileSync('test-gemini.log', e.message);
}
