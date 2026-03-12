"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.default.Router();
router.post('/register', (req, res) => {
    res.json({ message: 'Register endpoint' });
});
router.post('/login', (req, res) => {
    res.json({ message: 'Login endpoint' });
});
exports.default = router;
//# sourceMappingURL=auth.js.map