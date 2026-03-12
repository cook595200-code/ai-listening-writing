import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import wordRoutes from './routes/words';
import gradingRoutes from './routes/grading';
import aiRoutes from './routes/ai';

dotenv.config();

console.log("DEBUG ENV:", process.env.GEMINI_API_KEY ? "KEY EXISTS" : "KEY MISSING");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.send('AI Listening and Writing API is running');
});

// API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/words', wordRoutes);
app.use('/api', gradingRoutes);
app.use('/api/ai', aiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
