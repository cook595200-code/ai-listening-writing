import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

async function test() {
  const targetWord = 'ㄱ';
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
            { text: `Analyze this handwriting image. Read the text/characters written in it. Return ONLY a valid JSON object without markdown formatting, with this exact structure:
{
  "recognizedText": "<the exact character or text recognized in the image>",
  "correct": true/false, // true if recognizedText matches or closely matches the target
  "score": <number 0-100>, // score of handwriting quality (from 0 to 100)
  "feedback": "<short feedback message for the learner>"
}
The target expected character/word the user was supposed to write is: ${targetWord}` },
            { inlineData: { data: imageStr, mimeType: 'image/png' } }
          ]
        }
      ]
    });
    console.log('FLASH SUCCESS RAW TEXT:\n', response.text);
    
    const outText = response.text || "{}";
    const jsonStrMatch = outText.match(/\{[\s\S]*\}/);
    if (jsonStrMatch) {
      console.log('Matched JSON string:\n', jsonStrMatch[0]);
      try {
        const parsed = JSON.parse(jsonStrMatch[0]);
        console.log('Parsed successfully:', parsed);
      } catch (e: any) {
        console.error('Parse error:', e.message);
      }
    } else {
      console.error('No JSON matched');
    }
  } catch (err: any) {
    console.error('FLASH ERROR STATUS:', err.status);
    console.error('FLASH ERROR MESSAGE:', err.message);
  }
}
test();
