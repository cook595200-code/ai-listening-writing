"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genai_1 = require("@google/genai");
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
const router = express_1.default.Router();
router.post('/recognize', async (req, res) => {
    try {
        const { imageBase64 } = req.body;
        if (!imageBase64) {
            return res.status(400).json({ error: 'Image data is required' });
        }
        // Initialize Gemini API client
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' });
        }
        const ai = new genai_1.GoogleGenAI({ apiKey });
        // Strip the data URL prefix if it exists (e.g., "data:image/png;base64,")
        const base64Data = imageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: 'Analyze this handwriting image. Read the text/characters written in it. Return ONLY the recognized text. If you cannot recognize anything, return an empty string.' },
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
        res.json({ result: response.text });
    }
    catch (error) {
        console.error('Error during AI recognition:', error);
        res.status(500).json({ error: 'Failed to recognize handwriting' });
    }
});
exports.default = router;
//# sourceMappingURL=ai.js.map