"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.default.Router();
router.post('/submit', (req, res) => {
    res.json({ message: 'Submit grading endpoint' });
});
exports.default = router;
//# sourceMappingURL=grading.js.map