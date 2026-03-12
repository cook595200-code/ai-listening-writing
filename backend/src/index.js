"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = require("cors");
const dotenv_1 = require("dotenv");
const auth_1 = require("./routes/auth");
const words_1 = require("./routes/words");
const grading_1 = require("./routes/grading");
const ai_1 = require("./routes/ai");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Basic route
app.get('/', (req, res) => {
    res.send('AI Listening and Writing API is running');
});
// API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/words', wordRoutes);
// app.use('/api/grading', gradingRoutes);
app.use('/api/ai', ai_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map