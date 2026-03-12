import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/grade-writing', async (req, res) => {
  console.log('--- [GRADING API] RECEIVED REQUEST ---');
  let targetWord = "";
  
  try {
    const { image, target } = req.body;
    targetWord = target;
    
    if (!image || !target) {
      console.log('[GRADING API] ERROR: Missing image or target.');
      return res.status(400).json({ error: 'Image data and target are required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log('[GRADING API] ERROR: GEMINI_API_KEY is missing.');
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' });
    }
    const ai = new GoogleGenAI({ apiKey });
    
    const base64Data = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

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
            {
              inlineData: {
                data: base64Data,
                mimeType: 'image/png'
              }
            }
          ]
        }
      ]
    });

    const outText = response.text || "{}";
    console.log('[GRADING API] RAW GEMINI RESPONSE:');
    console.log(outText);
    console.log('------------------------------------');
    
    const jsonStrMatch = outText.match(/\{[\s\S]*\}/);
    if (jsonStrMatch) {
      const parsed = JSON.parse(jsonStrMatch[0]);
      if (parsed.recognizedText !== undefined) {
         return res.json(parsed);
      }
    }
    
    throw new Error("Invalid Output Format from Gemini");

  } catch (error: any) {
    console.error('------- Error inside Grading API -------');
    console.error(error);
    
    // Return a real 500 error to the frontend if the Gemini API fails
    console.log('[GRADING API] Failed to fetch or parse Gemini data. Returning 500 Error.');
    return res.status(500).json({
       error: "[ERROR] " + (error?.message || "Internal server error during grading.")
    });
  }
});

export default router;
