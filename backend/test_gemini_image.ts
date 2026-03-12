import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

async function test() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const imageStr = fs.readFileSync('../화면 캡처 2026-03-11 010223.png', {encoding: 'base64'});
    
    console.log('Sending request to Gemini API...');
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: 'Analyze this image.' },
            { inlineData: { data: imageStr, mimeType: 'image/png' } }
          ]
        }
      ]
    });
    console.log('FLASH SUCCESS:', response.text);
  } catch (err: any) {
    console.error('FLASH ERROR STATUS:', err.status);
    console.error('FLASH ERROR MESSAGE:', err.message);
  }
}
test();
