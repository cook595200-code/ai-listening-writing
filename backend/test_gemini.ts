import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Hello!'
    });
    console.log('FLASH SUCCESS:', response.text);
  } catch (err: any) {
    console.error('FLASH ERROR:', err.status, err.message);
  }
}
test();
